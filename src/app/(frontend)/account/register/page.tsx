'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { AuthShell, Field, ErrorBox, SubmitButton } from '../login/page'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [ref, setRef] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get('ref')
    if (r) setRef(r.toUpperCase())
  }, [])

  const set = (field: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [field]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/register-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ref }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Не удалось зарегистрироваться')

      // Автоматический вход после регистрации
      await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.toLowerCase(), password: form.password }),
      })
      router.push('/account')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <AuthShell
        title="Регистрация"
        subtitle="Создайте аккаунт и получите свою реферальную ссылку"
        footer={
          <>
            Уже есть аккаунт?{' '}
            <Link href="/account/login" style={{ color: 'var(--burgundy)', fontWeight: 600, textDecoration: 'none' }}>
              Войти
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ref && (
            <div style={{
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 6, padding: '0.7rem 0.875rem',
              fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: '#8a7a3f',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
              Вы регистрируетесь по приглашению — код <strong>{ref}</strong>
            </div>
          )}
          <Field label="Имя" type="text" value={form.name} onChange={set('name')} placeholder="Иван" />
          <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="ivan@mail.ru" required />
          <Field label="Телефон" type="tel" value={form.phone} onChange={set('phone')} placeholder="+7 (999) 000-00-00" />
          <Field label="Пароль" type="password" value={form.password} onChange={set('password')} placeholder="минимум 6 символов" required />

          {error && <ErrorBox>{error}</ErrorBox>}

          <SubmitButton loading={loading} label="Создать аккаунт" />
        </form>
      </AuthShell>
    </PageLayout>
  )
}
