'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActive(i => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-3">
      {/* Главное фото */}
      <div className="relative aspect-square bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] rounded-lg overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="48" height="66" viewBox="0 0 32 44" fill="none" className="opacity-10">
            <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
            <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
          </svg>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={18} className="text-[var(--navy)]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={18} className="text-[var(--navy)]" />
            </button>
          </>
        )}

        {/* Счётчик */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded font-[var(--font-inter)]">
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all bg-gradient-to-br from-[var(--beige)] to-[var(--gold-light)] flex items-center justify-center ${
                i === active
                  ? 'border-[var(--navy)]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg width="16" height="22" viewBox="0 0 32 44" fill="none" className="opacity-20">
                <rect x="13" y="0" width="6" height="44" rx="3" fill="var(--navy)" />
                <rect x="0" y="12" width="32" height="6" rx="3" fill="var(--navy)" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
