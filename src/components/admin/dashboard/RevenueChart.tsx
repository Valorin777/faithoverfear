'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { formatRub, formatRubShort, shortDateRu } from './format'

type Period = 7 | 30 | 90

interface Props {
  series90: { date: string; revenue: number }[]
  empty: boolean
}

const W = 760
const H = 230
const PAD = { t: 16, r: 16, b: 26, l: 14 }

export default function RevenueChart({ series90, empty }: Props) {
  const [period, setPeriod] = useState<Period>(30)
  const [hover, setHover] = useState<number | null>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const [dash, setDash] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const data = useMemo(() => series90.slice(-period), [series90, period])
  const total = useMemo(() => data.reduce((s, d) => s + d.revenue, 0), [data])

  const chartW = W - PAD.l - PAD.r
  const chartH = H - PAD.t - PAD.b
  const max = Math.max(...data.map((d) => d.revenue), 1)
  const n = data.length

  const pts = data.map((d, i) => {
    const x = PAD.l + (n === 1 ? chartW / 2 : (i * chartW) / (n - 1))
    const y = PAD.t + chartH * (1 - d.revenue / max)
    return [x, y] as [number, number]
  })
  const line = pts.map(([x, y], i) => (i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`)).join(' ')
  const area = pts.length ? `${line} L${pts[pts.length - 1][0].toFixed(1)},${PAD.t + chartH} L${pts[0][0].toFixed(1)},${PAD.t + chartH} Z` : ''

  // линии сетки (4 уровня)
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    y: PAD.t + chartH * f,
    val: max * (1 - f),
  }))

  // подписи дат (до 6 равномерно)
  const labelCount = Math.min(6, n)
  const xLabels = Array.from({ length: labelCount }, (_, k) => {
    const i = labelCount === 1 ? 0 : Math.round((k * (n - 1)) / (labelCount - 1))
    return { x: pts[i]?.[0] ?? 0, text: shortDateRu(data[i]?.date) }
  })

  useEffect(() => {
    if (!lineRef.current) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const len = lineRef.current.getTotalLength()
    if (reduce) {
      setDash(0)
      return
    }
    setDash(len)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDash(0)))
    return () => cancelAnimationFrame(id)
  }, [line])

  const initLen = lineRef.current ? lineRef.current.getTotalLength() : 1200

  function onMove(e: React.MouseEvent) {
    if (!wrapRef.current || n === 0) return
    const rect = wrapRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((relX - PAD.l) / chartW) * (n - 1))
    setHover(Math.max(0, Math.min(n - 1, i)))
  }

  const hoverPt = hover !== null ? pts[hover] : null

  return (
    <div className="fof-card fof-chart">
      <div className="fof-card__head">
        <div>
          <h3 className="fof-card__title">Выручка</h3>
          <p className="fof-card__subtitle">
            {formatRub(total)} · за {period} дн. · по дате заказа
          </p>
        </div>
        <div className="fof-seg" role="tablist" aria-label="Период">
          {([7, 30, 90] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              className={`fof-seg__btn${period === p ? ' is-active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}д
            </button>
          ))}
        </div>
      </div>

      {empty ? (
        <div className="fof-empty">Пока нет оплаченных заказов — график появится после первой продажи</div>
      ) : (
        <div className="fof-chart__plot" ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="fof-chart__svg" role="img" aria-label="График выручки">
            <defs>
              <linearGradient id="fofRevFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {grid.map((g, i) => (
              <line key={i} x1={PAD.l} y1={g.y} x2={W - PAD.r} y2={g.y} className="fof-chart__grid" />
            ))}
            {area && <path d={area} fill="url(#fofRevFill)" className="fof-chart__area" />}
            {line && (
              <path
                ref={lineRef}
                d={line}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDasharray: dash === null ? undefined : initLen,
                  strokeDashoffset: dash === null ? undefined : dash,
                  transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            )}
            {hoverPt && (
              <g>
                <line x1={hoverPt[0]} y1={PAD.t} x2={hoverPt[0]} y2={PAD.t + chartH} className="fof-chart__cursor" />
                <circle cx={hoverPt[0]} cy={hoverPt[1]} r="4.5" fill="var(--gold)" stroke="var(--surface-card)" strokeWidth="2" />
              </g>
            )}
          </svg>

          <div className="fof-chart__xaxis">
            {xLabels.map((l, i) => (
              <span key={i} style={{ left: `${(l.x / W) * 100}%` }}>
                {l.text}
              </span>
            ))}
          </div>

          {hoverPt && hover !== null && (
            <div
              className="fof-chart__tip"
              style={{
                left: `${(hoverPt[0] / W) * 100}%`,
                top: `${(hoverPt[1] / H) * 100}%`,
              }}
            >
              <strong>{formatRubShort(data[hover].revenue)}</strong>
              <span>{shortDateRu(data[hover].date)}</span>
            </div>
          )}
        </div>
      )}

      {!empty && (
        <div className="fof-chart__legend">
          {grid.filter((_, i) => i % 2 === 0).map((g, i) => (
            <span key={i}>{formatRubShort(g.val)}</span>
          ))}
        </div>
      )}
    </div>
  )
}
