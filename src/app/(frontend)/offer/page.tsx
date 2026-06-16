import { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'

export const metadata: Metadata = { title: 'Публичная оферта', description: 'Публичная оферта интернет-магазина Faith over Fear.' }

export default function OfferPage() {
  return (
    <LegalPage
      title="Публичная оферта"
      titleEn="Public Offer"
      updated="Последнее обновление: 1 января 2025 г."
      updatedEn="Last updated: 1 January 2025"
      sections={[
        { title: '1. Предмет договора', titleEn: '1. Subject of the agreement', text: 'Настоящая публичная оферта является официальным предложением ИП [ФИО] (далее — Продавец) заключить договор розничной купли-продажи товаров, представленных на сайте faithof.ru.', textEn: 'This public offer is the official proposal of the sole proprietor [full name] (hereinafter — the Seller) to conclude a retail purchase agreement for the goods presented on faithof.ru.' },
        { title: '2. Акцепт оферты', titleEn: '2. Acceptance of the offer', text: 'Акцептом настоящей оферты считается оформление заказа на сайте. С момента акцепта договор считается заключённым.', textEn: 'Placing an order on the site constitutes acceptance of this offer. The agreement is considered concluded from the moment of acceptance.' },
        { title: '3. Цены и оплата', titleEn: '3. Prices and payment', text: 'Цены на товары указаны в рублях РФ и включают НДС. Продавец вправе изменять цены без предварительного уведомления. Цена фиксируется в момент оформления заказа.', textEn: 'Prices are listed in Russian roubles and include VAT. The Seller may change prices without prior notice. The price is fixed at the moment the order is placed.' },
        { title: '4. Доставка', titleEn: '4. Delivery', text: 'Доставка осуществляется через СДЭК, Boxberry, Почту России. Сроки и стоимость доставки указаны в разделе «Доставка и оплата».', textEn: 'Delivery is carried out via CDEK, Boxberry and Russian Post. Delivery times and costs are listed in the “Delivery & Payment” section.' },
        { title: '5. Возврат', titleEn: '5. Returns', text: 'Порядок возврата регулируется Законом РФ «О защите прав потребителей» и описан в разделе «Возврат и обмен».', textEn: 'The return procedure is governed by the Russian consumer protection law and is described in the “Returns & Exchange” section.' },
        { title: '6. Ответственность', titleEn: '6. Liability', text: 'Продавец не несёт ответственности за задержки доставки, вызванные действиями служб доставки или обстоятельствами непреодолимой силы.', textEn: 'The Seller is not liable for delivery delays caused by the carriers or by force majeure circumstances.' },
      ]}
    />
  )
}
