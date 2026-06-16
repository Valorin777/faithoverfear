'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import VideoPlayer from '@/components/ui/VideoPlayer'

interface ProductGalleryProps {
  images: string[]
  video?: string
  name: string
}

type Item = { type: 'image' | 'video'; src: string }

const PLACEHOLDER = '/images/placeholder-product.jpg'

export default function ProductGallery({ images, video, name }: ProductGalleryProps) {
  const items: Item[] = [
    ...(video ? [{ type: 'video' as const, src: video }] : []),
    ...images.map((src) => ({ type: 'image' as const, src })),
  ]
  const [active, setActive] = useState(0)
  const total = items.length
  const cur = items[active]
  const poster = images.find((s) => s && s !== PLACEHOLDER)

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1))
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1))

  const realImg = (src: string) => !!src && src !== PLACEHOLDER

  return (
    <div className="flex flex-col gap-3">
      {/* Главное медиа */}
      <div className="relative aspect-square bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] rounded-lg overflow-hidden group">
        {/* Плейсхолдер-подложка (виден, если нет фото) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="48" height="66" viewBox="0 0 32 44" fill="none" className="opacity-10">
            <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
            <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
          </svg>
        </div>

        {cur?.type === 'video' ? (
          <div className="absolute inset-0">
            <VideoPlayer src={cur.src} poster={poster} controls />
          </div>
        ) : (
          cur &&
          realImg(cur.src) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cur.src}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Предыдущее"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={18} className="text-[var(--navy)]" />
            </button>
            <button
              onClick={next}
              aria-label="Следующее"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={18} className="text-[var(--navy)]" />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded font-[var(--font-inter)]">
              {active + 1} / {total}
            </div>
          </>
        )}
      </div>

      {/* Миниатюры */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={it.type === 'video' ? 'Видео' : `Фото ${i + 1}`}
              className={`relative flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] flex items-center justify-center ${
                i === active ? 'border-[var(--navy)]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {it.type === 'image' && realImg(it.src) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt="" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              ) : it.type === 'video' ? (
                <span className="absolute inset-0 flex items-center justify-center bg-[var(--navy)]/85 text-white">
                  <Play size={18} fill="currentColor" />
                </span>
              ) : (
                <svg width="16" height="22" viewBox="0 0 32 44" fill="none" className="opacity-20">
                  <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                  <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
