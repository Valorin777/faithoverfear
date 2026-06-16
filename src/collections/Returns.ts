import type { CollectionConfig } from 'payload'

export const Returns: CollectionConfig = {
  slug: 'returns',
  labels: {
    singular: 'Возврат',
    plural: 'Возвраты',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'status', 'amount', 'createdAt'],
    group: 'Магазин',
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
