'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'
import { formatPrice } from '@/lib/utils'

interface Customer {
  id: string | number
  email: string
  name?: string
  phone?: string
  referralCode?: string
  bonusBalance?: number
}

interface Order {
  id: string | number
  orderNumber?: string
  total?: number
  status?: string
  createdAt: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Ожидает оплаты', color: '#b8860b' },
  paid: { label: 'Оплачен', color: '#22863a' },
  processing: { label: 'В сборке', color: '#1a73e8' },
  shipped: { label: 'Отправлен', color: '#6f42c1' },
  delivered: { label: 'Доставлен', color: '#22863a' },
  cancelled: { label: 'Отменён', color: '#999' },
}

export default function AccountPage() {
  const router = useRouter()
  const { t } = useLang()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const load = useCallback(async () => {
    try {
      const meRes = await fetch('/api/customers/me', { credentials: 'include' })
      const me = await meRes.json()
      if (!me.user) {
        router.replace('/account/login')
        return
      }
      setCustomer(me.user)
      const ordersRes = await fetch(
        `/api/orders?where[customer][equals]=${me.user.id}&sort=-createdAt&limit=10&depth=0`,
        { credentials: 'include' }
      )
      const ordersData = await ordersRes.json()
      setOrders(ordersData.docs || [])
    } catch {
      router.replace('/account/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { load() }, [load])

  async function logout() {
    await fetch('/api/customers/logout', { method: 'POST', credentials: 'include' })
    router.push('/account/login')
    router.refresh()
  }

  const referralLink =
    typeof window !== 'undefined' && customer?.referralCode
      ? `${window.location.origin}/account/register?ref=${customer.referralCode}`
      : ''

  function copyLink() {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <PageLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: '3px solid #eee', borderTopColor: 'var(--navy)',
            animation: 'spin 0.7s linear infinite',
          }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </PageLayout>
    )
  }

  if (!customer) return null

  return (
    <PageLayout>
      {/* Hero с балансом */}
      <div style={{ background: 'var(--navy)', padding: '2.5rem 0 0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold) 0%, #e8c96a 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', flexShrink: 0,
              }}>
                {(customer.name || customer.email)[0].toUpperCase()}
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.62rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)',
                  marginBottom: '0.25rem',
                }}>{t('Личный кабинет', 'My account')}</p>
                <h1 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', color: '#fff', fontWeight: 700, lineHeight: 1.1,
                }}>{customer.name || customer.email}</h1>
              </div>
            </div>
            <button onClick={logout} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '0.5rem 1rem',
              fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', cursor: 'pointer',
            }}>{t('Выйти', 'Sign out')}</button>
          </div>

          {/* Баланс */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px 12px 0 0', padding: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, flexShrink: 0,
              background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h4.5a2 2 0 010 4H9m0 0h5"/></svg>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem',
              }}>{t('Бонусный баланс', 'Bonus balance')}</p>
              <p style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.75rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1,
              }}>{formatPrice(customer.bonusBalance || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--beige)', padding: '2rem 0 4rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.25rem', display: 'grid', gap: '1.5rem' }}>

          {/* Реферальная программа */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #ece9e3', padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: 9, background: 'var(--beige)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)' }}>
                  {t('Приглашайте друзей', 'Invite friends')}
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#999' }}>
                  {t('Получайте', 'Get')} <strong style={{ color: 'var(--burgundy)' }}>10%</strong> {t('с заказа друга от 3 000 ₽', 'from a friend’s order of 3 000 ₽+')}
                </p>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>
              {t('Ваша реферальная ссылка', 'Your referral link')}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                readOnly value={referralLink}
                onClick={e => e.currentTarget.select()}
                style={{
                  flex: 1, minWidth: 200, boxSizing: 'border-box',
                  border: '1.5px solid #e8e8e8', borderRadius: 6, padding: '0.7rem 0.875rem',
                  fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: 'var(--navy)',
                  background: 'var(--beige)', outline: 'none',
                }}
              />
              <button onClick={copyLink} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: copied ? '#22863a' : 'var(--navy)', color: '#fff', border: 'none',
                borderRadius: 6, padding: '0.7rem 1.25rem', cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {copied ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>{t('Скопировано', 'Copied')}</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>{t('Копировать', 'Copy')}</>
                )}
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: '#aaa', marginTop: '0.6rem' }}>
              {t('Код:', 'Code:')} <strong style={{ color: 'var(--navy)' }}>{customer.referralCode}</strong> · {t('Поделитесь ссылкой — друг зарегистрируется по ней, и после его заказа от 3 000 ₽ вам начислится бонус.', 'Share the link — a friend registers via it, and after their order of 3 000 ₽+ you receive a bonus.')}
            </p>
          </div>

          {/* Заказы */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #ece9e3', padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem' }}>
              {t('Мои заказы', 'My orders')}
            </h2>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.88rem', color: '#999', marginBottom: '1rem' }}>
                  {t('У вас пока нет заказов', 'You have no orders yet')}
                </p>
                <Link href="/catalog" style={{
                  display: 'inline-flex', background: 'var(--navy)', color: '#fff',
                  padding: '0.75rem 1.75rem', borderRadius: 4, textDecoration: 'none',
                  fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.76rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{t('В каталог', 'To catalog')}</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {orders.map((o, i) => {
                  const st = STATUS_LABELS[o.status || 'pending'] || STATUS_LABELS.pending
                  return (
                    <div key={o.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      flexWrap: 'wrap', gap: '0.75rem', padding: '0.875rem 0',
                      borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
                    }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>
                          {o.orderNumber || `Заказ #${o.id}`}
                        </p>
                        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: '#aaa' }}>
                          {new Date(o.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 600,
                          color: st.color, background: `${st.color}15`, padding: '3px 10px', borderRadius: 99,
                        }}>{st.label}</span>
                        <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)' }}>
                          {formatPrice(o.total || 0)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
