import CrawlAuditClient from '@/components/crawl-audit/CrawlAuditClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Crawlability Audit - Check AI Crawler Access & Website Visibility',
  description:
    "Analyze your website's AI crawlability and discover issues affecting AI search visibility. Check robots.txt, sitemap.xml, LLMS.txt, metadata, and AI crawler accessibility—for free.",
  alternates: { canonical: 'https://seogenpro.online/crawl-audit' },
}

export default function CrawlAuditPage() {
  return <CrawlAuditClient />
}
