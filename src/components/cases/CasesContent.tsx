'use client'

import { useState, type FormEvent } from 'react'
import { useLang } from '@/context/LanguageContext'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1.5px solid #e0e0e0',
  borderRadius: 4,
  padding: '0.7rem 0.875rem',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'var(--font-inter), sans-serif',
  color: 'var(--navy)',
  background: '#fff',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--navy)',
  marginBottom: '0.4rem',
}

export default function CasesContent() {
  const { t } = useLang()
  const [phoneModel, setPhoneModel] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!phoneModel.trim() || !contact.trim()) {
      setError(t('Заполните модель телефона и контакт', 'Please fill in the phone model and contact'))
      setState('error')
      return
    }
    if (!consent) {
      setError(t('Подтвердите согласие на обработку персональных данных', 'Please confirm consent to personal data processing'))
      setState('error')
      return
    }
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneModel, name, contact, comment }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || '')
      setState('ok')
      setPhoneModel('')
      setName('')
      setContact('')
      setComment('')
    } catch (err) {
      const msg = err instanceof Error && err.message ? err.message : ''
      setError(msg || t('Не удалось отправить. Попробуйте позже.', 'Could not send. Please try again later.'))
      setState('error')
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.62rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '0.6rem', fontWeight: 500,
        }}>
          {t('Индивидуально', 'Bespoke')}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.25rem)',
          color: 'var(--navy)', fontWeight: 700, lineHeight: 1.2,
        }}>
          {t('Чехол по вашему дизайну', 'A case with your design')}
        </h1>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.9rem', color: '#777', fontWeight: 300,
          lineHeight: 1.7, marginTop: '0.75rem',
        }}>
          {t(
            'Укажите модель вашего телефона и пожелания — мы создадим индивидуальный христианский дизайн чехла и свяжемся с вами.',
            'Tell us your phone model and your wishes — we will create a bespoke Christian case design and get back to you.',
          )}
        </p>
        <div style={{ width: 36, height: 2, background: 'var(--gold)', margin: '1rem auto 0', borderRadius: 2 }} />
      </div>

      {state === 'ok' ? (
        <div style={{
          background: 'rgba(47,125,91,0.08)',
          border: '1px solid rgba(47,125,91,0.3)',
          borderRadius: 8, padding: '2rem 1.5rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#2F7D5B' }} aria-hidden>✓</div>
          <p style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem',
          }}>
            {t('Заявка отправлена!', 'Request sent!')}
          </p>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.88rem', color: '#666', fontWeight: 300, lineHeight: 1.6,
          }}>
            {t('Мы свяжемся с вами по указанному контакту в ближайшее время.', 'We will contact you at the provided contact shortly.')}
          </p>
          <button
            type="button"
            onClick={() => setState('idle')}
            style={{
              marginTop: '1.25rem', padding: '0.6rem 1.5rem',
              background: 'none', border: '1.5px solid var(--navy)', borderRadius: 3,
              color: 'var(--navy)', cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600,
            }}
          >
            {t('Отправить ещё одну', 'Send another')}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={labelStyle} htmlFor="phoneModel">{t('Модель телефона', 'Phone model')} *</label>
            <input
              id="phoneModel"
              type="text"
              value={phoneModel}
              onChange={e => setPhoneModel(e.target.value)}
              placeholder={t('Напр.: iPhone 15 Pro', 'e.g. iPhone 15 Pro')}
              style={inputStyle}
              maxLength={200}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.1rem' }} className="cases-row">
            <div>
              <label style={labelStyle} htmlFor="caseName">{t('Имя', 'Name')}</label>
              <input id="caseName" type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} maxLength={200} />
            </div>
            <div>
              <label style={labelStyle} htmlFor="contact">{t('Контакт для связи', 'Contact')} *</label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder={t('Телефон, email или Telegram', 'Phone, email or Telegram')}
                style={inputStyle}
                maxLength={200}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor="comment">{t('Пожелания по дизайну', 'Design wishes')}</label>
            <textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
              placeholder={t('Цитата, символ, цвета, идея…', 'A quote, symbol, colours, an idea…')}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
              maxLength={3000}
            />
          </div>

          {state === 'error' && (
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: 'var(--burgundy)' }}>
              {error}
            </p>
          )}

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, accentColor: 'var(--navy)', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#777', fontWeight: 300, lineHeight: 1.5 }}>
              {t('Я согласен на обработку персональных данных в соответствии с ', 'I agree to the processing of my personal data in accordance with the ')}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                {t('политикой конфиденциальности', 'privacy policy')}
              </a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={state === 'sending' || !consent}
            style={{
              padding: '1rem 2rem',
              background: (state === 'sending' || !consent) ? '#e8e8e8' : 'var(--burgundy)',
              color: (state === 'sending' || !consent) ? '#bbb' : '#fff',
              border: 'none', borderRadius: 3,
              cursor: (state === 'sending' || !consent) ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
          >
            {state === 'sending' ? t('Отправляем…', 'Sending…') : t('Отправить заявку', 'Send request')}
          </button>
        </form>
      )}

      <style>{`
        @media (min-width: 560px) {
          .cases-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
