'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const DELIVERY_OPTIONS = [
  { id: 'cdek', label: 'СДЭК', desc: '2–5 дней', price: 350 },
  { id: 'boxberry', label: 'Boxberry', desc: '3–6 дней', price: 290 },
  { id: 'russianpost', label: 'Почта России', desc: '5–14 дней', price: 200 },
  { id: 'pickup', label: 'Самовывоз', desc: 'Бесплатно', price: 0 },
]

const PAYMENT_OPTIONS = [
  { id: 'sbp', label: 'СБП — Система быстрых платежей', hint: 'Без комиссии' },
  { id: 'card', label: 'Банковская карта', hint: 'Visa · Mastercard · МИР' },
  { id: 'tinkoff', label: 'Тинькофф Pay', hint: '' },
  { id: 'sber', label: 'СберПей', hint: '' },
  { id: 'alfa', label: 'Альфа-Банк', hint: '' },
]

const FREE_DELIVERY_FROM = 3500

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()

  const [delivery, setDelivery] = useState('cdek')
  const [payment, setPayment] = useState('card')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    city: '', address: '', comment: '',
  })

  const deliveryPrice = total >= FREE_DELIVERY_FROM ? 0
    : DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0
  const grandTotal = total + deliveryPrice

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    clearCart()
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <PageLayout>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.25rem', textAlign: 'center' }} className="fade-in">
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#888', marginBottom: '1.5rem' }}>
            Корзина пуста. Добавьте товары перед оформлением.
          </p>
          <Link href="/catalog" style={{
            display: 'inline-flex', background: 'var(--navy)', color: '#fff',
            padding: '0.9rem 2.25rem', borderRadius: 3,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Перейти в каталог</Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div style={{ background: 'var(--beige)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>

          {/* Заголовок + крошки */}
          <div style={{ marginBottom: '2rem' }} className="fade-in">
            <nav style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
              fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem',
              color: '#bbb', marginBottom: '0.75rem',
            }}>
              <Link href="/cart" style={{ color: '#bbb', textDecoration: 'none' }}>Корзина</Link>
              <span>/</span>
              <span style={{ color: 'var(--navy)' }}>Оформление</span>
            </nav>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700, color: 'var(--navy)',
            }}>
              Оформление заказа
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="checkout-layout" style={{ display: 'grid', gap: '1.5rem', alignItems: 'start' }}>

              {/* Левая колонка */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="stagger">

                {/* Контактные данные */}
                <Section icon="user" title="Контактные данные">
                  <div className="field-grid" style={{ display: 'grid', gap: '1rem' }}>
                    <Field label="Имя *" value={form.firstName} onChange={set('firstName')} placeholder="Иван" required />
                    <Field label="Фамилия *" value={form.lastName} onChange={set('lastName')} placeholder="Иванов" required />
                    <Field label="Телефон *" type="tel" value={form.phone} onChange={set('phone')} placeholder="+7 (999) 000-00-00" required />
                    <Field label="Email *" type="email" value={form.email} onChange={set('email')} placeholder="ivan@mail.ru" required />
                  </div>
                </Section>

                {/* Доставка */}
                <Section icon="truck" title="Доставка по России" titleLink="/delivery" titleLinkLabel="Все условия">
                  <div className="delivery-grid" style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
                    {DELIVERY_OPTIONS.map(opt => {
                      const active = delivery === opt.id
                      const free = total >= FREE_DELIVERY_FROM || opt.price === 0
                      return (
                        <label key={opt.id} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.7rem',
                          padding: '0.9rem 1rem', borderRadius: 8, cursor: 'pointer',
                          border: active ? '2px solid var(--navy)' : '2px solid #eee',
                          background: active ? 'var(--beige)' : '#fff',
                          transition: 'all 0.18s',
                        }}>
                          <input
                            type="radio" name="delivery" value={opt.id}
                            checked={active} onChange={() => setDelivery(opt.id)}
                            style={{ accentColor: 'var(--burgundy)', marginTop: 2, flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)',
                            }}>{opt.label}</p>
                            <p style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: '0.72rem', color: '#aaa', marginTop: 2,
                            }}>{opt.desc}</p>
                            <p style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: '0.76rem', fontWeight: 700,
                              color: free ? '#22863a' : 'var(--burgundy)', marginTop: 4,
                            }}>{free ? 'Бесплатно' : formatPrice(opt.price)}</p>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  {/* Подсказка про оплату доставки отдельно */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                    background: 'rgba(201,168,76,0.08)', borderRadius: 7,
                    padding: '0.7rem 0.875rem', marginBottom: delivery !== 'pickup' ? '1rem' : 0,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.74rem', color: '#8a7a3f', lineHeight: 1.5,
                    }}>
                      Стоимость доставки не входит в цену товара и добавляется к заказу.
                      При сумме от {formatPrice(FREE_DELIVERY_FROM)} — доставка бесплатно.
                    </p>
                  </div>

                  {delivery !== 'pickup' && (
                    <div className="field-grid" style={{ display: 'grid', gap: '1rem' }}>
                      <Field label="Город *" value={form.city} onChange={set('city')} placeholder="Москва" required />
                      <Field label="Адрес / пункт выдачи *" value={form.address} onChange={set('address')} placeholder="ул. Пушкина, д. 1" required />
                    </div>
                  )}
                </Section>

                {/* Оплата */}
                <Section icon="card" title="Способ оплаты">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {PAYMENT_OPTIONS.map(opt => {
                      const active = payment === opt.id
                      return (
                        <label key={opt.id} style={{
                          display: 'flex', alignItems: 'center', gap: '0.7rem',
                          padding: '0.85rem 1rem', borderRadius: 8, cursor: 'pointer',
                          border: active ? '2px solid var(--navy)' : '2px solid #eee',
                          background: active ? 'var(--beige)' : '#fff',
                          transition: 'all 0.18s',
                        }}>
                          <input
                            type="radio" name="payment" value={opt.id}
                            checked={active} onChange={() => setPayment(opt.id)}
                            style={{ accentColor: 'var(--burgundy)', flexShrink: 0 }}
                          />
                          <span style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.85rem', fontWeight: 500, color: 'var(--navy)',
                          }}>{opt.label}</span>
                          {opt.hint && (
                            <span style={{
                              marginLeft: 'auto',
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: '0.68rem', color: '#bbb',
                            }}>{opt.hint}</span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                </Section>

                {/* Комментарий */}
                <Section icon="message" title="Комментарий к заказу">
                  <textarea
                    value={form.comment}
                    onChange={set('comment')}
                    rows={3}
                    placeholder="Пожелания по заказу, удобное время звонка..."
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      border: '1.5px solid #e8e8e8', borderRadius: 6,
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.85rem', color: 'var(--navy)',
                      outline: 'none', resize: 'vertical',
                    }}
                  />
                </Section>
              </div>

              {/* Правая колонка — итог */}
              <div className="checkout-summary fade-in">
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
                    Ваш заказ
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
                    {items.map(({ product, variant, quantity }) => (
                      <div key={`${product.id}-${variant.id}`} style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{
                          width: 48, height: 48, flexShrink: 0, borderRadius: 6,
                          background: 'linear-gradient(135deg, var(--beige) 0%, var(--gold-light) 100%)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="12" height="16" viewBox="0 0 32 44" fill="none" style={{ opacity: 0.3 }}>
                            <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                            <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
                          </svg>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy)',
                            lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{product.name}</p>
                          <p style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.68rem', color: '#aaa', marginTop: 2,
                          }}>{variant.size} · {variant.color} · {quantity} шт.</p>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', flexShrink: 0,
                        }}>
                          {formatPrice((product.salePrice ?? product.price) * quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                    <SummaryRow label="Товары" value={formatPrice(total)} />
                    <SummaryRow label="Доставка" value={deliveryPrice === 0 ? 'Бесплатно' : formatPrice(deliveryPrice)} valueColor={deliveryPrice === 0 ? '#22863a' : undefined} />
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
                    }}>Итого</span>
                    <span style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)',
                    }}>{formatPrice(grandTotal)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      width: '100%', background: loading ? '#9a6470' : 'var(--burgundy)',
                      color: '#fff', border: 'none', borderRadius: 4, padding: '1.05rem',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.78rem', fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 15, height: 15, borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff',
                          display: 'inline-block', animation: 'spin 0.7s linear infinite',
                        }} />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                        Оплатить {formatPrice(grandTotal)}
                      </>
                    )}
                  </button>

                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.68rem', color: '#bbb', textAlign: 'center', marginTop: '0.875rem',
                  }}>
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <Link href="/offer" style={{ color: '#999', textDecoration: 'underline' }}>публичной офертой</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .checkout-layout { grid-template-columns: 1fr; }
        .checkout-summary { position: static; }
        .field-grid { grid-template-columns: 1fr; }
        .delivery-grid { grid-template-columns: 1fr; }
        @media (min-width: 540px) {
          .field-grid { grid-template-columns: 1fr 1fr; }
          .delivery-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .checkout-layout { grid-template-columns: 1fr 360px; }
          .checkout-summary { position: sticky; top: 90px; }
        }
        input:focus, textarea:focus { border-color: var(--navy) !important; }
      `}</style>
    </PageLayout>
  )
}

/* ── Вспомогательные компоненты ── */

function Section({ icon, title, titleLink, titleLinkLabel, children }: {
  icon: string; title: string; titleLink?: string; titleLinkLabel?: string; children: React.ReactNode
}) {
  return (
    <section style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid #ece9e3', padding: '1.5rem',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.25rem', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: 'var(--beige)', color: 'var(--navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={icon} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)',
          }}>{title}</h2>
        </div>
        {titleLink && (
          <Link href={titleLink} style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600,
            textDecoration: 'underline', textUnderlineOffset: 2, whiteSpace: 'nowrap',
          }}>{titleLinkLabel}</Link>
        )}
      </div>
      {children}
    </section>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; placeholder: string; type?: string; required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '0.7rem', fontWeight: 600, color: '#666',
        marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        style={{
          width: '100%', boxSizing: 'border-box',
          border: '1.5px solid #e8e8e8', borderRadius: 6,
          padding: '0.7rem 1rem',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.85rem', color: 'var(--navy)', outline: 'none',
          transition: 'border-color 0.18s',
        }}
      />
    </div>
  )
}

function SummaryRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: '#888' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: valueColor ?? 'var(--navy)', fontWeight: 600 }}>{value}</span>
    </div>
  )
}

function Icon({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'user': return <svg {...common}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    case 'truck': return <svg {...common}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    case 'card': return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
    case 'message': return <svg {...common}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    default: return null
  }
}
