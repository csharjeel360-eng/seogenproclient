'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Upload, Zap } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Share your site context',
      description: 'Enter your website details and the goals you want to optimize for.',
    },
    {
      icon: Zap,
      title: 'Generate polished files',
      description: 'Let the platform create AI-ready SEO files with modern structure and control.',
    },
    {
      icon: Download,
      title: 'Publish and scale',
      description: 'Download and deploy your files with confidence across any site or stack.',
    },
  ]

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_26%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-100">
            <Zap className="h-4 w-4 text-cyan-400" />
            Simple workflow, premium output
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">How it works</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            From setup to deployment, the experience stays clear, fast, and professional.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 p-3">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Step {idx + 1}</span>
                {idx < steps.length - 1 && <ArrowRight className="h-4 w-4 text-slate-400" />}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
