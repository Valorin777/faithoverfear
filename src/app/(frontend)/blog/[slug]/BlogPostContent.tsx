'use client'

import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { BlogPost } from '@/types'
import { useLang } from '@/context/LanguageContext'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { t, lang } = useLang()
  return (
    <PageLayout>
      <div className="container py-10 max-w-3xl">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-[var(--navy)] transition-colors mb-8 block" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          {t('← Все статьи', '← All articles')}
        </Link>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          {new Date(post.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          {t(post.title, post.titleEn)}
        </h1>
        <div className="w-12 h-[2px] bg-[var(--gold)] mb-8" />
        <div className="aspect-video bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] rounded-lg mb-8 flex items-center justify-center">
          <svg width="40" height="56" viewBox="0 0 32 44" fill="none" className="opacity-15">
            <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
            <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
          </svg>
        </div>
        <div className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          <p>{t(post.excerpt, post.excerptEn)}</p>
          <p className="mt-4">{t('Полный текст статьи будет добавлен администратором через панель управления.', 'The full article text will be added by the administrator via the control panel.')}</p>
        </div>
      </div>
    </PageLayout>
  )
}
