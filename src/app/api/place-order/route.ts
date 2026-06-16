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

interface AuthedCustomer {
  id: string | number
  referredBy?: string | number | { id: string | number } | null
  referralRewarded?: boolean
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

  // Определяем вошедшего покупателя (если заказ из личного кабинета)
  let customer: AuthedCustomer | null = null
  try {
    const authResult = await payload.auth({ headers: request.headers })
    const u = authResult.user as ({ collection?: string } & AuthedCustomer) | null
    if (u && u.collection === 'customers') {
      customer = { id: u.id, referredBy: u.referredBy, referralRewarded: u.referralRewarded }
    }
  } catch {
    // не залогинен — обычный гостевой заказ
  }

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
        customer: customer?.id,
      },
    })
  } catch (e) {
    console.error('Order create error:', e)
    return Response.json({ error: 'Не удалось создать заказ' }, { status: 500 })
  }

  // Реферальный бонус: если покупатель пришёл по приглашению, заказ от 3000 ₽
  // и бонус ещё не начислялся — начисляем пригласившему 10% от суммы заказа.
  let referralBonus = 0
  if (customer && customer.referredBy && !customer.referralRewarded && total >= 3000) {
    const rb: unknown = customer.referredBy
    const referrerId = (
      typeof rb === 'object' && rb !== null ? (rb as { id: string | number }).id : rb
    ) as string | number
    try {
      const referrer = await payload.findByID({
        collection: 'customers',
        id: referrerId,
        depth: 0,
      })
      if (referrer) {
        referralBonus = Math.round(total * 0.1)
        await payload.update({
          collection: 'customers',
          id: referrerId,
          data: { bonusBalance: ((referrer as { bonusBalance?: number }).bonusBalance || 0) + referralBonus },
          overrideAccess: true,
          overrideLock: true,
        })
        await payload.update({
          collection: 'customers',
          id: customer.id,
          data: { referralRewarded: true },
          overrideAccess: true,
          overrideLock: true,
        })
      }
    } catch (e) {
      console.error('Referral bonus error:', e)
    }
  }

  return Response.json({ success: true, orderNumber, total, referralBonus })
}
