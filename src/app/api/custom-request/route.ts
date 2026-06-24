import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

/** Приём заявок на индивидуальный дизайн чехла с формы на сайте. */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const phoneModel = String(body.phoneModel || '').trim().slice(0, 200)
    const name = String(body.name || '').trim().slice(0, 200)
    const contact = String(body.contact || '').trim().slice(0, 200)
    const comment = String(body.comment || '').trim().slice(0, 3000)

    if (!phoneModel) {
      return Response.json({ error: 'Укажите модель телефона' }, { status: 400 })
    }
    if (!contact) {
      return Response.json({ error: 'Укажите контакт для связи' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'custom-requests',
      data: { phoneModel, name, contact, comment, status: 'new' } as never,
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Custom request error:', err)
    return Response.json({ error: 'Не удалось отправить заявку' }, { status: 500 })
  }
}
