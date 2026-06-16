import type { Payload } from 'payload'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Единый источник данных дашборда. ВСЕ цифры — реальные агрегаты из базы.
 * Никаких выдуманных значений, никакого Math.random, никаких фейковых трендов.
 * Где сравнение невозможно — deltaPct = null (в интерфейсе показывается «—»).
 */

export const PAID_STATUSES = ['paid', 'processing', 'shipped', 'delivered'] as const
export const ALL_STATUSES = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'] as const

export const STATUS_META: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает оплаты', color: '#C08A2E' },
  paid: { label: 'Оплачен', color: '#3266AD' },
  processing: { label: 'В сборке', color: '#6B4FA0' },
  shipped: { label: 'Отправлен', color: '#2C8A8A' },
  delivered: { label: 'Доставлен', color: '#2F7D5B' },
  cancelled: { label: 'Отменён', color: '#9AA0AD' },
}

export function pctDelta(curr: number, prev: number): number | null {
  if (!prev) return null
  return ((curr - prev) / prev) * 100
}

export interface KpiDelta {
  value: number
  deltaPct: number | null
}

export interface DashboardData {
  kpis: {
    revenue: { value: number; deltaPct: number | null; subnote: string }
    orders: { value: number; deltaPct: number | null; subnote: string }
    customers: { value: number; newThisMonth: number; deltaPct: number | null }
    avgCheck: { value: number; deltaPct: number | null }
    products: { value: number; inStock: number }
    reviews: { value: number; avgRating: number | null; newThisMonth: number }
  }
  revenueSeries90: { date: string; revenue: number }[]
  ordersSeries90: { date: string; count: number }[]
  statusDonut: { status: string; label: string; count: number; pct: number; color: string }[]
  recentActivity: {
    id: string
    orderNumber: string
    name: string
    total: number | null
    status: string
    statusLabel: string
    statusColor: string
    createdAt: string
  }[]
  lowStock: { id: string; name: string; category: string; totalStock: number; variantCount: number }[]
  flags: {
    revenueEmpty: boolean
    ordersEmpty: boolean
    donutEmpty: boolean
    activityEmpty: boolean
    lowStockEmpty: boolean
  }
}

function isoDate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export async function getDashboardData(payload: Payload): Promise<DashboardData> {
  const now = new Date()
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const DAY_MS = 86_400_000
  const series0 = new Date(todayStart.getTime() - 89 * DAY_MS) // 90 дней включая сегодня

  const [allOrdersRes, recentRes, productsRes, reviewsRes, customersTotal, customersNew, customersPrev] =
    await Promise.all([
      payload.find({ collection: 'orders', limit: 5000, depth: 0, sort: '-createdAt', pagination: false }),
      payload.find({ collection: 'orders', limit: 8, depth: 1, sort: '-createdAt' }),
      payload.find({ collection: 'products', limit: 2000, depth: 0, pagination: false }),
      payload.find({
        collection: 'reviews',
        where: { published: { equals: true } },
        limit: 2000,
        depth: 0,
        pagination: false,
      }),
      payload.count({ collection: 'customers' }),
      payload.count({
        collection: 'customers',
        where: { createdAt: { greater_than_equal: thisMonthStart.toISOString() } },
      }),
      payload.count({
        collection: 'customers',
        where: {
          and: [
            { createdAt: { greater_than_equal: prevMonthStart.toISOString() } },
            { createdAt: { less_than: thisMonthStart.toISOString() } },
          ],
        },
      }),
    ])

  const orders = allOrdersRes.docs as any[]
  const totalOrders = orders.length
  const isPaid = (s?: string) => (PAID_STATUSES as readonly string[]).includes(s || '')

  // ── Выручка/заказы: этот месяц vs прошлый (только оплаченные статусы) ──
  let revThis = 0,
    revPrev = 0,
    ordThis = 0,
    ordPrev = 0
  for (const o of orders) {
    if (!isPaid(o.status)) continue
    const t = new Date(o.createdAt).getTime()
    const total = typeof o.total === 'number' ? o.total : 0
    if (t >= thisMonthStart.getTime()) {
      revThis += total
      ordThis++
    } else if (t >= prevMonthStart.getTime() && t < thisMonthStart.getTime()) {
      revPrev += total
      ordPrev++
    }
  }

  // ── Ряды за 90 дней (оплаченные), с нулевой заливкой пустых дней ──
  const revBuckets = new Array(90).fill(0)
  const ordBuckets = new Array(90).fill(0)
  for (const o of orders) {
    if (!isPaid(o.status)) continue
    const idx = Math.floor((new Date(o.createdAt).getTime() - series0.getTime()) / DAY_MS)
    if (idx >= 0 && idx < 90) {
      revBuckets[idx] += typeof o.total === 'number' ? o.total : 0
      ordBuckets[idx] += 1
    }
  }
  const revenueSeries90 = revBuckets.map((revenue, i) => ({
    date: isoDate(new Date(series0.getTime() + i * DAY_MS)),
    revenue,
  }))
  const ordersSeries90 = ordBuckets.map((count, i) => ({
    date: isoDate(new Date(series0.getTime() + i * DAY_MS)),
    count,
  }))

  // ── Пончик: заказы по статусам (реальные доли) ──
  const statusCounts: Record<string, number> = {}
  for (const o of orders) {
    const s = o.status || 'pending'
    statusCounts[s] = (statusCounts[s] || 0) + 1
  }
  const statusDonut = ALL_STATUSES.map((s) => ({
    status: s,
    label: STATUS_META[s].label,
    color: STATUS_META[s].color,
    count: statusCounts[s] || 0,
    pct: totalOrders ? ((statusCounts[s] || 0) / totalOrders) * 100 : 0,
  })).filter((x) => x.count > 0)

  // ── Лента: последние заказы ──
  const recentActivity = (recentRes.docs as any[]).map((o) => {
    const cust = o.customer
    const fromAccount = cust && typeof cust === 'object' ? cust.name || cust.email : null
    const name = o.customerName || fromAccount || o.customerEmail || 'Гость'
    const s = o.status || 'pending'
    return {
      id: String(o.id),
      orderNumber: o.orderNumber || `#${o.id}`,
      name: String(name),
      total: typeof o.total === 'number' ? o.total : null,
      status: s,
      statusLabel: STATUS_META[s]?.label || s,
      statusColor: STATUS_META[s]?.color || '#9AA0AD',
      createdAt: o.createdAt,
    }
  })

  // ── Товары + остатки ──
  const products = productsRes.docs as any[]
  const stockRows = products.map((p) => {
    const variants = Array.isArray(p.variants) ? p.variants : []
    const totalStock = variants.reduce((s: number, v: any) => s + (typeof v.stock === 'number' ? v.stock : 0), 0)
    return {
      id: String(p.id),
      name: p.name || '—',
      category: p.category || '',
      totalStock,
      variantCount: variants.length,
    }
  })
  const productsInStock = stockRows.filter((r) => r.totalStock > 0).length
  const lowStock = [...stockRows].sort((a, b) => a.totalStock - b.totalStock).slice(0, 8)

  // ── Отзывы ──
  const reviews = reviewsRes.docs as any[]
  const reviewsPublished = reviewsRes.totalDocs
  const rated = reviews.filter((r) => typeof r.rating === 'number')
  const avgRating = rated.length ? rated.reduce((s, r) => s + r.rating, 0) / rated.length : null
  const reviewsNewThisMonth = reviews.filter((r) => new Date(r.createdAt).getTime() >= thisMonthStart.getTime()).length

  const avgThis = ordThis ? revThis / ordThis : 0
  const avgPrev = ordPrev ? revPrev / ordPrev : 0

  return {
    kpis: {
      revenue: { value: revThis, deltaPct: pctDelta(revThis, revPrev), subnote: 'За месяц · по дате заказа' },
      orders: { value: ordThis, deltaPct: pctDelta(ordThis, ordPrev), subnote: 'Оплаченных за месяц' },
      customers: {
        value: customersTotal.totalDocs,
        newThisMonth: customersNew.totalDocs,
        deltaPct: pctDelta(customersNew.totalDocs, customersPrev.totalDocs),
      },
      avgCheck: { value: Math.round(avgThis), deltaPct: pctDelta(avgThis, avgPrev) },
      products: { value: productsRes.totalDocs, inStock: productsInStock },
      reviews: { value: reviewsPublished, avgRating, newThisMonth: reviewsNewThisMonth },
    },
    revenueSeries90,
    ordersSeries90,
    statusDonut,
    recentActivity,
    lowStock,
    flags: {
      revenueEmpty: revThis === 0 && revPrev === 0,
      ordersEmpty: totalOrders === 0,
      donutEmpty: statusDonut.length === 0,
      activityEmpty: recentActivity.length === 0,
      lowStockEmpty: stockRows.length === 0,
    },
  }
}
