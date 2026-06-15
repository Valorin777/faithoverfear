import { getPayload } from 'payload'
import config from '@payload-config'
import { products } from '@/data/products'
import { reviews } from '@/data/products'

export const dynamic = 'force-dynamic'

/**
 * Разовый сидинг: переносит статичные товары и отзывы в базу Payload.
 * Запуск: GET /seed  (идемпотентно — если товары уже есть, пропускает).
 * Доступно только в режиме разработки.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Disabled in production' }, { status: 403 })
  }

  const force = new URL(request.url).searchParams.get('force') === '1'
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'products' })
  if (existing.totalDocs > 0 && !force) {
    return Response.json({
      skipped: true,
      message: `В базе уже ${existing.totalDocs} товаров. Добавьте ?force=1 для повторного сидинга.`,
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
