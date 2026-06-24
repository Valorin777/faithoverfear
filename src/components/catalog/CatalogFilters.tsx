'use client'

import { useState } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useCategories } from '@/context/CategoriesContext'

export interface FilterState {
  categories: string[]
  sizes: string[]
  colors: string[]
  priceMin: number
  priceMax: number
  inStockOnly: boolean
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const COLORS = [
  { value: 'white', label: 'Белый', en: 'White', hex: '#ffffff', border: '#e0e0e0' },
  { value: 'black', label: 'Чёрный', en: 'Black', hex: '#111111', border: '#111111' },
  { value: 'navy', label: 'Тёмно-синий', en: 'Navy', hex: '#1a2744', border: '#1a2744' },
  { value: 'burgundy', label: 'Бордовый', en: 'Burgundy', hex: '#7a1e2e', border: '#7a1e2e' },
  { value: 'beige', label: 'Бежевый', en: 'Beige', hex: '#e8d5a3', border: '#c9a84c' },
]

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  priceMin: 0,
  priceMax: 10000,
  inStockOnly: false,
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  /** mobile-only trigger button */
  mobileOnly?: boolean
}

export default function CatalogFilters({ filters, onChange, mobileOnly = false }: Props) {
  const { t } = useLang()
  const categoryOptions = useCategories().map(c => ({ value: c.slug, label: c.name, en: c.nameEn || c.name }))
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggle<K extends 'categories' | 'sizes' | 'colors'>(key: K, value: string) {
    const arr = filters[key] as string[]
    onChange({ ...filters, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] })
  }

  const activeCount =
    filters.categories.length + filters.sizes.length + filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 10000 ? 1 : 0)

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--navy)',
    marginBottom: '0.75rem',
    display: 'block',
  }

  const Body = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Сброс */}
      {activeCount > 0 && (
        <button onClick={() => onChange(DEFAULT_FILTERS)} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.78rem', color: 'var(--burgundy)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, fontWeight: 500,
        }}>
          <X size={13} strokeWidth={2} />
          {t('Сбросить', 'Reset')} ({activeCount})
        </button>
      )}

      {/* Тип */}
      <div>
        <span style={labelStyle}>{t('Тип одежды', 'Type')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {categoryOptions.map(cat => (
            <label key={cat.value} style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              cursor: 'pointer',
            }}>
              <span style={{
                width: 16, height: 16,
                border: `1.5px solid ${filters.categories.includes(cat.value) ? 'var(--navy)' : '#d4d4d4'}`,
                borderRadius: 3,
                background: filters.categories.includes(cat.value) ? 'var(--navy)' : '#fff',
                flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {filters.categories.includes(cat.value) && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <input type="checkbox" style={{ display: 'none' }}
                checked={filters.categories.includes(cat.value)}
                onChange={() => toggle('categories', cat.value)}
              />
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.82rem',
                color: filters.categories.includes(cat.value) ? 'var(--navy)' : '#666',
                fontWeight: filters.categories.includes(cat.value) ? 500 : 300,
              }}
                onClick={() => toggle('categories', cat.value)}
              >
                {t(cat.label, cat.en)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Размер */}
      <div>
        <span style={labelStyle}>{t('Размер', 'Size')}</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {SIZES.map(size => {
            const active = filters.sizes.includes(size)
            return (
              <button key={size} onClick={() => toggle('sizes', size)} style={{
                width: 40, height: 40,
                border: `1.5px solid ${active ? 'var(--navy)' : '#e0e0e0'}`,
                borderRadius: 3,
                background: active ? 'var(--navy)' : '#fff',
                color: active ? '#fff' : '#555',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Цвет */}
      <div>
        <span style={labelStyle}>{t('Цвет', 'Colour')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {COLORS.map(color => {
            const active = filters.colors.includes(color.value)
            return (
              <label key={color.value} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer',
              }}
                onClick={() => toggle('colors', color.value)}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: color.hex,
                  border: active ? `2.5px solid var(--gold)` : `1.5px solid ${color.border}`,
                  flexShrink: 0,
                  boxShadow: active ? '0 0 0 2px rgba(201,168,76,0.25)' : 'none',
                  transition: 'all 0.15s',
                }} />
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem',
                  color: active ? 'var(--navy)' : '#666',
                  fontWeight: active ? 500 : 300,
                }}>
                  {t(color.label, color.en)}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Цена */}
      <div>
        <span style={labelStyle}>{t('Цена, ₽', 'Price, ₽')}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="number" min={0} max={filters.priceMax}
            value={filters.priceMin}
            onChange={e => onChange({ ...filters, priceMin: Number(e.target.value) })}
            style={{
              flex: 1, border: '1.5px solid #e0e0e0', borderRadius: 3,
              padding: '0.5rem 0.625rem', fontSize: '0.8rem', outline: 'none',
              fontFamily: 'var(--font-inter), sans-serif', color: 'var(--navy)',
            }}
            placeholder={t('от', 'from')}
          />
          <span style={{ color: '#ccc', fontSize: '0.75rem', flexShrink: 0 }}>—</span>
          <input type="number" min={filters.priceMin} max={10000}
            value={filters.priceMax}
            onChange={e => onChange({ ...filters, priceMax: Number(e.target.value) })}
            style={{
              flex: 1, border: '1.5px solid #e0e0e0', borderRadius: 3,
              padding: '0.5rem 0.625rem', fontSize: '0.8rem', outline: 'none',
              fontFamily: 'var(--font-inter), sans-serif', color: 'var(--navy)',
            }}
            placeholder={t('до', 'to')}
          />
        </div>
      </div>

      {/* Наличие */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}
        onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
      >
        <span style={{
          width: 16, height: 16,
          border: `1.5px solid ${filters.inStockOnly ? 'var(--navy)' : '#d4d4d4'}`,
          borderRadius: 3,
          background: filters.inStockOnly ? 'var(--navy)' : '#fff',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {filters.inStockOnly && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span style={{
          fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem',
          color: filters.inStockOnly ? 'var(--navy)' : '#666',
          fontWeight: filters.inStockOnly ? 500 : 300,
        }}>
          {t('Только в наличии', 'In stock only')}
        </span>
      </label>
    </div>
  )

  if (mobileOnly) {
    return (
      <>
        {/* Кнопка открытия */}
        <button onClick={() => setMobileOpen(true)} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.6rem 1rem',
          border: '1.5px solid #e0e0e0',
          borderRadius: 3,
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.78rem', fontWeight: 600,
          color: activeCount > 0 ? 'var(--navy)' : '#666',
          background: activeCount > 0 ? 'var(--beige)' : '#fff',
          borderColor: activeCount > 0 ? 'var(--gold)' : '#e0e0e0',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}>
          <SlidersHorizontal size={14} strokeWidth={1.75} />
          {t('Фильтры', 'Filters')}{activeCount > 0 ? ` · ${activeCount}` : ''}
        </button>

        {/* Bottom sheet */}
        {mobileOpen && (
          <>
            {/* Затемнение */}
            <div onClick={() => setMobileOpen(false)} style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(0,0,0,0.45)',
            }} />

            {/* Панель снизу */}
            <div style={{
              position: 'fixed',
              left: 0, right: 0, bottom: 0,
              zIndex: 400,
              background: '#fff',
              borderRadius: '16px 16px 0 0',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Ручка */}
              <div style={{
                width: 36, height: 4, borderRadius: 2,
                background: '#e0e0e0',
                margin: '12px auto 0',
                flexShrink: 0,
              }} />

              {/* Заголовок */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem 0.75rem',
                borderBottom: '1px solid #f2f2f2',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)',
                }}>
                  {t('Фильтры', 'Filters')}
                </span>
                <button onClick={() => setMobileOpen(false)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#888', padding: '0.25rem',
                  display: 'flex', alignItems: 'center',
                }}>
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              {/* Тело */}
              <div style={{ overflowY: 'auto', padding: '1.25rem', flex: 1 }}>
                <Body />
              </div>

              {/* Кнопки внизу */}
              <div style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid #f2f2f2',
                display: 'flex', gap: '0.75rem',
                flexShrink: 0,
              }}>
                {activeCount > 0 && (
                  <button onClick={() => { onChange(DEFAULT_FILTERS); setMobileOpen(false) }} style={{
                    flex: '0 0 auto',
                    padding: '0.75rem 1.25rem',
                    border: '1.5px solid #e0e0e0',
                    borderRadius: 3,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.78rem', fontWeight: 500,
                    color: '#888', background: '#fff', cursor: 'pointer',
                  }}>
                    {t('Сбросить', 'Reset')}
                  </button>
                )}
                <button onClick={() => setMobileOpen(false)} style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'var(--navy)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 3,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>
                  {t('Показать товары', 'Show products')}
                </button>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  // Десктоп-сайдбар
  return (
    <aside style={{ width: 220, flexShrink: 0 }}>
      <Body />
    </aside>
  )
}
