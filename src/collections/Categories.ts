import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Категория',
    plural: 'Категории',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
    group: 'Магазин',
  },
  // Категории видны всем (нужны для витрины); править — только администраторам (доступ по умолчанию).
  access: {
    read: () => true,
  },
  // Сортировка по умолчанию — по полю «Порядок» (и в админке, и в выдаче API).
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Название (рус)',
          type: 'text',
          required: true,
        },
        {
          name: 'nameEn',
          label: 'Name (English)',
          type: 'text',
          admin: { description: 'Если пусто — на английской версии покажется русское.' },
        },
      ],
    },
    {
      name: 'slug',
      label: 'URL (slug)',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Адрес раздела латиницей. Напр.: tshirts. Меняется в ссылках — без пробелов и кириллицы.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'order',
          label: 'Порядок',
          type: 'number',
          defaultValue: 0,
          admin: { description: 'Чем меньше число — тем раньше в меню и на главной. Так меняется порядок категорий.' },
        },
        {
          name: 'icon',
          label: 'Иконка (для главной)',
          type: 'select',
          defaultValue: 'tag',
          options: [
            { label: 'Футболка', value: 'tshirt' },
            { label: 'Поло', value: 'polo' },
            { label: 'Свитшот / Худи', value: 'sweatshirt' },
            { label: 'Свитер', value: 'sweater' },
            { label: 'Подарочный набор', value: 'gift' },
            { label: 'Аксессуар', value: 'accessory' },
            { label: 'Универсальная (бирка)', value: 'tag' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          label: 'Подпись (рус)',
          type: 'text',
          admin: { description: 'Короткая подпись под категорией на главной. Напр.: С принтами и цитатами' },
        },
        {
          name: 'descriptionEn',
          label: 'Caption (English)',
          type: 'text',
        },
      ],
    },
  ],
}
