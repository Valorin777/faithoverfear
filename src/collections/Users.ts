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
    // Время жизни сессии — 2 часа
    tokenExpiration: 2 * 60 * 60,
    // Кука сессии недоступна из JavaScript и работает только по HTTPS
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
    // Создать аккаунт можно только если ни одного ещё нет (первичная настройка).
    // После создания единственного администратора регистрация новых закрыта.
    create: async ({ req }) => {
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    // Запрещаем удалять администратора, чтобы не потерять доступ к панели.
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
    },
  ],
}
