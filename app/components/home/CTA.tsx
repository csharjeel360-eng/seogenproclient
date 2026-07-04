'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_28%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-14"
        >
          <div className="mx-auto inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 p-3">
            <Sparkles className="h-6 w-6 text-cyan-400" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to upgrade your SEO workflow?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Build cleaner files, gain better control, and launch faster with a more professional SEO setup.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/robots-generator"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:translate-y-[-2px]"
            >
              Get started free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10"
            >
              View documentation
            </Link>
          </div>

          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row">
            <span>No credit card required</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <span>Free forever plan available</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <span>Fast setup, professional output</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
