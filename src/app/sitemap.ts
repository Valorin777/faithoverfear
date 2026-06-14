import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { blogPosts } from '@/data/blog'

const BASE_URL = 'https://faithof.ru'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/catalog', '/new', '/sale', '/gift-sets', '/about',
    '/blog', '/contacts', '/delivery', '/privacy', '/offer', '/returns',
    '/catalog/tshirts', '/catalog/polo', '/catalog/sweatshirts',
    '/catalog/sweaters', '/catalog/accessories',
  ].map(path => ({
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
