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
      admin: { readOnly: true, description: 'Генерируется автоматически при регистрации' },
    },
    {
      name: 'referredBy',
      label: 'Приглашён покупателем',
      type: 'relationship',
      relationTo: 'customers',
      admin: { readOnly: true },
    },
    {
      name: 'referralRewarded',
      label: 'Бонус за приглашение начислен',
      type: 'checkbox',
      defaultValue: false,
      admin: { readOnly: true, description: 'Защита от повторного начисления' },
    },
    {
      name: 'bonusBalance',
      label: 'Бонусный баланс, ₽',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
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
  },
}
