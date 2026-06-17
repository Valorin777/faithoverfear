import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import InfoHub from '@/components/info/InfoHub'

export const metadata: Metadata = {
  title: 'Информация о вере — справочник',
  description:
    'Библейские цитаты, популярные вопросы о вере и религии, православные традиции, символы православия, христианские праздники и заповеди.',
}

export default function InfoPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Информация
          </h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
          <p
            className="mt-5 text-sm"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Библейские цитаты · вопросы о вере · традиции · символы · праздники · заповеди
          </p>
        </div>
      </div>
      <div className="container py-16 max-w-3xl">
        <InfoHub />
      </div>
    </PageLayout>
  )
}
