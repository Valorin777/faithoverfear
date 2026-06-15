import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Изображение',
    plural: 'Медиа',
  },
  admin: {
    group: 'Контент',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Описание (alt)',
      type: 'text',
    },
  ],
}
