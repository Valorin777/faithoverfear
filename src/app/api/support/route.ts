import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

/** Приём обращений в поддержку с формы на сайте. */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim().slice(0, 200)
    const email = String(body.email || '').trim().slice(0, 200)
    const phone = String(body.phone || '').trim().slice(0, 50)
    const subject = String(body.subject || '').trim().slice(0, 300)
    const message = String(body.message || '').trim().slice(0, 5000)

    if (!message) {
      return Response.json({ error: 'Введите сообщение' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'support-messages',
      data: { name, email, phone, subject, message, status: 'new' } as never,
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Не удалось отправить' }, { status: 500 })
  }
}
