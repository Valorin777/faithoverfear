import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

interface PromoDoc {
  code: string
  active?: boolean
  discountType: 'percent' | 'fixed'
  discountValue: number
  minOrder?: number
  usageLimit?: number
  usedCount?: number
  validUntil?: string
}

/** Расчёт скидки по промокоду (без побочных эффектов — только проверка) */
export function computeDiscount(promo: PromoDoc, orderTotal: number): number {
  const raw =
    promo.discountType === 'percent'
      ? Math.round((orderTotal * promo.discountValue) / 100)
      : promo.discountValue
  return Math.min(Math.max(0, raw), orderTotal)
}

/** Проверка промокода. Возвращает скидку или причину отказа. */
export async function checkPromo(code: string, orderTotal: number) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'promocodes',
    where: { code: { equals: code.toUpperCase() } },
    limit: 1,
    depth: 0,
  })
  const promo = res.docs[0] as unknown as PromoDoc | undefined

  if (!promo || !promo.active) return { valid: false as const, error: 'Промокод не найден или отключён' }
  if (promo.validUntil && new Date(promo.validUntil) < new Date())
    return { valid: false as const, error: 'Срок действия промокода истёк' }
  if (promo.usageLimit && (promo.usedCount || 0) >= promo.usageLimit)
    return { valid: false as const, error: 'Лимит использований исчерпан' }
  if (promo.minOrder && orderTotal < promo.minOrder)
    return { valid: false as const, error: `Промокод действует от ${promo.minOrder} ₽` }

  return { valid: true as const, code: promo.code, discount: computeDiscount(promo, orderTotal) }
}

export async function POST(request: Request) {
  let body: { code?: string; orderTotal?: number }
  try {
    body = await request.json()
  } catch {
    return Response.json({ valid: false, error: 'Некорректные данные' }, { status: 400 })
  }
  if (!body.code) return Response.json({ valid: false, error: 'Введите промокод' }, { status: 400 })

  const result = await checkPromo(body.code, Math.max(0, Number(body.orderTotal) || 0))
  return Response.json(result)
}
