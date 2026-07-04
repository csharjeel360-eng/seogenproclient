'use client'

import { motion } from 'framer-motion'
import { Check, X, Sparkles, Zap, Shield, Users, Globe, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for beginners and small websites',
    features: [
      { name: 'Basic robots.txt generator', included: true },
      { name: 'Sitemap generator (up to 100 pages)', included: true },
      { name: 'LLMS.txt generator', included: true },
      { name: 'AI suggestions', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Priority support', included: false },
      { name: 'API access', included: false },
      { name: 'Team collaboration', included: false },
    ],
    buttonText: 'Get Started',
    buttonLink: '/robots-generator',
    popular: false
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 190 },
    description: 'For growing businesses and professionals',
    features: [
      { name: 'Advanced robots.txt generator', included: true },
      { name: 'Sitemap generator (up to 10,000 pages)', included: true },
      { name: 'LLMS.txt generator with AI', included: true },
      { name: 'AI suggestions', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'API access', included: false },
      { name: 'Team collaboration', included: false },
    ],
    buttonText: 'Start Free Trial',
    buttonLink: '/signup?plan=pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, yearly: 490 },
    description: 'For large organizations and agencies',
    features: [
      { name: 'Advanced robots.txt generator', included: true },
      { name: 'Sitemap generator (unlimited pages)', included: true },
      { name: 'LLMS.txt generator with AI', included: true },
      { name: 'AI suggestions', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'API access', included: true },
      { name: 'Team collaboration', included: true },
    ],
    buttonText: 'Contact Sales',
    buttonLink: '/contact',
    popular: false
  }
]

const faqs = [
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! We offer a 14-day free trial on all paid plans. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.'
  },
  {
    question: 'Do you offer discounts for non-profits?',
    answer: 'Yes, we offer special pricing for educational and non-profit organizations. Contact us for details.'
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            <Star className="w-4 h-4 mr-2" />
            Simple, Transparent Pricing
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Choose the Perfect Plan
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> for You</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Start free, upgrade when you need more power. All plans include a 14-day trial.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center space-x-4 mb-12"
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
              billingCycle === 'yearly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Yearly
            <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                <Link
                  href={plan.buttonLink}
                  className={`block w-full py-3 px-4 rounded-lg text-center font-semibold mb-8 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.buttonText}
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Compare Features</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Free</th>
                  <th className="px-6 py-4 text-center">Pro</th>
                  <th className="px-6 py-4 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4">Robots.txt Generation</td>
                  <td className="px-6 py-4 text-center">✅ Basic</td>
                  <td className="px-6 py-4 text-center">✅ Advanced</td>
                  <td className="px-6 py-4 text-center">✅ Advanced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Sitemap Pages Limit</td>
                  <td className="px-6 py-4 text-center">100</td>
                  <td className="px-6 py-4 text-center">10,000</td>
                  <td className="px-6 py-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">AI-Powered LLMS.txt</td>
                  <td className="px-6 py-4 text-center">❌</td>
                  <td className="px-6 py-4 text-center">✅</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">API Access</td>
                  <td className="px-6 py-4 text-center">❌</td>
                  <td className="px-6 py-4 text-center">❌</td>
                  <td className="px-6 py-4 text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Contact our sales team for custom enterprise solutions
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </div>
  )
}