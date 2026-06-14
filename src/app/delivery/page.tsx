import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = { title: 'Доставка и оплата', description: 'Условия доставки и способы оплаты в магазине Faith over Fear.' }

const deliveryMethods = [
  { name: 'СДЭК', time: '2–5 рабочих дней', price: 'от 290 ₽', desc: 'Доставка до пункта выдачи или курьером до двери. Отслеживание заказа в личном кабинете СДЭК.' },
  { name: 'Boxberry', time: '3–6 рабочих дней', price: 'от 250 ₽', desc: 'Доставка до пункта выдачи. Широкая сеть по всей России.' },
  { name: 'Почта России', time: '5–14 рабочих дней', price: 'от 180 ₽', desc: 'Доставка в любую точку России, включая удалённые регионы.' },
  { name: 'Самовывоз', time: 'После подтверждения', price: 'Бесплатно', desc: 'Уточните адрес при оформлении заказа.' },
]

const paymentMethods = [
  'СБП (Система быстрых платежей) — мгновенно, без комиссии',
  'Банковская карта Visa, Mastercard, МИР',
  'Тинькофф Pay',
  'СберПей',
  'Альфа-Банк онлайн',
]

export default function DeliveryPage() {
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
            Логистика
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff', fontWeight: 700,
          }}>
            Доставка и оплата
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
                Специальное предложение
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.95rem', fontWeight: 600, color: '#fff',
              }}>
                Бесплатная доставка при заказе от 3 500 ₽
              </p>
            </div>
          </div>

          {/* Способы доставки */}
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.5rem', fontWeight: 700,
            color: 'var(--navy)', marginBottom: '1.5rem',
          }}>
            Способы доставки
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
                    {m.name}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.82rem', fontWeight: 700,
                    color: 'var(--burgundy)', whiteSpace: 'nowrap',
                  }}>
                    {m.price}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.72rem', color: 'var(--gold)',
                  fontWeight: 500, marginBottom: '0.6rem',
                }}>
                  {m.time}
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem', color: '#777', fontWeight: 300, lineHeight: 1.6,
                }}>
                  {m.desc}
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
            Способы оплаты
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
            {paymentMethods.map(m => (
              <div key={m} style={{
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
                  {m}
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
              Сроки обработки заказа
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.88rem', color: '#666', lineHeight: 1.75, fontWeight: 300,
            }}>
              Заказы обрабатываются в течение 1–2 рабочих дней. После отправки вы получите трек-номер на email.
              Если товара нет в наличии, мы свяжемся с вами для уточнения сроков.
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
