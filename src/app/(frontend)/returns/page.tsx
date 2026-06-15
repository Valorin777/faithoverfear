import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = { title: 'Возврат и обмен', description: 'Условия возврата и обмена товаров в магазине Faith over Fear.' }

export default function ReturnsPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Возврат и обмен</h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
        </div>
      </div>
      <div className="container py-14 max-w-3xl">
        {[
          { title: 'Срок возврата', text: 'Вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении и сохранил товарный вид, упаковку и все бирки.' },
          { title: 'Условия возврата', text: 'Товар должен быть в оригинальной упаковке, без следов носки, стирки или повреждений. Возврат осуществляется по закону о защите прав потребителей (ЗПП РФ).' },
          { title: 'Обмен товара', text: 'Если вам не подошёл размер или цвет — мы с радостью обменяем товар. Свяжитесь с нами по email info@faithof.ru или через Telegram.' },
          { title: 'Как оформить возврат', text: 'Напишите нам на info@faithof.ru с темой «Возврат» и укажите номер заказа. Мы ответим в течение 1 рабочего дня и объясним дальнейшие шаги.' },
          { title: 'Стоимость возврата', text: 'Если возврат по нашей вине (брак, ошибка в заказе) — доставку оплачиваем мы. Если по вашей причине (не подошёл размер) — доставку оплачиваете вы.' },
        ].map((item, i) => (
          <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
            <h2 className="text-xl font-bold text-[var(--navy)] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{item.title}</h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{item.text}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
