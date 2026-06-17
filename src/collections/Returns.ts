import type { CollectionConfig } from 'payload'

export const Returns: CollectionConfig = {
  slug: 'returns',
  lockDocuments: false,
  labels: {
    singular: 'Возврат',
    plural: 'Возвраты',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'status', 'amount', 'createdAt'],
    group: 'Магазин',
  },
  access: {
    // Возвраты заводит и видит только администратор (формы возврата на витрине нет).
    // Без этого блока Payload по умолчанию открывал доступ любому вошедшему — включая покупателей.
    read: ({ req }) => req.user?.collection === 'users',
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'orderNumber',
          label: 'Номер заказа',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'requested',
          options: [
            { label: 'Запрошен', value: 'requested' },
            { label: 'Одобрен', value: 'approved' },
            { label: 'Отклонён', value: 'rejected' },
            { label: 'Возвращены деньги', value: 'refunded' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'customerName',
          label: 'Покупатель',
          type: 'text',
        },
        {
          name: 'customerContact',
          label: 'Контакт (телефон / email)',
          type: 'text',
        },
      ],
    },
    {
      name: 'reason',
      label: 'Причина возврата',
      type: 'textarea',
    },
    {
      name: 'amount',
      label: 'Сумма к возврату, ₽',
      type: 'number',
      min: 0,
    },
    {
      name: 'comment',
      label: 'Комментарий (внутренний)',
      type: 'textarea',
    },
  ],
}
