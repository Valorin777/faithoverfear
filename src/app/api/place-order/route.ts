import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

interface IncomingItem {
  slug: string
  name: string
  size: string
  color: string
  quantity: number
}

interface OrderPayload {
  firstName: string
  lastName: string
  phone: string
  email: string
  city?: string
  address?: string
  comment?: string
  delivery: string
  payment: string
  items: IncomingItem[]
}

const DELIVERY_PRICES: Record<string, number> = {
  cdek: 350,
  boxberry: 290,
  russianpost: 200,
  pickup: 0,
}
const FREE_DELIVERY_FROM = 3500

function genOrderNumber(): string {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `FOF-${n}`
}

/**
 * Создание заказа покупателем.
 * Сумма пересчитывается на сервере по реальным ценам из базы — клиент не может её подменить.
 */
export async function POST(request: Request) {
  let body: OrderPayload
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Некорректные данные' }, { status: 400 })
  }

  if (!body.firstName || !body.phone || !Array.isArray(body.items) || body.items.length === 0) {
    return Response.json({ error: 'Заполните обязательные поля' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  // Пересчёт суммы товаров по реальным ценам из базы (защита от подмены)
  let goodsTotal = 0
  const itemsSnapshot: Array<IncomingItem & { price: number; lineTotal: number }> = []

  for (const item of body.items) {
    const found = await payload.find({
      collection: 'products',
      where: { slug: { equals: item.slug } },
      limit: 1,
      depth: 0,
    })
    const product = found.docs[0] as { price?: number; salePrice?: number } | undefined
    if (!product) continue
    const unitPrice = product.salePrice ?? product.price ?? 0
    const qty = Math.max(1, Number(item.quantity) || 1)
    const lineTotal = unitPrice * qty
    goodsTotal += lineTotal
    itemsSnapshot.push({
      slug: item.slug,
      name: item.name,
      size: item.size,
      color: item.color,
      quantity: qty,
      price: unitPrice,
      lineTotal,
    })
  }

  if (itemsSnapshot.length === 0) {
    return Response.json({ error: 'Товары не найдены' }, { status: 400 })
  }

  const deliveryPrice =
    goodsTotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICES[body.delivery] ?? 0
  const total = goodsTotal + deliveryPrice
  const orderNumber = genOrderNumber()

  try {
    await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        status: 'pending',
        customerName: `${body.firstName} ${body.lastName || ''}`.trim(),
        customerPhone: body.phone,
        customerEmail: body.email,
        deliveryMethod: body.delivery as 'cdek' | 'boxberry' | 'russianpost' | 'pickup',
        city: body.city,
        address: body.address,
        paymentMethod: body.payment as 'yukassa' | 'sbp' | 'tinkoff' | 'sber' | 'crypto',
        items: { goods: itemsSnapshot, goodsTotal, deliveryPrice },
        total,
        comment: body.comment,
      },
    })
  } catch (e) {
    console.error('Order create error:', e)
    return Response.json({ error: 'Не удалось создать заказ' }, { status: 500 })
  }

  return Response.json({ success: true, orderNumber, total })
}
