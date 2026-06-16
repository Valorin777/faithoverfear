'use client'

import { ReactNode } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useCountUp } from './useCountUp'
import Sparkline from './Sparkline'
import { formatRub, formatRubShort, formatInt, formatPct } from './format'

type Fmt = 'rub' | 'rubShort' | 'int'

interface Props {
  label: string
  value: number
  format?: Fmt
  deltaPct?: number | null
  subnote?: string
  icon: ReactNode
  accent: string
  spark?: number[]
  index?: number
  sparkId: string
}

export default function KpiCard({
  label,
  value,
  format = 'int',
  deltaPct = null,
  subnote,
  icon,
  accent,
  spark,
  index = 0,
  sparkId,
}: Props) {
  const shown = useCountUp(value)
  const text = format === 'rub' ? formatRub(shown) : format === 'rubShort' ? formatRubShort(shown) : formatInt(shown)

  const dir = deltaPct === null ? 'flat' : deltaPct > 0 ? 'up' : deltaPct < 0 ? 'down' : 'flat'
  const hasSpark = Array.isArray(spark) && spark.length >= 2 && spark.some((n) => n > 0)

  return (
    <div className="fof-kpi" style={{ animationDelay: `${index * 50}ms`, ['--kpi-accent' as string]: accent }}>
      <div className="fof-kpi__top">
        <span className="fof-kpi__icon">{icon}</span>
        <span className={`fof-kpi__delta fof-kpi__delta--${dir}`}>
          {dir === 'up' && <ArrowUpRight size={13} strokeWidth={2.5} />}
          {dir === 'down' && <ArrowDownRight size={13} strokeWidth={2.5} />}
          {formatPct(deltaPct)}
        </span>
      </div>
      <div className="fof-kpi__value">{text}</div>
      <div className="fof-kpi__label">{label}</div>
      <div className="fof-kpi__foot">
        {subnote ? <span className="fof-kpi__sub">{subnote}</span> : <span />}
        {hasSpark && (
          <span className="fof-kpi__spark">
            <Sparkline points={spark!} accent={accent} gradientId={sparkId} width={92} height={30} />
          </span>
        )}
      </div>
    </div>
  )
}
