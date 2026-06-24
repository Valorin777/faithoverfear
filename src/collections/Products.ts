import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  lockDocuments: false,
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
      label: 'Название (рус)',
      type: 'text',
      required: true,
    },
    {
      name: 'nameEn',
      label: 'Name (English)',
      type: 'text',
      admin: {
        description: 'Английское название. Если пусто — на английской версии сайта покажется русское.',
      },
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
      label: 'Описание (рус)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'descriptionEn',
      label: 'Description (English)',
      type: 'textarea',
      admin: {
        description: 'Английское описание. Если пусто — покажется русское.',
      },
    },
    {
      name: 'spiritualMeaning',
      label: 'Духовный смысл (рус)',
      type: 'textarea',
      admin: {
        description: 'Цитата из Писания или пояснение смысла принта',
      },
    },
    {
      name: 'spiritualMeaningEn',
      label: 'Spiritual meaning (English)',
      type: 'textarea',
      admin: {
        description: 'Английская версия. Если пусто — покажется русская.',
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
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { description: 'Выбор из раздела «Категории». Управлять списком — там же.' },
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
      name: 'video',
      label: 'Видео товара',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Опционально: видео товара (MP4/WebM). Покажется первым в галерее.',
      },
    },
    {
      name: 'designs',
      label: 'Варианты дизайна',
      type: 'array',
      labels: { singular: 'Дизайн', plural: 'Дизайны' },
      admin: {
        description: 'Напр.: минималистичный и крупный вариант одного принта. У каждого — свои фото. Если пусто — на странице показываются основные «Фотографии».',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Название дизайна (рус)', type: 'text', required: true, admin: { description: 'Напр.: Минимализм' } },
            { name: 'nameEn', label: 'Name (English)', type: 'text', admin: { description: 'Напр.: Minimal' } },
          ],
        },
        {
          name: 'images',
          label: 'Фото этого дизайна',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          required: true,
          admin: { description: 'Фото именно этого варианта дизайна (первое — главное). Без фото дизайн не сохранить.' },
        },
      ],
    },
    {
      name: 'crossCustomizable',
      label: 'Крест можно изменить (православный / католический)',
      type: 'checkbox',
      admin: {
        description: 'Покажет на странице товара заметную отметку ★: крест можно сделать православным или католическим по желанию клиента.',
        components: { Cell: '/components/admin/YesNoCell#default' },
      },
    },
    {
      name: 'crossNote',
      label: 'Текст отметки про крест (рус)',
      type: 'text',
      admin: {
        description: 'Если пусто — используется текст по умолчанию. Показывается только при включённой галочке выше.',
        condition: (data) => Boolean(data?.crossCustomizable),
      },
    },
    {
      name: 'crossNoteEn',
      label: 'Cross note (English)',
      type: 'text',
      admin: {
        condition: (data) => Boolean(data?.crossCustomizable),
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
              label: 'Цвет (рус)',
              type: 'text',
              required: true,
            },
            {
              name: 'colorEn',
              label: 'Color (English)',
              type: 'text',
              admin: { description: 'Напр.: White' },
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
      name: 'specifications',
      label: 'Характеристики',
      type: 'array',
      labels: { singular: 'Характеристика', plural: 'Характеристики' },
      admin: { description: 'Состав, плотность, уход и т.д. Если пусто — показываются значения по умолчанию.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Параметр (рус)', type: 'text' },
            { name: 'labelEn', label: 'Параметр (англ)', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'value', label: 'Значение (рус)', type: 'text' },
            { name: 'valueEn', label: 'Значение (англ)', type: 'text' },
          ],
        },
      ],
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
