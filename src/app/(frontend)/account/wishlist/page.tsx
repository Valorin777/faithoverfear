import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  return (
    <PageLayout>
      <div className="container py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/account" className="text-sm text-gray-400 hover:text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Личный кабинет</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-[var(--navy)]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Избранное</span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--navy)] mb-8" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Избранное</h1>
        <div className="text-center py-20">
          <Heart size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 mb-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Вы ещё не добавили товары в избранное
          </p>
          <Link href="/catalog" className="btn-primary inline-block">Перейти в каталог</Link>
        </div>
      </div>
    </PageLayout>
  )
}
