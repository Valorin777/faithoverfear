'use client'

import { Wallet, ShoppingBag, Users, Receipt, Package, Star } from 'lucide-react'
import type { DashboardData } from './getDashboardData'
import KpiCard from './KpiCard'
import RevenueChart from './RevenueChart'
import StatusDonut from './StatusDonut'
import ActivityFeed from './ActivityFeed'
import LowStockList from './LowStockList'

interface Props {
  data: DashboardData
  userName: string
  dateLabel: string
}

export default function DashboardView({ data, userName, dateLabel }: Props) {
  const k = data.kpis
  const rev30 = data.revenueSeries90.slice(-30).map((d) => d.revenue)
  const ord30 = data.ordersSeries90.slice(-30).map((d) => d.count)

  const ratingNote =
    k.reviews.avgRating !== null
      ? `★ ${k.reviews.avgRating.toFixed(1).replace('.', ',')} · +${k.reviews.newThisMonth} за месяц`
      : `Опубликовано · +${k.reviews.newThisMonth} за месяц`

  return (
    <div className="fof-dashboard">
      <header className="fof-head">
        <div>
          <p className="fof-head__eyebrow">Обзор · Сводка</p>
          <h1 className="fof-head__title">Главная</h1>
        </div>
        <div className="fof-head__meta">
          <p className="fof-head__greet">
            {userName ? `Здравствуйте, ${userName}` : 'Добро пожаловать'}
          </p>
          <p className="fof-head__date">{dateLabel}</p>
        </div>
      </header>

      <section className="fof-kpis">
        <KpiCard
          label="Выручка за месяц"
          value={k.revenue.value}
          format="rub"
          deltaPct={k.revenue.deltaPct}
          subnote={k.revenue.subnote}
          icon={<Wallet size={17} strokeWidth={1.9} />}
          accent="#C9A84C"
          spark={rev30}
          sparkId="kpi-rev"
          index={0}
        />
        <KpiCard
          label="Заказы за месяц"
          value={k.orders.value}
          format="int"
          deltaPct={k.orders.deltaPct}
          subnote={k.orders.subnote}
          icon={<ShoppingBag size={17} strokeWidth={1.9} />}
          accent="#3266AD"
          spark={ord30}
          sparkId="kpi-ord"
          index={1}
        />
        <KpiCard
          label="Клиентов всего"
          value={k.customers.value}
          format="int"
          deltaPct={k.customers.deltaPct}
          subnote={`+${k.customers.newThisMonth} за месяц`}
          icon={<Users size={17} strokeWidth={1.9} />}
          accent="#2F7D5B"
          sparkId="kpi-cust"
          index={2}
        />
        <KpiCard
          label="Средний чек"
          value={k.avgCheck.value}
          format="rub"
          deltaPct={k.avgCheck.deltaPct}
          subnote="За оплаченный заказ"
          icon={<Receipt size={17} strokeWidth={1.9} />}
          accent="#6B4FA0"
          sparkId="kpi-aov"
          index={3}
        />
        <KpiCard
          label="Товаров в каталоге"
          value={k.products.value}
          format="int"
          subnote={`${k.products.inStock} в наличии`}
          icon={<Package size={17} strokeWidth={1.9} />}
          accent="#2C8A8A"
          sparkId="kpi-prod"
          index={4}
        />
        <KpiCard
          label="Отзывов"
          value={k.reviews.value}
          format="int"
          subnote={ratingNote}
          icon={<Star size={17} strokeWidth={1.9} />}
          accent="#C08A2E"
          sparkId="kpi-rev2"
          index={5}
        />
      </section>

      <section className="fof-row fof-row--2-1">
        <RevenueChart series90={data.revenueSeries90} empty={data.flags.revenueEmpty} />
        <StatusDonut
          slices={data.statusDonut}
          total={data.statusDonut.reduce((s, x) => s + x.count, 0)}
          empty={data.flags.donutEmpty}
        />
      </section>

      <section className="fof-row fof-row--1-1">
        <ActivityFeed items={data.recentActivity} empty={data.flags.activityEmpty} />
        <LowStockList rows={data.lowStock} empty={data.flags.lowStockEmpty} />
      </section>
    </div>
  )
}
