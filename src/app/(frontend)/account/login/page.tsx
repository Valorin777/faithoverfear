'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      })
      if (!res.ok) {
        throw new Error('Неверный email или пароль')
      }
      const redirect = new URLSearchParams(window.location.search).get('redirect')
      router.push(redirect && redirect.startsWith('/') ? redirect : '/account')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <AuthShell
        title="Вход в кабинет"
        subtitle="Рады видеть вас снова"
        footer={
          <>
            Нет аккаунта?{' '}
            <Link href="/account/register" style={{ color: 'var(--burgundy)', fontWeight: 600, textDecoration: 'none' }}>
              Зарегистрироваться
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="ivan@mail.ru" required />
          <Field label="Пароль" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

          {error && <ErrorBox>{error}</ErrorBox>}

          <SubmitButton loading={loading} label="Войти" />
        </form>
      </AuthShell>
    </PageLayout>
  )
}

/* ── Общие элементы форм авторизации ── */

export function AuthShell({
  title, subtitle, children, footer,
}: { title: string; subtitle: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--beige)', minHeight: '78vh',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: 'clamp(2rem, 6vw, 4rem) 1.25rem',
    }}>
      <div className="scale-in" style={{
        maxWidth: 440, width: '100%',
        background: '#fff', borderRadius: 16,
        border: '1px solid #ece9e3',
        boxShadow: '0 20px 60px rgba(26,39,68,0.08)',
        padding: 'clamp(1.75rem, 5vw, 2.5rem)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--navy) 0%, #2a3a5c 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="27" viewBox="0 0 32 44" fill="none">
              <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--gold)" />
              <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--gold)" />
            </svg>
          </div>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)',
          textAlign: 'center', marginBottom: '0.3rem',
        }}>{title}</h1>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.85rem', color: '#999', textAlign: 'center',
          marginBottom: '1.75rem', fontWeight: 300,
        }}>{subtitle}</p>

        {children}

        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.82rem', color: '#888', textAlign: 'center',
          marginTop: '1.5rem',
        }}>{footer}</p>
      </div>
    </div>
  )
}

export function Field({
  label, type, value, onChange, placeholder, required,
}: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label style={{
        display: 'block', fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '0.7rem', fontWeight: 600, color: '#666',
        marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{
          width: '100%', boxSizing: 'border-box',
          border: '1.5px solid #e8e8e8', borderRadius: 6, padding: '0.75rem 1rem',
          fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem',
          color: 'var(--navy)', outline: 'none',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--navy)')}
        onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
      />
    </div>
  )
}

export function ErrorBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(122,30,46,0.07)', border: '1px solid rgba(122,30,46,0.2)',
      borderRadius: 6, padding: '0.7rem 0.875rem',
      fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: 'var(--burgundy)',
    }}>{children}</div>
  )
}

export function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      background: loading ? '#9a6470' : 'var(--burgundy)', color: '#fff',
      border: 'none', borderRadius: 4, padding: '1rem',
      fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.25rem',
    }}>
      {loading ? 'Подождите…' : label}
    </button>
  )
}
