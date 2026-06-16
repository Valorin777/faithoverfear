import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
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
    // Разрешены изображения и видео
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Описание (alt)',
      type: 'text',
    },
  ],
}
