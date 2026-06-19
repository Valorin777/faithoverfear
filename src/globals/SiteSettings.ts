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
          admin: { description: 'Напр.: Христианская одежда · Faith over Fear' },
        },
        { name: 'heroEyebrowEn', label: 'Eyebrow (English)', type: 'text' },
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
        { name: 'heroSubtitle', label: 'Подзаголовок (рус)', type: 'textarea' },
        { name: 'heroSubtitleEn', label: 'Subtitle (English)', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'heroImage', label: 'Фоновое фото (опц.)', type: 'upload', relationTo: 'media' },
            {
              name: 'heroVideo',
              label: 'Фоновое видео (опц.)',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Если задано — играет фоном без звука. MP4/WebM.' },
            },
          ],
        },
      ],
    },
    {
      label: 'Промо-полоса и доставка',
      type: 'collapsible',
      admin: { initCollapsed: true },
      fields: [
        { name: 'promoBarText', label: 'Текст промо-полосы (рус)', type: 'text', admin: { description: 'Напр.: Бесплатная доставка · Христианская одежда · faithof.ru' } },
        { name: 'promoBarTextEn', label: 'Promo bar text (English)', type: 'text' },
        {
          name: 'freeDeliveryFrom',
          label: 'Бесплатная доставка от, ₽',
          type: 'number',
          defaultValue: 3500,
          admin: { description: 'Показывается в промо-полосе, корзине и оформлении' },
        },
      ],
    },
    {
      label: 'Контакты',
      type: 'collapsible',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'contactEmail', label: 'Email', type: 'email' },
            { name: 'contactPhone', label: 'Телефон', type: 'text' },
          ],
        },
        { name: 'contactWebsite', label: 'Адрес сайта', type: 'text', admin: { description: 'Напр.: faithof.ru' } },
        {
          type: 'row',
          fields: [
            { name: 'workingHours', label: 'Режим работы (рус)', type: 'text', admin: { description: 'Напр.: Пн–Пт, 10:00–18:00 МСК' } },
            { name: 'workingHoursEn', label: 'Working hours (English)', type: 'text' },
          ],
        },
      ],
    },
    {
      label: 'Социальные сети',
      type: 'collapsible',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'socials',
          label: 'Соцсети',
          type: 'array',
          labels: { singular: 'Соцсеть', plural: 'Соцсети' },
          admin: { description: 'Показываются в футере и на странице контактов' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'platform',
                  label: 'Платформа',
                  type: 'select',
                  options: [
                    { label: 'Telegram', value: 'telegram' },
                    { label: 'ВКонтакте', value: 'vk' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'Rutube', value: 'rutube' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Threads', value: 'threads' },
                    { label: 'Дзен (Яндекс)', value: 'dzen' },
                    { label: 'MAX', value: 'max' },
                  ],
                },
                { name: 'url', label: 'Ссылка', type: 'text' },
              ],
            },
          ],
        },
        { name: 'telegramUrl', label: 'Ссылка на Telegram-канал', type: 'text' },
        { name: 'telegramPitch', label: 'Призыв к Telegram (рус)', type: 'text', admin: { description: 'Напр.: Новинки, акции и вдохновляющие цитаты' } },
        { name: 'telegramPitchEn', label: 'Telegram pitch (English)', type: 'text' },
      ],
    },
    {
      label: 'Страница «О проекте»',
      type: 'collapsible',
      admin: { initCollapsed: true, description: 'Текст страницы «О проекте». Пустые поля — показываются значения по умолчанию.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'aboutQuote', label: 'Цитата (рус)', type: 'text', admin: { description: 'Напр.: «Не бойся, только веруй»' } },
            { name: 'aboutQuoteEn', label: 'Quote (English)', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'aboutQuoteSource', label: 'Источник цитаты (рус)', type: 'text', admin: { description: 'Напр.: Евангелие от Марка, 5:36' } },
            { name: 'aboutQuoteSourceEn', label: 'Quote source (English)', type: 'text' },
          ],
        },
        {
          name: 'aboutSections',
          label: 'Разделы текста',
          type: 'array',
          labels: { singular: 'Раздел', plural: 'Разделы' },
          admin: { description: 'Блоки: «Откуда мы», «Наша миссия» и т.д.' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', label: 'Заголовок (рус)', type: 'text' },
                { name: 'titleEn', label: 'Title (English)', type: 'text' },
              ],
            },
            { name: 'text', label: 'Текст (рус)', type: 'textarea' },
            { name: 'textEn', label: 'Text (English)', type: 'textarea' },
          ],
        },
        {
          name: 'aboutValues',
          label: 'Принципы',
          type: 'array',
          labels: { singular: 'Принцип', plural: 'Принципы' },
          admin: { description: 'Карточки «Что нами движет» (показываются три)' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', label: 'Название (рус)', type: 'text' },
                { name: 'titleEn', label: 'Title (English)', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'desc', label: 'Описание (рус)', type: 'text' },
                { name: 'descEn', label: 'Description (English)', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Способы доставки',
      type: 'collapsible',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'deliveryMethods',
          label: 'Способы доставки',
          type: 'array',
          labels: { singular: 'Способ', plural: 'Способы' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', label: 'Название (рус)', type: 'text' },
                { name: 'nameEn', label: 'Название (англ)', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'price', label: 'Цена (рус)', type: 'text', admin: { description: 'Напр.: от 290 ₽' } },
                { name: 'priceEn', label: 'Цена (англ)', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'time', label: 'Сроки (рус)', type: 'text', admin: { description: 'Напр.: 2–5 рабочих дней' } },
                { name: 'timeEn', label: 'Сроки (англ)', type: 'text' },
              ],
            },
            { name: 'description', label: 'Описание (рус)', type: 'textarea' },
            { name: 'descriptionEn', label: 'Описание (англ)', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
