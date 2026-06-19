import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Product, ProductVariant, Review, BlogPost, ProductCategory, SiteSettingsData } from '@/types'
import { products as staticProducts, reviews as staticReviews } from '@/data/products'
import { INFO_TOPICS, type InfoTopic } from '@/data/infoSections'
import { blogPosts as staticPosts } from '@/data/blog'

const PLACEHOLDER_IMG = '/images/placeholder-product.jpg'

/* eslint-disable @typescript-eslint/no-explicit-any */

function mediaUrl(m: any): string | null {
  if (!m) return null
  if (typeof m === 'string') return m
  if (typeof m === 'object' && typeof m.url === 'string') return m.url
  return null
}

function mapProduct(doc: any): Product {
  const images = Array.isArray(doc.images)
    ? doc.images.map(mediaUrl).filter((u: string | null): u is string => !!u)
    : []
  const variants: ProductVariant[] = Array.isArray(doc.variants)
    ? doc.variants.map((v: any, i: number) => ({
        id: String(v.id ?? `${doc.id}-v${i}`),
        size: v.size,
        color: v.color ?? '',
        colorEn: v.colorEn || undefined,
        colorHex: v.colorHex ?? '#cccccc',
        stock: typeof v.stock === 'number' ? v.stock : 0,
        sku: v.sku ?? '',
      }))
    : []
  return {
    id: String(doc.id),
    slug: doc.slug,
    name: doc.name,
    nameEn: doc.nameEn || undefined,
    description: doc.description ?? '',
    descriptionEn: doc.descriptionEn || undefined,
    spiritualMeaning: doc.spiritualMeaning ?? '',
    spiritualMeaningEn: doc.spiritualMeaningEn || undefined,
    price: typeof doc.price === 'number' ? doc.price : 0,
    salePrice: typeof doc.salePrice === 'number' ? doc.salePrice : undefined,
    category: doc.category as ProductCategory,
    images: images.length ? images : [PLACEHOLDER_IMG],
    video: mediaUrl(doc.video) || undefined,
    variants,
    tags: Array.isArray(doc.tags) ? doc.tags.filter((t: any) => typeof t === 'string') : [],
    isNew: !!doc.isNew,
    isBestseller: !!doc.isBestseller,
    wildberriesUrl: doc.wildberriesUrl || undefined,
    specifications: Array.isArray(doc.specifications)
      ? doc.specifications
          .filter((s: any) => s?.label)
          .map((s: any) => ({ label: s.label, labelEn: s.labelEn || undefined, value: s.value || '', valueEn: s.valueEn || undefined }))
      : undefined,
  }
}

function mapReview(doc: any): Review {
  const productRel = doc.product
  const productId =
    productRel == null ? undefined : String(typeof productRel === 'object' ? productRel.id : productRel)
  return {
    id: String(doc.id),
    author: doc.author ?? '',
    rating: typeof doc.rating === 'number' ? doc.rating : 5,
    text: doc.text ?? '',
    textEn: doc.textEn || undefined,
    photo: mediaUrl(doc.photo) || undefined,
    productId,
    createdAt: doc.createdAt ?? new Date(0).toISOString(),
  }
}

function mapPost(doc: any): BlogPost {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    titleEn: doc.titleEn || undefined,
    excerpt: doc.excerpt ?? '',
    excerptEn: doc.excerptEn || undefined,
    content: '',
    image: mediaUrl(doc.image) || undefined,
    video: mediaUrl(doc.video) || undefined,
    createdAt: doc.createdAt ?? new Date(0).toISOString(),
  }
}

/** Товары: из админки (Payload), с откатом на статические данные, если БД пуста/недоступна. */
export async function getProducts(): Promise<Product[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'products', depth: 1, limit: 200, sort: 'createdAt' })
    if (res.docs.length) return res.docs.map(mapProduct)
  } catch {
    // БД недоступна на этапе сборки/деплоя — используем статические данные
  }
  return staticProducts
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, depth: 1, limit: 1 })
    if (res.docs.length) return mapProduct(res.docs[0])
  } catch {
    // откат ниже
  }
  return staticProducts.find(p => p.slug === slug) ?? null
}

export async function getReviews(): Promise<Review[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'reviews',
      where: { published: { equals: true } },
      depth: 1,
      limit: 50,
      sort: '-createdAt',
    })
    if (res.docs.length) return res.docs.map(mapReview)
  } catch {
    // откат ниже
  }
  return staticReviews
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { published: { equals: true } },
      depth: 1,
      limit: 100,
      sort: '-createdAt',
    })
    if (res.docs.length) return res.docs.map(mapPost)
  } catch {
    // откат ниже
  }
  return staticPosts
}

/** Настройки сайта из админки. Поля, которые владелец не заполнил, остаются пустыми (на витрине — запасные значения). */
export async function getSettings(): Promise<SiteSettingsData> {
  const fallback: SiteSettingsData = { freeDeliveryFrom: 3500, socials: [], deliveryMethods: [], paymentMethods: [], paymentSystems: [] }
  try {
    const payload = await getPayload({ config })
    const [s, ps] = await Promise.all([
      payload.findGlobal({ slug: 'settings', depth: 1 }) as Promise<any>,
      payload
        .find({ collection: 'payment-systems', where: { enabled: { equals: true } }, sort: 'order', depth: 0, limit: 50, pagination: false })
        .then((r) => r.docs)
        .catch(() => []),
    ])
    const paymentSystems = (ps as any[]).map((p) => ({
      code: p.code, name: p.name, nameEn: p.nameEn || undefined, hint: p.hint || undefined, hintEn: p.hintEn || undefined,
    }))
    return {
      paymentSystems,
      promoBarText: s.promoBarText || undefined,
      promoBarTextEn: s.promoBarTextEn || undefined,
      freeDeliveryFrom: typeof s.freeDeliveryFrom === 'number' ? s.freeDeliveryFrom : 3500,
      contactEmail: s.contactEmail || undefined,
      contactPhone: s.contactPhone || undefined,
      contactWebsite: s.contactWebsite || undefined,
      workingHours: s.workingHours || undefined,
      workingHoursEn: s.workingHoursEn || undefined,
      socials: Array.isArray(s.socials) ? s.socials.filter((x: any) => x?.url).map((x: any) => ({ platform: x.platform, url: x.url })) : [],
      telegramUrl: s.telegramUrl || undefined,
      telegramPitch: s.telegramPitch || undefined,
      telegramPitchEn: s.telegramPitchEn || undefined,
      deliveryMethods: Array.isArray(s.deliveryMethods)
        ? s.deliveryMethods.filter((x: any) => x?.name).map((x: any) => ({
            name: x.name, nameEn: x.nameEn || undefined, price: x.price || '', priceEn: x.priceEn || undefined,
            time: x.time || '', timeEn: x.timeEn || undefined, description: x.description || '', descriptionEn: x.descriptionEn || undefined,
          }))
        : [],
      paymentMethods: Array.isArray(s.paymentMethods) ? s.paymentMethods.filter((x: any) => x?.ru).map((x: any) => ({ ru: x.ru, en: x.en || undefined })) : [],
      aboutQuote: s.aboutQuote || undefined,
      aboutQuoteEn: s.aboutQuoteEn || undefined,
      aboutQuoteSource: s.aboutQuoteSource || undefined,
      aboutQuoteSourceEn: s.aboutQuoteSourceEn || undefined,
      aboutSections: Array.isArray(s.aboutSections) ? s.aboutSections.filter((x: any) => x?.title || x?.text).map((x: any) => ({ title: x.title || '', titleEn: x.titleEn || undefined, text: x.text || '', textEn: x.textEn || undefined })) : [],
      aboutValues: Array.isArray(s.aboutValues) ? s.aboutValues.filter((x: any) => x?.title).map((x: any) => ({ title: x.title || '', titleEn: x.titleEn || undefined, desc: x.desc || '', descEn: x.descEn || undefined })) : [],
      heroImage: mediaUrl(s.heroImage) || undefined,
      heroVideo: mediaUrl(s.heroVideo) || undefined,
    }
  } catch {
    return fallback
  }
}

/** Разделы «Информация» из админки; если коллекция пуста — встроенный текст. */
export async function getInfoTopics(): Promise<InfoTopic[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'info-topics', sort: 'order', depth: 0, limit: 50, pagination: false })
    if (res.docs.length) {
      return (res.docs as any[]).map((d) => ({
        slug: d.slug || String(d.id),
        title: d.title || '',
        intro: d.intro || '',
        blocks: Array.isArray(d.blocks)
          ? d.blocks.filter((b: any) => b?.text).map((b: any) => ({ type: b.type || 'text', text: b.text }))
          : [],
      }))
    }
  } catch {
    // откат к встроенному тексту
  }
  return INFO_TOPICS
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, depth: 1, limit: 1 })
    if (res.docs.length) return mapPost(res.docs[0])
  } catch {
    // откат ниже
  }
  return staticPosts.find(p => p.slug === slug) ?? null
}
