'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  points: number[]
  accent: string
  width?: number
  height?: number
  gradientId: string
}

export default function Sparkline({ points, accent, width = 108, height = 36, gradientId }: Props) {
  const pathRef = useRef<SVGPathElement>(null)
  const [dash, setDash] = useState<number | null>(null)

  const valid = Array.isArray(points) && points.length >= 2
  const pad = 3
  const max = valid ? Math.max(...points) : 1
  const min = valid ? Math.min(...points) : 0
  const range = max - min || 1
  const step = valid ? (width - pad * 2) / (points.length - 1) : 0

  const coords = valid
    ? points.map((p, i) => {
        const x = pad + i * step
        const y = pad + (height - pad * 2) * (1 - (p - min) / range)
        return [x, y] as [number, number]
      })
    : []

  const line = coords.map(([x, y], i) => (i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`)).join(' ')
  const area = valid
    ? `${line} L${coords[coords.length - 1][0].toFixed(1)},${height - pad} L${coords[0][0].toFixed(1)},${height - pad} Z`
    : ''

  useEffect(() => {
    if (!pathRef.current) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const len = pathRef.current.getTotalLength()
    if (reduce) {
      setDash(0)
      return
    }
    setDash(len)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDash(0)))
    return () => cancelAnimationFrame(id)
  }, [line])

  if (!valid) return <div style={{ height }} />

  const initialLen = pathRef.current ? pathRef.current.getTotalLength() : 200

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.20" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} stroke="none" />
      <path
        ref={pathRef}
        d={line}
        fill="none"
        stroke={accent}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: dash === null ? undefined : initialLen,
          strokeDashoffset: dash === null ? undefined : dash,
          transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </svg>
  )
}
