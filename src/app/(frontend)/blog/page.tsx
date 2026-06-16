import { Metadata } from 'next'
import BlogContent from './BlogContent'
import { getPosts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Блог — Faith over Fear',
  description: 'Статьи о православной вере, духовной жизни и нашем проекте.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogContent posts={posts} />
}
