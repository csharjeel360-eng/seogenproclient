'use client'

import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Book,
  FileText,
  FileSearch,
  Map,
  Brain,
  Shield,
  Code,
  Search,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'

type DocItem = { title: string; href: string }

type DocSection = {
  title: string
  icon: LucideIcon
  items: DocItem[]
}

const DOC_SECTIONS: DocSection[] = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Introduction', href: '#introduction' },
      { title: 'Quick Start Guide', href: '#quick-start' },
      { title: 'API Overview', href: '#api-overview' },
      { title: 'Authentication', href: '#authentication' },
    ],
  },
  {
    title: 'AI Crawlability Audit',
    icon: FileSearch,
    items: [
      { title: 'Overview', href: '#crawl-audit-overview' },
      { title: 'Running an audit', href: '#crawl-audit-run' },
      { title: 'Options & presets', href: '#crawl-audit-options' },
      { title: 'Report structure', href: '#crawl-audit-report' },
      { title: 'How scoring works', href: '#crawl-audit-scoring' },
      { title: 'API integration', href: '#crawl-audit-api' },
      { title: 'Limits & troubleshooting', href: '#crawl-audit-limits' },
    ],
  },
  {
    title: 'Robots.txt Generator',
    icon: FileText,
    items: [
      { title: 'Basic Usage', href: '#robots-basic' },
      { title: 'User-Agent Directives', href: '#user-agent' },
      { title: 'Allow/Disallow Rules', href: '#allow-disallow' },
      { title: 'AI Crawler Control', href: '#ai-crawlers' },
      { title: 'Sitemap Integration', href: '#sitemap-integration' },
    ],
  },
  {
    title: 'Sitemap.xml Generator',
    icon: Map,
    items: [
      { title: 'Creating Sitemaps', href: '#creating-sitemaps' },
      { title: 'URL Prioritization', href: '#url-priority' },
      { title: 'Change Frequency', href: '#change-frequency' },
      { title: 'Large Sitemaps', href: '#large-sitemaps' },
      { title: 'Video & Image Sitemaps', href: '#media-sitemaps' },
    ],
  },
  {
    title: 'LLMS.txt Generator',
    icon: Brain,
    items: [
      { title: 'What is LLMS.txt?', href: '#what-is-llms' },
      { title: 'Format Specification', href: '#llms-format' },
      { title: 'AI Optimization', href: '#ai-optimization' },
      { title: 'Content Organization', href: '#content-org' },
      { title: 'Examples', href: '#llms-examples' },
    ],
  },
  {
    title: 'Best Practices',
    icon: Shield,
    items: [
      { title: 'SEO Guidelines', href: '#seo-guidelines' },
      { title: 'Performance Tips', href: '#performance' },
      { title: 'Security Considerations', href: '#security' },
      { title: 'AI Crawler Management', href: '#ai-management' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      { title: 'Endpoints', href: '#endpoints' },
      { title: 'Request/Response', href: '#request-response' },
      { title: 'Rate Limiting', href: '#rate-limiting' },
      { title: 'Error Handling', href: '#errors' },
      { title: 'SDKs', href: '#sdks' },
    ],
  },
]

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl my-4 overflow-x-auto text-sm font-mono">
      <pre>
        <code>{children.trim()}</code>
      </pre>
    </div>
  )
}

export default function DocumentationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return DOC_SECTIONS
    return DOC_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) || section.title.toLowerCase().includes(q)
      ),
    })).filter((s) => s.items.length > 0)
  }, [searchQuery])

  const sectionClass =
    'scroll-mt-28 space-y-4 text-gray-600 dark:text-gray-400 prose-p:mb-4'
  const h2Class = 'text-3xl font-bold mb-4 text-gray-900 dark:text-white'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex">
        <aside
          className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-gray-50 dark:bg-gray-800 overflow-y-auto transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>

            <nav className="space-y-6">
              {filteredDocs.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No sections match your search.</p>
              ) : (
                filteredDocs.map((section) => (
                  <div key={section.title}>
                    <h3 className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white mb-2">
                      <section.icon className="w-5 h-5" />
                      <span>{section.title}</span>
                    </h3>
                    <ul className="ml-7 space-y-1">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-6 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Documentation</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Learn how to use robots.txt, sitemaps, and LLMS.txt together with audits and APIs so search
                engines and AI crawlers can understand your site reliably.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <a
                  href="#quick-start"
                  className="block p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
                  <p className="text-blue-100">Ship your first files in minutes</p>
                </a>
                <a
                  href="#endpoints"
                  className="block p-6 bg-gray-100 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">API Reference</h3>
                  <p className="text-gray-600 dark:text-gray-400">Integrate generators and audits programmatically</p>
                </a>
              </div>

              <div className="space-y-16">
                <section id="introduction" className={sectionClass}>
                  <h2 className={h2Class}>Introduction</h2>
                  <p>
                    This platform helps you produce and validate the files that define how bots discover and use
                    your content: robots.txt for crawl policies, XML sitemaps for URL discovery, and LLMS-oriented
                    documentation where you describe how AI systems should treat your pages.
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">Core capabilities</p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      <strong className="text-gray-900 dark:text-white">Robots.txt Generator</strong> — model
                      user-agent blocks, Allow/Disallow paths, crawl hints, and sitemap declarations.
                    </li>
                    <li>
                      <strong className="text-gray-900 dark:text-white">AI Crawlability Audit</strong> — crawl sitemap
                      seeds and internal links, sample broken links, and score robots/sitemap posture (
                      <a href="#crawl-audit-overview" className="text-blue-600 dark:text-blue-400 hover:underline">
                        full guide
                      </a>
                      ).
                    </li>
                    <li>
                      <strong className="text-gray-900 dark:text-white">Sitemap.xml Generator</strong> — crawl from
                      a starting URL and emit standards-compliant XML, with indexing when URL counts grow.
                    </li>
                    <li>
                      <strong className="text-gray-900 dark:text-white">LLMS.txt Generator</strong> — summarize
                      compliance-oriented signals into an AI-readable document tailored to training and attribution
                      preferences.
                    </li>
                  </ul>
                  <p>
                    Prefer the UI first, then automate with the HTTP API documented under{' '}
                    <a href="#endpoints" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Endpoints
                    </a>
                    .
                  </p>
                </section>

                <section id="quick-start" className={sectionClass}>
                  <h2 className={h2Class}>Quick Start Guide</h2>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl not-prose space-y-4">
                    <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-400">
                      <li>
                        <span className="font-semibold text-gray-900 dark:text-white">Robots.txt</span>
                        <p className="ml-6 mt-1 mb-0">
                          Open{' '}
                          <Link href="/robots-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Robots.txt Generator
                          </Link>
                          , enter your site URL, tune user agents and paths, generate the file, and place{' '}
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">/robots.txt</code> at
                          the host root.
                        </p>
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900 dark:text-white">Sitemap</span>
                        <p className="ml-6 mt-1 mb-0">
                          Use{' '}
                          <Link href="/sitemap-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Sitemap.xml Generator
                          </Link>{' '}
                          with your canonical HTTPS origin. Download or copy XML, publish at{' '}
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">/sitemap.xml</code> (or
                          reference the URL in robots.txt).
                        </p>
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900 dark:text-white">LLMS.txt</span>
                        <p className="ml-6 mt-1 mb-0">
                          Generate from{' '}
                          <Link href="/llms-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLMS.txt Generator
                          </Link>
                          ; review wording for legal accuracy before publishing{' '}
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded">/llms.txt</code>.
                        </p>
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900 dark:text-white">Audit</span>
                        <p className="ml-6 mt-1 mb-0">
                          Optionally run{' '}
                          <Link href="/crawl-audit" className="text-blue-600 dark:text-blue-400 hover:underline">
                            AI Crawlability Audit
                          </Link>{' '}
                          (
                          <a href="#crawl-audit-run" className="text-blue-600 dark:text-blue-400 hover:underline">
                            docs
                          </a>
                          ) to validate live robots.txt, declared sitemaps, and internal crawl health.
                        </p>
                      </li>
                    </ol>
                  </div>
                </section>

                <section id="api-overview" className={sectionClass}>
                  <h2 className={h2Class}>API Overview</h2>
                  <p>
                    The backend exposes REST endpoints under{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">/api</code>. The Next.js
                    app typically sets{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      NEXT_PUBLIC_API_BASE_URL
                    </code>{' '}
                    (or{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      NEXT_PUBLIC_API_URL
                    </code>
                    ) to your server origin plus <code className="text-sm">/api</code>, for example{' '}
                    <code className="text-sm">http://localhost:3000/api</code>.
                  </p>
                  <p>
                    Responses are JSON unless you download artifacts (for example analyzer reports). A separate
                    liveness probe lives at{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">GET /health</code>{' '}
                    on the same host as the Express app (without the{' '}
                    <code className="text-sm">/api</code> prefix).
                  </p>
                  <CodeBlock>{`POST /api/generate/robots
Content-Type: application/json

{
  "url": "https://example.com",
  "userAgents": [
    { "name": "*", "disallow": ["/admin/", "/api/"], "allow": [] }
  ],
  "sitemapUrl": "https://example.com/sitemap.xml",
  "crawlDelay": 1,
  "additionalRules": ["# staging rules"]
}`}</CodeBlock>
                  <a href="#endpoints" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                    Browse all endpoints <ChevronRight className="w-4 h-4 ml-0.5" />
                  </a>
                </section>

                <section id="authentication" className={sectionClass}>
                  <h2 className={h2Class}>Authentication</h2>
                  <p>
                    Generator and audit endpoints are intended for authenticated frontends or trusted backends.
                    Today the API accepts optional{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      Authorization: Bearer &lt;token&gt;
                    </code>{' '}
                    headers for forward compatibility—the bundled web client attaches a stored token when present.
                  </p>
                  <p>
                    For production integrations, terminate TLS at your edge, restrict origins via{' '}
                    <code className="text-sm">ALLOWED_ORIGINS</code>, and place the API behind your own API gateway or
                    service mesh if you need per-key quotas distinct from IP-based rate limiting.
                  </p>
                </section>

                <section id="crawl-audit-overview" className={sectionClass}>
                  <span id="crawl-audit" className="sr-only" aria-hidden />
                  <h2 className={h2Class}>AI Crawlability Audit — Overview</h2>
                  <p>
                    The AI Crawlability Audit is a bounded HTTP crawl of your site that focuses on how easily machines
                    can discover and fetch your pages. It discovers URLs from{' '}
                    <code className="text-sm">robots.txt</code> sitemap declarations and common locations (for example{' '}
                    <code className="text-sm">/sitemap.xml</code>), follows internal links up to a depth and page cap,
                    records status codes, canonical tags, and{' '}
                    <code className="text-sm">meta name=&quot;robots&quot;</code>, samples internal links for broken
                    responses, flags query-string URLs, and combines that into a scored report with a plain-text{' '}
                    <code className="text-sm">human_summary</code>.
                  </p>
                  <p>
                    It complements the{' '}
                    <Link href="/robots-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Robots
                    </Link>
                    ,{' '}
                    <Link href="/sitemap-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Sitemap
                    </Link>
                    , and{' '}
                    <Link href="/llms-generator" className="text-blue-600 dark:text-blue-400 hover:underline">
                      LLMS.txt
                    </Link>{' '}
                    tools: those help you <em>author</em> policies and files; the audit checks what is <em>live</em> on
                    the wire.
                  </p>
                </section>

                <section id="crawl-audit-run" className={sectionClass}>
                  <h2 className={h2Class}>Running an audit (web UI)</h2>
                  <p>
                    Open{' '}
                    <Link href="/crawl-audit" className="text-blue-600 dark:text-blue-400 hover:underline">
                      /crawl-audit
                    </Link>
                    , enter a full site URL (for example <code className="text-sm">https://example.com</code>), adjust
                    options if needed, and choose <strong className="text-gray-900 dark:text-white">Run Audit</strong>.
                    The page POSTs to your API base (from{' '}
                    <code className="text-sm">NEXT_PUBLIC_API_BASE_URL</code> or{' '}
                    <code className="text-sm">NEXT_PUBLIC_API_URL</code>) at{' '}
                    <code className="text-sm">.../api/analyze/crawl</code>, or to{' '}
                    <code className="text-sm">/api/analyze/crawl</code> when no base is set (same-origin proxy).
                  </p>
                  <p>
                    Successful runs render <strong className="text-gray-900 dark:text-white">Summary</strong>,{' '}
                    <strong className="text-gray-900 dark:text-white">Robots &amp; Sitemap</strong>, a per-URL table,
                    broken-link samples, and query-parameter URLs. Use that layout as a checklist when building your own UI
                    on top of the JSON report.
                  </p>
                </section>

                <section id="crawl-audit-options" className={sectionClass}>
                  <h2 className={h2Class}>Options &amp; presets</h2>
                  <p className="font-medium text-gray-900 dark:text-white">Request body fields</p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">url</code> — required starting
                      origin; normalized server-side.
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">maxPages</code> — max URLs
                      processed (default 100 in server and UI).
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">depthLimit</code> — max link
                      hops from each seed (default 2).
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">concurrency</code> — parallel
                      in-flight requests, clamped roughly 1–20 on the server (default 12).
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">followExternal</code> — follow
                      off-domain links matching host rules when true (usually leave off unless you intentionally audit
                      cross-domain properties).
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">rateLimitMs</code> — optional
                      minimum delay between outbound requests.
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">renderAllPages</code> — when
                      true, attempts Puppeteer-based rendering where available to capture JS-only links (much slower).
                    </li>
                  </ul>
                  <p className="font-medium text-gray-900 dark:text-white mt-4">Built-in presets (UI)</p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      <strong className="text-gray-900 dark:text-white">Fast</strong> — fewer pages and depth, higher
                      concurrency, rendering off (~1&nbsp;minute class runs on typical sites).
                    </li>
                    <li>
                      <strong className="text-gray-900 dark:text-white">Balanced</strong> — ~100 pages, depth 2, default
                      concurrency, rendering off.
                    </li>
                    <li>
                      <strong className="text-gray-900 dark:text-white">Thorough</strong> — more pages and depth, lower
                      concurrency, rendering on (longer runs; requires a working headless browser install for render
                      mode).
                    </li>
                  </ul>
                </section>

                <section id="crawl-audit-report" className={sectionClass}>
                  <h2 className={h2Class}>Report structure</h2>
                  <p>
                    The API wraps the payload as{' '}
                    <code className="text-sm">{`{ success, report, version, timestamp }`}</code>. The{' '}
                    <code className="text-sm">report</code> object includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      <code className="text-sm">base_url</code>, <code className="text-sm">audit_date_utc</code>,{' '}
                      <code className="text-sm">total_urls_discovered</code>
                    </li>
                    <li>
                      <code className="text-sm">sitemap_urls</code> — URLs collected from robots and common sitemap
                      locations.
                    </li>
                    <li>
                      <code className="text-sm">robots</code> — simplified <code className="text-sm">allow</code>,{' '}
                      <code className="text-sm">disallow</code>, <code className="text-sm">sitemaps</code> extracted from{' '}
                      <code className="text-sm">robots.txt</code> (missing file is non-fatal).
                    </li>
                    <li>
                      <code className="text-sm">crawl_results_summary</code> —{' '}
                      <code className="text-sm">final_score</code> (0–100), <code className="text-sm">crawlable_urls</code>,{' '}
                      <code className="text-sm">broken_count</code>, advisory <code className="text-sm">sitemap_score</code>{' '}
                      and <code className="text-sm">robots_score</code> (each typically 5 or 10 in the heuristic).
                    </li>
                    <li>
                      <code className="text-sm">broken_links_sample</code> — up to hundreds of problematic URLs/strings.
                    </li>
                    <li>
                      <code className="text-sm">per_url</code> — map of URL →{' '}
                      <code className="text-sm">status</code>, <code className="text-sm">ok</code>,{' '}
                      <code className="text-sm">canonical</code>, <code className="text-sm">metaRobots</code>,{' '}
                      <code className="text-sm">links</code>, <code className="text-sm">out_broken_sample</code>{' '}
                      (broken internal sample per page), <code className="text-sm">hasQuery</code>,{' '}
                      <code className="text-sm">depth</code>.
                    </li>
                    <li>
                      <code className="text-sm">human_summary</code> — multi-line text summary aligned with scores.
                    </li>
                  </ul>
                  <p>
                    Persist or diff reports by <code className="text-sm">audit_date_utc</code> and canonical{' '}
                    <code className="text-sm">base_url</code> when trending improvements across deploys.
                  </p>
                </section>

                <section id="crawl-audit-scoring" className={sectionClass}>
                  <h2 className={h2Class}>How scoring works</h2>
                  <p>
                    The composite <code className="text-sm">final_score</code> (0–100) blends heuristic sitemap discovery,
                    rudimentary robots presence signals, successful fetch ratio across crawled URLs, and a penalty scaled
                    from sampled broken/internal errors. Exact weighting lives in{' '}
                    <code className="text-sm">crawlAuditService</code> on the server—treat it as a directional health
                    indicator, not a substitute for Google Search Console, log analysis, or vendor-specific crawl
                    simulators.
                  </p>
                  <p>
                    Use <code className="text-sm">sitemap_score</code> / <code className="text-sm">robots_score</code> at
                    face value only for quick regressions between deploys; they reward having discoverable sitemaps and a
                    non-empty robots posture rather than deep semantic correctness of every directive.
                  </p>
                </section>

                <section id="crawl-audit-api" className={sectionClass}>
                  <h2 className={h2Class}>API integration</h2>
                  <CodeBlock>{`POST /api/analyze/crawl
Content-Type: application/json

{
  "url": "https://example.com",
  "maxPages": 100,
  "depthLimit": 2,
  "concurrency": 12,
  "followExternal": false,
  "rateLimitMs": 0,
  "renderAllPages": false
}`}</CodeBlock>
                  <p>
                    <strong className="text-gray-900 dark:text-white">200 OK</strong> →{' '}
                    <code className="text-sm">{`{ success: true, report, version, timestamp }`}</code>.{' '}
                    <strong className="text-gray-900 dark:text-white">400</strong> → missing or invalid URL.{' '}
                    <strong className="text-gray-900 dark:text-white">500</strong> → audit failure (
                    <code className="text-sm">error</code> / <code className="text-sm">details</code>). See also{' '}
                    <a href="#endpoints" className="text-blue-600 dark:text-blue-400 hover:underline">
                      API Reference — Endpoints
                    </a>
                    .
                  </p>
                </section>

                <section id="crawl-audit-limits" className={sectionClass}>
                  <h2 className={h2Class}>Limits &amp; troubleshooting</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      Crawls use HTTP fetches with a short default timeout; slow or flaky pages surface as{' '}
                      <code className="text-sm">ok: false</code>—verify with curl or uptime tools before rewriting rules.
                    </li>
                    <li>
                      Broken-link checks sample a limited number of internal links per page to keep audits fast;
                      unexplained 404s elsewhere may still exist.
                    </li>
                    <li>
                      External links are skipped for broken sampling unless configured to reduce noise from third-party
                      outages.
                    </li>
                    <li>
                      <code className="text-sm">renderAllPages</code> requires <code className="text-sm">puppeteer-core</code>{' '}
                      plus a runnable Chrome/Chromium; if unsupported, omit rendering and rely on static HTML extraction.
                    </li>
                    <li>
                      Outbound requests identify as{' '}
                      <code className="text-sm">LLMS-Audit/1.0</code>; allowlisting that user agent on WAFs may be
                      required.
                    </li>
                  </ul>
                </section>

                <section id="robots-basic" className={sectionClass}>
                  <h2 className={h2Class}>Robots.txt — Basic Usage</h2>
                  <p>
                    robots.txt lives at{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">https://your-domain/robots.txt</code>.
                    Bots fetch it before broad crawling; malformed or contradictory rules waste crawl budget and confuse
                    search and AI spiders alike.
                  </p>
                  <p>
                    Workflow: configure each{' '}
                    <a href="#user-agent" className="text-blue-600 dark:text-blue-400 hover:underline">
                      User-Agent
                    </a>{' '}
                    block, add Allow/Disallow paths, optionally set crawl delay on the wildcard agent, then declare one
                    or more{' '}
                    <a href="#sitemap-integration" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Sitemap
                    </a>{' '}
                    URLs. Validate before deploy using{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/validate/robots</code>.
                  </p>
                  <p>
                    After publishing, sanity-check crawl policy with an{' '}
                    <a href="#crawl-audit-overview" className="text-blue-600 dark:text-blue-400 hover:underline">
                      AI Crawlability Audit
                    </a>{' '}
                    run against production.
                  </p>
                </section>

                <section id="user-agent" className={sectionClass}>
                  <h2 className={h2Class}>User-Agent Directives</h2>
                  <p>
                    Each logical block begins with{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">User-agent:&lt;token&gt;</code>.
                    Typical tokens include <code className="text-sm">*</code> (default), vendor-specific spiders (for
                    example Googlebot), and documented AI bots (GPTBot, Claude-Web, Bytespider—verify current official
                    names in each vendor&apos;s crawler documentation).
                  </p>
                  <p>
                    Separate blocks allow different policies—for example disallowing admin routes for{' '}
                    <code className="text-sm">*</code> while tightening training bots with another block scoped to documented paths only.
                  </p>
                  <p>
                    Rule precedence follows the robots exclusion protocol specific to each crawler; when in doubt, keep
                    overlapping blocks simple and test with audits plus vendor webmaster tooling.
                  </p>
                </section>

                <section id="allow-disallow" className={sectionClass}>
                  <h2 className={h2Class}>Allow/Disallow Rules</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      Paths are prefix/path expressions relative to protocol/host; trailing wildcards behave per spec
                      and crawler implementation details.
                    </li>
                    <li>
                      <code className="text-sm">Disallow:</code> with an empty path means &quot;nothing disallowed&quot;
                      under many parsers—the generator emits that pattern explicitly when lists are empty.
                    </li>
                    <li>
                      <code className="text-sm">Allow:</code> refines exclusions (useful under Disallow-heavy trees).
                    </li>
                    <li>
                      Separate sensitive areas (staging, dashboards, carts) explicitly instead of relying on secrecy
                      through obscurity.
                    </li>
                  </ul>
                  <p>
                    The REST generator accepts arrays of disallow and allow paths per{' '}
                    <code className="text-sm">userAgents[].disallow</code> and{' '}
                    <code className="text-sm">allow</code>, plus arbitrary lines in{' '}
                    <code className="text-sm">additionalRules</code> for directives not modeled in the schema.
                  </p>
                </section>

                <section id="ai-crawlers" className={sectionClass}>
                  <h2 className={h2Class}>AI Crawler Control</h2>
                  <p>
                    AI-facing crawlers reuse the robots protocol but may advertise distinct user-agents or honor
                    additional signals (RSS, feeds, contractual terms beyond robots). Start from vendor guidance, then:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Add dedicated User-agent sections for bots you want to constrain differently from generic *.</li>
                    <li>Keep training opt-out paths aligned with your LLMS disclosures and footer legal copy.</li>
                    <li>Reconcile robots with content paywalls—HTTP 403/401 semantics differ from crawler-specific Disallow semantics.</li>
                  </ul>
                  <p>
                    Generated snippets include commented examples for GPTBot-style agents to speed up authoring—uncomment
                    and tailor them before production.
                  </p>
                </section>

                <section id="sitemap-integration" className={sectionClass}>
                  <h2 className={h2Class}>Sitemap Integration</h2>
                  <p>
                    Declaring <code className="text-sm">Sitemap:&lt;absolute-url&gt;</code> in robots.txt aids discovery even
                    though it is technically optional once search consoles know your URLs. Prefer HTTPS sitemap URLs, include hrefs to
                    sitemap index files when you shard, and keep counts within search engine limits (typically 50k URLs per file and
                    uncompressed size caps—see{' '}
                    <a href="#large-sitemaps" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Large Sitemaps
                    </a>
                    ).
                  </p>
                  <p>
                    The generator returns <code className="text-sm">content</code> plus optional{' '}
                    <code className="text-sm">existing</code> (live fetch) and <code className="text-sm">warnings</code>{' '}
                    highlighting divergences from your current robots.txt preview.
                  </p>
                </section>

                <section id="creating-sitemaps" className={sectionClass}>
                  <h2 className={h2Class}>Sitemap.xml — Creating Sitemaps</h2>
                  <p>
                    POST{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      /api/generate/sitemap
                    </code>{' '}
                    with a validated site URL seed. The crawler walks internal links respecting robots when{' '}
                    <code className="text-sm">respectRobots: true</code> (default), builds page records from HTML responses,
                    and emits URL sets (optionally chunked with an index when volume demands).
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>
                      <code className="text-sm">maxPages</code> caps discovered URLs (<code className="text-sm">MAX_PAGES_PER_SITEMAP</code> env upper bound applies server-wide).
                    </li>
                    <li>
                      <code className="text-sm">maxDepth</code> trims exploration depth.</li>
                    <li>
                      <code className="text-sm">filterOptions</code> forwards fine-grained crawler filters (paths,
                      link patterns).</li>
                    <li><code className="text-sm">verbose</code> toggles crawler diagnostics.</li>
                  </ul>
                  <p>
                    The HTTP response carries <code className="text-sm">jobId</code>, immediate{' '}
                    <code className="text-sm">sitemap</code> XML, <code className="text-sm">stats</code> (counts,
                    stopped-early indicator, byte size estimate), and a <code className="text-sm">statusUrl</code> for polling with{' '}
                    <code className="text-sm">GET /api/sitemap/status/:jobId</code>.
                  </p>
                  <CodeBlock>{`POST /api/generate/sitemap
Content-Type: application/json

{
  "url": "https://example.com/",
  "maxPages": 50000,
  "maxDepth": 8,
  "respectRobots": true,
  "filterOptions": {},
  "verbose": false
}`}</CodeBlock>
                </section>

                <section id="url-priority" className={sectionClass}>
                  <h2 className={h2Class}>URL Prioritization</h2>
                  <p>
                    In advanced mode the builder may emit <code className="text-sm">&lt;priority&gt;</code> hints.
                    Numeric priority is advisory only—search engines approximate importance from linkage, freshness, and
                    query demand. Prefer consistent canonical tagging in HTML (<code className="text-sm">rel=canonical</code>)
                    over aggressive priority tweaking.
                  </p>
                  <p>Use priority to elevate templates that materially affect navigation (homepage, cornerstone guides), not transactional noise.</p>
                </section>

                <section id="change-frequency" className={sectionClass}>
                  <h2 className={h2Class}>Change Frequency (&lt;changefreq&gt;)</h2>
                  <p>
                    <code className="text-sm">changefreq</code> is another advisory hint (never, yearly, weekly, daily…). It
                    does not obligate bots to revisit on that cadence—actual schedules derive from crawl budget and observed change rates.
                  </p>
                  <p>
                    Set realistic coarse values aligned with editorial cadence. Pair with accurate{' '}
                    <code className="text-sm">lastmod</code> timestamps when feasible; inflated frequencies erode trust signals
                    across engines.
                  </p>
                </section>

                <section id="large-sitemaps" className={sectionClass}>
                  <h2 className={h2Class}>Large Sitemaps</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Shard into multiple XML files capped under ~50k URLs and ~50MB uncompressed per major engine guidance.</li>
                    <li>Publish a <code className="text-sm">sitemap-index</code> that references shard URLs; list the index URL in robots.txt.</li>
                    <li>Warm CDN caches after publishing and verify HTTP 200 responses with gzip/brotli as appropriate.</li>
                    <li>Track <code className="text-sm">stoppedEarly</code> in API stats—if true, widen limits or deepen crawl thoughtfully.</li>
                  </ul>
                </section>

                <section id="media-sitemaps" className={sectionClass}>
                  <h2 className={h2Class}>Video & Image Sitemaps</h2>
                  <p>
                    Standard URL sitemaps help discovery for HTML pages; media-rich catalogs often benefit from extension
                    namespaces documenting videos and images (<code className="text-sm">xmlns:video</code>,{' '}
                    <code className="text-sm">xmlns:image</code>) with durations, thumbnails, geo, and captions.
                  </p>
                  <p>
                    The built-in crawler targets HTML link graphs first. Treat dedicated media sitemap entries as authored XML
                    you maintain alongside programmatic page sitemaps: export metadata from CMS or CDN APIs, attach stable media
                    URLs only, validate against Google/Microsoft schema examples, then reference those files from your index
                    alongside standard URL sets.
                  </p>
                  <p>For large libraries, segregate shards by locale or CDN partition to localize invalidation workflows.</p>
                </section>

                <section id="what-is-llms" className={sectionClass}>
                  <h2 className={h2Class}>LLMS.txt — What is it?</h2>
                  <p>
                    LLMS-oriented text surfaces how you intend AI systems—including training crawlers—to handle your web
                    properties: permitted uses, attribution, contact for licensing, feeds to prioritize, etc. Policies may evolve
                    independently of robots.txt exclusions; robots governs crawling mechanics while LLMS prose documents business
                    rules.
                  </p>
                  <p>
                    This product generates a pragmatic starting document from crawling and signal extraction; lawyers and
                    policy owners must review wording before relying on it in contracts or compliance attestations.
                  </p>
                </section>

                <section id="llms-format" className={sectionClass}>
                  <h2 className={h2Class}>Format Specification</h2>
                  <p>
                    There is no single ratified RFC—treat emerging community guidance alongside your governance team.
                    Practically:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Publish at <code className="text-sm">/llms.txt</code> with UTF-8 encoding and deterministic caching headers.</li>
                    <li>Structure short sections with imperative statements (training allowed/denied, citation requirements).</li>
                    <li>Maintain versioning inside the doc (ISO date stamped header) whenever terms change materially.</li>
                  </ul>
                  <CodeBlock>{`POST /api/generate/llms
Content-Type: application/json

{
  "url": "https://example.com",
  "maxPages": 50,
  "allowAITraining": true,
  "requireAttribution": true
}`}</CodeBlock>
                  <p>
                    Response returns <code className="text-sm">jobId</code>; poll{' '}
                    <code className="text-sm">GET /api/llms/status/:jobId</code> until{' '}
                    <code className="text-sm">completed</code> to read <code className="text-sm">content</code>,{' '}
                    <code className="text-sm">aiReadinessScore</code>, and <code className="text-sm">analysis</code>{' '}
                    metadata (titles, robots/sitemap hints, structured data presence).
                  </p>
                </section>

                <section id="ai-optimization" className={sectionClass}>
                  <h2 className={h2Class}>AI Optimization</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Align disclaimers across LLMS.txt, Terms, and crawl policies so automated summarizers ingest consistent intent.</li>
                    <li>Expose machine-readable manifests (datasets, embeddings policies) referenced from llms prose.</li>
                    <li>Measure readiness using the readiness score surfaced in responses as a heuristic, then validate with manual QA.</li>
                  </ul>
                  <p>
                    <code className="text-sm">POST /api/enhance/llms</code> exposes a forwards-compatible enrichment hook accepting{' '}
                    <code className="text-sm">content</code> and{' '}
                    <code className="text-sm">enhancementType</code>; integrations may augment text with LLM rewriting when enabled server-side.
                  </p>
                </section>

                <section id="content-org" className={sectionClass}>
                  <h2 className={h2Class}>Content Organization</h2>
                  <p>
                    Prefer top-down narration: identities (who operates the site), scope (sites covered), crawler posture,
                    licensing, attribution clauses, escalation contacts, changelog. Optionally cross-link FAQs and DMCA
                    processes to avoid duplicating long legal prose inside llms-only files.
                  </p>
                  <p>Use bullet lists sparingly—they parse well via screen readers and ingestion stacks compared to prose walls.</p>
                </section>

                <section id="llms-examples" className={sectionClass}>
                  <h2 className={h2Class}>Examples</h2>
                  <p>
                    Skeleton you might adapt after reviewing compliance—placeholders annotated; replace brackets before publishing.
                  </p>
                  <CodeBlock>{`# LLMS Disclosure — ExampleCo — 2026-05-09
Organization: ExampleCo
Site: https://example.com

Training usage: Conditional — generative summaries allowed with attribution.
Citation: Visible attribution linking to canonical URLs required.

Disallowed uses: Competitive model training on paywalled content.

Contact: trust@example.com
Changelog:
- 2026-05-09 Initial publication`}</CodeBlock>
                </section>

                <section id="seo-guidelines" className={sectionClass}>
                  <h2 className={h2Class}>SEO Guidelines</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Canonicalize duplicated routes; disallow faceted-parameter chaos or reflect intent via parameter handling rules.</li>
                    <li>Keep redirects shallow (avoid chains); return consistent status codes.</li>
                    <li>Use structured data where helpful; mismatches harm trust more than omission.</li>
                    <li>Monitor Search Console equivalents for exclusions linked to unintended robots collisions.</li>
                  </ul>
                </section>

                <section id="performance" className={sectionClass}>
                  <h2 className={h2Class}>Performance Tips</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Prefer edge caching on static bots files (robots, sitemap shards) while ensuring invalidations on deploy.</li>
                    <li>Compress sitemaps transport-wise (gzip/br) respecting crawler expectations.</li>
                    <li>During audits, tighten concurrency responsibly on shared tenancy to prevent self-DDoS signatures.</li>
                  </ul>
                </section>

                <section id="security" className={sectionClass}>
                  <h2 className={h2Class}>Security Considerations</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Secrets never belong in publicly served SEO files.</li>
                    <li>Use robots exclusions as defense-in-depth only—authenticate sensitive URLs.</li>
                    <li>Validate inbound analyzer payloads server-side before passing them downstream.</li>
                    <li>Keep Helmet-derived headers (CSP, HSTS where applicable) orthogonal to crawler hints.</li>
                  </ul>
                </section>

                <section id="ai-management" className={sectionClass}>
                  <h2 className={h2Class}>AI Crawler Management</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Maintain a living registry mapping user-agents→policy owners accountable for updates.</li>
                    <li>Document opt-in/opt-out flows mirrored in robots, llms disclosures, and contract riders.</li>
                    <li>Schedule quarterly reconciliations tying audit deltas to changelog entries.</li>
                    <li>Pair technical controls with human review when models reinterpret ambiguous policy language.</li>
                  </ul>
                </section>

                <section id="endpoints" className={sectionClass}>
                  <h2 className={h2Class}>API Reference — Endpoints</h2>
                  <p className="font-medium text-gray-900 dark:text-white">Robots</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 text-sm mb-6">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/generate/robots</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/validate/robots</code></li>
                  </ul>
                  <p className="font-medium text-gray-900 dark:text-white">Sitemaps</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 text-sm mb-6">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/generate/sitemap</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/sitemap/status/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/saas/sitemap/*</code> (queue-oriented flows)</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/seo-engine/*</code> enhanced engine routes</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/api/sitemap/admin/*</code> administrative operations</li>
                  </ul>
                  <p className="font-medium text-gray-900 dark:text-white">LLMS</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 text-sm mb-6">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/generate/llms</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/llms/status/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/enhance/llms</code></li>
                  </ul>
                  <p className="font-medium text-gray-900 dark:text-white">Analyze & audits</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 text-sm mb-6">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/analyze/sitemap</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/sitemap/status/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/sitemap/report/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/sitemap/xml/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/sitemap/json/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/analyze/classify</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/analyze/classify-bulk</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/stats/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /api/analyze/jobs</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">DELETE /api/analyze/jobs/:jobId</code></li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">POST /api/analyze/crawl</code> crawlability audit</li>
                  </ul>
                  <p className="font-medium text-gray-900 dark:text-white">Health</p>
                  <ul className="list-disc list-inside space-y-1 ml-1 text-sm">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">GET /health</code></li>
                  </ul>
                </section>

                <section id="request-response" className={sectionClass}>
                  <h2 className={h2Class}>Request / Response Conventions</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li>Unless noted, POST bodies are JSON (<code className="text-sm">application/json</code>).</li>
                    <li>Successful generations return HTTP 200 with <code className="text-sm">success: true</code> wrappers where applicable.</li>
                    <li>Async endpoints answer immediately with <code className="text-sm">jobId</code>; poll companion status routes.</li>
                    <li>Use absolute URLs consistently in payloads to avoid ambiguity around schemes and redirects.</li>
                  </ul>
                </section>

                <section id="rate-limiting" className={sectionClass}>
                  <h2 className={h2Class}>Rate Limiting</h2>
                  <p>
                    Global Express rate limiting applies under{' '}
                    <code className="text-sm">/api/*</code> with a configurable window (<code className="text-sm">RATE_LIMIT_MAX</code> caps total hits per rolling interval). Requests hitting certain status or enhancement endpoints may be exempt—see server configuration for authoritative skip rules.
                  </p>
                  <p>Design clients with exponential backoff, especially for analyzer jobs queued server-side.</p>
                </section>

                <section id="errors" className={sectionClass}>
                  <h2 className={h2Class}>Error Handling</h2>
                  <ul className="list-disc list-inside space-y-2 ml-1">
                    <li><strong className="text-gray-900 dark:text-white">400</strong> — validation failures (missing URL, malformed robots body).</li>
                    <li><strong className="text-gray-900 dark:text-white">404</strong> — unknown job identifiers in ephemeral stores.</li>
                    <li><strong className="text-gray-900 dark:text-white">500</strong> — crawler/analysis faults; payloads include diagnostic <code className="text-sm">error</code> / <code className="text-sm">details</code> strings suitable for structured logging.</li>
                  </ul>
                  <p>
                    Axios-based clients bubble errors through interceptors configured in{' '}
                    <code className="text-sm">app/lib/api.ts</code>; map status codes centrally to telemetry and user-visible retry affordances.
                  </p>
                </section>

                <section id="sdks" className={sectionClass}>
                  <h2 className={h2Class}>SDKs</h2>
                  <p>
                    The web repo ships Axios helpers exporting <code className="text-sm">endpoints.robots</code>,{' '}
                    <code className="text-sm">endpoints.sitemap</code>, and <code className="text-sm">endpoints.llms</code>; extend mirrors for analyze routes as needed while keeping base URL normalization consistent.
                  </p>
                  <p>
                    For other ecosystems, scaffold thin SDKs atop OpenAPI-derived clients once you stabilize schemas—prioritize retries, timeouts, typed error unions, and stream-friendly handling for analyzer downloads.
                  </p>
                  <CodeBlock>{`import { endpoints } from '@/lib/api'

const { data } = await endpoints.robots.generate({
  url: 'https://example.com',
  userAgents: [{ name: '*', disallow: ['/private/'], allow: [] }],
})

console.log(data.content)`}</CodeBlock>
                </section>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                <p className="mb-4 opacity-95">
                  Reach out through support channels or browse common questions—we iterate documentation alongside API changes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Contact Support
                  </Link>
                  <Link href="/faq" className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                    Visit FAQ
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
