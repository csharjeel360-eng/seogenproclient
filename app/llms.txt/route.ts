import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# SEO Generator Pro
> Free tools for generating robots.txt, sitemap.xml, llms.txt, and crawl audits for better search and AI visibility.

## Overview
SEO Generator Pro helps website owners and marketers create the files that search engines and AI crawlers use to discover and understand site content.

## Main Pages
- [Home](https://seogenpro.online/)
- [Robots.txt Generator](https://seogenpro.online/robots-generator)
- [Sitemap.xml Generator](https://seogenpro.online/sitemap-generator)
- [LLMS.txt Generator](https://seogenpro.online/llms-generator)
- [Crawl Audit](https://seogenpro.online/crawl-audit)

## Resources
- [Documentation](https://seogenpro.online/documentation)
- [Blog](https://seogenpro.online/blog)
- [FAQ](https://seogenpro.online/faq)
- [Contact](https://seogenpro.online/contact)
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
