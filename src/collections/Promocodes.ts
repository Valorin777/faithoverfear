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
    read: () => true,
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
          label: 'Тип скидки',
          type: 'select',
          required: true,
          defaultValue: 'percent',
          options: [
            { label: 'Процент (%)', value: 'percent' },
            { label: 'Фиксированная (₽)', value: 'fixed' },
          ],
        },
        {
          name: 'discountValue',
          label: 'Размер скидки',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'Для процента — например 10; для фикс. — например 500' },
        },
      ],
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
