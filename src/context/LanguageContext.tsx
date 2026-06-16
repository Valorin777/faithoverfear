'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

type Lang = 'ru' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  /** Перевод: t(русский, английский). Если английского нет — показывается русский. */
  t: (ru: string, en?: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fof_lang') as Lang | null
      if (saved === 'en' || saved === 'ru') setLangState(saved)
    } catch {}
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('fof_lang', l) } catch {}
    try { document.documentElement.lang = l } catch {}
  }, [])

  const t = useCallback((ru: string, en?: string) => (lang === 'en' && en ? en : ru), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Безопасный фолбэк, если провайдер не подключён — всегда русский
    return { lang: 'ru' as Lang, setLang: () => {}, t: (ru: string) => ru }
  }
  return ctx
}
