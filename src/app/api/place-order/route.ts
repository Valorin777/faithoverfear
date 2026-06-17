import { getPayload } from 'payload'
import config from '@payload-config'
import { checkPromo } from '../validate-promo/route'

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
  promoCode?: string
  useBonus?: boolean
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

  // Заказ можно оформить только из аккаунта — проверяем вход
  let customer: AuthedCustomer | null = null
  try {
    const authResult = await payload.auth({ headers: request.headers })
    const u = authResult.user as ({ collection?: string } & AuthedCustomer) | null
    if (u && u.collection === 'customers') {
      customer = { id: u.id, referredBy: u.referredBy, referralRewarded: u.referralRewarded }
    }
  } catch {
    // не залогинен
  }

  if (!customer) {
    return Response.json({ error: 'Войдите в аккаунт, чтобы оформить заказ' }, { status: 401 })
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
    // Скидочная цена учитывается только если она положительная (0 / пусто — скидки нет)
    const sale = typeof product.salePrice === 'number' && product.salePrice > 0 ? product.salePrice : undefined
    const unitPrice = sale ?? product.price ?? 0
    if (unitPrice <= 0) continue // товар без корректной цены в заказ не добавляем
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

  const baseDelivery =
    goodsTotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICES[body.delivery] ?? 0

  // Промокод — скидка на товары (пересчёт на сервере, клиент не может подделать)
  let promoDiscount = 0
  let appliedPromo: string | undefined
  let freeShipping = false
  if (body.promoCode) {
    const promoRes = await checkPromo(body.promoCode, goodsTotal, customer.id)
    if (promoRes.valid) {
      promoDiscount = promoRes.discount
      appliedPromo = promoRes.code
      if (promoRes.discountType === 'freeShipping') freeShipping = true
    }
  }
  // Промокод «бесплатная доставка» обнуляет стоимость доставки
  const deliveryPrice = freeShipping ? 0 : baseDelivery

  const afterPromo = Math.max(0, goodsTotal - promoDiscount) + deliveryPrice

  // Списание бонусов с баланса покупателя
  let bonusUsed = 0
  if (body.useBonus && customer) {
    const fresh = await payload
      .findByID({ collection: 'customers', id: customer.id, depth: 0 })
      .catch(() => null)
    const balance = (fresh as { bonusBalance?: number } | null)?.bonusBalance || 0
    bonusUsed = Math.min(balance, afterPromo)
  }

  const total = Math.max(0, afterPromo - bonusUsed)
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
        paymentMethod: body.payment as 'yukassa' | 'sbp' | 'tinkoff' | 'sber' | 'crypto' | 'card',
        items: { goods: itemsSnapshot, goodsTotal, deliveryPrice, promoCode: appliedPromo, promoDiscount, bonusUsed },
        total,
        comment: body.comment,
        customer: customer?.id,
      },
    })
  } catch (e) {
    console.error('Order create error:', e)
    return Response.json({ error: 'Не удалось создать заказ' }, { status: 500 })
  }

  // Учёт использования промокода
  if (appliedPromo && promoDiscount > 0) {
    try {
      const pr = await payload.find({ collection: 'promocodes', where: { code: { equals: appliedPromo } }, limit: 1, depth: 0 })
      const promo = pr.docs[0] as { id: string | number; usedCount?: number } | undefined
      if (promo) {
        await payload.update({
          collection: 'promocodes', id: promo.id,
          data: { usedCount: (promo.usedCount || 0) + 1 },
          overrideAccess: true, overrideLock: true,
        })
      }
    } catch (e) { console.error('Promo usedCount error:', e) }
  }

  // Списание бонусов с баланса
  if (bonusUsed > 0 && customer) {
    try {
      const fresh = await payload.findByID({ collection: 'customers', id: customer.id, depth: 0 })
      const balance = (fresh as { bonusBalance?: number }).bonusBalance || 0
      await payload.update({
        collection: 'customers', id: customer.id,
        data: { bonusBalance: Math.max(0, balance - bonusUsed) },
        overrideAccess: true, overrideLock: true,
      })
    } catch (e) { console.error('Bonus spend error:', e) }
  }

  // Реферальный бонус пригласившему здесь НЕ начисляется: это происходит, когда
  // заказ переходит в оплаченный статус (хук afterChange коллекции Orders) —
  // чтобы не платить комиссию за неоплаченные или отменённые заказы.

  return Response.json({ success: true, orderNumber, total, promoDiscount, bonusUsed })
}
