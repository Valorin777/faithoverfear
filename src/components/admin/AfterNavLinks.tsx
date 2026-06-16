'use client'

import Link from 'next/link'
import { LayoutDashboard, PackagePlus, ShoppingBag } from 'lucide-react'

export default function AfterNavLinks() {
  return (
    <div className="fof-quicklinks">
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
    </div>
  )
}
