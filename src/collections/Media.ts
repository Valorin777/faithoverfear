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
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'full', width: 1200, height: 1600, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Описание (alt)',
      type: 'text',
    },
  ],
}
