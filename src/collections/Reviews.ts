import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  lockDocuments: false,
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'product', 'published'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          label: 'Автор',
          type: 'text',
          required: true,
          admin: { description: 'Имя автора (одинаково на обоих языках)' },
        },
        {
          name: 'rating',
          label: 'Оценка (1–5)',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
    {
      name: 'text',
      label: 'Текст отзыва (рус)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'textEn',
      label: 'Review text (English)',
      type: 'textarea',
      admin: { description: 'Если пусто — на английской версии покажется русский текст.' },
    },
    {
      name: 'photo',
      label: 'Фото',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'product',
      label: 'Товар',
      type: 'relationship',
      relationTo: 'products',
      admin: {
        description: 'К какому товару относится отзыв (необязательно)',
      },
    },
    {
      name: 'published',
      label: 'Опубликован',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
