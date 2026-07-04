'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-posts'

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-6 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4 mr-2" />
            SEO & AI Insights Hub
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Master
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              SEO & AI
            </span>
            <br />
            <span className="text-3xl lg:text-4xl font-semibold text-gray-600 dark:text-gray-400">
              Technical Excellence
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dive deep into advanced SEO strategies, AI crawler management, technical optimization,
            and cutting-edge tactics that drive real results. From robots.txt mastery to LLM integration,
            get the insights you need to stay ahead.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In-depth Guides</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">2026</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Latest Trends</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">AI</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Focused Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Free</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expert Knowledge</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#featured"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Explore Latest Insights
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Documentation
            </Link>
          </div>
        </div>

        {/* Featured Post Section */}
        <div id="featured" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-amber-500" />
              Featured Article
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Updated weekly
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200/80 dark:ring-gray-800 bg-white dark:bg-gray-900">
            <div className="relative aspect-[800/450] lg:aspect-video bg-gray-900">
              <Image
                src={featured.image}
                alt={`Cover image for: ${featured.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Featured
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
              <span className="bg-white/15 w-fit px-3 py-1 rounded-full text-sm mb-4">{featured.category}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-bold leading-snug mb-4">{featured.title}</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-blue-50/95 text-sm mb-8">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2 opacity-90" />
                  {featured.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 opacity-90" />
                  {new Date(featured.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-blue-100/90">{featured.readTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center w-fit bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-md"
              >
                Read article
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Latest Posts Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-blue-600" />
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center"
            >
              View all posts
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="h-full bg-white dark:bg-gray-900 rounded-xl shadow-md ring-1 ring-gray-200/80 dark:ring-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-[800/450] bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={post.image}
                      alt={`Cover image for: ${post.title}`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-950/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-100 shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="mx-2 opacity-60">•</span>
                      {post.readTime}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {post.author}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                        Read
                        <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-10 md:p-12 text-center ring-1 ring-gray-200 dark:ring-gray-800 shadow-inner">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">Subscribe</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
            Get crawling and AI-discoverability notes when new guides ship. No spam—we send rare, high-signal updates.
          </p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="blog-email" className="sr-only">
              Email
            </label>
            <input
              id="blog-email"
              type="email"
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
