'use client'

import Link from 'next/link'
import type { ReactNode, CSSProperties } from 'react'
import { useLang } from '@/context/LanguageContext'

const SERIF = 'var(--font-playfair), Georgia, serif'
const SANS = 'var(--font-inter), sans-serif'

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontFamily: SANS, fontSize: '0.66rem', letterSpacing: '0.28em', textTransform: 'uppercase',
      color: light ? '#d8b962' : '#a98b3c', fontWeight: 600, marginBottom: '1.1rem',
    }}>
      {children}
    </p>
  )
}

const section: CSSProperties = { padding: 'clamp(3.5rem, 8vw, 6.5rem) 1.5rem', position: 'relative', overflow: 'hidden' }
const inner = (max = 860): CSSProperties => ({ maxWidth: max, margin: '0 auto', position: 'relative', zIndex: 1 })

export default function PresentationContent() {
  const { t } = useLang()

  return (
    <div style={{ fontFamily: SANS }}>
      {/* 1 — Обложка */}
      <section style={{ ...section, background: 'linear-gradient(135deg, #1b2a4a 0%, #111d33 60%, #0c1526 100%)', textAlign: 'center', paddingTop: 'clamp(4.5rem, 10vw, 8rem)', paddingBottom: 'clamp(4.5rem, 10vw, 8rem)' }}>
        <div style={inner(760)}>
          <Eyebrow light>{t('Манифест бренда', 'Brand manifesto')}</Eyebrow>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 8vw, 5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Faith&nbsp;<span style={{ color: 'var(--gold)' }}>over</span>&nbsp;Fear
          </h1>
          <p style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginTop: '1.4rem' }}>
            {t('Вера сильнее страха', 'Faith is stronger than fear')}
          </p>
          <div style={{ width: 46, height: 2, background: 'var(--gold)', margin: '1.75rem auto 0', borderRadius: 2 }} />
        </div>
      </section>

      {/* 2 — Точка опоры */}
      <section style={{ ...section, background: '#fff', textAlign: 'center' }}>
        <div style={inner(820)}>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 4.4vw, 2.7rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35 }}>
            {t('В мире, полном шума и неопределённости, мы ищем точку опоры.',
               'In a world full of noise and uncertainty, we look for a point of support.')}
          </p>
        </div>
      </section>

      {/* 3 — ВЕРА над страхом */}
      <section style={{ ...section, background: 'var(--beige)', textAlign: 'center' }}>
        <div style={inner(820)}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, color: 'var(--navy)', lineHeight: 0.92, fontSize: 'clamp(4rem, 17vw, 10rem)', letterSpacing: '0.02em' }}>
            {t('ВЕРА', 'FAITH')}
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 600, color: '#b9b1a0', fontSize: 'clamp(1.6rem, 6vw, 3rem)', marginTop: '-0.2rem', textDecoration: 'line-through', textDecorationColor: 'rgba(122,30,46,0.5)' }}>
            {t('страх', 'fear')}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(0.95rem, 2.4vw, 1.1rem)', color: '#5a5346', lineHeight: 1.75, maxWidth: 620, margin: '2rem auto 0', fontWeight: 400 }}>
            {t('Вера сильнее страха. Это не просто слова — это концепция внутренней опоры.',
               'Faith is stronger than fear. These are not just words — it is a philosophy of inner support.')}
          </p>
        </div>
      </section>

      {/* 4 — Внутренняя опора */}
      <section style={{ ...section, background: '#fff' }}>
        <div style={{ ...inner(820), display: 'flex', gap: 'clamp(1.5rem, 5vw, 3.5rem)', alignItems: 'flex-start' }} className="pres-pillar">
          <div style={{ width: 3, alignSelf: 'stretch', background: 'linear-gradient(var(--gold), transparent)', borderRadius: 2, flexShrink: 0, minHeight: 120 }} className="pres-pillar-bar" />
          <div>
            <Eyebrow>{t('Внутренняя опора', 'Inner support')}</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              {t('Когда фундамент непоколебим, внешние бури теряют силу.',
                 'When the foundation is unshakable, outer storms lose their power.')}
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.02rem', color: '#555', lineHeight: 1.85, fontWeight: 300 }}>
              {t('Наша одежда — это физическое напоминание о вашем внутреннем стержне.',
                 'Our clothing is a physical reminder of your inner core.')}
            </p>
          </div>
        </div>
      </section>

      {/* 5 — Вечные ценности + Современный ритм */}
      <section style={{ ...section, background: 'var(--navy)', textAlign: 'center' }}>
        <div style={inner(900)}>
          <div className="pres-values" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 2.5rem)', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 5vw, 2.7rem)', fontWeight: 700, color: '#fff' }}>{t('Вечные ценности', 'Eternal values')}</span>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', color: 'var(--gold)', fontWeight: 300 }}>+</span>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 5vw, 2.7rem)', fontWeight: 700, color: '#fff' }}>{t('Современный ритм', 'Modern rhythm')}</span>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 640, margin: '2rem auto 0', fontWeight: 300 }}>
            {t('Современное миссионерство. Мы переводим глубокие духовные смыслы на язык современной эстетики.',
               'A modern mission. We translate deep spiritual meaning into the language of contemporary aesthetics.')}
          </p>
        </div>
      </section>

      {/* 6 — Основатели */}
      <section style={{ ...section, background: '#fff' }}>
        <div style={inner(980)}>
          <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2.5vw, 1.4rem)', justifyContent: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/presentation/founder2.jpg" alt={t('Основатель', 'Founder')}
              style={{ flex: 1, minWidth: 0, maxWidth: 320, aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 14, boxShadow: '0 16px 40px rgba(27,42,74,0.16)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/presentation/church.jpg" alt={t('Основатель', 'Founder')}
              style={{ flex: 1, minWidth: 0, maxWidth: 320, aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 14, boxShadow: '0 16px 40px rgba(27,42,74,0.16)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Eyebrow>{t('Основатели', 'Founders')}</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>
              Кочетов Даниил Сергеевич{' '}
              <span style={{ color: 'var(--gold)', fontWeight: 400 }}>&amp;</span> Соболев Денис Максимович
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.02rem', color: '#555', lineHeight: 1.85, fontWeight: 300, marginTop: '1.1rem', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              {t('Объединённые общей верой и стремлением создавать смысл.',
                 'United by a shared faith and a drive to create meaning.')}
            </p>
          </div>
        </div>
      </section>

      {/* 7 — Цитата на фоне храма */}
      <section style={{ ...section, paddingTop: 'clamp(4.5rem, 9vw, 7rem)', paddingBottom: 'clamp(4.5rem, 9vw, 7rem)', textAlign: 'center', background: 'linear-gradient(rgba(17,29,51,0.9), rgba(12,21,38,0.94)), url(/presentation/church.jpg) center 30%/cover' }}>
        <div style={inner(820)}>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4.2vw, 2.4rem)', fontWeight: 600, color: '#fff', lineHeight: 1.5 }}>
            {t('«Мы создаём не просто вещи. Мы создаём пространство для вашей внутренней тишины».',
               '“We don’t just make things. We create space for your inner silence.”')}
          </p>
          <p style={{ fontFamily: SANS, fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '1.6rem', fontWeight: 600 }}>
            {t('— Даниил и Денис', '— Daniil & Denis')}
          </p>
        </div>
      </section>

      {/* 8 — Призыв */}
      <section style={{ ...section, background: 'var(--beige)', textAlign: 'center' }}>
        <div style={inner(720)}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ margin: '0 auto 1.75rem', display: 'block' }}>
            <path d="M17 3v28M3 17h28" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1 }}>
            {t('Носи свою веру.', 'Wear your faith.')}
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '1.05rem', color: '#6a6456', marginTop: '1rem' }}>
            {t('Добро пожаловать в «Faith over Fear».', 'Welcome to Faith over Fear.')}
          </p>
          <Link href="/catalog" style={{
            display: 'inline-block', marginTop: '2.25rem', background: 'var(--navy)', color: '#fff',
            padding: '1rem 2.5rem', borderRadius: 6, textDecoration: 'none', fontFamily: SANS,
            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {t('Перейти в каталог', 'Browse the catalog')}
          </Link>
        </div>
      </section>

      <style>{`
        .pres-founders { grid-template-columns: 1fr; }
        @media (min-width: 760px) { .pres-founders { grid-template-columns: 0.9fr 1.1fr; } }
        @media (max-width: 600px) { .pres-pillar-bar { display: none; } }
      `}</style>
    </div>
  )
}
