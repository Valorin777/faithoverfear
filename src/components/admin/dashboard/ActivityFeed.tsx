'use client'

import { useEffect, useState } from 'react'
import { initialsOf, relativeTimeRu, shortDateRu, formatRub } from './format'

interface Item {
  id: string
  orderNumber: string
  name: string
  total: number | null
  status: string
  statusLabel: string
  statusColor: string
  createdAt: string
}

export default function ActivityFeed({ items, empty }: { items: Item[]; empty: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="fof-card fof-feed">
      <div className="fof-card__head">
        <div>
          <h3 className="fof-card__title">Последние заказы</h3>
          <p className="fof-card__subtitle">Свежие заказы из магазина</p>
        </div>
        <span className="fof-live">
          <span className="fof-live__dot" />
          live
        </span>
      </div>

      {empty ? (
        <div className="fof-empty">Заказов пока нет — здесь появятся новые покупки</div>
      ) : (
        <ul className="fof-feed__list">
          {items.map((it, i) => (
            <li key={it.id} className="fof-feed__row" style={{ animationDelay: `${i * 45}ms` }}>
              <span className="fof-feed__avatar">{initialsOf(it.name)}</span>
              <div className="fof-feed__main">
                <p className="fof-feed__name">{it.name}</p>
                <p className="fof-feed__meta">
                  {it.orderNumber} · {mounted ? relativeTimeRu(it.createdAt) : shortDateRu(it.createdAt)}
                </p>
              </div>
              <div className="fof-feed__right">
                {it.total !== null && <span className="fof-feed__amount">{formatRub(it.total)}</span>}
                <span className="fof-badge" style={{ color: it.statusColor, background: `${it.statusColor}1f` }}>
                  {it.statusLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
