'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useLang } from '@/context/LanguageContext'
import { useSettings } from '@/context/SettingsContext'

const navLinks = [
  { href: '/', label: 'Главная', en: 'Home' },
  { href: '/catalog', label: 'Каталог', en: 'Catalog' },
  { href: '/new', label: 'Новинки', en: 'New In' },
  { href: '/sale', label: 'Акции', en: 'Sale' },
  { href: '/catalog/gift-sets', label: 'Подарочные наборы', en: 'Gift Sets' },
  { href: '/about', label: 'О проекте', en: 'About' },
  { href: '/presentation', label: 'Презентация проекта', en: 'Brand deck' },
  { href: '/info', label: 'Информация', en: 'Information' },
  { href: '/contacts', label: 'Контакты', en: 'Contacts' },
  { href: '/delivery', label: 'Доставка и оплата', en: 'Delivery & Payment' },
  { href: '/cases', label: 'Чехлы на заказ', en: 'Custom cases' },
  { href: '/blog', label: 'Блог', en: 'Blog' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [headerH, setHeaderH] = useState(92)
  const headerRef = useRef<HTMLElement>(null)
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { lang, setLang, t } = useLang()
  const settings = useSettings()
  const freeFrom = (settings.freeDeliveryFrom || 3500).toLocaleString('ru-RU')
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const submitSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setSearchOpen(false)
    setMenuOpen(false)
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1280)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Измеряем высоту фиксированной шапки, чтобы спейсер не давал контенту прятаться под ней
  useEffect(() => {
    const measure = () => { if (headerRef.current) setHeaderH(headerRef.current.offsetHeight) }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (headerRef.current) setHeaderH(headerRef.current.offsetHeight)
  }, [searchOpen, isDesktop])

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
      {/* ── ШАПКА (fixed, всегда на экране) ── */}
      <header ref={headerRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.82)' : '#ffffff',
        backdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid #efefef',
        boxShadow: scrolled ? '0 4px 24px rgba(26,39,68,0.07)' : 'none',
        transition: 'background-color 0.35s, box-shadow 0.35s, border-color 0.35s',
      }}>

        {/* Промо-полоска (кликабельная → доставка) */}
        <Link href="/delivery" style={{
          display: 'block',
          backgroundColor: 'var(--navy)',
          color: 'rgba(232,213,163,0.85)',
          textAlign: 'center',
          fontSize: '0.67rem',
          padding: '6px 16px',
          paddingTop: 'calc(6px + env(safe-area-inset-top, 0px))',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-inter), sans-serif',
          lineHeight: 1,
          textDecoration: 'none',
        }}>
          {settings.promoBarText
            ? t(settings.promoBarText, settings.promoBarTextEn)
            : <>{t(`Бесплатная доставка от ${freeFrom} ₽`, `Free delivery from ${freeFrom} ₽`)}&nbsp;&nbsp;·&nbsp;&nbsp;{t('Христианская одежда', 'Christian clothing')}&nbsp;&nbsp;·&nbsp;&nbsp;{settings.contactWebsite || 'faithof.ru'}</>}
        </Link>

        {/* Основная строка */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: 64,
            gap: isDesktop ? '1rem' : '0.5rem',
          }}>

            {/* Логотип */}
            <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, lineHeight: 1 }}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: isDesktop ? '1.25rem' : '1.02rem',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '0.01em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}>
                Faith over Fear
              </div>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: isDesktop ? '0.56rem' : '0.48rem',
                color: 'var(--gold)',
                letterSpacing: isDesktop ? '0.3em' : '0.16em',
                textTransform: 'uppercase',
                marginTop: 2,
                whiteSpace: 'nowrap',
              }}>
                Христианская одежда
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
                  <Link key={link.href} href={link.href} className="nav-underline" style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    fontWeight: pathname === link.href ? 600 : 400,
                    color: pathname === link.href ? 'var(--burgundy)' : 'var(--navy)',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s',
                  }}>
                    {t(link.label, link.en)}
                  </Link>
                ))}
              </nav>
            )}

            {/* Спейсер на мобиле */}
            {!isDesktop && <div style={{ flex: 1 }} />}

            {/* Иконки */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>

              {/* Переключатель языка */}
              <div style={{
                display: 'flex', alignItems: 'center',
                border: '1px solid #e5e5e5', borderRadius: 99,
                padding: 2, marginRight: 4, flexShrink: 0,
              }}>
                {(['ru', 'en'] as const).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    style={{
                      border: 'none', cursor: 'pointer',
                      borderRadius: 99, padding: '3px 8px',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em',
                      background: lang === l ? 'var(--navy)' : 'transparent',
                      color: lang === l ? '#fff' : '#aaa',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    aria-label={l === 'ru' ? 'Русский' : 'English'}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Поиск */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                style={iconBtn}
                className="header-icon-btn"
                aria-label={t('Поиск', 'Search')}
                type="button"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* Избранное — только на планшете+ */}
              {isDesktop && (
                <Link href="/account/wishlist" style={iconBtn} className="header-icon-btn" aria-label={t('Избранное', 'Wishlist')}>
                  <Heart size={19} strokeWidth={1.75} />
                  {wishCount > 0 && (
                    <span style={{
                      position: 'absolute', top: 7, right: 7,
                      width: 14, height: 14, background: 'var(--burgundy)', color: '#fff',
                      fontSize: '0.55rem', fontWeight: 700, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-inter), sans-serif', pointerEvents: 'none',
                    }}>
                      {wishCount > 9 ? '9+' : wishCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Кабинет — только на планшете+ */}
              {isDesktop && (
                <Link href="/account" style={iconBtn} className="header-icon-btn" aria-label={t('Личный кабинет', 'My account')}>
                  <User size={19} strokeWidth={1.75} />
                </Link>
              )}

              {/* Корзина */}
              <Link href="/cart" style={iconBtn} className="header-icon-btn" aria-label={t('Корзина', 'Cart')}>
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
                  className="header-icon-btn"
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
              <form onSubmit={submitSearch} style={{ position: 'relative' }}>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('Поиск товаров...', 'Search products...')}
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
                <button
                  type="submit"
                  aria-label={t('Найти', 'Search')}
                  style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 8, lineHeight: 0, color: '#999' }}
                >
                  <Search size={15} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Спейсер под высоту фиксированной шапки */}
      <div aria-hidden style={{ height: headerH }} />

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
              paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))',
              borderBottom: '1px solid #f2f2f2',
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--navy)',
              }}>
                {t('Меню', 'Menu')}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                type="button"
                aria-label="Закрыть меню"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--navy)',
                  padding: '0.5rem',
                  margin: '-0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={22} strokeWidth={1.75} />
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
                {t('Кабинет', 'Account')}
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
                {t('Избранное', 'Wishlist')}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
