import { getPayload } from 'payload'
import config from '@payload-config'

const PAID_STATUSES = ['paid', 'processing', 'shipped', 'delivered']

function rub(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽'
}

interface OrderDoc {
  total?: number
  status?: string
  createdAt: string
}

/**
 * Сводка для главной страницы админки.
 * Все цифры — РЕАЛЬНЫЕ, считаются из базы. Никаких выдуманных данных.
 */
export default async function DashboardStats() {
  const payload = await getPayload({ config })

  const [ordersRes, productsRes, reviewsRes] = await Promise.all([
    payload.find({ collection: 'orders', limit: 2000, depth: 0, sort: '-createdAt' }),
    payload.count({ collection: 'products' }),
    payload.count({ collection: 'reviews' }),
  ])

  const orders = ordersRes.docs as unknown as OrderDoc[]
  const ordersCount = ordersRes.totalDocs
  const productsCount = productsRes.totalDocs
  const reviewsCount = reviewsRes.totalDocs

  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)
  const paidRevenue = orders
    .filter((o) => PAID_STATUSES.includes(o.status || ''))
    .reduce((s, o) => s + (o.total || 0), 0)
  const avgCheck = ordersCount ? revenue / ordersCount : 0

  const now = new Date()
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const ordersToday = orders.filter((o) => new Date(o.createdAt) >= startToday).length
  const newCount = orders.filter((o) => (o.status || 'pending') === 'pending').length

  // График выручки по дням за последние 14 дней (реальные данные)
  const days = 14
  const buckets: { label: string; value: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(startToday)
    d.setDate(d.getDate() - i)
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    const sum = orders
      .filter((o) => {
        const t = new Date(o.createdAt)
        return t >= d && t < next
      })
      .reduce((s, o) => s + (o.total || 0), 0)
    buckets.push({ label: `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, '0')}`, value: sum })
  }
  const maxVal = Math.max(1, ...buckets.map((b) => b.value))
  const hasOrders = ordersCount > 0

  const cards = [
    { label: 'Выручка (все заказы)', value: rub(revenue), accent: true },
    { label: 'Оплачено', value: rub(paidRevenue) },
    { label: 'Заказов', value: String(ordersCount), sub: ordersToday ? `+${ordersToday} сегодня` : 'сегодня 0' },
    { label: 'Новых (ждут обработки)', value: String(newCount) },
    { label: 'Средний чек', value: rub(avgCheck) },
    { label: 'Товаров в каталоге', value: String(productsCount) },
    { label: 'Отзывов', value: String(reviewsCount) },
  ]

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--theme-text)' }}>Сводка</h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--theme-elevation-500)' }}>
          реальные данные магазина
        </span>
      </div>

      {/* Карточки метрик */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {cards.map((c) => (
          <div
            key={c.label}
            style={{
              background: 'var(--theme-elevation-50)',
              border: '1px solid var(--theme-elevation-100)',
              borderRadius: 8,
              padding: '1rem 1.1rem',
              borderLeft: c.accent ? '3px solid #c9a84c' : '1px solid var(--theme-elevation-100)',
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--theme-elevation-500)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {c.label}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text)', lineHeight: 1.1 }}>
              {c.value}
            </div>
            {c.sub && (
              <div style={{ fontSize: '0.72rem', color: 'var(--theme-elevation-450)', marginTop: '0.35rem' }}>
                {c.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* График выручки */}
      <div
        style={{
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-100)',
          borderRadius: 8,
          padding: '1.25rem',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--theme-text)', fontWeight: 600, marginBottom: '0.25rem' }}>
          Выручка за 14 дней
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--theme-text)', marginBottom: '1rem' }}>
          {rub(buckets.reduce((s, b) => s + b.value, 0))}
        </div>

        {hasOrders ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
            {buckets.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  title={rub(b.value)}
                  style={{
                    width: '100%',
                    height: `${Math.max(2, (b.value / maxVal) * 100)}px`,
                    background: b.value > 0 ? '#c9a84c' : 'var(--theme-elevation-150)',
                    borderRadius: '3px 3px 0 0',
                    transition: 'height 0.3s',
                  }}
                />
                <span style={{ fontSize: '0.6rem', color: 'var(--theme-elevation-450)' }}>{b.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-elevation-450)',
              fontSize: '0.85rem',
              border: '1px dashed var(--theme-elevation-150)',
              borderRadius: 6,
            }}
          >
            Пока нет заказов — график появится после первой покупки
          </div>
        )}
      </div>
    </div>
  )
}
