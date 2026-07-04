'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Is this tool really free?',
      a: 'Yes. The core generators are free to use, and premium capabilities are available for teams that need more control.',
    },
    {
      q: 'Do I need technical knowledge?',
      a: 'Not at all. The experience is designed to be simple enough for anyone to use without coding.',
    },
    {
      q: 'How do I use the generated files?',
      a: 'Download them and place them in your site root, such as yourdomain.com/robots.txt or yourdomain.com/sitemap.xml.',
    },
    {
      q: 'Can I customize the output?',
      a: 'Absolutely. You can adjust your settings and review the generated files before publishing them.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. The workflow is focused on privacy and safe handling of your website information.',
    },
    {
      q: 'Do you offer support?',
      a: 'Yes. Support is available for questions, setup help, and guidance on best practices.',
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_26%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-100">
            FAQ
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Clear answers to the questions most teams ask before getting started.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="mb-4 rounded-[1.25rem] border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between rounded-[1.25rem] p-5 text-left transition hover:bg-white/10"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-slate-300 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 text-sm leading-7 text-slate-300"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
