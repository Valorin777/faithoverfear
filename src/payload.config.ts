import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ru } from '@payloadcms/translations/languages/ru'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Orders'
import { Reviews } from './collections/Reviews'
import { Posts } from './collections/Posts'
import { Promocodes } from './collections/Promocodes'
import { Returns } from './collections/Returns'
import { PaymentSystems } from './collections/PaymentSystems'
import { SupportMessages } from './collections/SupportMessages'
import { CustomRequests } from './collections/CustomRequests'
import { Campaigns } from './collections/Campaigns'
import { Customers } from './collections/Customers'
import { InfoTopics } from './collections/InfoTopics'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Выбор базы данных:
//  - локально (SQLite): DATABASE_URI = file:./faithoverfear.db
//  - продакшен (Postgres на Vercel): DATABASE_URI / POSTGRES_URL = postgres://...
const databaseUri =
  process.env.DATABASE_URI ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL ||
  'file:./faithoverfear.db'
const isPostgres = databaseUri.startsWith('postgres')

const db = isPostgres
  ? postgresAdapter({
      pool: { connectionString: databaseUri },
      // Автоматически создаёт/синхронизирует таблицы при запуске
      // (чтобы не запускать миграции вручную при первом деплое)
      push: true,
    })
  : sqliteAdapter({ client: { url: databaseUri }, push: true })

// Хранилище фото: на Vercel — облако (Blob), локально — диск.
const storagePlugins = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : []

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Faith over Fear',
    },
    components: {
      // Полностью кастомный дашборд (заменяет домашнюю страницу /admin)
      // + отдельная страница реферальной программы (/admin/referrals)
      views: {
        dashboard: { Component: '/components/admin/dashboard/Dashboard#default' },
        referrals: {
          Component: '/components/admin/referrals/Referrals#default',
          path: '/referrals',
        },
      },
      // Быстрые ссылки в навигации
      afterNavLinks: ['/components/admin/AfterNavLinks#default'],
      // Фирменная графика вместо логотипа Payload
      graphics: {
        Logo: '/components/admin/Logo#default',
        Icon: '/components/admin/Icon#default',
      },
    },
  },
  // Порядок задаёт группировку в навигации: Магазин · Аудитория · Контент · Маркетинг · Система
  collections: [Products, Categories, Orders, Returns, PaymentSystems, Customers, Reviews, SupportMessages, CustomRequests, Posts, InfoTopics, Media, Promocodes, Campaigns, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  plugins: [...storagePlugins],
  i18n: {
    supportedLanguages: { ru },
    fallbackLanguage: 'ru',
  },
})
