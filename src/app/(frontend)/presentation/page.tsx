/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = {
  title: 'Презентация бренда Faith over Fear',
  description: 'Манифест и презентация бренда православной одежды Faith over Fear.',
}

const SLIDES = Array.from({ length: 8 }, (_, i) => `/presentation/slide${i + 1}.png`)

export default function PresentationPage() {
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-10">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#fff' }}>
            Презентация бренда
          </h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
          <p
            className="mt-5 text-sm"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Faith over Fear — манифест и ценности
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: 1000, margin: '0 auto' }}>
          {SLIDES.map((src, i) => (
            <div
              key={src}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid #ece9e3',
                boxShadow: '0 10px 30px rgba(27,42,74,0.08)',
                background: '#fff',
              }}
            >
              <img
                src={src}
                alt={`Слайд ${i + 1}`}
                loading={i < 2 ? 'eager' : 'lazy'}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
