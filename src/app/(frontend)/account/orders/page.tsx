import { redirect } from 'next/navigation'

// Раздел «История заказов» объединён с личным кабинетом, где показываются
// реальные заказы покупателя (без тестовых данных). Старый адрес
// перенаправляем на кабинет, чтобы сохранить работающие ссылки.
export default function OrdersRedirectPage() {
  redirect('/account')
}
