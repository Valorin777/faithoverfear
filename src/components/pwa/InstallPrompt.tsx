'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'fof-pwa-dismissed'
const DISMISS_DAYS = 14

function dismissedRecently(): boolean {
  try {
    const v = localStorage.getItem(DISMISS_KEY)
    return !!v && Date.now() - Number(v) < DISMISS_DAYS * 86_400_000
  } catch {
    return false
  }
}

function CrossBadge() {
  return (
    <div
      style={{
        width: 44, height: 44, flexShrink: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 38%, #20201d 0%, #121110 70%, #0c0b0a 100%)',
        border: '1.5px solid var(--gold)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg width="16" height="24" viewBox="0 0 100 150" fill="none" aria-hidden="true">
        <g stroke="#C9A84C" strokeLinecap="round">
          <line x1="50" y1="12" x2="50" y2="138" strokeWidth="9" />
          <line x1="37" y1="32" x2="63" y2="32" strokeWidth="8" />
          <line x1="26" y1="58" x2="74" y2="58" strokeWidth="9" />
          <line x1="34" y1="94" x2="66" y2="108" strokeWidth="8" />
        </g>
      </svg>
    </div>
  )
}

export default function InstallPrompt() {
  const { t } = useLang()
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [iosHint, setIosHint] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const nav = window.navigator as Navigator & { standalone?: boolean }
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true
    if (standalone || dismissedRecently()) return

    const onBIP = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
      window.setTimeout(() => setShow(true), 2500)
    }
    const onInstalled = () => {
      setShow(false)
      setDeferred(null)
      try {
        localStorage.setItem(DISMISS_KEY, String(Date.now()))
      } catch {}
    }
    window.addEventListener('beforeinstallprompt', onBIP)
    window.addEventListener('appinstalled', onInstalled)

    // iOS Safari не поддерживает beforeinstallprompt — показываем инструкцию
    const ua = nav.userAgent
    const isIOS = /iphone|ipad|ipod/i.test(ua)
    const isSafari = /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua)
    let iosTimer: number | undefined
    if (isIOS && isSafari) {
      iosTimer = window.setTimeout(() => {
        setIosHint(true)
        setShow(true)
      }, 3500)
    }
    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP)
      window.removeEventListener('appinstalled', onInstalled)
      if (iosTimer) window.clearTimeout(iosTimer)
    }
  }, [])

  function close() {
    setShow(false)
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {}
  }

  async function install() {
    if (!deferred) return
    try {
      await deferred.prompt()
      await deferred.userChoice
    } catch {}
    setShow(false)
    setDeferred(null)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label={t('Установить приложение', 'Install app')}
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        zIndex: 500,
        width: 'min(440px, calc(100vw - 1.5rem))',
        background: 'var(--navy-dark)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 12,
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
        animation: 'fof-pwa-up 0.35s ease',
      }}
    >
      <CrossBadge />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
          }}
        >
          {t('Установить приложение', 'Install the app')}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.74rem',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            marginTop: 2,
            lineHeight: 1.4,
          }}
        >
          {iosHint
            ? t('Откройте «Поделиться» ↑ и выберите «На экран „Домой"»', 'Tap Share ↑ then "Add to Home Screen"')
            : t('Faith over Fear на экране — быстрее и удобнее', 'Faith over Fear on your home screen — fast & handy')}
        </div>
      </div>

      {!iosHint && (
        <button
          type="button"
          onClick={install}
          style={{
            flexShrink: 0,
            padding: '0.55rem 1.1rem',
            background: 'var(--gold)',
            color: 'var(--navy)',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.76rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
          }}
        >
          {t('Установить', 'Install')}
        </button>
      )}

      <button
        type="button"
        onClick={close}
        aria-label={t('Закрыть', 'Close')}
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <style>{`
        @keyframes fof-pwa-up {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
