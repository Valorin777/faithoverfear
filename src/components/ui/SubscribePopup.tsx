'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function SubscribePopup() {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('fof_subscribe_seen')) return
    } catch {}
    const t = setTimeout(() => setShow(true), 12000)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setClosing(true)
    try { localStorage.setItem('fof_subscribe_seen', '1') } catch {}
    setTimeout(() => setShow(false), 300)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Реальная отправка подключается при настройке email-сервиса.
    setDone(true)
    try { localStorage.setItem('fof_subscribe_seen', '1') } catch {}
    setTimeout(() => { setClosing(true); setTimeout(() => setShow(false), 300) }, 2200)
  }

  if (!show) return null

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(17,26,51,0.55)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.25rem',
        animation: closing ? 'fofFadeOut 0.3s ease forwards' : 'fofFadeIn 0.4s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: 420, width: '100%',
          background: '#fff', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          animation: closing ? 'fofPopOut 0.3s ease forwards' : 'fofPopIn 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Шапка navy */}
        <div style={{ background: 'var(--navy)', padding: '2rem 2rem 1.75rem', textAlign: 'center', position: 'relative' }}>
          <button onClick={dismiss} aria-label="Закрыть" style={{
            position: 'absolute', top: 12, right: 12, width: 30, height: 30,
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div style={{
            width: 52, height: 52, borderRadius: 12, margin: '0 auto 1rem',
            background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>
            </svg>
          </div>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem',
            letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem',
          }}>{t('Будьте в курсе', 'Stay in touch')}</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.5rem',
            fontWeight: 700, color: '#fff', lineHeight: 1.2,
          }}>{t('Подпишитесь на новости', 'Subscribe to news')}</h2>
        </div>

        {/* Тело */}
        <div style={{ padding: '1.75rem' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto 1rem',
                background: 'rgba(34,134,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22863a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>{t('Спасибо!', 'Thank you!')}</p>
              <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: '#888', marginTop: '0.35rem' }}>{t('Вы подписались на новинки и акции.', 'You are subscribed to new arrivals and sales.')}</p>
            </div>
          ) : (
            <>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.88rem',
                color: '#777', lineHeight: 1.6, textAlign: 'center', marginBottom: '1.25rem', fontWeight: 300,
              }}>
                {t('Новинки, акции и вдохновляющие цитаты — первыми на вашу почту.', 'New arrivals, sales and inspiring quotes — first to your inbox.')}
              </p>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ваш@email.ru"
                  style={{
                    width: '100%', boxSizing: 'border-box', border: '1.5px solid #e8e8e8',
                    borderRadius: 6, padding: '0.8rem 1rem', fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.9rem', color: 'var(--navy)', outline: 'none', textAlign: 'center',
                  }}
                />
                <button type="submit" className="btn-shine" style={{
                  background: 'var(--burgundy)', color: '#fff', border: 'none', borderRadius: 6,
                  padding: '0.9rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem',
                  fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  {t('Подписаться', 'Subscribe')}
                </button>
              </form>
              <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.68rem', color: '#bbb', textAlign: 'center', marginTop: '0.875rem' }}>
                {t('Без спама. Отписаться можно в любой момент.', 'No spam. Unsubscribe anytime.')}
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fofFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fofFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes fofPopIn { from { opacity: 0; transform: translateY(24px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fofPopOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.96); } }
      `}</style>
    </div>
  )
}
