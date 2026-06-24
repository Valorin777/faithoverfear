import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { blogPosts } from '@/data/blog'
import { getCategories } from '@/lib/cms'

const BASE_URL = 'https://faithof.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cats = await getCategories()

  const basePaths = [
    '', '/catalog', '/new', '/sale', '/gift-sets', '/about',
    '/blog', '/contacts', '/delivery', '/cases', '/privacy', '/offer', '/returns',
  ]
  const categoryPaths = cats.map(c => `/catalog/${c.slug}`)

  const staticPages = [...basePaths, ...categoryPaths].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const productPages = products.map(p => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const blogPages = blogPosts.map(p => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
