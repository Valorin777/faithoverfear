import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Package } from 'lucide-react'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: 'Ожидает оплаты', color: 'bg-yellow-100 text-yellow-700' },
  paid:       { label: 'Оплачен', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'В обработке', color: 'bg-purple-100 text-purple-700' },
  shipped:    { label: 'Отправлен', color: 'bg-indigo-100 text-indigo-700' },
  delivered:  { label: 'Доставлен', color: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Отменён', color: 'bg-red-100 text-red-700' },
}

const mockOrders = [
  { id: 'FOF-0001', date: '2024-12-10', status: 'delivered', total: 4980, items: ['Футболка «Я есмь свет мира»', 'Стикерпак «Православный»'] },
  { id: 'FOF-0002', date: '2025-01-05', status: 'shipped', total: 3890, items: ['Свитшот «Faith over Fear»'] },
]

export default function OrdersPage() {
  return (
    <PageLayout>
      <div className="container py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account" className="text-sm text-gray-400 hover:text-[var(--navy)] transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Личный кабинет
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>История заказов</span>
        </div>

        <h1 className="text-3xl font-bold text-[var(--navy)] mb-8" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          История заказов
        </h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>У вас пока нет заказов</p>
            <Link href="/catalog" className="btn-primary inline-block mt-6">Перейти в каталог</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map(order => {
              const s = STATUS_LABELS[order.status]
              return (
                <div key={order.id} className="bg-white border border-gray-100 rounded-lg p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-bold text-[var(--navy)] text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        Заказ #{order.id}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.color}`} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                      {s.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {order.items.join(', ')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                      {order.total.toLocaleString('ru-RU')} ₽
                    </span>
                    <button className="text-xs text-[var(--burgundy)] hover:underline" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                      Подробнее
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
