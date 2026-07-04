'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to SEO Generator Pro ("we", "us", "our" or "Company"). We are committed to protecting your privacy. This Privacy Policy explains our data practices and your rights regarding your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you use our generators or contact us. This may include your website URL, email address, and usage preferences. We also collect automatically generated information about your device and how you interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to send you technical notices and support messages, and to respond to your inquiries. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@seogenerator.pro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the bottom of this page.
              </p>
            </section>

            <p className="text-gray-600 mt-12">
              Last Updated: February 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
