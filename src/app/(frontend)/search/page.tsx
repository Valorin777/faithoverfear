import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Поиск по каталогу',
  description: 'Поиск товаров по названию, описанию и тегам.',
}

export const revalidate = 60

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim().toLowerCase()
  const all = await getProducts()

  const results = query
    ? all.filter((p) => {
        const haystack = [
          p.name,
          p.nameEn,
          p.description,
          p.descriptionEn,
          p.spiritualMeaning,
          ...(p.tags || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })
    : []

  return (
    <PageLayout>
      <CatalogGrid
        products={results}
        title={q ? `Поиск: «${q}»` : 'Поиск'}
        titleEn={q ? `Search: “${q}”` : 'Search'}
      />
    </PageLayout>
  )
}
