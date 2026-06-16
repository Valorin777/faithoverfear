'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const values = [
  {
    title: 'Православный смысл', titleEn: 'Orthodox meaning',
    text: 'Каждый принт — живое слово Евангелия и цитата из Священного Писания.',
    textEn: 'Every print is a living word of the Gospel and a quote from Scripture.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    title: 'Натуральные материалы', titleEn: 'Natural materials',
    text: '100% хлопок, стойкий принт, бережный уход за тканью.',
    textEn: '100% cotton, durable print, gentle fabric care.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
        <path d="M8 12s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
  },
  {
    title: 'Благотворительность', titleEn: 'Charity',
    text: 'Часть средств от каждой покупки идёт на поддержку православных общин.',
    textEn: 'Part of every purchase goes to support Orthodox communities.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
]

export default function AboutSection() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--beige)', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center',
        }}
          className="about-grid"
        >
          {/* Левая колонка — текст */}
          <div>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.75rem',
              fontWeight: 500,
            }}>
              {t('О проекте', 'About the project')}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--navy)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}>
              {t('Одежда, которую носят', 'Clothing worn')}{' '}
              <span style={{ color: 'var(--burgundy)', fontStyle: 'italic' }}>{t('с верой', 'with faith')}</span>
            </h2>

            <div style={{ width: 40, height: 2, background: 'var(--gold)', marginBottom: '2rem', borderRadius: 2 }} />

            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1rem',
              color: '#444',
              lineHeight: 1.85,
              marginBottom: '1.25rem',
              fontWeight: 300,
            }}>
              <strong style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: 600,
                color: 'var(--navy)',
              }}>Faith over Fear</strong>{t(' — это проект для тех, кто живёт верой каждый день. Мы создаём одежду с православным смыслом: цитаты из Евангелия, образы православной традиции, символы веры.', ' is a project for those who live by faith every day. We create clothing with Orthodox meaning: quotes from the Gospel, images of Orthodox tradition, symbols of faith.')}
            </p>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.95rem',
              color: '#666',
              lineHeight: 1.85,
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}>
              {t('Каждое изделие создаётся с молитвой, чтобы вы носили его с гордостью и несли Свет в повседневной жизни.', 'Each item is created with prayer, so you can wear it with pride and carry the Light into everyday life.')}
            </p>

            <Link href="/about" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--navy)',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: 2,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              {t('Узнать больше', 'Learn more')}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Правая колонка — карточки ценностей */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {values.map((v) => (
              <div key={v.title} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                background: '#fff',
                padding: '1.5rem',
                borderRadius: 6,
                border: '1px solid var(--beige-dark)',
              }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 6,
                  background: 'var(--beige)',
                  border: '1px solid var(--beige-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--navy)',
                  flexShrink: 0,
                }}>
                  {v.icon}
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--navy)',
                    marginBottom: '0.35rem',
                  }}>
                    {t(v.title, v.titleEn)}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.82rem',
                    color: '#888',
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}>
                    {t(v.text, v.textEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
