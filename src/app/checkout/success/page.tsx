import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'

export default function CheckoutSuccessPage() {
  return (
    <PageLayout>
      <div className="container py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M8 18l7 7 13-13" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[var(--navy)] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Заказ оформлен!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          Спасибо за покупку. Мы свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>
        <p className="text-[var(--gold)] text-sm mb-10" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          «Всё возможно верующему» (Мк. 9:23)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders" className="btn-primary inline-block">Мои заказы</Link>
          <Link href="/catalog" className="btn-secondary inline-block">Продолжить покупки</Link>
        </div>
      </div>
    </PageLayout>
  )
}
