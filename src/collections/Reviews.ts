import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
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
      label: 'Текст отзыва',
      type: 'textarea',
      required: true,
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
