'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Задержка появления в секундах (для каскадного эффекта) */
  delay?: number
  /** Направление сдвига при появлении */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Дистанция сдвига в пикселях */
  distance?: number
}

/**
 * Плавное появление блока при попадании во вьюпорт — в стиле Apple.
 * Использует IntersectionObserver, срабатывает один раз.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Уважаем настройку «уменьшить движение»
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const offset = (): string => {
    if (visible || direction === 'none') return 'translate3d(0,0,0)'
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0)`
      case 'down': return `translate3d(0, -${distance}px, 0)`
      case 'left': return `translate3d(${distance}px, 0, 0)`
      case 'right': return `translate3d(-${distance}px, 0, 0)`
      default: return 'translate3d(0,0,0)'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: offset(),
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
