import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import PresentationContent from '@/components/pages/PresentationContent'

export const metadata: Metadata = {
  title: 'Манифест бренда Faith over Fear',
  description:
    'Манифест бренда христианской одежды Faith over Fear: вера сильнее страха, внутренняя опора, основатели и ценности.',
}

export default function PresentationPage() {
  return (
    <PageLayout>
      <PresentationContent />
    </PageLayout>
  )
}
