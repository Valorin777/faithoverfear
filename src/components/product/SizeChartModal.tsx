'use client'

import { useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'

interface Props {
  open: boolean
  onClose: () => void
}

/** Замеры изделия в сантиметрах (плечевые изделия — футболки/поло/свитшоты). */
const ROWS = [
  { size: 'S', ru: '44–46', chest: '88–94', waist: '72–78', length: '68' },
  { size: 'M', ru: '46–48', chest: '96–102', waist: '80–86', length: '70' },
  { size: 'L', ru: '48–50', chest: '104–110', waist: '88–94', length: '72' },
  { size: 'XL', ru: '52–54', chest: '112–118', waist: '96–102', length: '74' },
  { size: 'XXL', ru: '56–58', chest: '120–126', waist: '104–110', length: '76' },
]

export default function SizeChartModal({ open, onClose }: Props) {
  const { t } = useLang()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const th: React.CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.66rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--navy)',
    padding: '0.7rem 0.5rem',
    textAlign: 'center',
    borderBottom: '2px solid var(--navy)',
    whiteSpace: 'nowrap',
  }
  const td: React.CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.82rem',
    color: '#444',
    padding: '0.65rem 0.5rem',
    textAlign: 'center',
    borderBottom: '1px solid #f0f0f0',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('Таблица размеров', 'Size chart')}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        background: 'rgba(17,26,51,0.55)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          width: 'min(520px, 100%)',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Шапка */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem 1rem',
            borderBottom: '1px solid #f2f2f2',
            position: 'sticky',
            top: 0,
            background: '#fff',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--navy)',
            }}
          >
            {t('Таблица размеров', 'Size chart')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Закрыть', 'Close')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              padding: '0.5rem',
              margin: '-0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Таблица */}
        <div style={{ padding: '1rem 1.5rem 0.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 380 }}>
            <thead>
              <tr>
                <th style={th}>{t('Размер', 'Size')}</th>
                <th style={th}>{t('Рос.', 'RU')}</th>
                <th style={th}>{t('Обхват груди', 'Chest')}</th>
                <th style={th}>{t('Обхват талии', 'Waist')}</th>
                <th style={th}>{t('Длина', 'Length')}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.size}>
                  <td style={{ ...td, fontWeight: 700, color: 'var(--navy)' }}>{r.size}</td>
                  <td style={td}>{r.ru}</td>
                  <td style={td}>{r.chest}</td>
                  <td style={td}>{r.waist}</td>
                  <td style={td}>{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Подсказки */}
        <div style={{ padding: '0.75rem 1.5rem 1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.74rem',
              color: '#999',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            {t(
              'Все замеры — в сантиметрах, по изделию. Обхват груди измеряйте по самой выступающей части. Если параметры между размерами — берите больший.',
              'All measurements are in centimetres, on the garment. Measure your chest at the fullest part. If you are between sizes, choose the larger one.',
            )}
          </p>
          <div
            style={{
              marginTop: '0.875rem',
              padding: '0.75rem 1rem',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 6,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.74rem',
              color: 'var(--navy)',
              lineHeight: 1.6,
            }}
          >
            {t(
              'Нужна помощь с выбором размера? Напишите нам — подскажем по вашим меркам.',
              'Need help choosing a size? Message us — we will help based on your measurements.',
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
