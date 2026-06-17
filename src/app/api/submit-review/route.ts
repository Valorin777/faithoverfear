import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

/**
 * Приём отзыва с формы на сайте. Отзыв создаётся НЕопубликованным —
 * сначала появляется у администратора на модерации, потом он публикует.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const author = String(body.author || '').trim().slice(0, 120)
    const text = String(body.text || '').trim().slice(0, 3000)
    let rating = Math.round(Number(body.rating) || 5)
    rating = Math.min(5, Math.max(1, rating))
    const productSlug = String(body.productSlug || '').trim().slice(0, 200)

    if (!author || !text) {
      return Response.json({ error: 'Укажите имя и текст отзыва' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Необязательная привязка к товару по slug
    let product: string | number | undefined
    if (productSlug) {
      const found = await payload.find({
        collection: 'products',
        where: { slug: { equals: productSlug } },
        limit: 1,
        depth: 0,
      })
      if (found.docs[0]) product = found.docs[0].id
    }

    await payload.create({
      collection: 'reviews',
      data: { author, rating, text, product, published: false } as never,
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Не удалось отправить отзыв' }, { status: 500 })
  }
}
