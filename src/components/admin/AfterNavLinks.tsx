'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, PackagePlus, ShoppingBag, Bell, Gift, CreditCard } from 'lucide-react'

export default function AfterNavLinks() {
  const [orders, setOrders] = useState<number | null>(null)
  const [custs, setCusts] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const since = new Date()
        since.setHours(0, 0, 0, 0)
        const q = `where[createdAt][greater_than_equal]=${encodeURIComponent(since.toISOString())}&limit=1&depth=0`
        const [o, c] = await Promise.all([
          fetch(`/api/orders?${q}`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch(`/api/customers?${q}`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ])
        if (!active) return
        setOrders(o?.totalDocs ?? 0)
        setCusts(c?.totalDocs ?? 0)
      } catch {
        /* нет доступа — пропускаем */
      }
    }
    load()
    const id = setInterval(load, 45000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const total = (orders || 0) + (custs || 0)

  return (
    <div className="fof-quicklinks">
      <span className="fof-quicklinks__title">Уведомления</span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '9px 10px',
          margin: '0 8px 6px',
          borderRadius: 9,
          background: 'var(--accent-tint, rgba(201,168,76,0.12))',
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          lineHeight: 1.3,
        }}
      >
        <Bell size={15} style={{ color: 'var(--gold, #c9a84c)', flexShrink: 0 }} />
        {total > 0 ? (
          <span>
            Сегодня: <b style={{ color: 'var(--text-primary)' }}>{orders || 0}</b> заказ. ·{' '}
            <b style={{ color: 'var(--text-primary)' }}>{custs || 0}</b> клиент.
          </span>
        ) : (
          <span style={{ opacity: 0.75 }}>Новых сегодня нет</span>
        )}
      </div>

      <span className="fof-quicklinks__title">Быстрый доступ</span>
      <Link href="/admin" className="fof-quicklink">
        <LayoutDashboard size={15} strokeWidth={1.9} />
        Дашборд
      </Link>
      <Link href="/admin/collections/products/create" className="fof-quicklink">
        <PackagePlus size={15} strokeWidth={1.9} />
        Новый товар
      </Link>
      <Link href="/admin/collections/orders" className="fof-quicklink">
        <ShoppingBag size={15} strokeWidth={1.9} />
        Заказы
      </Link>
      <Link href="/admin/referrals" className="fof-quicklink">
        <Gift size={15} strokeWidth={1.9} />
        Реферальная программа
      </Link>
      <Link href="/admin/collections/payment-systems" className="fof-quicklink">
        <CreditCard size={15} strokeWidth={1.9} />
        Способы оплаты
      </Link>
    </div>
  )
}
