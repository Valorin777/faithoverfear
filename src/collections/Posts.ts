import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  lockDocuments: false,
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
      label: 'Заголовок (рус)',
      type: 'text',
      required: true,
    },
    {
      name: 'titleEn',
      label: 'Title (English)',
      type: 'text',
      admin: { description: 'Если пусто — покажется русский заголовок.' },
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
      label: 'Краткое описание (рус)',
      type: 'textarea',
      admin: {
        description: 'Короткий анонс для списка статей',
      },
    },
    {
      name: 'excerptEn',
      label: 'Excerpt (English)',
      type: 'textarea',
      admin: { description: 'Если пусто — покажется русский анонс.' },
    },
    {
      name: 'image',
      label: 'Обложка',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'video',
      label: 'Видео',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Опционально: видео в начале статьи (MP4/WebM).' },
    },
    {
      name: 'content',
      label: 'Текст статьи (рус)',
      type: 'richText',
    },
    {
      name: 'contentEn',
      label: 'Article text (English)',
      type: 'richText',
    },
    {
      name: 'published',
      label: 'Опубликована',
      type: 'checkbox',
      defaultValue: true,
      admin: { components: { Cell: '/components/admin/YesNoCell#default' } },
    },
  ],
}
