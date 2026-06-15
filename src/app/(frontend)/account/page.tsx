import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'

const menu = [
  {
    href: '/account/orders',
    label: 'История заказов',
    desc: 'Статусы и детали всех ваших покупок',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12h6M9 16h4"/>
      </svg>
    ),
    badge: null,
  },
  {
    href: '/account/wishlist',
    label: 'Избранное',
    desc: 'Товары, которые вы отложили',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    badge: null,
  },
  {
    href: '/account/profile',
    label: 'Профиль',
    desc: 'Личные данные, email и пароль',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    badge: null,
  },
  {
    href: '/account/addresses',
    label: 'Адреса доставки',
    desc: 'Сохранённые адреса и пункты выдачи',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    badge: null,
  },
]

export default function AccountPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3rem 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {/* Аватар */}
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold) 0%, #e8c96a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.24em',
                textTransform: 'uppercase', color: 'var(--gold)',
                fontWeight: 500, marginBottom: '0.3rem',
              }}>
                Добро пожаловать
              </p>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                color: '#fff', fontWeight: 700, lineHeight: 1.2,
              }}>
                Личный кабинет
              </h1>
            </div>
          </div>

          {/* Статистика */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {[
              { label: 'Заказов', value: '—' },
              { label: 'В избранном', value: '—' },
              { label: 'Бонусов', value: '0' },
            ].map((s) => (
              <div key={s.label} style={{
                padding: '1.25rem 0',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.6rem', color: 'var(--gold)',
                  fontWeight: 700, lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginTop: '0.35rem',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Меню */}
      <div style={{ background: 'var(--beige)', padding: '2.5rem 0 4rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
            className="account-grid"
          >
            {menu.map(({ href, label, desc, icon }) => (
              <Link key={href} href={href} className="account-card" style={{ textDecoration: 'none' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 10,
                  background: 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)',
                  marginBottom: '1.1rem',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}>
                  {icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1rem', fontWeight: 700,
                  color: 'var(--navy)', marginBottom: '0.35rem',
                }}>
                  {label}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.78rem', color: '#999',
                  fontWeight: 300, lineHeight: 1.5,
                }}>
                  {desc}
                </p>
                <div style={{
                  marginTop: '1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  color: 'var(--gold)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.7rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    Перейти
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Выход */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.75rem', color: '#bbb',
              background: 'none', border: 'none', cursor: 'pointer',
              letterSpacing: '0.06em',
            }}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .account-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .account-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .account-card {
          background: #fff;
          border: 1px solid #ece9e3;
          border-radius: 12px;
          padding: 1.75rem 1.5rem;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          display: block;
        }
        .account-card:hover {
          border-color: var(--gold);
          box-shadow: 0 8px 32px rgba(201,168,76,0.12);
          transform: translateY(-2px);
        }
      `}</style>
    </PageLayout>
  )
}
