import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности Faith over Fear.' }

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Политика конфиденциальности</h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
        </div>
      </div>
      <div className="container py-14 max-w-3xl text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <p className="text-sm text-gray-400 mb-8">Последнее обновление: 1 января 2025 г.</p>
        {[
          { title: '1. Общие положения', text: 'Настоящая политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта faithof.ru в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».' },
          { title: '2. Какие данные мы собираем', text: 'Мы собираем имя, email, номер телефона и адрес доставки исключительно для оформления и доставки заказов. Данные банковских карт не хранятся на наших серверах.' },
          { title: '3. Как мы используем данные', text: 'Данные используются для: обработки заказов, связи с покупателем, информирования о статусе заказа, улучшения качества сервиса. Мы не передаём данные третьим лицам, кроме служб доставки и платёжных систем, необходимых для выполнения заказа.' },
          { title: '4. Защита данных', text: 'Ваши данные хранятся на серверах в России и защищены SSL-шифрованием. Мы принимаем все необходимые технические и организационные меры для защиты персональных данных.' },
          { title: '5. Ваши права', text: 'Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого напишите нам на info@faithof.ru.' },
          { title: '6. Cookies', text: 'Сайт использует файлы cookie для улучшения работы. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.' },
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
