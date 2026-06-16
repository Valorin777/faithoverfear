import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
  admin: { group: 'Система' },
  access: { read: () => true },
  fields: [
    {
      label: 'Главный баннер',
      type: 'collapsible',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'heroEyebrow',
          label: 'Надпись над заголовком',
          type: 'text',
          admin: { description: 'Напр.: Православная одежда · Faith over Fear' },
        },
        {
          type: 'row',
          fields: [
            { name: 'heroTitleLine1', label: 'Заголовок — 1-я строка', type: 'text' },
            { name: 'heroTitleLine2', label: 'Заголовок — 2-я строка (золотая)', type: 'text' },
          ],
        },
        {
          name: 'heroSubtitle',
          label: 'Подзаголовок',
          type: 'textarea',
        },
      ],
    },
    {
      label: 'Общие',
      type: 'collapsible',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'freeDeliveryFrom',
          label: 'Бесплатная доставка от, ₽',
          type: 'number',
          admin: { description: 'Показывается в промо-полосе и корзине' },
        },
        {
          name: 'telegramUrl',
          label: 'Ссылка на Telegram-канал',
          type: 'text',
        },
      ],
    },
  ],
}
