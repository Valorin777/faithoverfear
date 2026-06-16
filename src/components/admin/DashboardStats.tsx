import { getPayload } from 'payload'
import config from '@payload-config'
import DashboardStatsView from './DashboardStatsView'

const PAID_STATUSES = ['paid', 'processing', 'shipped', 'delivered']

interface OrderDoc {
  total?: number
  status?: string
  createdAt: string
}

/**
 * Серверная часть сводки: считает РЕАЛЬНЫЕ метрики из базы
 * и передаёт их в анимированный клиентский компонент.
 */
export default async function DashboardStats() {
  const payload = await getPayload({ config })

  const [ordersRes, productsRes, reviewsRes, customersRes] = await Promise.all([
    payload.find({ collection: 'orders', limit: 2000, depth: 0, sort: '-createdAt' }),
    payload.count({ collection: 'products' }),
    payload.count({ collection: 'reviews' }),
    payload.count({ collection: 'customers' }),
  ])

  const orders = ordersRes.docs as unknown as OrderDoc[]
  const ordersCount = ordersRes.totalDocs

  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)
  const paidRevenue = orders
    .filter((o) => PAID_STATUSES.includes(o.status || ''))
    .reduce((s, o) => s + (o.total || 0), 0)
  const avgCheck = ordersCount ? Math.round(revenue / ordersCount) : 0

  const now = new Date()
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const ordersToday = orders.filter((o) => new Date(o.createdAt) >= startToday).length
  const newCount = orders.filter((o) => (o.status || 'pending') === 'pending').length

  // График выручки по дням за 14 дней
  const days = 14
  const chart: { label: string; value: number }[] = []
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
    chart.push({ label: `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, '0')}`, value: sum })
  }

  return (
    <DashboardStatsView
      data={{
        revenue,
        paidRevenue,
        ordersCount,
        ordersToday,
        newCount,
        avgCheck,
        productsCount: productsRes.totalDocs,
        reviewsCount: reviewsRes.totalDocs,
        customersCount: customersRes.totalDocs,
        chart,
      }}
    />
  )
}
