'use client'

import { useState, type CSSProperties } from 'react'
import { useLang } from '@/context/LanguageContext'

const FONT = 'var(--font-inter), sans-serif'

const overlayStyle: CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(17,29,51,0.55)', backdropFilter: 'blur(3px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '1.25rem',
}
const cardStyle: CSSProperties = {
  background: '#fff', borderRadius: 14, padding: '2rem',
  width: '100%', maxWidth: 440, boxShadow: '0 24px 60px rgba(17,29,51,0.28)',
  fontFamily: FONT,
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--font-playfair), Georgia, serif',
  fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)',
}
const mutedStyle: CSSProperties = { fontSize: '0.85rem', color: '#888', lineHeight: 1.6, marginTop: '0.5rem' }
const inputStyle: CSSProperties = {
  width: '100%', padding: '0.7rem 0.85rem', marginTop: '0.6rem',
  border: '1px solid #e2e5ea', borderRadius: 9, fontSize: '0.9rem',
  fontFamily: FONT, color: 'var(--navy)', outline: 'none',
}
const primaryBtn: CSSProperties = {
  background: 'var(--navy)', color: '#fff', border: 'none',
  padding: '0.8rem 1.6rem', borderRadius: 10, fontSize: '0.85rem',
  fontWeight: 600, fontFamily: FONT, cursor: 'pointer', letterSpacing: '0.01em',
}
const ghostBtn: CSSProperties = {
  background: 'transparent', color: '#888', border: '1px solid #e2e5ea',
  padding: '0.8rem 1.2rem', borderRadius: 10, fontSize: '0.85rem',
  fontWeight: 600, fontFamily: FONT, cursor: 'pointer',
}

export default function LeaveReviewButton({ productSlug }: { productSlug?: string }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const close = () => {
    setOpen(false)
    setTimeout(() => {
      setStatus('idle'); setAuthor(''); setText(''); setRating(5); setError('')
    }, 200)
  }

  async function submit() {
    if (!author.trim() || !text.trim()) {
      setError(t('Укажите имя и текст отзыва', 'Please enter your name and review'))
      return
    }
    setStatus('sending'); setError('')
    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, rating, text, productSlug }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
      setError(t('Не удалось отправить. Попробуйте позже.', 'Could not send. Please try again later.'))
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={primaryBtn}>
        {t('Оставить отзыв', 'Leave a review')}
      </button>

      {open && (
        <div style={overlayStyle} onClick={close} role="dialog" aria-modal="true">
          <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
            {status === 'done' ? (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{ fontSize: '2.75rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem' }}>✓</div>
                <h3 style={titleStyle}>{t('Спасибо за отзыв!', 'Thank you!')}</h3>
                <p style={mutedStyle}>
                  {t('Он появится на сайте после проверки.', 'It will appear on the site after moderation.')}
                </p>
                <button type="button" onClick={close} style={{ ...primaryBtn, marginTop: '1.5rem' }}>
                  {t('Закрыть', 'Close')}
                </button>
              </div>
            ) : (
              <>
                <h3 style={titleStyle}>{t('Оставить отзыв', 'Leave a review')}</h3>
                <p style={mutedStyle}>{t('Ваша оценка', 'Your rating')}</p>
                <div style={{ display: 'flex', gap: 6, margin: '0.5rem 0 1rem' }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      aria-label={`${n}`}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
                    >
                      <svg width="30" height="30" viewBox="0 0 14 14" fill={n <= (hover || rating) ? 'var(--gold)' : '#dcdcdc'}>
                        <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505L7 1z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={t('Ваше имя', 'Your name')}
                  maxLength={120}
                  style={inputStyle}
                />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('Поделитесь впечатлением…', 'Share your impression…')}
                  rows={4}
                  maxLength={3000}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
                {error && <p style={{ color: 'var(--burgundy)', fontSize: '0.8rem', marginTop: 8 }}>{error}</p>}
                <div style={{ display: 'flex', gap: 10, marginTop: '1.25rem' }}>
                  <button type="button" onClick={close} style={ghostBtn}>
                    {t('Отмена', 'Cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={status === 'sending'}
                    style={{ ...primaryBtn, flex: 1, opacity: status === 'sending' ? 0.6 : 1 }}
                  >
                    {status === 'sending' ? t('Отправка…', 'Sending…') : t('Отправить', 'Send')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
