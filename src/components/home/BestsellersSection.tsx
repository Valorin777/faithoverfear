'use client'

import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { products } from '@/data/products'
import { useLang } from '@/context/LanguageContext'

export default function BestsellersSection() {
  const { t } = useLang()
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4)

  return (
    <section style={{ background: 'var(--beige)', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.75rem',
            fontWeight: 500,
          }}>
            {t('Популярное', 'Popular')}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
            color: 'var(--navy)',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}>
            {t('Наши хиты', 'Bestsellers')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.88rem',
            color: '#999',
            fontWeight: 300,
          }}>
            {t('Самые любимые модели наших покупателей', 'Our customers’ favourite pieces')}
          </p>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1rem auto 0', borderRadius: 2 }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
        }}
          className="products-grid"
        >
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/catalog" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1.5px solid var(--navy)',
            color: 'var(--navy)',
            padding: '0.875rem 2.25rem',
            borderRadius: 2,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}>
            {t('Смотреть весь каталог', 'View full catalog')}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .products-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
