import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Заказ',
    plural: 'Заказы',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'total', 'status', 'createdAt'],
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
          admin: { readOnly: true },
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Ожидает оплаты', value: 'pending' },
            { label: 'Оплачен', value: 'paid' },
            { label: 'В сборке', value: 'processing' },
            { label: 'Отправлен', value: 'shipped' },
            { label: 'Доставлен', value: 'delivered' },
            { label: 'Отменён', value: 'cancelled' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Покупатель',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'customerName', label: 'Имя', type: 'text' },
            { name: 'customerPhone', label: 'Телефон', type: 'text' },
          ],
        },
        { name: 'customerEmail', label: 'Email', type: 'email' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Доставка',
      fields: [
        {
          name: 'deliveryMethod',
          label: 'Способ доставки',
          type: 'select',
          options: [
            { label: 'СДЭК', value: 'cdek' },
            { label: 'Boxberry', value: 'boxberry' },
            { label: 'Почта России', value: 'russianpost' },
            { label: 'Самовывоз', value: 'pickup' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'city', label: 'Город', type: 'text' },
            { name: 'address', label: 'Адрес / пункт выдачи', type: 'text' },
          ],
        },
        { name: 'trackingNumber', label: 'Трек-номер', type: 'text' },
      ],
    },
    {
      name: 'paymentMethod',
      label: 'Способ оплаты',
      type: 'select',
      options: [
        { label: 'ЮKassa', value: 'yukassa' },
        { label: 'СБП', value: 'sbp' },
        { label: 'Тинькофф Pay', value: 'tinkoff' },
        { label: 'СберПей', value: 'sber' },
        { label: 'Криптовалюта', value: 'crypto' },
      ],
    },
    {
      name: 'items',
      label: 'Состав заказа',
      type: 'json',
      admin: {
        description: 'Товары, размеры, количество (заполняется автоматически при оформлении)',
      },
    },
    {
      name: 'total',
      label: 'Сумма заказа, ₽',
      type: 'number',
    },
    {
      name: 'comment',
      label: 'Комментарий покупателя',
      type: 'textarea',
    },
  ],
}
