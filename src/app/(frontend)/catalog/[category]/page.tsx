import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'
import { CATEGORY_LABELS, CATEGORY_LABELS_EN, ProductCategory } from '@/types'

export const revalidate = 60

const VALID_CATEGORIES = ['tshirts', 'polo', 'sweatshirts', 'sweaters', 'gift-sets', 'accessories']

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const label = CATEGORY_LABELS[category as ProductCategory]
  if (!label) return {}
  return {
    title: `${label} — христианская одежда`,
    description: `${label} с христианскими дизайнами, цитатами Иисуса Христа и христианской символикой.`,
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
  const products = await getProducts()

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
