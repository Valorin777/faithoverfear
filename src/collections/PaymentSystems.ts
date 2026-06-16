import type { CollectionConfig } from 'payload'

/**
 * Платёжные системы магазина. Владелец включает/добавляет их и вписывает
 * секретные ключи прямо в админке. Ключи доступны только администраторам
 * (на витрину и в публичный API не попадают).
 */
export const PaymentSystems: CollectionConfig = {
  slug: 'payment-systems',
  lockDocuments: false,
  labels: { singular: 'Платёжная система', plural: 'Платёжные системы' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'enabled', 'order'],
    group: 'Магазин',
    description: 'Способы оплаты на сайте. Порядок — по полю «Порядок».',
  },
  access: {
    // Только администраторы — чтобы ключи не утекли через публичный API
    read: ({ req }) => req.user?.collection === 'users',
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Название (рус)', type: 'text', required: true },
        { name: 'nameEn', label: 'Название (англ)', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'code',
          label: 'Код системы',
          type: 'select',
          required: true,
          options: [
            { label: 'ЮKassa', value: 'yukassa' },
            { label: 'СБП', value: 'sbp' },
            { label: 'Тинькофф Pay', value: 'tinkoff' },
            { label: 'СберПей', value: 'sber' },
            { label: 'Криптовалюта', value: 'crypto' },
            { label: 'Банковская карта', value: 'card' },
            { label: 'Другое', value: 'other' },
          ],
        },
        { name: 'order', label: 'Порядок', type: 'number', defaultValue: 0, admin: { description: 'Меньше — выше в списке' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'enabled', label: 'Включена на сайте', type: 'checkbox', defaultValue: true },
        { name: 'hint', label: 'Подсказка (рус)', type: 'text', admin: { description: 'Напр.: Карты · SberPay · рассрочка' } },
      ],
    },
    { name: 'hintEn', label: 'Подсказка (англ)', type: 'text' },
    {
      label: 'Ключи и доступы (секретно)',
      type: 'collapsible',
      admin: { initCollapsed: true, description: 'Хранятся в базе, на сайте не показываются' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'shopId', label: 'Shop ID / идентификатор', type: 'text' },
            { name: 'apiKey', label: 'API-ключ', type: 'text' },
          ],
        },
        { name: 'secretKey', label: 'Секретный ключ', type: 'text' },
        { name: 'webhookSecret', label: 'Webhook-секрет', type: 'text' },
        { name: 'walletAddress', label: 'Крипто-кошелёк (для криптооплаты)', type: 'text' },
        { name: 'extra', label: 'Доп. параметры (заметки)', type: 'textarea' },
      ],
    },
  ],
}
