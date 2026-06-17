import type { CollectionConfig } from 'payload'

export const Promocodes: CollectionConfig = {
  slug: 'promocodes',
  lockDocuments: false,
  labels: {
    singular: 'Промокод',
    plural: 'Промокоды',
  },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'discountType', 'discountValue', 'active', 'usedCount'],
    group: 'Маркетинг',
  },
  access: {
    // Список промокодов (включая персональные и привязку к клиентам) виден
    // только администратору. Проверка кода на витрине идёт через серверный
    // роут validate-promo, поэтому покупателям прямой доступ не нужен.
    read: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'code',
          label: 'Код',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'Напр.: SVET10 (вводит покупатель в корзине)' },
        },
        {
          name: 'active',
          label: 'Активен',
          type: 'checkbox',
          defaultValue: true,
          admin: { components: { Cell: '/components/admin/YesNoCell#default' } },
        },
      ],
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'discountType',
          label: 'Тип',
          type: 'select',
          required: true,
          defaultValue: 'percent',
          options: [
            { label: 'Процент (%)', value: 'percent' },
            { label: 'Фиксированная скидка (₽)', value: 'fixed' },
            { label: 'Подарок', value: 'gift' },
            { label: 'Бесплатная доставка', value: 'freeShipping' },
          ],
        },
        {
          name: 'discountValue',
          label: 'Размер скидки',
          type: 'number',
          min: 0,
          admin: {
            description: 'Для процента — например 10; для фикс. — например 500',
            condition: (data) => data.discountType === 'percent' || data.discountType === 'fixed',
          },
        },
      ],
    },
    {
      name: 'giftDescription',
      label: 'Что за подарок',
      type: 'text',
      admin: {
        description: 'Напр.: бесплатный стикерпак к заказу',
        condition: (data) => data.discountType === 'gift',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'scope',
          label: 'Кому',
          type: 'select',
          defaultValue: 'all',
          options: [
            { label: 'Всем', value: 'all' },
            { label: 'Конкретному клиенту', value: 'individual' },
            { label: 'Компании / группе', value: 'company' },
          ],
        },
        {
          name: 'companyName',
          label: 'Компания / группа',
          type: 'text',
          admin: { condition: (data) => data.scope === 'company' },
        },
      ],
    },
    {
      name: 'assignedCustomer',
      label: 'Клиент',
      type: 'relationship',
      relationTo: 'customers',
      admin: {
        description: 'Промокод сработает только у этого клиента',
        condition: (data) => data.scope === 'individual',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minOrder',
          label: 'Мин. сумма заказа, ₽',
          type: 'number',
          min: 0,
          admin: { description: 'Код сработает от этой суммы (0 — без условия)' },
        },
        {
          name: 'usageLimit',
          label: 'Лимит использований',
          type: 'number',
          min: 0,
          admin: { description: '0 — без ограничения' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'usedCount',
          label: 'Использован раз',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true },
        },
        {
          name: 'validUntil',
          label: 'Действует до',
          type: 'date',
          admin: {
            description: 'Необязательно',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
          },
        },
      ],
    },
  ],
}
