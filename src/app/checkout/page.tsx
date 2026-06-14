'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { useCart } from '@/context/CartContext'
import { formatPrice, cn } from '@/lib/utils'

const DELIVERY_OPTIONS = [
  { id: 'cdek', label: 'СДЭК', desc: '2–5 дней', price: 350 },
  { id: 'boxberry', label: 'Boxberry', desc: '3–6 дней', price: 290 },
  { id: 'russianpost', label: 'Почта России', desc: '5–14 дней', price: 200 },
  { id: 'pickup', label: 'Самовывоз', desc: 'Бесплатно', price: 0 },
]

const PAYMENT_OPTIONS = [
  { id: 'sbp', label: 'СБП (Система быстрых платежей)' },
  { id: 'card', label: 'Банковская карта (Visa, Mastercard, МИР)' },
  { id: 'tinkoff', label: 'Тинькофф Pay' },
  { id: 'sber', label: 'СберПей' },
  { id: 'alfa', label: 'Альфа-Банк' },
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
        <div className="container py-20 text-center">
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#888', marginBottom: '1.5rem' }}>
            Корзина пуста. Добавьте товары перед оформлением.
          </p>
          <a href="/catalog" className="btn-primary">Перейти в каталог</a>
        </div>
      </PageLayout>
    )
  }

  const inputCls = 'w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--navy)] transition-colors'

  return (
    <PageLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold text-[var(--navy)] mb-8" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Оформление заказа
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка */}
            <div className="lg:col-span-2 space-y-8">

              {/* Контактные данные */}
              <section className="bg-white border border-gray-100 rounded-lg p-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-5" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Контактные данные
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Имя *</label>
                    <input required value={form.firstName} onChange={set('firstName')} className={inputCls} placeholder="Иван" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Фамилия *</label>
                    <input required value={form.lastName} onChange={set('lastName')} className={inputCls} placeholder="Иванов" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Телефон *</label>
                    <input required type="tel" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+7 (999) 000-00-00" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Email *</label>
                    <input required type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="ivan@mail.ru" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                  </div>
                </div>
              </section>

              {/* Доставка */}
              <section className="bg-white border border-gray-100 rounded-lg p-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-5" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Доставка
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {DELIVERY_OPTIONS.map(opt => (
                    <label key={opt.id} className={cn(
                      'flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all',
                      delivery === opt.id ? 'border-[var(--navy)] bg-[var(--beige)]' : 'border-gray-200 hover:border-gray-300'
                    )}>
                      <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={() => setDelivery(opt.id)} className="mt-0.5 accent-[var(--burgundy)]" />
                      <div>
                        <p className="font-semibold text-sm text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{opt.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{opt.desc}</p>
                        <p className="text-xs font-semibold text-[var(--burgundy)] mt-1" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                          {total >= FREE_DELIVERY_FROM || opt.price === 0 ? 'Бесплатно' : formatPrice(opt.price)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {delivery !== 'pickup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Город *</label>
                      <input required value={form.city} onChange={set('city')} className={inputCls} placeholder="Москва" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Адрес / пункт выдачи *</label>
                      <input required value={form.address} onChange={set('address')} className={inputCls} placeholder="ул. Пушкина, д. 1" style={{ fontFamily: 'var(--font-inter), sans-serif' }} />
                    </div>
                  </div>
                )}
              </section>

              {/* Оплата */}
              <section className="bg-white border border-gray-100 rounded-lg p-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-5" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Способ оплаты
                </h2>
                <div className="space-y-2">
                  {PAYMENT_OPTIONS.map(opt => (
                    <label key={opt.id} className={cn(
                      'flex items-center gap-3 p-3.5 border-2 rounded-lg cursor-pointer transition-all',
                      payment === opt.id ? 'border-[var(--navy)] bg-[var(--beige)]' : 'border-gray-200 hover:border-gray-300'
                    )}>
                      <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-[var(--burgundy)]" />
                      <span className="text-sm text-[var(--navy)] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Комментарий */}
              <section className="bg-white border border-gray-100 rounded-lg p-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Комментарий к заказу
                </h2>
                <textarea
                  value={form.comment}
                  onChange={set('comment')}
                  rows={3}
                  className={inputCls}
                  placeholder="Пожелания по заказу, удобное время звонка..."
                  style={{ fontFamily: 'var(--font-inter), sans-serif', resize: 'none' }}
                />
              </section>
            </div>

            {/* Правая колонка — итог */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-lg p-6 sticky top-28">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-4 pb-4 border-b border-gray-100" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  Ваш заказ
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map(({ product, variant, quantity }) => (
                    <div key={`${product.id}-${variant.id}`} className="flex justify-between gap-3 text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[var(--navy)] font-medium leading-snug truncate">{product.name}</p>
                        <p className="text-gray-400 text-xs">{variant.size} · {variant.color} · {quantity} шт.</p>
                      </div>
                      <span className="font-semibold text-[var(--navy)] flex-shrink-0">
                        {formatPrice((product.salePrice ?? product.price) * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span>Товары</span><span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span>Доставка</span>
                    <span>{deliveryPrice === 0 ? 'Бесплатно' : formatPrice(deliveryPrice)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[var(--navy)] pt-2 border-t border-gray-100" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span>Итого</span><span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'btn-primary w-full text-sm py-4',
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  )}
                >
                  {loading ? 'Обработка...' : `Оплатить ${formatPrice(grandTotal)}`}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="/offer" className="underline hover:text-[var(--navy)]">публичной офертой</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
