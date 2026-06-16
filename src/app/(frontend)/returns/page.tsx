import { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'

export const metadata: Metadata = { title: 'Возврат и обмен', description: 'Условия возврата и обмена товаров в магазине Faith over Fear.' }

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Возврат и обмен"
      titleEn="Returns & Exchange"
      sections={[
        { title: 'Срок возврата', titleEn: 'Return period', text: 'Вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении и сохранил товарный вид, упаковку и все бирки.', textEn: 'You may return an item within 14 days of receipt if it has not been used and retains its original appearance, packaging and all tags.' },
        { title: 'Условия возврата', titleEn: 'Return conditions', text: 'Товар должен быть в оригинальной упаковке, без следов носки, стирки или повреждений. Возврат осуществляется по закону о защите прав потребителей (ЗПП РФ).', textEn: 'The item must be in its original packaging, with no signs of wear, washing or damage. Returns are handled under the Russian consumer protection law.' },
        { title: 'Обмен товара', titleEn: 'Exchange', text: 'Если вам не подошёл размер или цвет — мы с радостью обменяем товар. Свяжитесь с нами по email info@faithof.ru или через Telegram.', textEn: 'If the size or colour did not fit, we will gladly exchange the item. Contact us by email at info@faithof.ru or via Telegram.' },
        { title: 'Как оформить возврат', titleEn: 'How to request a return', text: 'Напишите нам на info@faithof.ru с темой «Возврат» и укажите номер заказа. Мы ответим в течение 1 рабочего дня и объясним дальнейшие шаги.', textEn: 'Email us at info@faithof.ru with the subject “Return” and include your order number. We will reply within 1 business day and explain the next steps.' },
        { title: 'Стоимость возврата', titleEn: 'Return shipping cost', text: 'Если возврат по нашей вине (брак, ошибка в заказе) — доставку оплачиваем мы. Если по вашей причине (не подошёл размер) — доставку оплачиваете вы.', textEn: 'If the return is our fault (a defect or an order error), we cover the shipping. If it is for your own reason (wrong size), the shipping is at your expense.' },
      ]}
    />
  )
}
