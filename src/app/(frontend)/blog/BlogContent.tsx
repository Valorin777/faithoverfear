'use client'

import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { BlogPost } from '@/types'
import { useLang } from '@/context/LanguageContext'

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const { t, lang } = useLang()
  return (
    <PageLayout>
      <div className="bg-[var(--navy)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{t('Блог', 'Blog')}</h1>
          <div className="w-12 h-[2px] bg-[var(--gold)] mx-auto mt-4" />
        </div>
      </div>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] flex items-center justify-center">
                <svg width="28" height="38" viewBox="0 0 32 44" fill="none" className="opacity-20">
                  <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                  <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
                </svg>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  {new Date(post.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="font-bold text-[var(--navy)] mb-3 group-hover:text-[var(--burgundy)] transition-colors leading-snug" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  {t(post.title, post.titleEn)}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{t(post.excerpt, post.excerptEn)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
