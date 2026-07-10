import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Clock, Sparkles } from 'lucide-react'
import { blogPostsBySlug, BLOG_POSTS } from '@/lib/blog-posts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPostsBySlug[slug]

  if (!post) return {}

  const url = `https://seogenpro.online/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
  }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPostsBySlug[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(135deg,_rgba(248,250,252,1)_0%,_rgba(241,245,249,1)_100%)] px-4 py-24 dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,1)_100%)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <main id="main-content" className="mx-auto flex max-w-5xl flex-col">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-200 dark:hover:border-blue-700 dark:hover:text-blue-300 dark:focus-visible:ring-offset-gray-950"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </nav>

        <article className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_20px_80px_-24px_rgba(15,23,42,0.25)] dark:border-gray-800 dark:bg-gray-900">
          <header className="border-b border-gray-200/80 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 lg:p-10 dark:border-gray-800 dark:from-gray-950 dark:to-gray-900">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm text-gray-600 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl dark:text-white">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300">
                <Sparkles className="mr-2 h-4 w-4" />
                Expert article
              </div>
            </div>
          </header>

          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="relative mb-10 aspect-[800/450] overflow-hidden rounded-[1.5rem] bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
              <Image
                src={post.image}
                alt={`Cover image for: ${post.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 736px"
                priority
                unoptimized
              />
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-gray-950 prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-8 prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-invert dark:prose-headings:text-white dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 rounded-[1rem] border border-gray-200/80 bg-gray-50 p-5 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
              <p className="font-semibold text-gray-900 dark:text-white">Useful tools</p>
              <p className="mt-2 leading-7">
                Need help applying this? Try our{' '}
                <Link href="/sitemap-generator" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Sitemap Generator
                </Link>,{' '}
                <Link href="/llms-generator" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  llms.txt Generator
                </Link>, and{' '}
                <Link href="/robots-generator" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  robots.txt Generator
                </Link>.
              </p>
            </div>

            <aside className="mt-12 rounded-[1.25rem] border border-gray-200/80 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-950 dark:text-white">About {post.author}</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    Technical writer focused on crawling, indexing, AI discoverability, and practical SEO guidance.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </div>
  )
}
