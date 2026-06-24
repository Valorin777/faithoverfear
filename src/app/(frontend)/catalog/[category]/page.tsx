import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts, getCategories } from '@/lib/cms'

export const revalidate = 60

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cats = await getCategories()
  const cat = cats.find(c => c.slug === category)
  if (!cat) return {}
  return {
    title: `${cat.name} — христианская одежда`,
    description: `${cat.name} с христианскими дизайнами, цитатами Иисуса Христа и христианской символикой.`,
  }
}

export async function generateStaticParams() {
  const cats = await getCategories()
  return cats.map(c => ({ category: c.slug }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const cats = await getCategories()
  const cat = cats.find(c => c.slug === category)

  if (!cat) {
    notFound()
  }

  const products = await getProducts()

  return (
    <PageLayout>
      <CatalogGrid
        products={products}
        initialCategory={cat.slug}
        title={cat.name}
        titleEn={cat.nameEn || cat.name}
      />
    </PageLayout>
  )
}
