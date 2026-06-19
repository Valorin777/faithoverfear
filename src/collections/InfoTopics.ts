import type { CollectionConfig } from 'payload'

/**
 * Разделы страницы «Информация» (Библейские цитаты, Популярные вопросы,
 * Традиции, Символы, Праздники, Заповеди). Полностью редактируется владельцем.
 * Если коллекция пуста — витрина показывает встроенный текст (src/data/infoSections.ts).
 */
export const InfoTopics: CollectionConfig = {
  slug: 'info-topics',
  labels: { singular: 'Раздел «Информация»', plural: 'Информация (разделы)' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'slug'],
    group: 'Контент',
    description: 'Текст на странице «Информация». Каждый раздел — отдельная запись.',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', label: 'Название раздела', type: 'text', required: true, admin: { description: 'Напр.: Библейские цитаты' } },
        { name: 'order', label: 'Порядок', type: 'number', defaultValue: 0, admin: { description: 'Меньше число — выше в списке' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'slug', label: 'Ключ (slug)', type: 'text', admin: { description: 'Латиницей, напр.: bible-quotes' } },
        { name: 'intro', label: 'Подзаголовок', type: 'text' },
      ],
    },
    {
      name: 'blocks',
      label: 'Содержимое',
      type: 'array',
      labels: { singular: 'Блок', plural: 'Блоки' },
      admin: { description: 'Соберите текст из блоков: заголовок раздела, подзаголовок, вопрос или абзац.' },
      fields: [
        {
          name: 'type',
          label: 'Тип блока',
          type: 'select',
          defaultValue: 'text',
          options: [
            { label: 'Заголовок раздела', value: 'head' },
            { label: 'Подзаголовок (выделенный)', value: 'sub' },
            { label: 'Вопрос', value: 'q' },
            { label: 'Обычный абзац', value: 'text' },
          ],
        },
        { name: 'text', label: 'Текст', type: 'textarea', required: true },
      ],
    },
  ],
}
