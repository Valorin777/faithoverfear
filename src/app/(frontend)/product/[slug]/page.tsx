import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { products, reviews } from '@/data/products'
import ProductContent from './ProductContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) notFound()

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const productReviews = reviews.slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Faith over Fear' },
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `https://faithof.ru/product/${product.slug}`,
    },
  }

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ProductContent product={product} related={related} productReviews={productReviews} />
    </PageLayout>
  )
}
