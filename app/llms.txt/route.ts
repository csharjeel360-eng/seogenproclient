import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# SEO Generator Pro
> Free tools for generating robots.txt, sitemap.xml, llms.txt, and crawl audits for better search and AI visibility.

## Overview
SEO Generator Pro helps website owners and marketers create the files that search engines and AI crawlers use to discover and understand site content.

## Main Pages
- [Home](https://seogenpro.com/)
- [Robots.txt Generator](https://seogenpro.com/robots-generator)
- [Sitemap.xml Generator](https://seogenpro.com/sitemap-generator)
- [LLMS.txt Generator](https://seogenpro.com/llms-generator)
- [Crawl Audit](https://seogenpro.com/crawl-audit)

## Resources
- [Documentation](https://seogenpro.com/documentation)
- [Blog](https://seogenpro.com/blog)
- [FAQ](https://seogenpro.com/faq)
- [Contact](https://seogenpro.com/contact)
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
