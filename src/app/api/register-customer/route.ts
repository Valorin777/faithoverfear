import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

/**
 * Регистрация покупателя. Если передан реферальный код (ref) и он валиден —
 * новый покупатель привязывается к пригласившему.
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; password?: string; ref?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Некорректные данные' }, { status: 400 })
  }

  const { name, email, phone, password, ref } = body
  if (!email || !password || password.length < 6) {
    return Response.json({ error: 'Укажите email и пароль (минимум 6 символов)' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  // Проверка: не занят ли email
  const existing = await payload.find({
    collection: 'customers',
    where: { email: { equals: email.toLowerCase() } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    return Response.json({ error: 'Этот email уже зарегистрирован' }, { status: 400 })
  }

  // Резолвим реферальный код
  let referredBy: number | undefined
  if (ref) {
    const referrer = await payload.find({
      collection: 'customers',
      where: { referralCode: { equals: ref.toUpperCase() } },
      limit: 1,
      depth: 0,
    })
    if (referrer.docs[0]) referredBy = referrer.docs[0].id as number
  }

  try {
    await payload.create({
      collection: 'customers',
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        password,
        referredBy,
      },
    })
  } catch (e) {
    // Гонка: если этот e-mail заняли между проверкой и созданием, уникальный индекс
    // не даст создать дубль — отдаём понятную ошибку вместо общего 500.
    const msg = String((e as { message?: string })?.message || e).toLowerCase()
    if (msg.includes('unique') || msg.includes('duplicate') || msg.includes('email')) {
      return Response.json({ error: 'Этот email уже зарегистрирован' }, { status: 400 })
    }
    console.error('Register error:', e)
    return Response.json({ error: 'Не удалось зарегистрироваться' }, { status: 500 })
  }

  return Response.json({ success: true })
}
