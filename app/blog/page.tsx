'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_35%),linear-gradient(135deg,_rgba(248,250,252,1)_0%,_rgba(241,245,249,1)_100%)] pt-24 pb-20 px-4 dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_35%),linear-gradient(135deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,1)_100%)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <main id="main-content" className="mx-auto flex max-w-7xl flex-col">
        <section className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 px-6 py-10 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:px-8 lg:px-12 lg:py-16 dark:border-gray-800 dark:bg-gray-900/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_35%)]" aria-hidden="true" />
          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              <Sparkles className="mr-2 h-4 w-4" />
              SEO & AI Insights Hub
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">
              Practical guidance for modern
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                discoverability and growth
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
              Explore clear, expert-led articles on technical SEO, crawler rules, AI visibility, and sustainable content strategy.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: '50+', label: 'In-depth guides' },
                { value: '2026', label: 'Latest trends' },
                { value: 'AI', label: 'Focused content' },
                { value: 'Free', label: 'Expert knowledge' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200/70 bg-white/80 px-4 py-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
                  <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{item.value}</div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#featured"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                Explore latest insights
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/documentation"
                className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View documentation
              </Link>
            </div>
          </div>
        </section>

        <section id="featured" aria-labelledby="featured-title" className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Featured</p>
              <h2 id="featured-title" className="mt-2 flex items-center text-2xl font-semibold text-gray-950 dark:text-white">
                <Sparkles className="mr-3 h-6 w-6 text-amber-500" />
                Featured article
              </h2>
            </div>
            <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              Updated weekly
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white shadow-[0_18px_60px_-24px_rgba(15,23,42,0.25)] dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative aspect-[800/450] bg-gray-900 lg:aspect-video">
              <Image
                src={featured.image}
                alt={`Cover image for: ${featured.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-gray-800 shadow-sm dark:bg-gray-950/95 dark:text-gray-200">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Featured
              </div>
            </div>
            <div className="flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 text-white lg:p-10">
              <span className="mb-4 w-fit rounded-full bg-white/15 px-3 py-1 text-sm font-medium">{featured.category}</span>
              <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-base leading-7 text-blue-50">{featured.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-blue-50/95">
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {featured.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(featured.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>{featured.readTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-8 inline-flex w-fit items-center rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                Read article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="latest-posts" aria-labelledby="latest-posts-title" className="mt-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Library</p>
              <h2 id="latest-posts-title" className="mt-2 flex items-center text-2xl font-semibold text-gray-950 dark:text-white">
                <BookOpen className="mr-3 h-6 w-6 text-blue-600" />
                Latest posts
              </h2>
            </div>
            <Link
              href="#latest-posts"
              className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-gray-950"
            >
              View all posts
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug} className="list-none">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-800 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950"
                >
                  <article className="flex h-full flex-col">
                    <div className="relative aspect-[800/450] bg-gray-200 dark:bg-gray-800">
                      <Image
                        src={post.image}
                        alt={`Cover image for: ${post.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm dark:bg-gray-950/90 dark:text-gray-100">
                        {post.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="mx-2 opacity-60">•</span>
                        {post.readTime}
                      </div>
                      <h3 className="text-lg font-semibold leading-snug text-gray-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                        <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <User className="mr-1 h-3.5 w-3.5" />
                          {post.author}
                        </span>
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                          Read
                          <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-[1.75rem] border border-gray-200/80 bg-gradient-to-br from-gray-950 via-blue-950 to-slate-900 p-8 text-white shadow-[0_18px_60px_-24px_rgba(15,23,42,0.4)] sm:p-10 lg:p-12" aria-labelledby="newsletter-title">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="newsletter-title" className="text-2xl font-semibold sm:text-3xl">
              Stay ahead of the curve
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Get high-signal updates with practical notes on crawling, indexing, AI visibility, and thoughtful content planning.
            </p>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="blog-email" className="sr-only">
                Email address
              </label>
              <input
                id="blog-email"
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="rounded-2xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
