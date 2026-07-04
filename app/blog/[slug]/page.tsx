import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react'
import { blogPostsBySlug, BLOG_POSTS } from '@/lib/blog-posts'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPostsBySlug[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-gray-500 dark:text-gray-400 text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Bookmark"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="relative w-full rounded-2xl overflow-hidden mb-10 ring-1 ring-gray-200/80 dark:ring-gray-700 aspect-[800/450] bg-gray-100 dark:bg-gray-900">
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
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                aria-hidden
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">About {post.author}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Technical writer focusing on crawling, indexing, and AI-facing web standards.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
