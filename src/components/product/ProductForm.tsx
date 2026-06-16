'use client'

import { useState } from 'react'
import { Product, ProductVariant } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/context/LanguageContext'
import WishlistButton from '@/components/ui/WishlistButton'

interface ProductFormProps {
  product: Product
}

export default function ProductForm({ product }: ProductFormProps) {
  const sizes = [...new Set(product.variants.map(v => v.size))]
  const colors = [...new Map(product.variants.map(v => [v.color, v])).values()]

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.color ?? '')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { t } = useLang()

  const selectedVariant: ProductVariant | undefined = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  )

  const inStock = selectedVariant ? selectedVariant.stock > 0 : true

  function handleAddToCart() {
    if (!selectedSize || !selectedVariant) return
    addItem(product, selectedVariant, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const price = product.salePrice ?? product.price
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPct = hasDiscount ? Math.round((1 - product.salePrice! / product.price) * 100) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Цена */}
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
        {hasDiscount ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '2.25rem', fontWeight: 700, color: 'var(--burgundy)',
              lineHeight: 1,
            }}>
              {formatPrice(product.salePrice!)}
            </span>
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.1rem', color: '#ccc',
              textDecoration: 'line-through',
            }}>
              {formatPrice(product.price)}
            </span>
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.72rem', fontWeight: 700,
              background: 'var(--burgundy)', color: '#fff',
              padding: '0.2rem 0.6rem', borderRadius: 2,
              letterSpacing: '0.06em',
            }}>
              -{discountPct}%
            </span>
          </div>
        ) : (
          <span style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2.25rem', fontWeight: 700, color: 'var(--navy)',
            lineHeight: 1,
          }}>
            {formatPrice(product.price)}
          </span>
        )}
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.72rem', color: '#ccc',
          marginTop: '0.5rem', fontWeight: 300,
        }}>
          {t('Включая НДС · Доставка рассчитывается отдельно', 'VAT included · Delivery calculated separately')}
        </p>
      </div>

      {/* Цвет */}
      {colors.length > 1 && (
        <div>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--navy)', marginBottom: '0.75rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {t('Цвет:', 'Colour:')}&nbsp;<span style={{ fontWeight: 400, color: '#888', textTransform: 'none', letterSpacing: 0 }}>{t(selectedColor, colors.find(c => c.color === selectedColor)?.colorEn)}</span>
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {colors.map(v => (
              <button
                key={v.color}
                type="button"
                onClick={() => setSelectedColor(v.color)}
                title={t(v.color, v.colorEn)}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  border: selectedColor === v.color
                    ? '3px solid var(--navy)'
                    : '2px solid #ddd',
                  background: v.colorHex,
                  cursor: 'pointer',
                  boxShadow: selectedColor === v.color
                    ? '0 0 0 2px #fff, 0 0 0 4px var(--navy)'
                    : 'none',
                  transition: 'all 0.15s',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Размер */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--navy)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {t('Размер:', 'Size:')}&nbsp;<span style={{ fontWeight: 400, color: '#888', textTransform: 'none', letterSpacing: 0 }}>{selectedSize ?? t('не выбран', 'not selected')}</span>
          </p>
          <button type="button" style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.72rem', color: 'var(--gold)',
            background: 'none', border: 'none', cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: 3,
            padding: 0,
          }}>
            {t('Таблица размеров', 'Size chart')}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {sizes.map(size => {
            const variant = product.variants.find(v => v.size === size && v.color === selectedColor)
            const outOfStock = variant ? variant.stock === 0 : false
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                type="button"
                onClick={() => !outOfStock && setSelectedSize(size)}
                disabled={outOfStock}
                style={{
                  minWidth: 46, height: 44,
                  padding: '0 0.75rem',
                  border: isSelected ? '2px solid var(--navy)' : '1.5px solid #ddd',
                  borderRadius: 4,
                  background: isSelected ? 'var(--navy)' : '#fff',
                  color: outOfStock ? '#ddd' : isSelected ? '#fff' : '#444',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem', fontWeight: 600,
                  cursor: outOfStock ? 'not-allowed' : 'pointer',
                  textDecoration: outOfStock ? 'line-through' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
        {!selectedSize && (
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.72rem', color: 'var(--burgundy)',
            marginTop: '0.5rem',
          }}>
            {t('Выберите размер для добавления в корзину', 'Select a size to add to cart')}
          </p>
        )}
      </div>

      {/* Количество */}
      <div>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--navy)', marginBottom: '0.75rem',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {t('Количество', 'Quantity')}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: '1.5px solid #ddd', borderRadius: 4, width: 'fit-content',
        }}>
          <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            style={{
              width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 400,
            }}
          >
            −
          </button>
          <span style={{
            minWidth: 38, textAlign: 'center',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)',
          }}>
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(q => q + 1)}
            style={{
              width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 400,
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Кнопки */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!selectedSize || !inStock}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
            padding: '1rem 2rem',
            background: (!selectedSize || !inStock)
              ? '#e8e8e8'
              : addedToCart
              ? '#22863a'
              : 'var(--burgundy)',
            color: (!selectedSize || !inStock) ? '#bbb' : '#fff',
            border: 'none', borderRadius: 3, cursor: (!selectedSize || !inStock) ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}
        >
          {addedToCart ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              {t('Добавлено в корзину', 'Added to cart')}
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {t('Добавить в корзину', 'Add to cart')}
            </>
          )}
        </button>

        <button
          type="button"
          disabled={!selectedSize || !inStock}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
            padding: '1rem 2rem',
            background: 'transparent',
            color: (!selectedSize || !inStock) ? '#ccc' : 'var(--navy)',
            border: (!selectedSize || !inStock) ? '1.5px solid #e8e8e8' : '1.5px solid var(--navy)',
            borderRadius: 3, cursor: (!selectedSize || !inStock) ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          {t('Купить в 1 клик', 'Buy in 1 click')}
        </button>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WishlistButton productId={product.id} variant="large" />
        </div>
      </div>

      {/* Доставка */}
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.25rem' }}>
        {[
          { text: t('Доставка СДЭК, Boxberry, Почта России', 'Delivery by CDEK, Boxberry, Russian Post'), icon: '🚚' },
          { text: t('Самовывоз из пункта выдачи', 'Pickup from a collection point'), icon: '📍' },
          { text: t('Возврат в течение 14 дней', 'Returns within 14 days'), icon: '↩' },
        ].map(({ text }) => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.45rem 0',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--gold)', flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.82rem', color: '#666', fontWeight: 300,
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
