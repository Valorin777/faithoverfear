'use client'

import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'
import { useSettings } from '@/context/SettingsContext'

const DEFAULT_DELIVERY = [
  { name: 'СДЭК', nameEn: 'CDEK', time: '2–5 рабочих дней', timeEn: '2–5 business days', price: 'от 290 ₽', priceEn: 'from 290 ₽', desc: 'Доставка до пункта выдачи или курьером до двери. Отслеживание заказа в личном кабинете СДЭК.', descEn: 'Delivery to a pickup point or by courier to your door. Track your order in the CDEK account.' },
  { name: 'Boxberry', nameEn: 'Boxberry', time: '3–6 рабочих дней', timeEn: '3–6 business days', price: 'от 250 ₽', priceEn: 'from 250 ₽', desc: 'Доставка до пункта выдачи. Широкая сеть по всей России.', descEn: 'Delivery to a pickup point. A wide network across Russia.' },
  { name: 'Почта России', nameEn: 'Russian Post', time: '5–14 рабочих дней', timeEn: '5–14 business days', price: 'от 180 ₽', priceEn: 'from 180 ₽', desc: 'Доставка в любую точку России, включая удалённые регионы.', descEn: 'Delivery to anywhere in Russia, including remote regions.' },
  { name: 'Самовывоз', nameEn: 'Pickup', time: 'После подтверждения', timeEn: 'After confirmation', price: 'Бесплатно', priceEn: 'Free', desc: 'Уточните адрес при оформлении заказа.', descEn: 'Confirm the address at checkout.' },
]

const DEFAULT_PAYMENT = [
  { ru: 'ЮKassa — банковские карты, SberPay, рассрочка', en: 'YooKassa — bank cards, SberPay, instalments' },
  { ru: 'СБП (Система быстрых платежей) — мгновенно, без комиссии', en: 'SBP (Faster Payments System) — instant, no fees' },
  { ru: 'Тинькофф Pay', en: 'Tinkoff Pay' },
  { ru: 'СберПей', en: 'SberPay' },
  { ru: 'Криптовалюта — USDT, BTC, ETH', en: 'Cryptocurrency — USDT, BTC, ETH' },
]

export default function DeliveryContent() {
  const { t } = useLang()
  const settings = useSettings()
  const deliveryMethods = settings.deliveryMethods.length
    ? settings.deliveryMethods.map((m) => ({ name: m.name, nameEn: m.nameEn, time: m.time, timeEn: m.timeEn, price: m.price, priceEn: m.priceEn, desc: m.description, descEn: m.descriptionEn }))
    : DEFAULT_DELIVERY
  // Способы оплаты берём из коллекции «Способы оплаты» (включённые). Если пусто — запасной список.
  const paymentMethods = settings.paymentSystems.length
    ? settings.paymentSystems.map((p) => ({
        ru: p.hint ? `${p.name} — ${p.hint}` : p.name,
        en: p.nameEn
          ? p.hintEn
            ? `${p.nameEn} — ${p.hintEn}`
            : p.nameEn
          : p.hint
            ? `${p.name} — ${p.hint}`
            : p.name,
      }))
    : DEFAULT_PAYMENT
  return (
    <PageLayout>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontWeight: 500, marginBottom: '0.75rem',
          }}>
            {t('Логистика', 'Logistics')}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff', fontWeight: 700,
          }}>
            {t('Доставка и оплата', 'Delivery & Payment')}
          </h1>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1.25rem auto 0', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '4rem 0 5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.25rem' }}>

          {/* Бесплатная доставка */}
          <div style={{
            background: 'linear-gradient(135deg, var(--navy) 0%, #1a2440 100%)',
            borderRadius: 8, padding: '1.5rem 2rem',
            marginBottom: '3rem',
            display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(201,168,76,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 4v4h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.75rem', fontWeight: 700,
                color: 'var(--gold)', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: '0.2rem',
              }}>
                {t('Специальное предложение', 'Special offer')}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.95rem', fontWeight: 600, color: '#fff',
              }}>
                {t('Бесплатная доставка при заказе от 3 500 ₽', 'Free delivery on orders over 3 500 ₽')}
              </p>
            </div>
          </div>

          {/* Способы доставки */}
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.5rem', fontWeight: 700,
            color: 'var(--navy)', marginBottom: '1.5rem',
          }}>
            {t('Способы доставки', 'Delivery methods')}
          </h2>
          <div className="delivery-grid" style={{ display: 'grid', gap: '1rem', marginBottom: '3.5rem' }}>
            {deliveryMethods.map(m => (
              <div key={m.name} style={{
                background: '#fff', border: '1.5px solid #f0f0f0',
                borderRadius: 8, padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem', gap: '0.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1rem', fontWeight: 700, color: 'var(--navy)',
                  }}>
                    {t(m.name, m.nameEn)}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.82rem', fontWeight: 700,
                    color: 'var(--burgundy)', whiteSpace: 'nowrap',
                  }}>
                    {t(m.price, m.priceEn)}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.72rem', color: 'var(--gold)',
                  fontWeight: 500, marginBottom: '0.6rem',
                }}>
                  {t(m.time, m.timeEn)}
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem', color: '#777', fontWeight: 300, lineHeight: 1.6,
                }}>
                  {t(m.desc, m.descEn)}
                </p>
              </div>
            ))}
          </div>

          {/* Способы оплаты */}
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.5rem', fontWeight: 700,
            color: 'var(--navy)', marginBottom: '1.25rem',
          }}>
            {t('Способы оплаты', 'Payment methods')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
            {paymentMethods.map(m => (
              <div key={m.ru} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--beige)', borderRadius: 6,
                border: '1px solid #ece9e3',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 400,
                }}>
                  {t(m.ru, m.en)}
                </span>
              </div>
            ))}
          </div>

          {/* Сроки */}
          <div style={{
            border: '1.5px solid #f0f0f0', borderRadius: 8, padding: '1.75rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.1rem', fontWeight: 700,
              color: 'var(--navy)', marginBottom: '0.75rem',
            }}>
              {t('Сроки обработки заказа', 'Order processing time')}
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.88rem', color: '#666', lineHeight: 1.75, fontWeight: 300,
            }}>
              {t(
                'Заказы обрабатываются в течение 1–2 рабочих дней. После отправки вы получите трек-номер на email. Если товара нет в наличии, мы свяжемся с вами для уточнения сроков.',
                'Orders are processed within 1–2 business days. Once shipped, you will receive a tracking number by email. If an item is out of stock, we will contact you to confirm the timing.'
              )}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .delivery-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .delivery-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </PageLayout>
  )
}
