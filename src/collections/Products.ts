import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Товар',
    plural: 'Товары',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'isNew', 'isBestseller'],
    group: 'Магазин',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Название',
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
        description: 'Адрес страницы товара, латиницей. Напр.: futbolka-svet-mira',
      },
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'textarea',
      required: true,
    },
    {
      name: 'spiritualMeaning',
      label: 'Духовный смысл',
      type: 'textarea',
      admin: {
        description: 'Цитата из Писания или пояснение смысла принта',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'Цена, ₽',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'salePrice',
          label: 'Цена со скидкой, ₽',
          type: 'number',
          min: 0,
          admin: {
            description: 'Оставьте пустым, если скидки нет',
          },
        },
      ],
    },
    {
      name: 'category',
      label: 'Категория',
      type: 'select',
      required: true,
      options: [
        { label: 'Футболки', value: 'tshirts' },
        { label: 'Поло', value: 'polo' },
        { label: 'Свитшоты / Худи', value: 'sweatshirts' },
        { label: 'Свитеры', value: 'sweaters' },
        { label: 'Подарочные наборы', value: 'gift-sets' },
        { label: 'Аксессуары', value: 'accessories' },
      ],
    },
    {
      name: 'images',
      label: 'Фотографии',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Загрузите фото товара (первое — главное)',
      },
    },
    {
      name: 'variants',
      label: 'Варианты (размер / цвет / остаток)',
      type: 'array',
      labels: {
        singular: 'Вариант',
        plural: 'Варианты',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              label: 'Размер',
              type: 'select',
              required: true,
              options: ['S', 'M', 'L', 'XL', 'XXL'],
            },
            {
              name: 'color',
              label: 'Цвет',
              type: 'text',
              required: true,
            },
            {
              name: 'colorHex',
              label: 'Цвет (HEX)',
              type: 'text',
              admin: { description: 'Напр.: #ffffff' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'stock',
              label: 'Остаток на складе',
              type: 'number',
              required: true,
              defaultValue: 0,
              min: 0,
            },
            {
              name: 'sku',
              label: 'Артикул (SKU)',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      label: 'Теги',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Ключевые слова для поиска и фильтров',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isNew',
          label: 'Новинка',
          type: 'checkbox',
          admin: { components: { Cell: '/components/admin/YesNoCell#default' } },
        },
        {
          name: 'isBestseller',
          label: 'Хит продаж',
          type: 'checkbox',
          admin: { components: { Cell: '/components/admin/YesNoCell#default' } },
        },
      ],
    },
    {
      name: 'wildberriesUrl',
      label: 'Ссылка на Wildberries',
      type: 'text',
      admin: {
        description: 'Необязательно',
      },
    },
  ],
}
