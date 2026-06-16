'use client'

import { useEffect, useState } from 'react'
import { CATEGORY_LABELS, ProductCategory } from '@/types'

interface Row {
  id: string
  name: string
  category: string
  totalStock: number
  variantCount: number
}

const REF = 30 // условный «полный склад» для масштаба полосы

export default function LowStockList({ rows, empty }: { rows: Row[]; empty: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const maxStock = Math.max(REF, ...rows.map((r) => r.totalStock))

  return (
    <div className="fof-card fof-stock">
      <div className="fof-card__head">
        <div>
          <h3 className="fof-card__title">Остатки на складе</h3>
          <p className="fof-card__subtitle">Что заканчивается — пополните вовремя</p>
        </div>
      </div>

      {empty ? (
        <div className="fof-empty">Товаров пока нет</div>
      ) : (
        <ul className="fof-stock__list">
          {rows.map((r, i) => {
            const tone = r.totalStock === 0 ? 'out' : r.totalStock <= 5 ? 'low' : 'ok'
            const pct = Math.max(2, Math.min(100, (r.totalStock / maxStock) * 100))
            return (
              <li key={r.id} className="fof-stock__row">
                <div className="fof-stock__top">
                  <span className="fof-stock__name" title={r.name}>
                    {r.name}
                  </span>
                  <span className={`fof-stock__count fof-stock__count--${tone}`}>
                    {r.totalStock === 0 ? 'Нет в наличии' : `${r.totalStock} шт.`}
                  </span>
                </div>
                <div className="fof-stock__barwrap">
                  <span
                    className={`fof-stock__bar fof-stock__bar--${tone}`}
                    style={{ width: mounted ? `${pct}%` : '0%', transitionDelay: `${i * 50}ms` }}
                  />
                </div>
                <span className="fof-stock__cat">
                  {CATEGORY_LABELS[r.category as ProductCategory] || r.category} · {r.variantCount} вар.
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
