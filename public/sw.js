/* Faith over Fear — service worker (PWA).
   Стратегия безопасная:
   - страницы: network-first (всегда свежее онлайн; из кэша/офлайн-страницы — только без сети);
   - неизменяемая статика (_next/static, иконки, шрифты, картинки): cache-first;
   - админка, API, оплата, seed — НЕ кэшируем (всегда из сети). */
const VERSION = 'fof-v1'
const STATIC_CACHE = `${VERSION}-static`
const PAGE_CACHE = `${VERSION}-pages`
const OFFLINE_URL = '/offline.html'
const PRECACHE = [OFFLINE_URL, '/icons/icon-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

const STATIC_RE = /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|gif|svg|ico|avif)$/i

function isBypassed(url) {
  return (
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/seed') ||
    url.pathname.startsWith('/checkout') ||
    url.pathname.startsWith('/_next/data')
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  let url
  try {
    url = new URL(request.url)
  } catch {
    return
  }
  if (url.origin !== self.location.origin) return
  if (isBypassed(url)) return

  // Неизменяемая статика → cache-first
  if (url.pathname.startsWith('/_next/static') || url.pathname.startsWith('/icons/') || STATIC_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const copy = res.clone()
              caches.open(STATIC_CACHE).then((c) => c.put(request, copy))
            }
            return res
          }),
      ),
    )
    return
  }

  // Навигация по страницам → network-first, при офлайне — кэш, затем офлайн-страница
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone()
            caches.open(PAGE_CACHE).then((c) => c.put(request, copy))
          }
          return res
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))),
    )
  }
})

// Мгновенное обновление при выходе новой версии
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting()
})
