'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, Globe2, Shield, Sparkles, Zap } from 'lucide-react'

const highlights = [
  { title: 'Instant generation', detail: 'Launch clean SEO files in seconds.' },
  { title: 'Private by design', detail: 'Built with your workflow in mind.' },
  { title: 'AI-ready structure', detail: 'Optimized for search and LLM discovery.' },
]

const previewItems = [
  { label: 'robots.txt', tone: 'from-cyan-500 to-blue-500' },
  { label: 'sitemap.xml', tone: 'from-violet-500 to-fuchsia-500' },
  { label: 'llms.txt', tone: 'from-emerald-500 to-teal-500' },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.20),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.20),_transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.03))]" />

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Professional SEO tools for reliable indexing and AI crawlability
            </div>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Free Robots.txt, Sitemap.xml & LLMS.txt Generators
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Generate robots.txt and sitemap.xml quickly — free tools to improve indexing and AI crawlability.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/robots-generator"
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:translate-y-[-2px]"
              >
                Start generating free
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/documentation"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10"
              >
                Explore documentation
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/25 via-transparent to-violet-500/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">SEO workspace</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Professional output, ready to ship</h2>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 p-2.5">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Generation progress</span>
                  <span className="font-medium text-emerald-400">98% ready</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>

                <div className="mt-6 space-y-3">
                  {previewItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.tone}`} />
                        <span className="text-sm font-medium text-slate-200">{item.label}</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Zap, label: 'Fast', value: 'Under 30s' },
                  { icon: Shield, label: 'Secure', value: 'No clutter' },
                  { icon: Globe2, label: 'Global', value: 'Multi-ready' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                    <stat.icon className="mx-auto h-4 w-4 text-cyan-400" />
                    <p className="mt-2 text-sm font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}