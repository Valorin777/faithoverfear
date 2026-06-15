import { getPayload } from 'payload'
import config from '@payload-config'
import { products } from '@/data/products'
import { reviews } from '@/data/products'

export const dynamic = 'force-dynamic'

/**
 * Разовый сидинг: переносит статичные товары и отзывы в базу Payload.
 *
 * Безопасность:
 *  - Требуется секретный токен: GET /seed?secret=<SEED_SECRET>
 *  - Если переменная окружения SEED_SECRET не задана — маршрут полностью отключён.
 *  - Идемпотентно: если товары уже есть, повторно не создаёт (нужен ?force=1).
 *
 * После наполнения базы переменную SEED_SECRET можно удалить из окружения,
 * чтобы маршрут стал недоступен.
 */
export async function GET(request: Request) {
  const seedSecret = process.env.SEED_SECRET
  const provided = new URL(request.url).searchParams.get('secret')

  // Маршрут отключён, если секрет не настроен или не совпадает
  if (!seedSecret || provided !== seedSecret) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  const force = new URL(request.url).searchParams.get('force') === '1'
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'products' })
  if (existing.totalDocs > 0 && !force) {
    return Response.json({
      skipped: true,
      message: `В базе уже ${existing.totalDocs} товаров. Добавьте &force=1 для повторного сидинга.`,
    })
  }

  let createdProducts = 0
  for (const p of products) {
    try {
      await payload.create({
        collection: 'products',
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          spiritualMeaning: p.spiritualMeaning,
          price: p.price,
          salePrice: p.salePrice ?? null,
          category: p.category,
          variants: p.variants.map(v => ({
            size: v.size,
            color: v.color,
            colorHex: v.colorHex,
            stock: v.stock,
            sku: v.sku,
          })),
          tags: p.tags ?? [],
          isNew: p.isNew ?? false,
          isBestseller: p.isBestseller ?? false,
          wildberriesUrl: p.wildberriesUrl ?? null,
        },
      })
      createdProducts++
    } catch (err) {
      console.error('Seed product error:', p.slug, err)
    }
  }

  let createdReviews = 0
  for (const r of reviews) {
    try {
      await payload.create({
        collection: 'reviews',
        data: {
          author: r.author,
          rating: r.rating,
          text: r.text,
          published: true,
        },
      })
      createdReviews++
    } catch (err) {
      console.error('Seed review error:', err)
    }
  }

  return Response.json({
    success: true,
    createdProducts,
    createdReviews,
    message: `Перенесено товаров: ${createdProducts}, отзывов: ${createdReviews}`,
  })
}
