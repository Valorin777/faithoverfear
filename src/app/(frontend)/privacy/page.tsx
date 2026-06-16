import { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'

export const metadata: Metadata = { title: 'Политика конфиденциальности', description: 'Политика конфиденциальности Faith over Fear.' }

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Политика конфиденциальности"
      titleEn="Privacy Policy"
      updated="Последнее обновление: 1 января 2025 г."
      updatedEn="Last updated: 1 January 2025"
      sections={[
        { title: '1. Общие положения', titleEn: '1. General provisions', text: 'Настоящая политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта faithof.ru в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».', textEn: 'This privacy policy defines how personal data of faithof.ru users is processed in accordance with Russian Federal Law No. 152-FZ “On Personal Data”.' },
        { title: '2. Какие данные мы собираем', titleEn: '2. What data we collect', text: 'Мы собираем имя, email, номер телефона и адрес доставки исключительно для оформления и доставки заказов. Данные банковских карт не хранятся на наших серверах.', textEn: 'We collect your name, email, phone number and delivery address solely to process and deliver orders. Bank card details are not stored on our servers.' },
        { title: '3. Как мы используем данные', titleEn: '3. How we use the data', text: 'Данные используются для: обработки заказов, связи с покупателем, информирования о статусе заказа, улучшения качества сервиса. Мы не передаём данные третьим лицам, кроме служб доставки и платёжных систем, необходимых для выполнения заказа.', textEn: 'The data is used to process orders, communicate with the customer, provide order status updates and improve our service. We do not share data with third parties, except the delivery carriers and payment systems required to fulfil the order.' },
        { title: '4. Защита данных', titleEn: '4. Data protection', text: 'Ваши данные хранятся на серверах в России и защищены SSL-шифрованием. Мы принимаем все необходимые технические и организационные меры для защиты персональных данных.', textEn: 'Your data is stored on servers in Russia and protected by SSL encryption. We take all necessary technical and organisational measures to protect personal data.' },
        { title: '5. Ваши права', titleEn: '5. Your rights', text: 'Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого напишите нам на info@faithof.ru.', textEn: 'You have the right to request access to your data, its correction or deletion. To do so, email us at info@faithof.ru.' },
        { title: '6. Cookies', titleEn: '6. Cookies', text: 'Сайт использует файлы cookie для улучшения работы. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.', textEn: 'The site uses cookies to improve its operation. You can disable cookies in your browser settings, though this may affect the site’s functionality.' },
      ]}
    />
  )
}
