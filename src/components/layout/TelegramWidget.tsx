'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function TelegramWidget() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 16, zIndex: 150,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem',
    }}>
      {/* Всплывающая карточка */}
      {open && (
        <div style={{
          background: '#fff', borderRadius: 12,
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          border: '1px solid #f0f0f0',
          width: 'min(280px, calc(100vw - 48px)',
          overflow: 'hidden',
        }}>
          <div style={{
            background: '#229ED9', padding: '0.875rem 1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z" />
                </svg>
              </div>
              <div>
                <p style={{ color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontWeight: 600, fontSize: '0.82rem' }}>Faith over Fear</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.68rem' }}>Telegram-канал</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)', padding: '0.25rem', flexShrink: 0,
            }}>
              <X size={15} />
            </button>
          </div>
          <div style={{ padding: '1rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8rem', color: '#666', lineHeight: 1.6,
              marginBottom: '0.875rem', fontWeight: 300,
            }}>
              Новинки, акции и вдохновляющие цитаты — каждый день в канале.
            </p>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textAlign: 'center',
              background: '#229ED9', color: '#fff',
              padding: '0.625rem', borderRadius: 6,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.78rem', fontWeight: 600,
              textDecoration: 'none',
            }}>
              Открыть канал
            </a>
            <button onClick={() => setDismissed(true)} style={{
              display: 'block', width: '100%', textAlign: 'center',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.7rem', color: '#ccc',
              background: 'none', border: 'none', cursor: 'pointer',
              marginTop: '0.5rem', padding: '0.25rem',
            }}>
              Не показывать
            </button>
          </div>
        </div>
      )}

      {/* Кнопка */}
      <button onClick={() => setOpen(v => !v)} style={{
        width: 48, height: 48, borderRadius: '50%',
        background: '#229ED9',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(34,158,217,0.4)',
        flexShrink: 0,
      }}
        aria-label="Telegram"
      >
        <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z" />
        </svg>
      </button>
    </div>
  )
}
