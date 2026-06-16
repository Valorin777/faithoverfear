import { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Блог — Faith over Fear',
  description: 'Статьи о православной вере, духовной жизни и нашем проекте.',
}

export default function BlogPage() {
  return <BlogContent />
}
