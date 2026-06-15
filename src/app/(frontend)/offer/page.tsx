import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = { title: 'Публичная оферта', description: 'Публичная оферта интернет-магазина Faith over Fear.' }

export default function OfferPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Публичная оферта</h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
        </div>
      </div>
      <div className="container py-14 max-w-3xl text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <p className="text-sm text-gray-400 mb-8">Последнее обновление: 1 января 2025 г.</p>
        {[
          { title: '1. Предмет договора', text: 'Настоящая публичная оферта является официальным предложением ИП [ФИО] (далее — Продавец) заключить договор розничной купли-продажи товаров, представленных на сайте faithof.ru.' },
          { title: '2. Акцепт оферты', text: 'Акцептом настоящей оферты считается оформление заказа на сайте. С момента акцепта договор считается заключённым.' },
          { title: '3. Цены и оплата', text: 'Цены на товары указаны в рублях РФ и включают НДС. Продавец вправе изменять цены без предварительного уведомления. Цена фиксируется в момент оформления заказа.' },
          { title: '4. Доставка', text: 'Доставка осуществляется через СДЭК, Boxberry, Почту России. Сроки и стоимость доставки указаны в разделе «Доставка и оплата».' },
          { title: '5. Возврат', text: 'Порядок возврата регулируется Законом РФ «О защите прав потребителей» и описан в разделе «Возврат и обмен».' },
          { title: '6. Ответственность', text: 'Продавец не несёт ответственности за задержки доставки, вызванные действиями служб доставки или обстоятельствами непреодолимой силы.' },
        ].map((s, i) => (
          <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
            <h2 className="text-lg font-bold text-[var(--navy)] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{s.title}</h2>
            <p className="leading-relaxed text-sm">{s.text}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
