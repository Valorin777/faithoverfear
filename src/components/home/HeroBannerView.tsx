'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import VideoPlayer from '@/components/ui/VideoPlayer'

interface HeroBannerViewProps {
  eyebrow: string
  eyebrowEn?: string
  title1: string
  title1En?: string
  title2: string
  title2En?: string
  subtitle: string
  subtitleEn?: string
  heroImage?: string
  heroVideo?: string
}

export default function HeroBannerView({
  eyebrow, eyebrowEn, title1, title1En, title2, title2En, subtitle, subtitleEn, heroImage, heroVideo,
}: HeroBannerViewProps) {
  const { t } = useLang()

  const tags: { label: string; labelEn: string; href: string | null }[] = [
    { label: '100% хлопок', labelEn: '100% cotton', href: null },
    { label: 'Стойкий принт', labelEn: 'Durable print', href: null },
    { label: 'Доставка по России', labelEn: 'Delivery across Russia', href: '/delivery' },
    { label: 'Возврат 14 дней', labelEn: '14-day returns', href: '/returns' },
  ]

  return (
    <section style={{
      background: 'var(--navy)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Фоновое медиа из админки (видео в приоритете) */}
      {heroVideo ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <VideoPlayer src={heroVideo} poster={heroImage} autoPlay loop controls={false} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,29,51,0.72) 0%, rgba(17,29,51,0.82) 100%)' }} />
        </div>
      ) : heroImage ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,29,51,0.7) 0%, rgba(17,29,51,0.8) 100%)' }} />
        </div>
      ) : null}

      {/* Тонкий радиальный свет снизу */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 120%, rgba(201,168,76,0.09) 0%, transparent 70%)',
      }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '6rem 1.5rem 4.5rem',
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', minHeight: '90vh', justifyContent: 'center',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: 'var(--gold)', fontSize: '0.6rem',
            letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            {t(eyebrow, eyebrowEn)}
          </span>
          <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.5rem, 9vw, 6.5rem)',
          fontWeight: 700, color: '#ffffff',
          lineHeight: 1.1, marginBottom: '0.25rem',
          letterSpacing: '-0.02em', maxWidth: '100%',
        }}>
          {t(title1, title1En)}
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.5rem, 9vw, 6.5rem)',
          fontWeight: 700, color: 'var(--gold)',
          lineHeight: 1.1, marginBottom: '1.75rem',
          letterSpacing: '-0.02em', fontStyle: 'italic', maxWidth: '100%',
        }}>
          {t(title2, title2En)}
        </h1>

        {/* Описание */}
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          color: 'rgba(255,255,255,0.55)',
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          fontWeight: 300, maxWidth: 440,
          lineHeight: 1.8, marginBottom: '2.5rem',
        }}>
          {t(subtitle, subtitleEn)}
        </p>

        {/* Кнопки */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '0.75rem', width: '100%', maxWidth: 320, alignItems: 'stretch',
        }}>
          <Link href="/catalog" className="btn-shine" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: 'var(--gold)', color: 'var(--navy)',
            padding: '0.95rem 2rem', borderRadius: 2,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            {t('Перейти в каталог', 'Browse catalog')}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/about" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            padding: '0.875rem 2rem', borderRadius: 2,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.78rem', fontWeight: 400,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            {t('О нашей миссии', 'Our mission')}
          </Link>
        </div>

        {/* Теги */}
        <div style={{
          marginTop: '3.5rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '0.4rem 2rem',
        }}>
          {tags.map(tag => (
            tag.href ? (
              <Link key={tag.label} href={tag.href} className="hero-tag-link" style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.6rem', color: 'rgba(232,213,163,0.6)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              }}>
                {t(tag.label, tag.labelEn)}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ) : (
              <span key={tag.label} style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>{t(tag.label, tag.labelEn)}</span>
            )
          ))}
        </div>

      </div>

      <style>{`
        .hero-tag-link { transition: color 0.2s; }
        .hero-tag-link:hover { color: var(--gold) !important; }
      `}</style>
    </section>
  )
}
