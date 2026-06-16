import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { products } from '@/data/products'
import { CATEGORY_LABELS, CATEGORY_LABELS_EN, ProductCategory } from '@/types'

const VALID_CATEGORIES = ['tshirts', 'polo', 'sweatshirts', 'sweaters', 'gift-sets', 'accessories']

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const label = CATEGORY_LABELS[category as ProductCategory]
  if (!label) return {}
  return {
    title: `${label} — православная одежда`,
    description: `${label} с православными дизайнами, цитатами Иисуса Христа и христианской символикой.`,
  }
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const cat = category as ProductCategory
  const label = CATEGORY_LABELS[cat]
  const labelEn = CATEGORY_LABELS_EN[cat]

  return (
    <PageLayout>
      <CatalogGrid
        products={products}
        initialCategory={cat}
        title={label}
        titleEn={labelEn}
      />
    </PageLayout>
  )
}
