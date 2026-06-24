'use client'

import { useState, useMemo } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import CatalogFilters, { FilterState, DEFAULT_FILTERS } from './CatalogFilters'
import { Product } from '@/types'
import { useLang } from '@/context/LanguageContext'

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию', en: 'Default' },
  { value: 'price_asc', label: 'Сначала дешевле', en: 'Price: low to high' },
  { value: 'price_desc', label: 'Сначала дороже', en: 'Price: high to low' },
  { value: 'new', label: 'Новинки', en: 'New In' },
]

const COLOR_MAP: Record<string, string> = {
  white: 'Белый', black: 'Чёрный', navy: 'Тёмно-синий', burgundy: 'Бордовый', beige: 'Бежевый',
}

interface CatalogGridProps {
  products: Product[]
  initialCategory?: string
  title?: string
  titleEn?: string
}

export default function CatalogGrid({ products, initialCategory, title = 'Каталог', titleEn = 'Catalog' }: CatalogGridProps) {
  const { t } = useLang()
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  })
  const [sort, setSort] = useState('default')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isDesktop, setIsDesktop] = useState(false)

  // определяем десктоп после монтирования
  if (typeof window !== 'undefined' && !isDesktop && window.innerWidth >= 1024) {
    setIsDesktop(true)
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.variants.some(v => filters.sizes.includes(v.size)))
    }
    if (filters.colors.length > 0) {
      const colorLabels = filters.colors.map(c => COLOR_MAP[c]).filter(Boolean)
      result = result.filter(p => p.variants.some(v => colorLabels.some(cl => v.color.includes(cl))))
    }
    result = result.filter(p => {
      const price = p.salePrice ?? p.price
      return price >= filters.priceMin && price <= filters.priceMax
    })
    if (filters.inStockOnly) {
      result = result.filter(p => p.variants.some(v => v.stock > 0))
    }

    switch (sort) {
      case 'price_asc': result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break
      case 'price_desc': result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break
      case 'new': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return result
  }, [products, filters, sort])

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>

      {/* Заголовок */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1.2,
        }}>
          {t(title, titleEn)}
        </h1>
        <div style={{ width: 40, height: 2, background: 'var(--gold)', marginTop: '0.5rem', borderRadius: 2 }} />
      </div>

      {/* Панель управления */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.8rem',
          color: '#999',
          fontWeight: 300,
        }}>
          {t('Найдено:', 'Found:')}{' '}
          <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>{filtered.length}</strong> {t('товаров', 'products')}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {/* Сортировка */}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            border: '1.5px solid #e0e0e0',
            borderRadius: 3,
            padding: '0.55rem 0.75rem',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-inter), sans-serif',
            color: 'var(--navy)',
            outline: 'none',
            background: '#fff',
          }}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{t(opt.label, opt.en)}</option>
            ))}
          </select>

          {/* Вид — только на планшете+ */}
          <div className="view-toggle" style={{
            display: 'none',
            border: '1.5px solid #e0e0e0',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            {(['grid', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '0.5rem 0.625rem',
                border: 'none',
                background: view === v ? 'var(--navy)' : '#fff',
                color: view === v ? '#fff' : '#888',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                transition: 'all 0.15s',
              }}>
                {v === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>

          {/* Мобильные фильтры — только кнопка без сайдбара */}
          <div className="mobile-filters-btn">
            <CatalogFilters filters={filters} onChange={setFilters} mobileOnly />
          </div>
        </div>
      </div>

      {/* Основная сетка */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

        {/* Сайдбар — только десктоп */}
        <div className="desktop-filters">
          <CatalogFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Товары */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <svg width="24" height="34" viewBox="0 0 32 44" fill="none" style={{ margin: '0 auto 1rem', opacity: 0.2 }}>
                <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
              </svg>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                color: '#aaa', marginBottom: '1.5rem', fontWeight: 300,
              }}>
                {t('По выбранным фильтрам товаров не найдено', 'No products match the selected filters')}
              </p>
              <button onClick={() => setFilters(DEFAULT_FILTERS)} style={{
                padding: '0.7rem 1.75rem',
                border: '1.5px solid var(--navy)',
                borderRadius: 3,
                background: '#fff',
                color: 'var(--navy)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {t('Сбросить фильтры', 'Reset filters')}
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: view === 'list' ? '1fr' : 'repeat(2, 1fr)',
            }}
              className="catalog-products-grid"
            >
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .desktop-filters { display: none; }
        .mobile-filters-btn { display: block; }
        .view-toggle { display: none; }
        @media (min-width: 640px) {
          .view-toggle { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .desktop-filters { display: block; }
          .mobile-filters-btn { display: none; }
          .catalog-products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .catalog-products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
