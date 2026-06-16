'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'

const steps = [
  {
    title: 'Подтверждение',
    titleEn: 'Confirmation',
    desc: 'Свяжемся с вами по телефону или email для подтверждения заказа',
    descEn: 'We’ll contact you by phone or email to confirm your order',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    title: 'Сборка и упаковка',
    titleEn: 'Packing',
    desc: 'Аккуратно соберём ваш заказ и подготовим к отправке',
    descEn: 'We’ll carefully assemble your order and prepare it for shipping',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
      </svg>
    ),
  },
  {
    title: 'Доставка',
    titleEn: 'Delivery',
    desc: 'Отправим выбранной службой, трек-номер придёт на email',
    descEn: 'We’ll ship via your chosen carrier; the tracking number will arrive by email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
]

export default function CheckoutSuccessPage() {
  const { t } = useLang()
  const [orderNum, setOrderNum] = useState('—')

  useEffect(() => {
    // Реальный номер заказа приходит из базы через параметр ?order=
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('order')
    if (fromUrl) setOrderNum(fromUrl)
  }, [])

  return (
    <PageLayout>
      <div style={{
        background: 'var(--beige)',
        minHeight: '78vh',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(2rem, 6vw, 4rem) 1.25rem',
      }}>
        <div className="scale-in" style={{
          maxWidth: 540, width: '100%',
          background: '#fff', borderRadius: 18,
          border: '1px solid #ece9e3',
          boxShadow: '0 20px 60px rgba(26,39,68,0.08)',
          padding: 'clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
        }}>

          {/* Галочка с пульсирующим кольцом */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: 84, height: 84, borderRadius: '50%',
              background: 'rgba(34,134,58,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulseGreen 2.4s ease-in-out infinite',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2fa34d 0%, #1f8a3f 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(34,134,58,0.3)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Заголовок */}
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 700, color: 'var(--navy)',
            marginBottom: '0.75rem', lineHeight: 1.2,
          }}>
            {t('Заказ оформлен!', 'Order placed!')}
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.95rem', color: '#777', fontWeight: 300,
            lineHeight: 1.7, marginBottom: '1.5rem',
            maxWidth: 400, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {t(
              'Спасибо за покупку! Мы уже получили ваш заказ и скоро свяжемся с вами для подтверждения.',
              'Thank you for your purchase! We have received your order and will contact you shortly to confirm.'
            )}
          </p>

          {/* Номер заказа */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'var(--beige)', borderRadius: 99,
            padding: '0.5rem 1.1rem', marginBottom: '2rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.04em',
            }}>
              {t('Номер заказа', 'Order number')}
            </span>
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)',
              letterSpacing: '0.03em',
            }}>
              {orderNum}
            </span>
          </div>

          {/* Шаги «что дальше» */}
          <div style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '1.75rem', marginBottom: '1.75rem',
            textAlign: 'left',
          }}>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.62rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--gold)',
              fontWeight: 600, marginBottom: '1.25rem', textAlign: 'center',
            }}>
              {t('Что дальше', 'What’s next')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {steps.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'var(--navy)', color: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    {step.icon}
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'var(--gold)', color: 'var(--navy)',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.6rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid #fff',
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.1rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)',
                      marginBottom: '0.15rem',
                    }}>
                      {t(step.title, step.titleEn)}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.78rem', color: '#999', fontWeight: 300, lineHeight: 1.55,
                    }}>
                      {t(step.desc, step.descEn)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Цитата */}
          <div style={{
            background: 'var(--beige)', borderRadius: 10,
            padding: '1rem 1.25rem', marginBottom: '2rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '0.95rem', color: 'var(--navy)', fontStyle: 'italic',
              lineHeight: 1.5,
            }}>
              {t('«Всё возможно верующему»', '“All things are possible to one who believes”')}
            </p>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.7rem', color: 'var(--gold)', marginTop: '0.35rem',
            }}>
              {t('Евангелие от Марка, 9:23', 'Gospel of Mark, 9:23')}
            </p>
          </div>

          {/* Кнопки */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/account" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              background: 'var(--burgundy)', color: '#fff',
              padding: '1rem', borderRadius: 4,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              {t('Мои заказы', 'My orders')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/catalog" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: 'var(--navy)',
              padding: '1rem', borderRadius: 4,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', border: '1.5px solid #e2ddd3',
            }}>
              {t('Продолжить покупки', 'Continue shopping')}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,134,58,0.18); }
          50%      { box-shadow: 0 0 0 12px rgba(34,134,58,0); }
        }
      `}</style>
    </PageLayout>
  )
}
