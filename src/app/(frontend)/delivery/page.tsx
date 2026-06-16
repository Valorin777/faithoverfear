import { Metadata } from 'next'
import DeliveryContent from './DeliveryContent'

export const metadata: Metadata = { title: 'Доставка и оплата', description: 'Условия доставки и способы оплаты в магазине Faith over Fear.' }

export default function DeliveryPage() {
  return <DeliveryContent />
}
