import type { CollectionConfig } from 'payload'

/**
 * Заявки на индивидуальный дизайн чехла для телефона.
 * Клиент с сайта указывает модель телефона и контакт — админ связывается и делает дизайн.
 * Создавать может любой (форма на сайте), читать/менять — только администратор.
 */
export const CustomRequests: CollectionConfig = {
  slug: 'custom-requests',
  lockDocuments: false,
  labels: { singular: 'Заявка на чехол', plural: 'Чехлы на заказ' },
  admin: {
    useAsTitle: 'phoneModel',
    defaultColumns: ['phoneModel', 'name', 'contact', 'status', 'createdAt'],
    group: 'Аудитория',
    description: 'Заявки на индивидуальный дизайн чехла для телефона',
  },
  access: {
    create: () => true,
    read: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'phoneModel',
          label: 'Модель телефона',
          type: 'text',
          required: true,
          admin: { description: 'Напр.: iPhone 15 Pro, Samsung Galaxy S24' },
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'Новая', value: 'new' },
            { label: 'В работе', value: 'in_progress' },
            { label: 'Готово', value: 'done' },
            { label: 'Отклонена', value: 'cancelled' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Имя', type: 'text' },
        {
          name: 'contact',
          label: 'Контакт для связи',
          type: 'text',
          required: true,
          admin: { description: 'Телефон, email или Telegram' },
        },
      ],
    },
    { name: 'comment', label: 'Пожелания по дизайну', type: 'textarea' },
    {
      name: 'adminNote',
      label: 'Заметка администратора',
      type: 'textarea',
      admin: { description: 'Внутренняя заметка по заявке' },
    },
    {
      name: 'customer',
      label: 'Покупатель (если вошёл)',
      type: 'relationship',
      relationTo: 'customers',
      admin: { readOnly: true },
    },
  ],
}
