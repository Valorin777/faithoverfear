'use client'

import { useState } from 'react'
import { Users, Gift, TrendingUp, Crown, Medal, Copy, Check, Link2, Sparkles } from 'lucide-react'
import type { ReferralData, ReferralRow } from './getReferralData'

const TIERS = [
  { name: 'Старт', range: 'до 10 друзей', pct: 10, icon: Sparkles, accent: '#8A8578' },
  { name: 'Серебро', range: 'от 10 друзей', pct: 12, icon: Medal, accent: '#9FA7B2' },
  { name: 'Золото', range: 'от 30 друзей', pct: 15, icon: Crown, accent: '#C9A84C' },
]

function tierAccent(tier: ReferralRow['tier']) {
  return tier === 'Золото' ? '#C9A84C' : tier === 'Серебро' ? '#9FA7B2' : '#8A8578'
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false)
  if (!value) return <span className="fof-ref-nolink">—</span>
  return (
    <button
      type="button"
      className={`fof-ref-copy${done ? ' is-done' : ''}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setDone(true)
          setTimeout(() => setDone(false), 1600)
        } catch {
          /* буфер недоступен — игнорируем */
        }
      }}
      title={value}
    >
      {done ? <Check size={13} strokeWidth={2.4} /> : <Copy size={13} strokeWidth={2} />}
      {done ? 'Скопировано' : label}
    </button>
  )
}

export default function ReferralsView({ data }: { data: ReferralData }) {
  const { rows, summary } = data
  const hasRows = rows.length > 0

  const stats = [
    { label: 'Участников', value: summary.participants, icon: Users, accent: '#3266AD' },
    { label: 'Приглашено всего', value: summary.totalInvited, icon: Gift, accent: '#2FAE6E' },
    { label: 'Активных рефереров', value: summary.activeReferrers, icon: TrendingUp, accent: '#6B4FA0' },
    { label: 'Золото · Серебро', value: `${summary.gold} · ${summary.silver}`, icon: Crown, accent: '#C9A84C' },
  ]

  return (
    <div className="fof-dashboard fof-ref">
      <header className="fof-head">
        <div>
          <p className="fof-head__eyebrow">Маркетинг · Лояльность</p>
          <h1 className="fof-head__title">Реферальная программа</h1>
        </div>
        <div className="fof-head__meta">
          <p className="fof-head__greet">Приглашай друзей — получай бонусы</p>
          <p className="fof-head__date">Скидка друга растёт со статусом</p>
        </div>
      </header>

      {/* Как работает — статусы */}
      <section className="fof-ref-tiers">
        {TIERS.map((t) => {
          const Icon = t.icon
          return (
            <div className="fof-ref-tier" key={t.name} style={{ ['--tier' as string]: t.accent }}>
              <div className="fof-ref-tier__top">
                <span className="fof-ref-tier__icon"><Icon size={18} strokeWidth={1.9} /></span>
                <span className="fof-ref-tier__name">{t.name}</span>
              </div>
              <div className="fof-ref-tier__pct">{t.pct}%</div>
              <div className="fof-ref-tier__range">{t.range}</div>
              <div className="fof-ref-tier__note">скидка приглашённому другу</div>
            </div>
          )
        })}
      </section>

      {/* Сводка */}
      <section className="fof-ref-stats">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div className="fof-ref-stat" key={s.label} style={{ ['--kpi-accent' as string]: s.accent }}>
              <span className="fof-ref-stat__icon"><Icon size={16} strokeWidth={1.9} /></span>
              <div>
                <div className="fof-ref-stat__value">{s.value}</div>
                <div className="fof-ref-stat__label">{s.label}</div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Таблица участников */}
      <section className="fof-card fof-ref-table-card">
        <div className="fof-card__head">
          <h2 className="fof-card__title"><Link2 size={15} strokeWidth={2} /> Участники и их ссылки</h2>
          <span className="fof-card__hint">Нажмите «Ссылка», чтобы скопировать</span>
        </div>

        {hasRows ? (
          <div className="fof-ref-table-wrap">
            <table className="fof-ref-table">
              <thead>
                <tr>
                  <th>Покупатель</th>
                  <th>Код</th>
                  <th>Ссылка-приглашение</th>
                  <th className="ta-c">Приглашено</th>
                  <th>Статус</th>
                  <th className="ta-c">Скидка другу</th>
                  <th className="ta-r">Бонусы</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="fof-ref-who">
                        <span className="fof-ref-who__name">{r.name || '—'}</span>
                        <span className="fof-ref-who__email">{r.email}</span>
                      </div>
                    </td>
                    <td><code className="fof-ref-code">{r.code || '—'}</code></td>
                    <td><CopyButton value={r.link} label="Ссылка" /></td>
                    <td className="ta-c"><span className="fof-ref-count">{r.count}</span></td>
                    <td>
                      <span className="fof-ref-badge" style={{ ['--tier' as string]: tierAccent(r.tier) }}>
                        {r.tier}
                      </span>
                    </td>
                    <td className="ta-c"><strong>{r.discountPct}%</strong></td>
                    <td className="ta-r">{r.bonusBalance.toLocaleString('ru-RU')} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="fof-empty">Пока никто не зарегистрировался. Здесь появятся участники программы и их реферальные ссылки.</div>
        )}
      </section>
    </div>
  )
}
