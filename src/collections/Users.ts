import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Администратор',
    plural: 'Администраторы',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Система',
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
    },
  ],
}
