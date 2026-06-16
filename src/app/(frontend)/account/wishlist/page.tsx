'use client'

import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import ProductCard from '@/components/ui/ProductCard'
import { useWishlist } from '@/context/WishlistContext'
import { useLang } from '@/context/LanguageContext'
import { products } from '@/data/products'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const { t } = useLang()
  const items = products.filter(p => ids.includes(p.id))

  return (
    <PageLayout>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3rem 0 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem',
            letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)',
            fontWeight: 500, marginBottom: '0.75rem',
          }}>
            {t('Отложенные товары', 'Saved items')}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#fff', fontWeight: 700,
          }}>
            {t('Избранное', 'Wishlist')}
          </h1>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1.25rem auto 0', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ background: 'var(--beige)', padding: '2.5rem 0 4rem', minHeight: '40vh' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }} className="fade-in">
              <div style={{
                width: 80, height: 80, borderRadius: '50%', background: '#fff',
                margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid #ece9e3',
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem',
                color: '#999', fontWeight: 300, marginBottom: '1.5rem',
              }}>
                {t('В избранном пока пусто. Нажмите ♥ на карточке товара, чтобы отложить его.', 'Your wishlist is empty. Tap ♥ on a product card to save it.')}
              </p>
              <Link href="/catalog" style={{
                display: 'inline-flex', background: 'var(--navy)', color: '#fff',
                padding: '0.9rem 2.25rem', borderRadius: 3, textDecoration: 'none',
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {t('Перейти в каталог', 'Go to catalog')}
              </Link>
            </div>
          ) : (
            <>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem',
                color: '#999', marginBottom: '1.5rem',
              }}>
                {items.length} {t(items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров', items.length === 1 ? 'item' : 'items')}
              </p>
              <div className="wishlist-grid" style={{ display: 'grid', gap: '1rem' }}>
                {items.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .wishlist-grid { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 640px) { .wishlist-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .wishlist-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </PageLayout>
  )
}
