'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const DELIVERY_OPTIONS = [
  { id: 'cdek', label: 'СДЭК', desc: 'Доставка 2–5 дней', price: 350 },
  { id: 'boxberry', label: 'Boxberry', desc: 'Доставка 3–6 дней', price: 290 },
  { id: 'russianpost', label: 'Почта России', desc: 'Доставка 5–14 дней', price: 200 },
  { id: 'pickup', label: 'Самовывоз', desc: 'Бесплатно из пункта выдачи', price: 0 },
]

const FREE_DELIVERY_FROM = 3500

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [delivery, setDelivery] = useState('cdek')

  const deliveryPrice = total >= FREE_DELIVERY_FROM
    ? 0
    : DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0

  const grandTotal = total + deliveryPrice

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--beige)] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-[var(--gold)]" />
          </div>
          <h1
            className="text-2xl font-bold text-[var(--navy)] mb-3"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Корзина пуста
          </h1>
          <p className="text-gray-500 mb-8" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Добавьте товары из каталога, чтобы оформить заказ
          </p>
          <Link href="/catalog" className="btn-primary inline-block">
            Перейти в каталог
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="container py-10">
        <h1
          className="text-3xl font-bold text-[var(--navy)] mb-8"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Корзина
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, variant, quantity }) => (
              <div
                key={`${product.id}-${variant.id}`}
                className="flex gap-4 p-4 border border-gray-100 rounded-lg bg-white"
              >
                {/* Изображение-плейсхолдер */}
                <div className="w-24 h-24 flex-shrink-0 rounded bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] flex items-center justify-center">
                  <svg width="20" height="28" viewBox="0 0 32 44" fill="none" className="opacity-20">
                    <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                    <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
                  </svg>
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-semibold text-[var(--navy)] hover:text-[var(--burgundy)] transition-colors text-sm leading-snug block mb-1"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    Размер: {variant.size} · Цвет: {variant.color}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    {/* Количество */}
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(product.id, variant.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--navy)] hover:bg-gray-50 transition-colors text-base"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, variant.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--navy)] hover:bg-gray-50 transition-colors text-base"
                      >
                        +
                      </button>
                    </div>

                    {/* Цена */}
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {formatPrice((product.salePrice ?? product.price) * quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(product.id, variant.id)}
                        className="text-gray-300 hover:text-[var(--burgundy)] transition-colors p-1"
                        aria-label="Удалить"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Итог */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-lg p-6 sticky top-28">
              <h2
                className="text-lg font-bold text-[var(--navy)] mb-5 pb-4 border-b border-gray-100"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Итого
              </h2>

              {/* Товары */}
              <div className="flex justify-between text-sm text-gray-600 mb-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                <span>Товары ({items.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Доставка */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-[var(--navy)] mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  Способ доставки
                </p>
                <div className="space-y-2">
                  {DELIVERY_OPTIONS.map(opt => (
                    <label key={opt.id} className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.id}
                        checked={delivery === opt.id}
                        onChange={() => setDelivery(opt.id)}
                        className="mt-0.5 accent-[var(--burgundy)]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-[var(--navy)] font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                            {opt.label}
                          </span>
                          <span className="text-sm font-semibold text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                            {total >= FREE_DELIVERY_FROM ? 'Бесплатно' : opt.price === 0 ? 'Бесплатно' : formatPrice(opt.price)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                          {opt.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {total < FREE_DELIVERY_FROM && (
                <div className="text-xs text-[var(--gold)] bg-[var(--beige)] rounded p-2.5 mb-4" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  Добавьте ещё {formatPrice(FREE_DELIVERY_FROM - total)} для бесплатной доставки
                </div>
              )}

              {/* Итоговая сумма */}
              <div className="flex justify-between text-base font-bold text-[var(--navy)] pt-4 border-t border-gray-100 mb-5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                <span>К оплате</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
                Оформить заказ <ArrowRight size={16} />
              </Link>

              <Link
                href="/catalog"
                className="block text-center text-sm text-gray-400 hover:text-[var(--navy)] transition-colors mt-3"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
