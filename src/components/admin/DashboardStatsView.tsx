'use client'

import { useEffect, useRef, useState } from 'react'

interface DashData {
  revenue: number
  paidRevenue: number
  ordersCount: number
  ordersToday: number
  newCount: number
  avgCheck: number
  productsCount: number
  reviewsCount: number
  customersCount: number
  chart: { label: string; value: number }[]
}

/* Плавный счётчик от 0 до значения (easeOutCubic) */
function useCountUp(target: number, duration = 1100) {
  const [val, setVal] = useState(0)
  const startedRef = useRef(false)
  useEffect(() => {
    if (startedRef.current) { setVal(target); return }
    startedRef.current = true
    let raf = 0
    let startTs = 0
    const tick = (now: number) => {
      if (!startTs) startTs = now
      const p = Math.min(1, (now - startTs) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

function rub(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽'
}

const ICONS: Record<string, React.ReactNode> = {
  revenue: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  paid: <><path d="M20 6L9 17l-5-5" /></>,
  orders: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></>,
  new: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></>,
  avg: <><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 4-6" /></>,
  products: <><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></>,
  customers: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></>,
  reviews: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
}

function MetricCard({ label, value, icon, accent, sub, delay, money }: {
  label: string; value: number; icon: string; accent?: boolean; sub?: string; delay: number; money?: boolean
}) {
  const animated = useCountUp(value)
  const display = money ? rub(animated) : new Intl.NumberFormat('ru-RU').format(Math.round(animated))
  return (
    <div className="fof-card" style={{ animationDelay: `${delay}s` }}>
      <div className="fof-card-row">
        <span className="fof-card-label">{label}</span>
        <span className={`fof-card-icon${accent ? ' accent' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[icon]}
          </svg>
        </span>
      </div>
      <div className="fof-card-value">{display}</div>
      {sub && <div className="fof-card-sub">{sub}</div>}
    </div>
  )
}

const QUICK = [
  { href: '/admin/collections/products/create', label: 'Добавить товар', icon: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></> },
  { href: '/admin/collections/orders', label: 'Заказы', icon: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></> },
  { href: '/admin/collections/customers', label: 'Покупатели', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></> },
  { href: '/admin/collections/promocodes', label: 'Промокоды', icon: <><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /><path d="M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /></> },
]

export default function DashboardStatsView({ data }: { data: DashData }) {
  const totalChart = data.chart.reduce((s, b) => s + b.value, 0)
  const maxVal = Math.max(1, ...data.chart.map((b) => b.value))
  const hasOrders = data.ordersCount > 0

  return (
    <div className="fof-dash">
      {/* Быстрые действия */}
      <div className="fof-quick">
        {QUICK.map((q, i) => (
          <a key={q.href} href={q.href} className="fof-quick-btn" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="fof-quick-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{q.icon}</svg>
            </span>
            {q.label}
          </a>
        ))}
      </div>

      {/* Метрики */}
      <div className="fof-grid">
        <MetricCard label="Выручка" value={data.revenue} icon="revenue" accent money delay={0.05} />
        <MetricCard label="Оплачено" value={data.paidRevenue} icon="paid" money delay={0.1} />
        <MetricCard label="Заказов" value={data.ordersCount} icon="orders" sub={data.ordersToday ? `+${data.ordersToday} сегодня` : 'сегодня 0'} delay={0.15} />
        <MetricCard label="Новых" value={data.newCount} icon="new" sub="ждут обработки" delay={0.2} />
        <MetricCard label="Средний чек" value={data.avgCheck} icon="avg" money delay={0.25} />
        <MetricCard label="Покупателей" value={data.customersCount} icon="customers" delay={0.3} />
        <MetricCard label="Товаров" value={data.productsCount} icon="products" delay={0.35} />
        <MetricCard label="Отзывов" value={data.reviewsCount} icon="reviews" delay={0.4} />
      </div>

      {/* График */}
      <div className="fof-chart fof-card" style={{ animationDelay: '0.45s' }}>
        <div className="fof-chart-head">
          <span className="fof-card-label">Выручка за 14 дней</span>
          <span className="fof-chart-total">{rub(totalChart)}</span>
        </div>
        {hasOrders ? (
          <div className="fof-bars">
            {data.chart.map((b, i) => (
              <div key={i} className="fof-bar-col">
                <div className="fof-bar" title={rub(b.value)} style={{ height: `${Math.max(3, (b.value / maxVal) * 100)}%`, animationDelay: `${0.5 + i * 0.04}s` }} />
                <span className="fof-bar-label">{b.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="fof-empty">Пока нет заказов — график появится после первой покупки</div>
        )}
      </div>
    </div>
  )
}
