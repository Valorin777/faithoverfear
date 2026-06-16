import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog'
import BlogPostContent from './BlogPostContent'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  return <BlogPostContent post={post} />
}
