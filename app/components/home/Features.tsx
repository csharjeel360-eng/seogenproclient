'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BarChart3, Brain, FileText, Globe2, Shield, Sparkles, Zap } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Robots.txt generation',
    description: 'Create precise crawler rules for search engines and AI bots in a few clicks.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Brain,
    title: 'LLMs-ready structure',
    description: 'Publish AI-friendly documentation that helps models understand your content clearly.',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: BarChart3,
    title: 'Cleaner SEO workflow',
    description: 'Streamline your SEO process with a focused, guided experience from start to finish.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Secure controls',
    description: 'Maintain privacy and control over how bots and crawlers access your site.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Globe2,
    title: 'Global-ready output',
    description: 'Support multilingual and international SEO setups with modern structure.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Fast publishing',
    description: 'Generate production-ready files instantly so your strategy moves faster.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_25%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-slate-300"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Built for modern SEO teams
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Everything you need to publish cleaner, smarter SEO files.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg leading-8 text-slate-300"
          >
            A more professional experience for teams that care about clarity, control, and performance.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${feature.gradient} p-3 shadow-lg`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              <Link href="/documentation" className="mt-5 inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200">
                Learn more
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}