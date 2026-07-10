import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation for SEO Tools',
  description: 'Learn how to use robots.txt, sitemap.xml, llms.txt generators, and crawl audits with the SEO Gen Pro documentation.',
  alternates: {
    canonical: 'https://seogenpro.online/documentation',
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
