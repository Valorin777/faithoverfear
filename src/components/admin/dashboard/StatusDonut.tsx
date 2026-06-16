'use client'

import { useEffect, useState } from 'react'
import { useCountUp } from './useCountUp'

interface Slice {
  status: string
  label: string
  count: number
  pct: number
  color: string
}

export default function StatusDonut({ slices, total, empty }: { slices: Slice[]; total: number; empty: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const shown = Math.round(useCountUp(total))

  const r = 58
  const sw = 18
  const C = 2 * Math.PI * r
  let acc = 0

  return (
    <div className="fof-card fof-donut">
      <div className="fof-card__head">
        <div>
          <h3 className="fof-card__title">Заказы по статусам</h3>
          <p className="fof-card__subtitle">Распределение всех заказов</p>
        </div>
      </div>

      {empty ? (
        <div className="fof-empty">Заказов пока нет</div>
      ) : (
        <div className="fof-donut__body">
          <div className="fof-donut__ring">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={sw} />
              {slices.map((s, i) => {
                const arc = (s.pct / 100) * C
                const off = acc
                acc += arc
                return (
                  <circle
                    key={s.status}
                    cx="80"
                    cy="80"
                    r={r}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={sw}
                    strokeLinecap="butt"
                    strokeDasharray={mounted ? `${arc.toFixed(2)} ${(C - arc).toFixed(2)}` : `0 ${C.toFixed(2)}`}
                    strokeDashoffset={(-off).toFixed(2)}
                    transform="rotate(-90 80 80)"
                    style={{ transition: `stroke-dasharray 0.85s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s` }}
                  />
                )
              })}
            </svg>
            <div className="fof-donut__center">
              <span className="fof-donut__num">{shown}</span>
              <span className="fof-donut__cap">заказов</span>
            </div>
          </div>
          <ul className="fof-donut__legend">
            {slices.map((s) => (
              <li key={s.status}>
                <span className="fof-donut__dot" style={{ background: s.color }} />
                <span className="fof-donut__lbl">{s.label}</span>
                <span className="fof-donut__val">{s.count}</span>
                <span className="fof-donut__pct">{s.pct.toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
