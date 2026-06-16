'use client'

import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'

export interface LegalSection {
  title: string
  titleEn?: string
  text: string
  textEn?: string
}

interface LegalPageProps {
  title: string
  titleEn?: string
  updated?: string
  updatedEn?: string
  sections: LegalSection[]
}

export default function LegalPage({ title, titleEn, updated, updatedEn, sections }: LegalPageProps) {
  const { t } = useLang()
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{t(title, titleEn)}</h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
        </div>
      </div>
      <div className="container py-14 max-w-3xl text-gray-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {updated && <p className="text-sm text-gray-400 mb-8">{t(updated, updatedEn)}</p>}
        {sections.map((s, i) => (
          <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
            <h2 className="text-lg font-bold text-[var(--navy)] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{t(s.title, s.titleEn)}</h2>
            <p className="leading-relaxed text-sm">{t(s.text, s.textEn)}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
