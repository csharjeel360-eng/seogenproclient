import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans for SEO Tools',
  description: 'Choose from free, pro, or enterprise SEO tool plans for robots.txt, sitemaps, LLMS.txt, and crawl audits.',
  alternates: {
    canonical: 'https://seogenpro.online/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
