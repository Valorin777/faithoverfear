import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Faith over Fear — христианская одежда',
    short_name: 'Faith over Fear',
    description:
      'Христианская одежда с цитатами Священного Писания: футболки, поло, свитшоты и аксессуары. Создано с молитвой.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    background_color: '#0a0908',
    theme_color: '#1B2A4A',
    lang: 'ru',
    dir: 'ltr',
    categories: ['shopping', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Каталог', short_name: 'Каталог', url: '/catalog' },
      { name: 'Корзина', short_name: 'Корзина', url: '/cart' },
      { name: 'Чехлы на заказ', short_name: 'Чехлы', url: '/cases' },
    ],
  }
}
