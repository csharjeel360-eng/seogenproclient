'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Robots.txt generator',
        'Basic sitemap creation',
        'LLMS.txt generator',
        'Download files',
        'Up to 100 URLs'
      ],
      cta: 'Get Started',
      featured: false
    },
    {
      name: 'Professional',
      price: '$9.99',
      period: '/month',
      description: 'For serious SEO professionals',
      features: [
        'All basic features',
        'Advanced sitemap options',
        'Batch processing',
        'Priority support',
        'Unlimited URLs',
        'API access',
        'Custom AI enhancement'
      ],
      cta: 'Start Free Trial',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'All professional features',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'Advanced analytics',
        '24/7 support',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      featured: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`rounded-lg p-8 transition-all ${
                plan.featured
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform md:scale-105'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-sm ml-2">{plan.period}</span>}
              </div>
              <p className={`mb-6 ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </button>
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
