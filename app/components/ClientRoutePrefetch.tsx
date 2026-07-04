'use client'

import { RoutePrefetch } from '@/lib/route-prefetch'

export function ClientRoutePrefetch() {
  return (
    <RoutePrefetch routes={['/robots-generator', '/sitemap-generator', '/llms-generator', '/crawl-audit', '/blog', '/documentation', '/faq']} />
  )
}