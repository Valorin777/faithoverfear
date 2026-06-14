'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/new', label: 'Новинки' },
  { href: '/sale', label: 'Акции' },
  { href: '/gift-sets', label: 'Подарочные наборы' },
  { href: '/about', label: 'О проекте' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/blog', label: 'Блог' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { count } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1280)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const iconBtn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: 'var(--navy)',
    borderRadius: '50%',
    transition: 'background 0.15s',
    textDecoration: 'none',
    position: 'relative',
    flexShrink: 0,
  }

  return (
    <>
      {/* ── ШАПКА ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #efefef',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>

        {/* Промо-полоска */}
        <div style={{
          backgroundColor: 'var(--navy)',
          color: 'rgba(232,213,163,0.85)',
          textAlign: 'center',
          fontSize: '0.67rem',
          padding: '6px 16px',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-inter), sans-serif',
          lineHeight: 1,
        }}>
          Бесплатная доставка от 3 500 ₽&nbsp;&nbsp;·&nbsp;&nbsp;Православная одежда&nbsp;&nbsp;·&nbsp;&nbsp;faithof.ru
        </div>

        {/* Основная строка */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: 64,
            gap: '1rem',
          }}>

            {/* Логотип */}
            <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, lineHeight: 1 }}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '0.01em',
                lineHeight: 1.2,
              }}>
                Faith over Fear
              </div>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.56rem',
                color: 'var(--gold)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginTop: 2,
              }}>
                Православная одежда
              </div>
            </Link>

            {/* Навигация — только на десктопе */}
            {isDesktop && (
              <nav style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flex: 1,
                justifyContent: 'center',
              }}>
                {navLinks.slice(0, 6).map(link => (
                  <Link key={link.href} href={link.href} style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    fontWeight: pathname === link.href ? 600 : 400,
                    color: pathname === link.href ? 'var(--burgundy)' : 'var(--navy)',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s',
                  }}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Спейсер на мобиле */}
            {!isDesktop && <div style={{ flex: 1 }} />}

            {/* Иконки */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>

              {/* Поиск */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                style={iconBtn}
                aria-label="Поиск"
                type="button"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* Избранное — только на планшете+ */}
              {isDesktop && (
                <Link href="/account/wishlist" style={iconBtn} aria-label="Избранное">
                  <Heart size={19} strokeWidth={1.75} />
                </Link>
              )}

              {/* Кабинет — только на планшете+ */}
              {isDesktop && (
                <Link href="/account" style={iconBtn} aria-label="Личный кабинет">
                  <User size={19} strokeWidth={1.75} />
                </Link>
              )}

              {/* Корзина */}
              <Link href="/cart" style={iconBtn} aria-label="Корзина">
                <ShoppingCart size={19} strokeWidth={1.75} />
                {count > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: 7,
                    right: 7,
                    width: 14,
                    height: 14,
                    background: 'var(--burgundy)',
                    color: '#fff',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-inter), sans-serif',
                    pointerEvents: 'none',
                  }}>
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>

              {/* Бургер — только на мобиле */}
              {!isDesktop && (
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  style={iconBtn}
                  aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  aria-expanded={menuOpen}
                  type="button"
                >
                  {menuOpen
                    ? <X size={22} strokeWidth={1.75} />
                    : <Menu size={22} strokeWidth={1.75} />
                  }
                </button>
              )}
            </div>
          </div>

          {/* Строка поиска */}
          {searchOpen && (
            <div style={{ paddingBottom: '0.875rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="search"
                  placeholder="Поиск товаров..."
                  autoFocus
                  style={{
                    width: '100%',
                    border: '1.5px solid var(--navy)',
                    borderRadius: 3,
                    padding: '0.6rem 2.5rem 0.6rem 1rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    fontFamily: 'var(--font-inter), sans-serif',
                    color: 'var(--text)',
                  }}
                />
                <Search
                  size={15}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#ccc', pointerEvents: 'none' }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── МОБИЛЬНОЕ МЕНЮ ── */}
      {menuOpen && (
        <>
          {/* Затемнение */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Панель */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'min(300px, 85vw)',
            zIndex: 400,
            background: '#ffffff',
            boxShadow: '-4px 0 40px rgba(0,0,0,0.14)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}>

            {/* Шапка панели */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.25rem 1rem',
              borderBottom: '1px solid #f2f2f2',
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--navy)',
              }}>
                Меню
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--navy)',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {/* Ссылки */}
            <nav style={{ padding: '0.5rem 0', flex: 1 }}>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.85rem 1.5rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: pathname === link.href ? 600 : 400,
                    color: pathname === link.href ? 'var(--burgundy)' : 'var(--navy)',
                    textDecoration: 'none',
                    borderLeft: pathname === link.href ? '3px solid var(--gold)' : '3px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Нижние кнопки */}
            <div style={{
              borderTop: '1px solid #f2f2f2',
              padding: '1rem 1.25rem',
              display: 'flex',
              gap: '0.75rem',
            }}>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: 4,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                }}
              >
                <User size={15} strokeWidth={1.75} />
                Кабинет
              </Link>
              <Link
                href="/account/wishlist"
                onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: 4,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                }}
              >
                <Heart size={15} strokeWidth={1.75} />
                Избранное
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
