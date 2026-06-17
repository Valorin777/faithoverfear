import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  lockDocuments: false,
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
    // Список администраторов и их данные (email, и т.п.) видны только администраторам.
    read: ({ req }) => req.user?.collection === 'users',
    // Добавлять администраторов может только уже вошедший администратор.
    // Публичная самостоятельная регистрация закрыта.
    // Исключение — самый первый аккаунт при первичной настройке (когда их ещё нет).
    create: async ({ req }) => {
      if (req.user?.collection === 'users') return true
      if (req.user) return false // вошедший покупатель не может заводить администраторов
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    // Редактировать (в т.ч. сменить email/пароль) и удалять администраторов
    // может только администратор — иначе вошедший покупатель смог бы захватить аккаунт.
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
    },
  ],
}
