'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function SubscribePopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('fof_subscribed')) return
    const timer = setTimeout(() => setVisible(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  function close() {
    setVisible(false)
    localStorage.setItem('fof_subscribed', '1')
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(close, 2500)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-[var(--navy)] px-8 py-8 text-center text-white">
          <svg width="32" height="44" viewBox="0 0 32 44" fill="none" className="mx-auto mb-4 opacity-40">
            <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--gold)" />
            <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--gold)" />
          </svg>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Получайте вдохновение
          </h2>
          <p className="text-gray-300 text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Подпишитесь и получите скидку 10% на первый заказ
          </p>
        </div>
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold mb-1" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Спасибо за подписку!</p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Скидка придёт на ваш email.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[var(--navy)]"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              />
              <button type="submit" className="btn-primary w-full py-3">Получить скидку 10%</button>
              <button type="button" onClick={close} className="text-xs text-gray-400 hover:text-gray-600 text-center" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                Нет, спасибо
              </button>
            </form>
          )}
        </div>
        <button onClick={close} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
