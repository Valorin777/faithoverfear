import type { CollectionConfig } from 'payload'

// Генерация короткого реферального кода (например, FOF7K2QX)
function generateRefCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'FOF'
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export const Customers: CollectionConfig = {
  slug: 'customers',
  lockDocuments: false,
  labels: {
    singular: 'Покупатель',
    plural: 'Покупатели',
  },
  auth: {
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 30 * 24 * 60 * 60, // 30 дней
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'bonusBalance', 'referralCode', 'createdAt'],
    group: 'Аудитория',
  },
  access: {
    // Регистрация открыта всем
    create: () => true,
    // Покупатель видит только себя; администратор — всех
    read: ({ req }) => {
      const u = req.user
      if (!u) return false
      if (u.collection === 'users') return true
      return { id: { equals: u.id } }
    },
    update: ({ req }) => {
      const u = req.user
      if (!u) return false
      if (u.collection === 'users') return true
      return { id: { equals: u.id } }
    },
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Имя', type: 'text' },
        { name: 'phone', label: 'Телефон', type: 'text' },
      ],
    },
    {
      name: 'referralCode',
      label: 'Реферальный код',
      type: 'text',
      unique: true,
      index: true,
      // Покупатель не может переписать свой код/баланс через API — только администратор
      // (или сервер с overrideAccess). admin.readOnly — лишь подсказка интерфейса, не защита.
      access: { update: ({ req }) => req.user?.collection === 'users' },
      admin: { readOnly: true, description: 'Генерируется автоматически при регистрации' },
    },
    {
      name: 'referredBy',
      label: 'Приглашён покупателем',
      type: 'relationship',
      relationTo: 'customers',
      access: { update: ({ req }) => req.user?.collection === 'users' },
      admin: { readOnly: true },
    },
    {
      name: 'referralRewarded',
      label: 'Бонус за приглашение начислен',
      type: 'checkbox',
      defaultValue: false,
      access: { update: ({ req }) => req.user?.collection === 'users' },
      admin: {
        readOnly: true,
        description: 'Защита от повторного начисления',
        components: { Cell: '/components/admin/YesNoCell#default' },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bonusBalance',
          label: 'Бонусный баланс, ₽',
          type: 'number',
          defaultValue: 0,
          access: { update: ({ req }) => req.user?.collection === 'users' },
          admin: { readOnly: true },
        },
        {
          name: 'referralCount',
          label: 'Приглашено друзей',
          type: 'number',
          defaultValue: 0,
          access: { update: ({ req }) => req.user?.collection === 'users' },
          admin: { readOnly: true, description: 'Сколько человек зарегистрировалось по ссылке' },
        },
      ],
    },
    {
      name: 'referralTier',
      label: 'Статус реферала',
      type: 'text',
      virtual: true,
      admin: { readOnly: true, description: 'Старт 10% · Серебро 12% (от 10 друзей) · Золото 15% (от 30 друзей)' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data?.referralCode) {
          data.referralCode = generateRefCode()
        }
        return data
      },
    ],
    // Засчитываем приглашение пригласившему
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create' && doc.referredBy) {
          const refId = typeof doc.referredBy === 'object' ? doc.referredBy.id : doc.referredBy
          try {
            const ref = await req.payload.findByID({ collection: 'customers', id: refId, depth: 0 })
            await req.payload.update({
              collection: 'customers',
              id: refId,
              data: { referralCount: (ref.referralCount || 0) + 1 },
              overrideAccess: true,
            })
          } catch {
            /* пригласивший не найден — пропускаем */
          }
        }
      },
    ],
    // Вычисляем статус по числу приглашённых
    afterRead: [
      ({ doc }) => {
        const c = doc.referralCount || 0
        doc.referralTier = c >= 30 ? 'Золото' : c >= 10 ? 'Серебро' : 'Старт'
        return doc
      },
    ],
  },
}
