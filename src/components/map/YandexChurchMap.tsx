'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { CHURCHES, CHURCH_DISTRICTS } from '@/data/churches'
import { useLang } from '@/context/LanguageContext'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { ymaps?: any }
}

const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
const FONT = 'var(--font-inter), sans-serif'

interface Entry { pm: any; coords: [number, number]; district: string; index: number }

export default function YandexChurchMap() {
  const { t } = useLang()
  const mapEl = useRef<HTMLDivElement>(null)
  const mapObj = useRef<any>(null)
  const clusterer = useRef<any>(null)
  const entries = useRef<Entry[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'no-key' | 'error'>('loading')
  const [district, setDistrict] = useState<string>('all')

  // ── Инициализация карты ──
  useEffect(() => {
    if (!API_KEY) { setStatus('no-key'); return }
    let cancelled = false

    const init = () => {
      window.ymaps.ready(() => {
        if (cancelled || !mapEl.current || mapObj.current) return
        const map = new window.ymaps.Map(
          mapEl.current,
          { center: [61, 90], zoom: 3, controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'] },
          { suppressMapOpenBlock: true },
        )
        mapObj.current = map
        const cl = new window.ymaps.Clusterer({ preset: 'islands#goldClusterIcons', groupByCoordinates: false })
        clusterer.current = cl
        map.geoObjects.add(cl)

        Promise.all(
          CHURCHES.map((c, index) =>
            window.ymaps
              .geocode(c.address ? `${c.address}, храм` : c.name, { results: 1 })
              .then((res: any) => {
                const obj = res.geoObjects.get(0)
                if (!obj) return null
                const coords = obj.geometry.getCoordinates() as [number, number]
                const pm = new window.ymaps.Placemark(
                  coords,
                  {
                    balloonContentHeader: c.name,
                    balloonContentBody: `<p style="font-size:13px;line-height:1.5">${c.description}</p>`,
                    balloonContentFooter: `<span style="color:#888;font-size:12px">${c.address}</span>`,
                    hintContent: c.name,
                  },
                  { preset: 'islands#goldDotIcon' },
                )
                const entry: Entry = { pm, coords, district: c.district, index }
                entries.current[index] = entry
                return entry
              })
              .catch(() => null),
          ),
        ).then((res: (Entry | null)[]) => {
          if (cancelled) return
          const valid = res.filter(Boolean) as Entry[]
          cl.add(valid.map((e) => e.pm))
          if (valid.length) {
            try { map.setBounds(cl.getBounds(), { checkZoomRange: true, zoomMargin: 35 }) } catch { /* пусто */ }
          }
          setStatus('ready')
        })
      })
    }

    if (window.ymaps) { init(); return () => { cancelled = true } }
    let s = document.getElementById('yandex-maps-script') as HTMLScriptElement | null
    if (s) {
      s.addEventListener('load', init)
    } else {
      s = document.createElement('script')
      s.id = 'yandex-maps-script'
      s.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`
      s.async = true
      s.onload = init
      s.onerror = () => setStatus('error')
      document.body.appendChild(s)
    }
    return () => { cancelled = true }
  }, [])

  // ── Фильтр по округу ──
  useEffect(() => {
    const cl = clusterer.current
    const map = mapObj.current
    if (status !== 'ready' || !cl || !map) return
    const subset = entries.current.filter((e) => e && (district === 'all' || e.district === district))
    cl.removeAll()
    cl.add(subset.map((e) => e.pm))
    if (subset.length) {
      try { map.setBounds(cl.getBounds(), { checkZoomRange: true, zoomMargin: 35 }) } catch { /* пусто */ }
    }
  }, [district, status])

  const flyTo = (index: number) => {
    const e = entries.current[index]
    const map = mapObj.current
    if (!e || !map) return
    map.setCenter(e.coords, 14, { duration: 400 })
    e.pm.balloon.open()
  }

  const visible = CHURCHES.map((c, i) => ({ ...c, index: i })).filter((c) => district === 'all' || c.district === district)

  return (
    <div>
      {/* Фильтр по федеральным округам */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' }}>
        <Chip active={district === 'all'} onClick={() => setDistrict('all')}>{t('Все', 'All')}</Chip>
        {CHURCH_DISTRICTS.map((d) => (
          <Chip key={d} active={district === d} onClick={() => setDistrict(d)}>{d}</Chip>
        ))}
      </div>

      <div className="fof-map-layout" style={{ display: 'grid', gap: '1.25rem' }}>
        {/* Карта */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #ece9e3', minHeight: 460 }}>
          {status === 'no-key' && (
            <div style={notice}>
              <strong style={{ color: 'var(--navy)' }}>{t('Карта подключается ключом', 'Map needs an API key')}</strong>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#777', lineHeight: 1.6 }}>
                {t(
                  'Добавьте переменную NEXT_PUBLIC_YANDEX_MAPS_API_KEY (бесплатный ключ Яндекс.Карт) — и интерактивная карта храмов включится автоматически. Пока показан список ниже.',
                  'Add NEXT_PUBLIC_YANDEX_MAPS_API_KEY (a free Yandex Maps key) — the interactive map turns on automatically. The list is shown below for now.',
                )}
              </p>
            </div>
          )}
          {status === 'error' && (
            <div style={notice}>
              <strong style={{ color: 'var(--burgundy)' }}>{t('Не удалось загрузить карту', 'Could not load the map')}</strong>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#777' }}>
                {t('Проверьте ключ Яндекс.Карт.', 'Check the Yandex Maps key.')}
              </p>
            </div>
          )}
          <div ref={mapEl} style={{ width: '100%', height: '62vh', minHeight: 460, display: API_KEY ? 'block' : 'none', background: '#eef0f3' }} />
          {status === 'loading' && API_KEY && (
            <div style={{ ...notice, pointerEvents: 'none' }}>
              <span style={{ fontSize: '0.85rem', color: '#999' }}>{t('Загружаем карту…', 'Loading map…')}</span>
            </div>
          )}
        </div>

        {/* Список храмов */}
        <div style={{ maxHeight: '62vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 4 }}>
          {visible.map((c) => (
            <button
              key={c.index}
              type="button"
              onClick={() => flyTo(c.index)}
              disabled={status !== 'ready'}
              style={listItem(status === 'ready')}
            >
              <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: 700, color: 'var(--navy)', fontSize: '0.92rem' }}>{c.name}</span>
              <span style={{ fontFamily: FONT, fontSize: '0.76rem', color: '#999', marginTop: 2 }}>{c.address}</span>
              <span style={{ fontFamily: FONT, fontSize: '0.78rem', color: '#666', marginTop: 6, lineHeight: 1.5 }}>{c.description}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .fof-map-layout { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .fof-map-layout { grid-template-columns: 1.6fr 1fr; } }
      `}</style>
    </div>
  )
}

const notice: CSSProperties = {
  position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem',
  background: 'var(--beige)', fontFamily: FONT,
}
const listItem = (enabled: boolean): CSSProperties => ({
  display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%',
  background: '#fff', border: '1px solid #ece9e3', borderRadius: 10, padding: '0.85rem 1rem',
  cursor: enabled ? 'pointer' : 'default', transition: 'border-color 0.15s, box-shadow 0.15s',
})

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: FONT, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
        padding: '0.45rem 0.9rem', borderRadius: 99,
        border: `1.5px solid ${active ? 'var(--navy)' : '#e2e2e2'}`,
        background: active ? 'var(--navy)' : '#fff',
        color: active ? '#fff' : '#666',
      }}
    >
      {children}
    </button>
  )
}
