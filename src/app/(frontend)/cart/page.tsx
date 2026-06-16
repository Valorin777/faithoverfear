'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/context/LanguageContext'
import { formatPrice } from '@/lib/utils'

const DELIVERY_OPTIONS = [
  { id: 'cdek', label: 'СДЭК', desc: 'До пункта выдачи или курьером · 2–5 дней', price: 350 },
  { id: 'boxberry', label: 'Boxberry', desc: 'До пункта выдачи · 3–6 дней', price: 290 },
  { id: 'russianpost', label: 'Почта России', desc: 'В любую точку РФ · 5–14 дней', price: 200 },
  { id: 'pickup', label: 'Самовывоз', desc: 'Из пункта выдачи · бесплатно', price: 0 },
]

const FREE_DELIVERY_FROM = 3500

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const { t } = useLang()
  const [delivery, setDelivery] = useState('cdek')

  const deliveryPrice = total >= FREE_DELIVERY_FROM
    ? 0
    : DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0

  const grandTotal = total + deliveryPrice
  const remaining = Math.max(0, FREE_DELIVERY_FROM - total)
  const progress = Math.min(100, (total / FREE_DELIVERY_FROM) * 100)
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  if (items.length === 0) {
    return (
      <PageLayout>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '5rem 1.25rem',
          textAlign: 'center',
        }} className="fade-in">
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--beige)', margin: '0 auto 1.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.75rem', fontWeight: 700, color: 'var(--navy)',
            marginBottom: '0.75rem',
          }}>
            {t('Корзина пуста', 'Your cart is empty')}
          </h1>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.95rem', color: '#999', fontWeight: 300,
            marginBottom: '2rem',
          }}>
            {t('Добавьте товары из каталога, чтобы оформить заказ', 'Add products from the catalog to place an order')}
          </p>
          <Link href="/catalog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--navy)', color: '#fff',
            padding: '0.95rem 2.25rem', borderRadius: 3,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {t('Перейти в каталог', 'Go to catalog')}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div style={{ background: 'var(--beige)', minHeight: '70vh' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>

          {/* Заголовок */}
          <div style={{ marginBottom: '2rem' }} className="fade-in">
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700, color: 'var(--navy)',
              marginBottom: '0.35rem',
            }}>
              {t('Корзина', 'Cart')}
            </h1>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.85rem', color: '#999', fontWeight: 300,
            }}>
              {itemCount} {itemCount === 1 ? 'товар' : itemCount < 5 ? 'товара' : 'товаров'} на сумму {formatPrice(total)}
            </p>
          </div>

          <div className="cart-layout" style={{ display: 'grid', gap: '1.5rem', alignItems: 'start' }}>

            {/* Товары */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }} className="stagger">
              {items.map(({ product, variant, quantity }) => (
                <div
                  key={`${product.id}-${variant.id}`}
                  className="hover-lift"
                  style={{
                    display: 'flex', gap: '1rem',
                    background: '#fff', borderRadius: 10,
                    padding: '1rem', border: '1px solid #ece9e3',
                  }}
                >
                  {/* Фото */}
                  <Link href={`/product/${product.slug}`} style={{
                    width: 92, height: 92, flexShrink: 0,
                    borderRadius: 8, overflow: 'hidden',
                    background: 'linear-gradient(135deg, var(--beige) 0%, var(--gold-light) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="20" height="28" viewBox="0 0 32 44" fill="none" style={{ opacity: 0.25 }}>
                      <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                      <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
                    </svg>
                  </Link>

                  {/* Инфо */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <Link href={`/product/${product.slug}`} style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)',
                      lineHeight: 1.3, marginBottom: '0.3rem', textDecoration: 'none',
                    }}>
                      {t(product.name, product.nameEn)}
                    </Link>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.72rem', color: '#aaa', marginBottom: 'auto',
                    }}>
                      {t('Размер:', 'Size:')} {variant.size} · {t('Цвет:', 'Colour:')} {t(variant.color, variant.colorEn)}
                    </p>

                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem',
                    }}>
                      {/* Кол-во */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1.5px solid #eee', borderRadius: 6,
                      }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, variant.id, quantity - 1)}
                          style={qtyBtn}
                          aria-label={t('Уменьшить', 'Decrease')}
                        >−</button>
                        <span style={{
                          minWidth: 32, textAlign: 'center',
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)',
                        }}>{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, variant.id, quantity + 1)}
                          style={qtyBtn}
                          aria-label={t('Увеличить', 'Increase')}
                        >+</button>
                      </div>

                      {/* Цена + удалить */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '1rem', fontWeight: 700, color: 'var(--navy)',
                        }}>
                          {formatPrice((product.salePrice ?? product.price) * quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id, variant.id)}
                          aria-label={t('Удалить', 'Remove')}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#ccc', padding: 4, display: 'flex',
                            transition: 'color 0.18s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--burgundy)')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Продолжить покупки */}
              <Link href="/catalog" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '0.5rem',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.8rem', color: 'var(--navy)', fontWeight: 500,
                textDecoration: 'none',
              }} className="nav-underline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                {t('Продолжить покупки', 'Continue shopping')}
              </Link>
            </div>

            {/* Итог */}
            <div className="cart-summary fade-in">
              <div style={{
                background: '#fff', borderRadius: 12,
                border: '1px solid #ece9e3', padding: '1.5rem',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)',
                  marginBottom: '1.25rem', paddingBottom: '1rem',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  {t('Итого', 'Summary')}
                </h2>

                {/* Прогресс бесплатной доставки */}
                {total < FREE_DELIVERY_FROM ? (
                  <div style={{
                    background: 'var(--beige)', borderRadius: 8,
                    padding: '0.875rem 1rem', marginBottom: '1.25rem',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.74rem', color: 'var(--navy)',
                      marginBottom: '0.6rem', lineHeight: 1.5,
                    }}>
                      {t('Добавьте ещё', 'Add')} <strong style={{ color: 'var(--burgundy)' }}>{formatPrice(remaining)}</strong> {t('до бесплатной доставки', 'more for free delivery')}
                    </p>
                    <div style={{
                      height: 6, background: '#e8ddc8', borderRadius: 99, overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--gold) 0%, #e8c96a 100%)',
                        borderRadius: 99, transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(34,134,58,0.08)', borderRadius: 8,
                    padding: '0.75rem 1rem', marginBottom: '1.25rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22863a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.78rem', color: '#22863a', fontWeight: 600,
                    }}>
                      {t('Бесплатная доставка применена', 'Free delivery applied')}
                    </span>
                  </div>
                )}

                {/* Способ доставки */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {t('Способ доставки', 'Delivery method')}
                    </p>
                    <Link href="/delivery" style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600,
                      textDecoration: 'underline', textUnderlineOffset: 2,
                    }}>
                      {t('Подробнее', 'Details')}
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {DELIVERY_OPTIONS.map(opt => {
                      const active = delivery === opt.id
                      const free = total >= FREE_DELIVERY_FROM || opt.price === 0
                      return (
                        <label key={opt.id} style={{
                          display: 'flex', alignItems: 'center', gap: '0.6rem',
                          padding: '0.6rem 0.75rem', borderRadius: 7, cursor: 'pointer',
                          border: active ? '1.5px solid var(--navy)' : '1.5px solid #eee',
                          background: active ? 'var(--beige)' : '#fff',
                          transition: 'all 0.18s',
                        }}>
                          <input
                            type="radio" name="delivery" value={opt.id}
                            checked={active} onChange={() => setDelivery(opt.id)}
                            style={{ accentColor: 'var(--burgundy)', flexShrink: 0 }}
                          />
                          <span style={{
                            flex: 1,
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.82rem', color: 'var(--navy)', fontWeight: 500,
                          }}>
                            {opt.label}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.78rem', fontWeight: 700,
                            color: free ? '#22863a' : 'var(--navy)',
                          }}>
                            {free ? t('Бесплатно', 'Free') : formatPrice(opt.price)}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Суммы */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                  <Row label={`${t('Товары', 'Items')} (${itemCount} ${t('шт.', 'pcs')})`} value={formatPrice(total)} />
                  <Row label={t('Доставка', 'Delivery')} value={deliveryPrice === 0 ? t('Бесплатно', 'Free') : formatPrice(deliveryPrice)} valueColor={deliveryPrice === 0 ? '#22863a' : undefined} />
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  paddingTop: '1rem', marginTop: '0.75rem', borderTop: '1px solid #f0f0f0',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    {t('К оплате', 'Total')}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)',
                  }}>
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <Link href="/checkout" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  background: 'var(--burgundy)', color: '#fff',
                  padding: '1rem', borderRadius: 4,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--burgundy-dk)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--burgundy)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {t('Оформить заказ', 'Checkout')}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>

                {/* Бейджи доверия */}
                <div style={{
                  display: 'flex', justifyContent: 'center', gap: '1.25rem',
                  marginTop: '1.25rem', flexWrap: 'wrap',
                }}>
                  {[{ ru: 'Безопасная оплата', en: 'Secure payment' }, { ru: 'Возврат 14 дней', en: '14-day returns' }].map(b => (
                    <div key={b.ru} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '0.66rem', color: '#aaa',
                      }}>{t(b.ru, b.en)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-layout { grid-template-columns: 1fr; }
        .cart-summary { position: static; }
        @media (min-width: 1024px) {
          .cart-layout { grid-template-columns: 1fr 360px; }
          .cart-summary { position: sticky; top: 90px; }
        }
      `}</style>
    </PageLayout>
  )
}

const qtyBtn: React.CSSProperties = {
  width: 34, height: 34,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'none', border: 'none', cursor: 'pointer',
  color: 'var(--navy)', fontSize: '1rem',
}

function Row({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '0.82rem', color: '#888',
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '0.82rem', color: valueColor ?? 'var(--navy)', fontWeight: 600,
      }}>{value}</span>
    </div>
  )
}
