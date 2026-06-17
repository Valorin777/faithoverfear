import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Статусы, означающие подтверждённую оплату/исполнение заказа
const PAID_STATUSES = ['paid', 'processing', 'shipped', 'delivered']

/**
 * Когда заказ ВПЕРВЫЕ переходит в оплаченный статус:
 *  1) списываем остатки со склада по позициям заказа;
 *  2) начисляем реферальный бонус пригласившему (один раз — защита referralRewarded).
 * На неоплаченных и отменённых заказах ничего не происходит, поэтому за брошенные
 * корзины и отмены комиссия не платится, а склад не уменьшается зря.
 */
const orderPaidEffects: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const d = doc as any
  const pd = previousDoc as any
  const becamePaid = PAID_STATUSES.includes(d.status) && !(pd && PAID_STATUSES.includes(pd.status))
  if (!becamePaid) return

  const payload = req.payload

  // 1. Списание остатков со склада по факту оплаты
  const goods: any[] = Array.isArray(d.items?.goods) ? d.items.goods : []
  for (const g of goods) {
    try {
      const found = await payload.find({ collection: 'products', where: { slug: { equals: g.slug } }, limit: 1, depth: 0 })
      const product = found.docs[0] as any
      if (!product || !Array.isArray(product.variants)) continue
      let changed = false
      const variants = product.variants.map((v: any) => {
        if (v.size === g.size && v.color === g.color) {
          changed = true
          return { ...v, stock: Math.max(0, (Number(v.stock) || 0) - (Number(g.quantity) || 1)) }
        }
        return v
      })
      if (changed) {
        await payload.update({ collection: 'products', id: product.id, data: { variants }, overrideAccess: true, overrideLock: true })
      }
    } catch (e) {
      console.error('Stock decrement error:', e)
    }
  }

  // 2. Реферальный бонус пригласившему — один раз, только с оплаченного заказа от 3000 ₽
  try {
    const custId = typeof d.customer === 'object' && d.customer ? d.customer.id : d.customer
    if (!custId) return
    const buyer = (await payload.findByID({ collection: 'customers', id: custId, depth: 0 })) as any
    const goodsTotal = Number(d.items?.goodsTotal) || 0
    if (buyer && buyer.referredBy && !buyer.referralRewarded && goodsTotal >= 3000) {
      const referrerId = typeof buyer.referredBy === 'object' ? buyer.referredBy.id : buyer.referredBy
      const referrer = (await payload.findByID({ collection: 'customers', id: referrerId, depth: 0 })) as any
      if (referrer) {
        // Процент по статусу пригласившего: Золото (30+) — 15%, Серебро (10+) — 12%, иначе 10%
        const refCount = Number(referrer.referralCount) || 0
        const pct = refCount >= 30 ? 0.15 : refCount >= 10 ? 0.12 : 0.1
        const bonus = Math.round(goodsTotal * pct)
        await payload.update({ collection: 'customers', id: referrerId, data: { bonusBalance: (Number(referrer.bonusBalance) || 0) + bonus }, overrideAccess: true, overrideLock: true })
        await payload.update({ collection: 'customers', id: custId, data: { referralRewarded: true }, overrideAccess: true, overrideLock: true })
      }
    }
  } catch (e) {
    console.error('Referral bonus error:', e)
  }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  lockDocuments: false,
  labels: {
    singular: 'Заказ',
    plural: 'Заказы',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'customerPhone', 'paymentMethod', 'total', 'status', 'createdAt'],
    group: 'Магазин',
  },
  access: {
    // Администратор видит все заказы; покупатель — только свои; гость — никакие
    read: ({ req }) => {
      const u = req.user
      if (!u) return false
      if (u.collection === 'users') return true
      if (u.collection === 'customers') return { customer: { equals: u.id } }
      return false
    },
    // Заказы создаёт сервер при оформлении (роут place-order с overrideAccess),
    // поэтому здесь create/update/delete закрыты для всех, кроме администратора —
    // иначе вошедший покупатель мог бы через API изменить чужой заказ или статус оплаты.
    create: ({ req }) => req.user?.collection === 'users',
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'orderNumber',
          label: 'Номер заказа',
          type: 'text',
          admin: { readOnly: true },
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Ожидает оплаты', value: 'pending' },
            { label: 'Оплачен', value: 'paid' },
            { label: 'В сборке', value: 'processing' },
            { label: 'Отправлен', value: 'shipped' },
            { label: 'Доставлен', value: 'delivered' },
            { label: 'Отменён', value: 'cancelled' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Покупатель',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'customerName', label: 'Имя', type: 'text' },
            { name: 'customerPhone', label: 'Телефон', type: 'text' },
          ],
        },
        { name: 'customerEmail', label: 'Email', type: 'email' },
        {
          name: 'contactLinks',
          type: 'ui',
          admin: { components: { Field: '/components/admin/OrderContact#default' } },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Доставка',
      fields: [
        {
          name: 'deliveryMethod',
          label: 'Способ доставки',
          type: 'select',
          options: [
            { label: 'СДЭК', value: 'cdek' },
            { label: 'Boxberry', value: 'boxberry' },
            { label: 'Почта России', value: 'russianpost' },
            { label: 'Самовывоз', value: 'pickup' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'city', label: 'Город', type: 'text' },
            { name: 'address', label: 'Адрес / пункт выдачи', type: 'text' },
          ],
        },
        { name: 'trackingNumber', label: 'Трек-номер', type: 'text' },
      ],
    },
    {
      name: 'paymentMethod',
      label: 'Способ оплаты',
      type: 'select',
      options: [
        { label: 'ЮKassa', value: 'yukassa' },
        { label: 'СБП', value: 'sbp' },
        { label: 'Тинькофф Pay', value: 'tinkoff' },
        { label: 'СберПей', value: 'sber' },
        { label: 'Криптовалюта', value: 'crypto' },
        { label: 'Банковская карта', value: 'card' },
      ],
    },
    {
      name: 'customer',
      label: 'Покупатель (аккаунт)',
      type: 'relationship',
      relationTo: 'customers',
      admin: { readOnly: true, description: 'Если заказ оформлен из личного кабинета' },
    },
    {
      name: 'items',
      label: 'Состав заказа',
      type: 'json',
      admin: {
        description: 'Товары, размеры, количество (заполняется автоматически при оформлении)',
      },
    },
    {
      name: 'total',
      label: 'Сумма заказа, ₽',
      type: 'number',
      min: 0,
    },
    {
      name: 'comment',
      label: 'Комментарий покупателя',
      type: 'textarea',
    },
  ],
  hooks: {
    afterChange: [orderPaidEffects],
  },
}
