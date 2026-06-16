import type { CollectionConfig } from 'payload'

/**
 * Способы оплаты на сайте. 6 систем уже созданы (ЮKassa, СБП, Тинькофф,
 * СберПей, крипта, карта) — владельцу обычно нужно просто открыть нужную,
 * включить её и вписать ключи из личного кабинета платёжной системы.
 * Ключи видны только администраторам (на витрину и в публичный API не уходят).
 */
export const PaymentSystems: CollectionConfig = {
  slug: 'payment-systems',
  lockDocuments: false,
  labels: { singular: 'Способ оплаты', plural: 'Способы оплаты' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'enabled', 'order'],
    group: 'Магазин',
    description:
      'Способы оплаты, которые видит покупатель. Основные системы уже добавлены — откройте нужную, включите её переключателем и впишите ключи из личного кабинета платёжной системы. Порядок в списке задаёт поле «Порядок».',
  },
  access: {
    // Только администраторы — чтобы ключи не утекли через публичный API
    read: ({ req }) => req.user?.collection === 'users',
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Название (рус)', type: 'text', required: true, admin: { description: 'Как называется кнопка оплаты для покупателя. Напр.: ЮKassa' } },
        { name: 'nameEn', label: 'Название (англ)', type: 'text', admin: { description: 'Для английской версии сайта' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'code',
          label: 'Тип системы',
          type: 'select',
          required: true,
          admin: { description: 'Выберите провайдера — от этого зависит, какие ключи нужны ниже' },
          options: [
            { label: 'ЮKassa', value: 'yukassa' },
            { label: 'СБП (Система быстрых платежей)', value: 'sbp' },
            { label: 'Тинькофф Pay', value: 'tinkoff' },
            { label: 'СберПей', value: 'sber' },
            { label: 'Криптовалюта', value: 'crypto' },
            { label: 'Банковская карта', value: 'card' },
            { label: 'Другое', value: 'other' },
          ],
        },
        { name: 'order', label: 'Порядок', type: 'number', defaultValue: 0, admin: { description: 'Меньше число — выше в списке оплаты' } },
      ],
    },
    {
      name: 'enabled',
      label: 'Показывать на сайте',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Выключенные способы не видны покупателям при оформлении заказа',
        components: { Cell: '/components/admin/YesNoCell#default' },
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'hint', label: 'Подсказка под кнопкой (рус)', type: 'text', admin: { description: 'Необязательно. Напр.: Карты · SberPay · рассрочка' } },
        { name: 'hintEn', label: 'Подсказка (англ)', type: 'text' },
      ],
    },
    {
      label: '🔑 Ключи и доступы (видны только вам)',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Скопируйте из личного кабинета платёжной системы. Заполняйте только те поля, что нужны выбранному типу — остальные оставьте пустыми. Эти данные нигде на сайте не показываются.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'shopId', label: 'Shop ID / идентификатор магазина', type: 'text', admin: { description: 'ЮKassa, Тинькофф, Сбер: идентификатор магазина (shopId / TerminalKey)' } },
            { name: 'apiKey', label: 'API-ключ', type: 'text', admin: { description: 'Публичный ключ интеграции, если он есть у системы' } },
          ],
        },
        { name: 'secretKey', label: 'Секретный ключ', type: 'text', admin: { description: 'ЮKassa: «Секретный ключ». Тинькофф: «Пароль». Главный ключ для приёма платежей' } },
        { name: 'webhookSecret', label: 'Секрет вебхука / уведомлений', type: 'text', admin: { description: 'Если система присылает уведомления об оплате — ключ их проверки' } },
        { name: 'walletAddress', label: 'Адрес крипто-кошелька', type: 'text', admin: { description: 'Только для типа «Криптовалюта» — кошелёк для приёма USDT/BTC/ETH' } },
        { name: 'extra', label: 'Заметки / доп. параметры', type: 'textarea', admin: { description: 'Любые дополнительные данные или комментарии для себя' } },
      ],
    },
  ],
}
