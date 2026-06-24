'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { useSettings } from '@/context/SettingsContext'
import { useCategories } from '@/context/CategoriesContext'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  telegram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z"/></svg>,
  vk: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.046-1.707-1.028-1.028-1.48-.677-1.48.307v1.4H12.6s-5.38 0-5.38-5.78c0-2.984 1.48-5.78 4.707-5.78h1.035v1.624c0 .66-.153.8-.8 1.028-1.03.367-1.644 1.184-1.644 2.148 0 1.552 1.337 3.078 3.078 3.078.8 0 1.337-.184 1.797-.614.46-.43.767-1.106.767-1.983V9.878h1.644c.66 0 1.047.4 1.047.875v5.625c0 .45-.307.745-.47.745z"/></svg>,
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  rutube: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 13.5l-6 3.5V7l6 3.5v3z"/></svg>,
  tiktok: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  youtube: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.69 4.54-4.69 1.31 0 2.69.24 2.69.24v2.96H15.8c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.6 23.08 24 18.1 24 12.07z"/></svg>,
  threads: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 11.4q-.14-.06-.28-.12c-.16-2.94-1.77-4.63-4.46-4.65h-.04c-1.61 0-2.95.69-3.77 1.94l1.48 1.02c.61-.93 1.57-1.13 2.29-1.13h.02c.9.01 1.57.27 2.01.77.32.37.53.88.64 1.52-.81-.14-1.68-.18-2.61-.12-2.62.15-4.31 1.68-4.19 3.8.06 1.08.6 2 1.51 2.6.77.51 1.77.76 2.81.7 1.37-.07 2.45-.59 3.2-1.55.57-.73.93-1.67 1.1-2.85.66.4 1.15.93 1.42 1.57.46 1.08.48 2.85-.95 4.28-1.25 1.25-2.76 1.79-5.04 1.81-2.53-.02-4.44-.83-5.68-2.4C4.33 16.3 3.74 14.43 3.72 12.3c.02-2.13.61-4 1.76-5.43C6.73 5.3 8.64 4.49 11.17 4.47c2.55.02 4.48.83 5.76 2.42.63.78 1.1 1.76 1.41 2.91l1.76-.47c-.38-1.41-.97-2.62-1.78-3.62C17.71 1.7 15.2.68 11.18.66h-.01C7.16.68 4.65 1.7 3 3.68 1.52 5.44.76 7.89.74 10.97v.02c.02 3.08.78 5.53 2.26 7.29 1.66 1.97 4.17 3 8.18 3.02h.01c2.68-.02 4.57-.72 6.13-2.27 2.04-2.04 1.98-4.59 1.31-6.16-.48-1.13-1.4-2.05-2.67-2.65z"/></svg>,
  dzen: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.2c.45 5.4 2.95 7.9 8.35 8.35v.9c-5.4.45-7.9 2.95-8.35 8.35h-.9c-.45-5.4-2.95-7.9-8.35-8.35v-.9c5.4-.45 7.9-2.95 8.35-8.35h.9z"/></svg>,
  max: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.7 1.38 5.1 3.55 6.72L5 22l4.13-2.2c.9.23 1.86.35 2.87.35 5.52 0 10-3.94 10-8.8S17.52 2 12 2z"/></svg>,
}
const SOCIAL_LABELS: Record<string, string> = { telegram: 'Telegram', vk: 'ВКонтакте', instagram: 'Instagram', rutube: 'Rutube', tiktok: 'TikTok', youtube: 'YouTube', facebook: 'Facebook', threads: 'Threads', dzen: 'Дзен', max: 'MAX' }

const navInfo = [
  { href: '/about', label: 'О проекте', en: 'About' },
  { href: '/presentation', label: 'Презентация бренда', en: 'Brand deck' },
  { href: '/info', label: 'Информация', en: 'Information' },
  { href: '/map', label: 'Карта храмов', en: 'Churches map' },
  { href: '/blog', label: 'Блог', en: 'Blog' },
  { href: '/contacts', label: 'Контакты', en: 'Contacts' },
  { href: '/delivery', label: 'Доставка и оплата', en: 'Delivery & Payment' },
  { href: '/cases', label: 'Чехлы на заказ', en: 'Custom cases' },
  { href: '/new', label: 'Новинки', en: 'New In' },
  { href: '/sale', label: 'Акции', en: 'Sale' },
]

const legal = [
  { href: '/privacy', label: 'Политика конфиденциальности', en: 'Privacy Policy' },
  { href: '/offer', label: 'Публичная оферта', en: 'Terms of Offer' },
  { href: '/returns', label: 'Возврат и обмен', en: 'Returns & Exchange' },
]

const s: Record<string, React.CSSProperties> = {
  h: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'var(--gold)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.25rem',
    display: 'block',
  },
  link: {
    display: 'block',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.45)',
    textDecoration: 'none',
    marginBottom: '0.6rem',
    fontWeight: 300,
    transition: 'color 0.15s',
  },
}

const DEFAULT_SOCIALS = [
  { href: 'https://t.me/', platform: 'telegram' },
  { href: 'https://vk.com/', platform: 'vk' },
  { href: 'https://instagram.com/', platform: 'instagram' },
  { href: 'https://rutube.ru/', platform: 'rutube' },
  { href: 'https://tiktok.com/', platform: 'tiktok' },
  { href: 'https://youtube.com/', platform: 'youtube' },
]

export default function Footer() {
  const { t } = useLang()
  const settings = useSettings()
  const categories = useCategories()
  const catalogLinks = categories.map(c => ({ href: `/catalog/${c.slug}`, label: c.name, en: c.nameEn || c.name }))
  const socialLinks = (settings.socials.length
    ? settings.socials.map((x) => ({ href: x.url, platform: x.platform }))
    : DEFAULT_SOCIALS
  ).filter((x) => SOCIAL_ICONS[x.platform] && x.href)
  return (
    <footer style={{ background: 'var(--navy-dark)', color: '#fff' }}>

      {/* Основной блок */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.25rem 3rem' }}>
        <div style={{
          display: 'grid',
          gap: '2.5rem',
          gridTemplateColumns: '1fr',
        }}
          className="footer-grid"
        >

          {/* Бренд */}
          <div>
            <div style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '0.25rem',
            }}>
              Faith over Fear
            </div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              color: 'var(--gold)',
              fontSize: '0.55rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              {t('Христианская одежда', 'Christian Clothing')}
            </div>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              fontWeight: 300,
              maxWidth: 260,
            }}>
              {t('Одежда, которая несёт Свет. Создана с молитвой и любовью для тех, кто живёт верой.', 'Clothing that carries the Light. Made with prayer and love for those who live by faith.')}
            </p>

            {/* Соцсети */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {socialLinks.map(s => (
                <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={SOCIAL_LABELS[s.platform] || s.platform}
                  style={{
                    width: 34, height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.15s, color 0.15s',
                    textDecoration: 'none',
                  }}
                >
                  {SOCIAL_ICONS[s.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Каталог */}
          <div>
            <span style={s.h}>{t('Каталог', 'Catalog')}</span>
            {catalogLinks.map(l => (
              <Link key={l.href} href={l.href} style={s.link}>{t(l.label, l.en)}</Link>
            ))}
          </div>

          {/* Информация */}
          <div>
            <span style={s.h}>{t('Информация', 'Information')}</span>
            {navInfo.map(l => (
              <Link key={l.href} href={l.href} style={s.link}>{t(l.label, l.en)}</Link>
            ))}
          </div>

          {/* Контакты */}
          <div>
            <span style={s.h}>{t('Контакты', 'Contacts')}</span>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: '1rem',
            }}>
              <p style={{ marginBottom: '0.4rem' }}>{settings.contactEmail || 'info@faithof.ru'}</p>
              <p>{settings.contactWebsite || 'faithof.ru'}</p>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 4,
            }}>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
                marginBottom: '0.875rem',
                fontWeight: 300,
              }}>
                {t('Подпишитесь на наш Telegram-канал — новинки и вдохновляющие цитаты', 'Subscribe to our Telegram channel — new arrivals and inspiring quotes')}
              </p>
              <a href={settings.telegramUrl || 'https://t.me/'} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#229ED9',
                  color: '#fff',
                  padding: '0.6rem 1rem',
                  borderRadius: 3,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z"/>
                </svg>
                {t('Подписаться в Telegram', 'Subscribe on Telegram')}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Нижняя строка */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '1.25rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 300,
          }}>
            © 2024–2025 Faith over Fear. {t('Все права защищены.', 'All rights reserved.')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {legal.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.25)',
                textDecoration: 'none',
                fontWeight: 300,
                transition: 'color 0.15s',
              }}>
                {t(l.label, l.en)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.3fr !important; }
        }
      `}</style>
    </footer>
  )
}
