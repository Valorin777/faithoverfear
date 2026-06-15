import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Статья',
    plural: 'Блог',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published', 'createdAt'],
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL (slug)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Адрес статьи латиницей',
      },
    },
    {
      name: 'excerpt',
      label: 'Краткое описание',
      type: 'textarea',
      admin: {
        description: 'Короткий анонс для списка статей',
      },
    },
    {
      name: 'image',
      label: 'Обложка',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Текст статьи',
      type: 'richText',
    },
    {
      name: 'published',
      label: 'Опубликована',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
