import type { CollectionConfig } from 'payload'

/**
 * Чат поддержки (основа): обращения с сайта попадают сюда, админ отвечает.
 * Создавать может любой (форма на сайте), читать — только администратор.
 */
export const SupportMessages: CollectionConfig = {
  slug: 'support-messages',
  lockDocuments: false,
  labels: { singular: 'Обращение', plural: 'Поддержка' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Аудитория',
    description: 'Сообщения от покупателей с сайта',
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
        { name: 'name', label: 'Имя', type: 'text' },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'Новое', value: 'new' },
            { label: 'В работе', value: 'in_progress' },
            { label: 'Отвечено', value: 'answered' },
            { label: 'Закрыто', value: 'closed' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Телефон', type: 'text' },
      ],
    },
    { name: 'subject', label: 'Тема', type: 'text' },
    { name: 'message', label: 'Сообщение', type: 'textarea', required: true },
    {
      name: 'adminReply',
      label: 'Ответ администратора',
      type: 'textarea',
      admin: { description: 'Заметка/ответ. Отправка ответа — через email/телефон клиента.' },
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
