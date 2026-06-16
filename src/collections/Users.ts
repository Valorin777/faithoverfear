import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Администратор',
    plural: 'Администраторы',
  },
  auth: {
    // Защита от подбора пароля: после 5 неудачных попыток вход блокируется на 15 минут
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Система',
  },
  access: {
    // Добавлять администраторов могут только уже вошедшие администраторы.
    // Публичная самостоятельная регистрация закрыта.
    // Исключение — самый первый аккаунт при первичной настройке (когда их ещё нет).
    create: async ({ req }) => {
      if (req.user) return true
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    // Удалять администраторов может только вошедший администратор
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
    },
  ],
}
