'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle, Mail, MessageCircle, Book, FileText, Map, Brain, Code } from 'lucide-react'
import Link from 'next/link'

const faqCategories = [
  {
    name: 'General',
    icon: HelpCircle,
    questions: [
      {
        q: 'What is SEO Generator Pro?',
        a: 'SEO Generator Pro is a free online tool that helps you create essential SEO files including robots.txt, sitemap.xml, and llms.txt. These files help search engines and AI crawlers better understand and index your website.'
      },
      {
        q: 'Is it really free?',
        a: 'Yes! Our basic generators are completely free. We offer premium features for advanced users, but the core functionality will always remain free.'
      },
      {
        q: 'Do I need technical knowledge to use these tools?',
        a: 'Not at all! Our tools are designed to be user-friendly. Simply enter your website URL and preferences, and we\'ll generate the files for you.'
      }
    ]
  },
  {
    name: 'Robots.txt',
    icon: FileText,
    questions: [
      {
        q: 'What is robots.txt?',
        a: 'Robots.txt is a text file that tells search engine crawlers which pages or sections of your site they can or cannot access. It\'s essential for controlling crawler behavior and preventing indexing of private content.'
      },
      {
        q: 'How do I block AI crawlers?',
        a: 'You can block AI crawlers like GPTBot and Claude-Web by adding specific user-agent directives to your robots.txt. Our generator includes an option to automatically add these rules.'
      },
      {
        q: 'Where should I upload robots.txt?',
        a: 'Robots.txt should be uploaded to the root directory of your website (e.g., yourdomain.com/robots.txt).'
      }
    ]
  },
  {
    name: 'Sitemap.xml',
    icon: Map,
    questions: [
      {
        q: 'Why do I need a sitemap?',
        a: 'A sitemap helps search engines discover all the pages on your website, especially those that might not be found through normal crawling. It\'s crucial for new websites or sites with deep navigation.'
      },
      {
        q: 'How often should I update my sitemap?',
        a: 'You should update your sitemap whenever you add, remove, or significantly change pages on your website. For dynamic sites, weekly updates are recommended.'
      },
      {
        q: 'What\'s the maximum size for a sitemap?',
        a: 'Sitemaps can contain up to 50,000 URLs and be no larger than 50MB uncompressed. For larger sites, you can create multiple sitemaps and a sitemap index file.'
      }
    ]
  },
  {
    name: 'LLMS.txt',
    icon: Brain,
    questions: [
      {
        q: 'What is llms.txt?',
        a: 'LLMS.txt is a new standard for providing AI-friendly documentation. It helps large language models understand your website\'s structure and content more effectively.'
      },
      {
        q: 'How does AI use llms.txt?',
        a: 'AI models can read llms.txt to get a quick overview of your website\'s content, including important pages, sections, and their relationships. This helps them provide more accurate responses about your site.'
      },
      {
        q: 'Is llms.txt required for AI crawlers?',
        a: 'While not required, llms.txt is becoming an important standard for websites that want to be properly understood by AI systems. It\'s especially useful for documentation sites and knowledge bases.'
      }
    ]
  },
  {
    name: 'Technical',
    icon: Code,
    questions: [
      {
        q: 'Do you support JavaScript websites?',
        a: 'Yes! Our sitemap generator can crawl JavaScript-heavy sites by rendering pages like a real browser. This ensures we discover all your dynamically loaded content.'
      },
      {
        q: 'Is there an API available?',
        a: 'Yes, we offer a RESTful API for enterprise customers. Contact our sales team for API access and documentation.'
      },
      {
        q: 'How secure is my data?',
        a: 'We take security seriously. All data is encrypted in transit, and we never store your generated files. Your privacy is our priority.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>(faqCategories.map(c => c.name))
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    )
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Find answers to common questions about our SEO generator tools
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
              className="mb-4"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${
                  openCategories.includes(category.name) ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Category Questions */}
              <AnimatePresence>
                {openCategories.includes(category.name) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2"
                  >
                    {category.questions.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(item.q)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="font-medium">{item.q}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            openQuestions.includes(item.q) ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {openQuestions.includes(item.q) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 pb-4 text-gray-600 dark:text-gray-400"
                            >
                              {item.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-6">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              <Book className="w-5 h-5 mr-2" />
              Read Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}