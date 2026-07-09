import FAQClient from '@/components/FAQClient'

export const metadata = {
  title: 'FAQ — SEO Gen Pro',
  description: 'Frequently asked questions about SEO Gen Pro: robots.txt, sitemap.xml, llms.txt generators, and crawl audits.',
  alternates: { canonical: 'https://seogenpro.online/faq' },
}

export default function FAQPage() {
  return <FAQClient />
}