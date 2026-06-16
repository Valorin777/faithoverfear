'use client'

import { Wallet, ShoppingBag, Users, Receipt, Package, Star, Coins, PackagePlus, Send, Gift } from 'lucide-react'
import type { DashboardData } from './getDashboardData'
import KpiCard from './KpiCard'
import RevenueChart from './RevenueChart'
import StatusDonut from './StatusDonut'
import ActivityFeed from './ActivityFeed'
import LowStockList from './LowStockList'
import TopReferrers from './TopReferrers'

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
      <header className="fof-hero">
        <span className="fof-hero__bg" aria-hidden />
        <div className="fof-hero__main">
          <p className="fof-hero__eyebrow">Faith over Fear · Панель управления</p>
          <h1 className="fof-hero__title">
            {userName ? `Здравствуйте, ${userName}` : 'Добро пожаловать'}
          </h1>
          <p className="fof-hero__date">{dateLabel} · вот как идут дела сегодня</p>
        </div>
        <nav className="fof-hero__actions">
          <a href="/admin/collections/products/create" className="fof-act fof-act--gold">
            <PackagePlus size={15} strokeWidth={2} /> Новый товар
          </a>
          <a href="/admin/collections/orders" className="fof-act">
            <ShoppingBag size={15} strokeWidth={2} /> Заказы
          </a>
          <a href="/admin/collections/campaigns/create" className="fof-act">
            <Send size={15} strokeWidth={2} /> Рассылка
          </a>
          <a href="/admin/referrals" className="fof-act">
            <Gift size={15} strokeWidth={2} /> Рефералы
          </a>
        </nav>
      </header>

      <section className="fof-kpis">
        <KpiCard
          label="Заработок сегодня"
          value={k.revenueToday.value}
          format="rub"
          subnote={k.revenueToday.subnote}
          icon={<Coins size={17} strokeWidth={1.9} />}
          accent="#2FAE6E"
          sparkId="kpi-today"
          index={0}
        />
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
          index={1}
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

      <section className="fof-row">
        <TopReferrers rows={data.topReferrers} empty={data.flags.referrersEmpty} />
      </section>
    </div>
  )
}
