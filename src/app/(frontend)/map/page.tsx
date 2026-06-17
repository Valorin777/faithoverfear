import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import YandexChurchMap from '@/components/map/YandexChurchMap'

export const metadata: Metadata = {
  title: 'Карта православных храмов России',
  description:
    'Интерактивная карта главных православных храмов и святынь России по федеральным округам — с адресами и описаниями.',
}

export default function MapPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-10">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#fff' }}>
            Карта храмов
          </h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
          <p
            className="mt-5 text-sm"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Главные православные храмы и святыни России — по федеральным округам
          </p>
        </div>
      </div>
      <div className="container py-12">
        <YandexChurchMap />
      </div>
    </PageLayout>
  )
}
