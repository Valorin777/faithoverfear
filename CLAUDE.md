# Faith over Fear — Инструкция для Claude

## Проект

Интернет-магазин православной одежды **Faith over Fear** (faithof.ru).  
Стек: **Next.js 14 App Router · TypeScript · Tailwind CSS v4**

---

## Цветовая палитра (CSS-переменные)

Все цвета — только через переменные. Никогда не использовать hex-коды напрямую в коде.

```css
--navy: #1B2A4A        /* основной тёмно-синий */
--navy-dark: #111d33   /* тёмнее navy (футер) */
--gold: #C9A84C        /* золотой акцент */
--burgundy: #7B2D3E    /* бордовый */
--beige: #F5F0E8       /* светлый бежевый фон */
--beige-dark: #E8E0D0  /* тёмнее beige */
```

---

## Типографика

- Заголовки: `var(--font-playfair)` (Playfair Display, serif)
- Текст: `var(--font-inter)` (Inter, sans-serif)

Всегда указывать `fontFamily` явно в inline-стилях. Не использовать Tailwind-классы для шрифтов.

---

## Правила вёрстки (КРИТИЧЕСКИ ВАЖНО)

### Адаптивность
- **Никаких Tailwind responsive-классов** (`md:`, `lg:`, `xl:`). Они конфликтуют с inline-стилями.
- Вся адаптивность — через `<style>` тег внутри компонента + CSS media queries.
- Пример правильного подхода:
  ```tsx
  <div className="my-grid" style={{ display: 'grid' }}>
    ...
  </div>
  <style>{`
    .my-grid { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .my-grid { grid-template-columns: repeat(2, 1fr); } }
  `}</style>
  ```

### Предотвращение горизонтального overflow
- `html` и `body` имеют `overflow-x: hidden; max-width: 100%` — это уже в `globals.css`
- Все секции должны иметь `overflow: hidden` если содержат абсолютно позиционированные элементы
- Grid-ячейки с текстом: всегда добавлять `minWidth: 0`

### Контейнер
```tsx
<div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
```

### Кнопки
- Всегда `type="button"` чтобы не сабмитить форму случайно
- Иконки — только SVG, **никаких emoji**

---

## Структура файлов

```
src/
├── app/
│   ├── globals.css          — глобальные стили, CSS-переменные
│   ├── layout.tsx           — корневой layout с шрифтами
│   ├── page.tsx             — главная страница
│   ├── product/[slug]/      — страница товара
│   ├── catalog/[category]/  — страница категории
│   ├── account/             — личный кабинет
│   ├── cart/                — корзина
│   ├── checkout/            — оформление заказа
│   └── ...остальные страницы
├── components/
│   ├── layout/
│   │   ├── Header.tsx       — шапка (JS-based responsive, isDesktop state)
│   │   ├── Footer.tsx       — подвал
│   │   ├── PageLayout.tsx   — обёртка всех страниц
│   │   └── TelegramWidget.tsx — плавающая кнопка Telegram
│   ├── home/                — секции главной страницы
│   ├── catalog/             — фильтры и сетка каталога
│   ├── product/             — галерея и форма товара
│   └── ui/
│       └── ProductCard.tsx  — карточка товара
├── context/
│   └── CartContext.tsx      — корзина (React Context + localStorage)
├── data/
│   ├── products.ts          — массив товаров (заглушки до подключения БД)
│   └── blog.ts              — статьи блога
└── types/
    └── index.ts             — TypeScript типы
```

---

## Данные о товарах

Пока хранятся статически в `src/data/products.ts`. Структура товара:

```ts
{
  id: string
  slug: string
  name: string
  description: string
  spiritualMeaning: string   // цитата/смысл на странице товара
  price: number              // в рублях
  salePrice?: number
  category: 'tshirts' | 'polo' | 'sweatshirts' | 'sweaters' | 'accessories'
  images: string[]           // пути к фото в /public/images/
  isNew?: boolean
  isBestseller?: boolean
  wildberriesUrl?: string
  variants: ProductVariant[]
}
```

**Когда заказчик пришлёт фото товаров** — положить в `public/images/` и обновить поле `images` в `products.ts`.

---

## Что ещё НЕ подключено (ждём данные от заказчика)

| Что | Файл | Что нужно |
|-----|------|-----------|
| Оплата ЮKassa | `checkout/page.tsx` | `YUKASSA_SHOP_ID` + `YUKASSA_SECRET` |
| Доставка СДЭК | — | `CDEK_CLIENT_ID` + `CDEK_SECRET` |
| Доставка Boxberry | — | `BOXBERRY_API_KEY` |
| Яндекс.Метрика | `Analytics.tsx` | `YANDEX_METRIKA_ID` |
| Google Analytics | `Analytics.tsx` | `GA_MEASUREMENT_ID` |
| Telegram-канал | `TelegramWidget.tsx`, `Footer.tsx` | ссылка на канал |
| Email/SMTP | — | SMTP-данные или Resend API key |
| Фото товаров | `data/products.ts` | файлы в `public/images/` |

Переменные окружения хранить в `.env.local` (не коммитить в git).

---

## Команды

```bash
npm run dev      # локальный сервер на localhost:3000
npm run build    # сборка (проверить перед деплоем)
npm run lint     # проверка кода
```

## Деплой

Сайт задеплоен на **Vercel** через GitHub репозиторий `Valorin777/faithoverfear`.  
Любой push в ветку `main` → автоматический редеплой.

```bash
git add .
git commit -m "описание изменений"
git push
```

---

## Стиль кода

- Inline-стили — основной способ стилизации
- Tailwind — только для утилит без responsive-вариантов (`flex`, `items-center` и т.п.)
- Комментарии в коде — только если логика неочевидна
- Server Components по умолчанию; `'use client'` только где нужен useState/useEffect
