'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'John Smith',
      role: 'SEO Manager',
      company: 'Tech Startup',
      content: 'The workflow feels premium and saves our team hours every week.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Website Owner',
      company: 'E-commerce Brand',
      content: 'It is simple, fast, and the output looks polished right away.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Digital Marketer',
      company: 'Growth Agency',
      content: 'This is the most straightforward SEO generator I have used in years.',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_26%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-100">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Loved by modern teams
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">What users say</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Trusted by founders, marketers, and teams who care about polished SEO delivery.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-slate-300">“{testimonial.content}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
                <p className="text-sm text-slate-500">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
