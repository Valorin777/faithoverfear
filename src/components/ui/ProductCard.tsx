'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import WishlistButton from './WishlistButton'
import { useLang } from '@/context/LanguageContext'

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useLang()
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const sizes = [...new Set(product.variants.map(v => v.size))]

  return (
    <div className="product-card-lux" style={{
      background: '#fff',
      border: '1px solid #efefef',
      borderRadius: 4,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Фото */}
      <Link href={`/product/${product.slug}`} style={{ display: 'block', position: 'relative', textDecoration: 'none' }}>
        <div style={{
          aspectRatio: '3/4',
          background: 'var(--beige)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Плейсхолдер */}
          <div className="pc-image" style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="40" viewBox="0 0 32 44" fill="none" style={{ opacity: 0.1 }}>
              <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
              <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
            </svg>
          </div>

          {/* Бейджи */}
          <div style={{
            position: 'absolute', top: 8, left: 8,
            display: 'flex', flexDirection: 'column', gap: 3,
          }}>
            {product.isNew && (
              <span style={{
                background: 'var(--navy)', color: '#fff',
                fontSize: '0.58rem', fontWeight: 700,
                padding: '2px 7px', borderRadius: 2,
                fontFamily: 'var(--font-inter), sans-serif',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{t('Новинка', 'New')}</span>
            )}
            {hasDiscount && (
              <span style={{
                background: 'var(--burgundy)', color: '#fff',
                fontSize: '0.58rem', fontWeight: 700,
                padding: '2px 7px', borderRadius: 2,
                fontFamily: 'var(--font-inter), sans-serif',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{t('Скидка', 'Sale')}</span>
            )}
            {product.isBestseller && !product.isNew && (
              <span style={{
                background: 'var(--gold)', color: 'var(--navy)',
                fontSize: '0.58rem', fontWeight: 700,
                padding: '2px 7px', borderRadius: 2,
                fontFamily: 'var(--font-inter), sans-serif',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{t('Хит', 'Top')}</span>
            )}
          </div>

          {/* Кнопка избранное */}
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </Link>

      {/* Информация */}
      <div style={{
        padding: '0.75rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}>
        {/* Название */}
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--navy)',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.name}
          </h3>
        </Link>

        {/* Размеры */}
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {sizes.map(s => (
            <span key={s} style={{
              fontSize: '0.58rem',
              color: '#bbb',
              fontFamily: 'var(--font-inter), sans-serif',
              border: '1px solid #ebebeb',
              borderRadius: 2,
              padding: '1px 4px',
            }}>{s}</span>
          ))}
        </div>

        {/* Цена */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {hasDiscount ? (
            <>
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700, color: 'var(--burgundy)', fontSize: '0.9rem',
              }}>
                {formatPrice(product.salePrice!)}
              </span>
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                color: '#ccc', fontSize: '0.75rem', textDecoration: 'line-through',
              }}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem',
            }}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Кнопка — всегда видна */}
        <Link href={`/product/${product.slug}`} className="pc-cta" style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.55rem',
          background: 'var(--navy)',
          color: '#fff',
          borderRadius: 2,
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginTop: '0.25rem',
        }}>
          {t('Выбрать', 'View')}
        </Link>
      </div>
    </div>
  )
}
