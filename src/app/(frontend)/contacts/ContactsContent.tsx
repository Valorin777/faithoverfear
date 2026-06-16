'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'
import { useSettings } from '@/context/SettingsContext'

export default function ContactsContent() {
  const { t } = useLang()
  const settings = useSettings()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    setSending(true)
    setError('')
    try {
      const r = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (r.ok) setSent(true)
      else setError(t('Не удалось отправить. Попробуйте позже.', 'Could not send. Please try later.'))
    } catch {
      setError(t('Не удалось отправить. Попробуйте позже.', 'Could not send. Please try later.'))
    } finally {
      setSending(false)
    }
  }

  const fields = [
    { label: 'Имя', labelEn: 'Name', field: 'name', type: 'text', placeholder: 'Иван', placeholderEn: 'John' },
    { label: 'Email', labelEn: 'Email', field: 'email', type: 'email', placeholder: 'ivan@mail.ru', placeholderEn: 'john@mail.com' },
    { label: 'Тема', labelEn: 'Subject', field: 'subject', type: 'text', placeholder: 'Вопрос о заказе', placeholderEn: 'Question about an order' },
  ]

  const tg = settings.telegramUrl ? '@' + settings.telegramUrl.replace(/^https?:\/\/t\.me\//, '').replace(/\/$/, '') : '@faithoverfear'
  const rows = [
    { label: 'Email', labelEn: 'Email', value: settings.contactEmail || 'info@faithof.ru' },
    ...(settings.contactPhone ? [{ label: 'Телефон', labelEn: 'Phone', value: settings.contactPhone }] : []),
    { label: 'Сайт', labelEn: 'Website', value: settings.contactWebsite || 'faithof.ru' },
    { label: 'Telegram', labelEn: 'Telegram', value: tg },
    { label: 'Режим работы', labelEn: 'Working hours', value: settings.workingHours || 'Пн–Пт, 10:00–18:00 МСК', valueEn: settings.workingHoursEn || 'Mon–Fri, 10:00–18:00 MSK' },
  ]

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
            {t('Мы на связи', 'Get in touch')}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff', fontWeight: 700,
          }}>
            {t('Контакты', 'Contacts')}
          </h1>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1.25rem auto 0', borderRadius: 2 }} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '5rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem' }}>
          <div className="contacts-grid" style={{ display: 'grid', gap: '4rem' }}>

            {/* Форма */}
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.24em',
                textTransform: 'uppercase', color: 'var(--gold)',
                fontWeight: 500, marginBottom: '0.5rem',
              }}>
                {t('Обратная связь', 'Feedback')}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.5rem', fontWeight: 700,
                color: 'var(--navy)', marginBottom: '2rem',
              }}>
                {t('Напишите нам', 'Write to us')}
              </h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {fields.map(({ label, labelEn, field, type, placeholder, placeholderEn }) => (
                  <div key={label}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.72rem', fontWeight: 600,
                      color: '#555', marginBottom: '0.5rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {t(label, labelEn)}
                    </label>
                    <input
                      type={type}
                      name={field}
                      placeholder={t(placeholder, placeholderEn)}
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        border: '1.5px solid #e8e8e8',
                        borderRadius: 4, padding: '0.8rem 1rem',
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '0.88rem', color: 'var(--navy)',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.72rem', fontWeight: 600,
                    color: '#555', marginBottom: '0.5rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {t('Сообщение', 'Message')}
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder={t('Ваш вопрос...', 'Your question...')}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      border: '1.5px solid #e8e8e8',
                      borderRadius: 4, padding: '0.8rem 1rem',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.88rem', color: 'var(--navy)',
                      outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>
                <button type="submit" disabled={sending || sent} style={{
                  background: sent ? '#22863a' : 'var(--navy)', color: '#fff',
                  border: 'none', borderRadius: 3, padding: '1rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: sending || sent ? 'default' : 'pointer',
                  opacity: sending ? 0.7 : 1,
                }}>
                  {sent ? t('✓ Отправлено', '✓ Sent') : sending ? t('Отправка…', 'Sending…') : t('Отправить сообщение', 'Send message')}
                </button>
                {sent && (
                  <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: '#22863a' }}>
                    {t('Спасибо! Мы получили ваше сообщение и скоро свяжемся с вами.', 'Thank you! We received your message and will get back to you soon.')}
                  </p>
                )}
                {error && (
                  <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: 'var(--burgundy)' }}>{error}</p>
                )}
              </form>
            </div>

            {/* Контакты */}
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.62rem', letterSpacing: '0.24em',
                textTransform: 'uppercase', color: 'var(--gold)',
                fontWeight: 500, marginBottom: '0.5rem',
              }}>
                {t('Реквизиты', 'Details')}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.5rem', fontWeight: 700,
                color: 'var(--navy)', marginBottom: '2rem',
              }}>
                {t('Наши контакты', 'Our contacts')}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2.5rem' }}>
                {rows.map(({ label, labelEn, value, valueEn }) => (
                  <div key={label} style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: '1rem',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid #f5f5f5',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.75rem', color: '#aaa', fontWeight: 400,
                    }}>
                      {t(label, labelEn)}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 500,
                    }}>
                      {valueEn ? t(value, valueEn) : value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Telegram-карточка */}
              <div style={{
                background: 'var(--navy)', borderRadius: 8,
                padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#229ED9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.85rem', fontWeight: 600, color: '#fff',
                    }}>
                      {t('Telegram-канал', 'Telegram channel')}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
                    }}>
                      {t('Новинки и акции каждый день', 'New arrivals and sales every day')}
                    </p>
                  </div>
                </div>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', textAlign: 'center',
                  background: '#229ED9', color: '#fff',
                  padding: '0.7rem', borderRadius: 6,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.75rem', fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.06em',
                }}>
                  {t('Подписаться на канал', 'Subscribe to the channel')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contacts-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .contacts-grid { grid-template-columns: 1fr 1fr; }
        }
        input:focus, textarea:focus {
          border-color: var(--navy) !important;
        }
      `}</style>
    </PageLayout>
  )
}
