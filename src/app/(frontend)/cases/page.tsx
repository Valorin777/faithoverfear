import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CasesContent from '@/components/cases/CasesContent'

export const metadata: Metadata = {
  title: 'Чехол по вашему дизайну',
  description: 'Закажите индивидуальный христианский дизайн чехла для вашей модели телефона — укажите модель и пожелания.',
}

export default function CasesPage() {
  return (
    <PageLayout>
      <CasesContent />
    </PageLayout>
  )
}
