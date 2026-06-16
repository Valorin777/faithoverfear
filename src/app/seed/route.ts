import { getPayload } from 'payload'
import config from '@payload-config'
import { products, reviews } from '@/data/products'
import { blogPosts } from '@/data/blog'

export const dynamic = 'force-dynamic'

/**
 * Сидинг/обновление контента: переносит товары, отзывы, статьи и баннер
 * из исходных данных (включая английские переводы) в базу Payload.
 *
 * Безопасность:
 *  - Требуется секретный токен: GET /seed?secret=<SEED_SECRET>
 *  - Если SEED_SECRET не задан — маршрут отключён (404).
 *
 * Идемпотентно: товары и статьи обновляются по slug (без дублей).
 * ВНИМАНИЕ: перезаписывает контент товаров данными из кода — запускайте
 * до ручного редактирования в админке (или чтобы сбросить к исходному).
 */
export async function GET(request: Request) {
  const seedSecret = process.env.SEED_SECRET
  const provided = new URL(request.url).searchParams.get('secret')

  if (!seedSecret || provided !== seedSecret) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const payload = await getPayload({ config })

  // ── Товары (upsert по slug) ──
  let products_created = 0
  let products_updated = 0
  for (const p of products) {
    const data = {
      name: p.name,
      nameEn: p.nameEn ?? null,
      slug: p.slug,
      description: p.description,
      descriptionEn: p.descriptionEn ?? null,
      spiritualMeaning: p.spiritualMeaning,
      spiritualMeaningEn: p.spiritualMeaningEn ?? null,
      price: p.price,
      salePrice: p.salePrice ?? null,
      category: p.category,
      variants: p.variants.map(v => ({
        size: v.size,
        color: v.color,
        colorEn: v.colorEn ?? null,
        colorHex: v.colorHex,
        stock: v.stock,
        sku: v.sku,
      })),
      tags: p.tags ?? [],
      isNew: p.isNew ?? false,
      isBestseller: p.isBestseller ?? false,
      wildberriesUrl: p.wildberriesUrl ?? null,
    }
    try {
      const found = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } }, limit: 1 })
      if (found.docs.length) {
        await payload.update({ collection: 'products', id: found.docs[0].id, data })
        products_updated++
      } else {
        await payload.create({ collection: 'products', data })
        products_created++
      }
    } catch (err) {
      console.error('Seed product error:', p.slug, err)
    }
  }

  // ── Статьи блога (upsert по slug) ──
  let posts_upserted = 0
  for (const b of blogPosts) {
    const data = {
      title: b.title,
      titleEn: b.titleEn ?? null,
      slug: b.slug,
      excerpt: b.excerpt,
      excerptEn: b.excerptEn ?? null,
      published: true,
    }
    try {
      const found = await payload.find({ collection: 'posts', where: { slug: { equals: b.slug } }, limit: 1 })
      if (found.docs.length) {
        await payload.update({ collection: 'posts', id: found.docs[0].id, data })
      } else {
        await payload.create({ collection: 'posts', data })
      }
      posts_upserted++
    } catch (err) {
      console.error('Seed post error:', b.slug, err)
    }
  }

  // ── Отзывы (пересоздаём, чтобы не плодить дубли) ──
  let reviews_created = 0
  try {
    const existingReviews = await payload.find({ collection: 'reviews', limit: 500 })
    for (const r of existingReviews.docs) {
      await payload.delete({ collection: 'reviews', id: r.id })
    }
    for (const r of reviews) {
      await payload.create({
        collection: 'reviews',
        data: { author: r.author, rating: r.rating, text: r.text, textEn: r.textEn ?? null, published: true },
      })
      reviews_created++
    }
  } catch (err) {
    console.error('Seed reviews error:', err)
  }

  // ── Баннер на главной (RU + EN) ──
  try {
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        heroEyebrow: 'Православная одежда · Faith over Fear',
        heroEyebrowEn: 'Orthodox clothing · Faith over Fear',
        heroTitleLine1: 'Одежда,',
        heroTitleLine1En: 'Clothing',
        heroTitleLine2: 'которая несёт Свет',
        heroTitleLine2En: 'that carries the Light',
        heroSubtitle:
          'Футболки, поло, свитшоты и аксессуары с цитатами Священного Писания и православной символикой. Создано с молитвой.',
        heroSubtitleEn:
          'T-shirts, polos, sweatshirts and accessories with quotes from Holy Scripture and Orthodox symbolism. Made with prayer.',
      },
    })
  } catch (err) {
    console.error('Seed settings error:', err)
  }

  return Response.json({
    success: true,
    products_created,
    products_updated,
    posts_upserted,
    reviews_created,
    message: `Товары: +${products_created} новых, ${products_updated} обновлено · Статьи: ${posts_upserted} · Отзывы: ${reviews_created} · Баннер обновлён`,
  })
}
