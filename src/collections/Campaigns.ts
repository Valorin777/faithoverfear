import type { CollectionConfig, Payload } from 'payload'

/* eslint-disable @typescript-eslint/no-explicit-any */

async function resolveEmails(payload: Payload, segment: string): Promise<string[]> {
  const thirtyAgo = new Date(Date.now() - 30 * 86_400_000).toISOString()
  if (segment === 'with_orders') {
    const orders = await payload.find({ collection: 'orders', limit: 5000, depth: 0, pagination: false })
    const ids = [...new Set((orders.docs as any[]).map((o) => o.customer).filter(Boolean).map(String))]
    if (!ids.length) return []
    const custs = await payload.find({ collection: 'customers', where: { id: { in: ids } }, limit: 5000, depth: 0, pagination: false })
    return (custs.docs as any[]).map((c) => c.email).filter(Boolean)
  }
  let where: any = {}
  if (segment === 'new_30d') where = { createdAt: { greater_than_equal: thirtyAgo } }
  else if (segment === 'with_bonus') where = { bonusBalance: { greater_than: 0 } }
  const custs = await payload.find({ collection: 'customers', where, limit: 5000, depth: 0, pagination: false })
  return (custs.docs as any[]).map((c) => c.email).filter(Boolean)
}

async function sendResend(key: string, from: string, to: string, subject: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}`)
}

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  lockDocuments: false,
  labels: { singular: 'Рассылка', plural: 'Рассылки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'segment', 'status', 'recipientCount', 'sentAt'],
    group: 'Маркетинг',
    description: 'Письма по почте зарегистрированным покупателям',
  },
  access: {
    read: ({ req }) => req.user?.collection === 'users',
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    { name: 'name', label: 'Название (для себя)', type: 'text', required: true },
    {
      name: 'segment',
      label: 'Кому отправить',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'Все зарегистрированные', value: 'all' },
        { label: 'Новые за 30 дней', value: 'new_30d' },
        { label: 'С бонусами на счету', value: 'with_bonus' },
        { label: 'Кто покупал', value: 'with_orders' },
      ],
    },
    { name: 'subject', label: 'Тема письма', type: 'text', required: true },
    { name: 'body', label: 'Текст письма', type: 'textarea', required: true },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: '▶ Отправить сейчас', value: 'send' },
        { label: 'Отправлено', value: 'sent' },
        { label: 'Не отправлено / ошибка', value: 'error' },
      ],
      admin: { description: 'Поставьте «Отправить сейчас» и сохраните' },
    },
    {
      type: 'row',
      fields: [
        { name: 'recipientCount', label: 'Получателей', type: 'number', admin: { readOnly: true } },
        { name: 'sentAt', label: 'Отправлено', type: 'date', admin: { readOnly: true } },
      ],
    },
    { name: 'log', label: 'Журнал', type: 'textarea', admin: { readOnly: true } },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc.status !== 'send') return
        const payload = req.payload
        let status = 'sent'
        let log = ''
        let count = 0
        try {
          const emails = await resolveEmails(payload, doc.segment)
          count = emails.length
          const key = process.env.RESEND_API_KEY
          const from = process.env.MAIL_FROM || 'Faith over Fear <noreply@faithof.ru>'
          if (!key) {
            status = 'error'
            log = `Email-сервис не подключён (нет ключа RESEND_API_KEY). В сегменте получателей: ${count}. Письмо НЕ отправлено — добавьте ключ почты и повторите.`
          } else if (!count) {
            status = 'error'
            log = 'В выбранном сегменте нет получателей с email.'
          } else {
            let sent = 0
            for (const to of emails) {
              try {
                await sendResend(key, from, to, doc.subject, doc.body)
                sent++
              } catch {
                /* пропускаем неудачные адреса */
              }
            }
            log = `Отправлено писем: ${sent} из ${count}.`
          }
        } catch (e) {
          status = 'error'
          log = `Ошибка: ${String(e)}`
        }
        await payload.update({
          collection: 'campaigns',
          id: doc.id,
          data: { status, recipientCount: count, sentAt: new Date().toISOString(), log },
          overrideAccess: true,
        })
      },
    ],
  },
}
