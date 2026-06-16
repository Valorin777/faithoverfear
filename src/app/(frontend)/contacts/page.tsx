import { Metadata } from 'next'
import ContactsContent from './ContactsContent'

export const metadata: Metadata = { title: 'Контакты', description: 'Свяжитесь с нами — Faith over Fear' }

export default function ContactsPage() {
  return <ContactsContent />
}
