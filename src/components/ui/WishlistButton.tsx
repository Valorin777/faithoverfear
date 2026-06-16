'use client'

import { useWishlist } from '@/context/WishlistContext'

interface Props {
  productId: string
  variant?: 'card' | 'large'
}

export default function WishlistButton({ productId, variant = 'card' }: Props) {
  const { isWishlisted, toggle } = useWishlist()
  const active = isWishlisted(productId)
  const large = variant === 'large'

  return (
    <button
      type="button"
      aria-label={active ? 'Убрать из избранного' : 'В избранное'}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(productId) }}
      className="wish-btn"
      style={{
        width: large ? 'auto' : 28,
        height: large ? 'auto' : 28,
        padding: large ? '0.5rem 0' : 0,
        background: large ? 'none' : 'rgba(255,255,255,0.92)',
        border: 'none',
        borderRadius: large ? 0 : '50%',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: large ? '0.5rem' : 0,
        color: active ? 'var(--burgundy)' : large ? '#aaa' : '#bbb',
        boxShadow: large ? 'none' : '0 1px 4px rgba(0,0,0,0.1)',
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '0.78rem',
        transition: 'transform 0.18s, color 0.2s',
      }}
    >
      <svg
        width={large ? 15 : 11}
        height={large ? 15 : 11}
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? 'wish-pop' : ''}
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      {large && (active ? 'В избранном' : 'Добавить в избранное')}
    </button>
  )
}
