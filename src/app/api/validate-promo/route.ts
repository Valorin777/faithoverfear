import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

interface PromoDoc {
  id: string | number
  code: string
  active?: boolean
  discountType: 'percent' | 'fixed' | 'gift' | 'freeShipping'
  discountValue?: number
  minOrder?: number
  usageLimit?: number
  usedCount?: number
  validUntil?: string
  scope?: 'all' | 'individual' | 'company'
  assignedCustomer?: string | number | { id: string | number } | null
}

/** Расчёт скидки по промокоду (без побочных эффектов — только проверка) */
export function computeDiscount(promo: PromoDoc, orderTotal: number): number {
  // «Подарок» и «бесплатная доставка» не уменьшают стоимость товаров.
  // Доставку обнуляет роут place-order по типу промокода, а не здесь.
  if (promo.discountType === 'gift' || promo.discountType === 'freeShipping') return 0
  const value = Number(promo.discountValue) || 0
  const raw = promo.discountType === 'percent' ? Math.round((orderTotal * value) / 100) : value
  return Math.min(Math.max(0, raw), orderTotal)
}

/** Проверка промокода. Возвращает скидку или причину отказа. */
export async function checkPromo(code: string, orderTotal: number, customerId?: string | number) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'promocodes',
    where: { code: { equals: code.toUpperCase() } },
    limit: 1,
    depth: 0,
  })
  const promo = res.docs[0] as unknown as PromoDoc | undefined

  if (!promo || !promo.active) return { valid: false as const, error: 'Промокод не найден или отключён' }
  // «Действует до» хранится как дата без времени (00:00 UTC). Код действителен
  // до конца указанного дня, а не до его начала — иначе он «сгорал» на сутки раньше.
  if (promo.validUntil) {
    const endOfDay = new Date(promo.validUntil).getTime() + 86_400_000 - 1
    if (endOfDay < Date.now()) return { valid: false as const, error: 'Срок действия промокода истёк' }
  }
  if (promo.usageLimit && (promo.usedCount || 0) >= promo.usageLimit)
    return { valid: false as const, error: 'Лимит использований исчерпан' }
  if (promo.minOrder && orderTotal < promo.minOrder)
    return { valid: false as const, error: `Промокод действует от ${promo.minOrder} ₽` }
  // Персональный промокод срабатывает только у того клиента, которому назначен
  if (promo.scope === 'individual') {
    const assigned = promo.assignedCustomer
    const assignedId = typeof assigned === 'object' && assigned !== null ? assigned.id : assigned
    if (!customerId || !assignedId || String(assignedId) !== String(customerId))
      return { valid: false as const, error: 'Этот промокод доступен только определённому клиенту' }
  }

  return {
    valid: true as const,
    code: promo.code,
    discount: computeDiscount(promo, orderTotal),
    discountType: promo.discountType,
  }
}

export async function POST(request: Request) {
  let body: { code?: string; orderTotal?: number }
  try {
    body = await request.json()
  } catch {
    return Response.json({ valid: false, error: 'Некорректные данные' }, { status: 400 })
  }
  if (!body.code) return Response.json({ valid: false, error: 'Введите промокод' }, { status: 400 })

  // Для персональных промокодов нужно знать, кто проверяет код
  let customerId: string | number | undefined
  try {
    const payload = await getPayload({ config })
    const auth = await payload.auth({ headers: request.headers })
    const u = auth.user as { collection?: string; id: string | number } | null
    if (u && u.collection === 'customers') customerId = u.id
  } catch {
    /* гость — персональные коды проверку не пройдут */
  }

  const result = await checkPromo(body.code, Math.max(0, Number(body.orderTotal) || 0), customerId)
  return Response.json(result)
}
