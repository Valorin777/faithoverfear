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
          label: 'Надпись над заголовком (рус)',
          type: 'text',
          admin: { description: 'Напр.: Православная одежда · Faith over Fear' },
        },
        {
          name: 'heroEyebrowEn',
          label: 'Eyebrow (English)',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            { name: 'heroTitleLine1', label: 'Заголовок — 1-я строка (рус)', type: 'text' },
            { name: 'heroTitleLine2', label: 'Заголовок — 2-я строка, золотая (рус)', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'heroTitleLine1En', label: 'Title line 1 (English)', type: 'text' },
            { name: 'heroTitleLine2En', label: 'Title line 2, gold (English)', type: 'text' },
          ],
        },
        {
          name: 'heroSubtitle',
          label: 'Подзаголовок (рус)',
          type: 'textarea',
        },
        {
          name: 'heroSubtitleEn',
          label: 'Subtitle (English)',
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
