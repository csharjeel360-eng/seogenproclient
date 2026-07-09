import React from 'react'

export const metadata = {
  title: "What Is llms.txt? The Complete Beginner's Guide (2026) - SEO Gen Pro",
  description:
    'Learn what llms.txt is, why it matters for AI search, and how to create an effective llms.txt file to optimize your site for AI crawlers.',
}

export default function LLMSGuidePage() {
  return (
    <main className="max-w-5xl mx-auto pt-28 pb-12 px-6">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 id="top" className="scroll-mt-28 text-3xl sm:text-4xl font-extrabold leading-tight">What Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">llms.txt</span>? — The Complete Beginner’s Guide (2026)</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">A practical guide to llms.txt: what to include, where to place it, and how to use it to improve your site’s compatibility with AI assistants and LLM-based search.</p>

            <div className="mt-4 flex items-center space-x-3 text-sm text-gray-500">
              <span>By SEO Gen Pro</span>
              <span>•</span>
              <span>Updated: 2026-03-15</span>
              <span>•</span>
              <span>Reading time: 8 min</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <a href="/llms-generator" className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v1H4a2 2 0 00-2 2v6a2 2 0 002 2h8v1a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                <path d="M14 7h4v6a2 2 0 01-2 2h-2V7z" />
              </svg>
              Open LLMS.txt Generator
            </a>
          </div>
        </div>
      </header>

      <article className="prose prose-lg dark:prose-invert">
        <nav className="mb-6">
          <strong>On this page:</strong>
          <ul className="list-disc ml-6 mt-2">
            <li><a href="#what">What is llms.txt?</a></li>
            <li><a href="#why">Why it matters</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#example">Example file</a></li>
            <li><a href="#place">Placement & headers</a></li>
            <li><a href="#create">How to create</a></li>
            <li><a href="#best-practices">Best practices</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </nav>

        <section id="what">
          <h2>What is llms.txt?</h2>
          <p><strong>llms.txt</strong> is a small, machine-readable text file served from the root of a site (for example <em>https://example.com/llms.txt</em>) that communicates high-level guidance to AI systems and LLM-based assistants.</p>
          <p>Unlike robots.txt which controls crawl behavior, llms.txt describes content intent: canonical sources, preferred excerpts, licensing, and pointers to documentation that help AI summarize and attribute content accurately.</p>
        </section>

        <section id="why">
          <h2>Why it matters</h2>
          <p>As AI assistants grow more prevalent, sites that provide clear signals will be easier to summarize and cite correctly. llms.txt is an easy way to:</p>
          <ul>
            <li>Signal authoritative pages and preferred snippets.</li>
            <li>Provide license and contact info for reuse and attribution.</li>
            <li>Exclude private or low-value paths from being used as answers.</li>
          </ul>
        </section>

        <section id="how">
          <h2>How it works</h2>
          <p>The file is plain UTF-8 text with simple directives. Parsers should be tolerant: ignore unknown directives and support comments. A typical parser reads the file, extracts fields, normalizes URLs, and applies precedence rules (site-level fields override page hints).</p>
          <p>Common directives include:</p>
          <ul>
            <li><code>Site:</code> — the canonical site origin</li>
            <li><code>Canonical:</code> — a preferred URL for general summaries</li>
            <li><code>Important-Page:</code> — path + short label for priority pages</li>
            <li><code>Excerpt:</code> — one-sentence preferred summary</li>
            <li><code>License:</code> and <code>Contact:</code></li>
            <li><code>Disallowed:</code> — paths not to use for answers</li>
          </ul>
        </section>

        <section id="example">
          <h2>Example llms.txt</h2>
          <pre className="rounded-md bg-gray-100 p-4 overflow-auto">{`# llms.txt example
Site: https://example.com
Contact: https://example.com/contact
License: https://example.com/terms#content-use

Canonical: https://example.com/about
Excerpt: ExampleCorp provides privacy-first AI search and site tools.

Important-Page: /docs/getting-started/ — Getting started guide
Important-Page: /pricing/ — Pricing details

Prefer: structured-data
Disallowed: /dashboard/
Sitemap: https://example.com/sitemap.xml
Updated: 2026-03-15`}</pre>
          <p className="text-sm text-gray-500">Tip: Keep the file short and authoritative — AI systems prefer concise signals.</p>
        </section>

        <section id="place">
          <h2>Where to place llms.txt</h2>
          <p>Publish at the host root: <code>/llms.txt</code>. Serve it as <code>text/plain; charset=utf-8</code>. Ensure no authentication is required if you want broad discoverability. Add a sitemap reference in <code>/robots.txt</code> to help crawlers find it.</p>
        </section>

        <section id="create">
          <h2>How to create an effective llms.txt</h2>
          <p>Start small and iterate. A minimum viable llms.txt contains:</p>
          <ol>
            <li><strong>Site</strong> — absolute origin.</li>
            <li><strong>Canonical</strong> — your preferred human-facing summary URL.</li>
            <li><strong>Excerpt</strong> — a short (1–2 sentence) canonical summary for assistants to prefer.</li>
            <li><strong>Important-Page</strong> — 3–10 prioritized pages with short labels.</li>
            <li><strong>License</strong> and <strong>Contact</strong> — links for reuse and questions.</li>
          </ol>
          <p>Store the file in source control and add an automated check to ensure the <code>Updated:</code> date is refreshed when content changes.</p>
        </section>

        <section id="best-practices">
          <h2>Best practices</h2>
          <ul>
            <li>Use absolute URLs for site-level fields; use paths for page-level directives.</li>
            <li>Keep excerpts neutral and representative — avoid marketing language.</li>
            <li>Prefer existing structured data on pages; use <code>Prefer: structured-data</code> to hint parsers.</li>
            <li>Do not include sensitive or private URLs — use <code>Disallowed:</code> for low-value paths.</li>
            <li>Test with a crawl/audit tool to ensure the file is reachable and parsed correctly.</li>
          </ul>
        </section>

        <section id="faqs">
          <h2>Frequently asked questions</h2>
          <details>
            <summary>Is llms.txt required?</summary>
            <p>No. It is optional but helpful for sites that want clearer AI attribution and summaries.</p>
          </details>
          <details>
            <summary>Will search engines use it?</summary>
            <p>Search engines may not treat llms.txt the same way as robots.txt yet. Treat it as a complement to existing signals.</p>
          </details>
        </section>

        <section className="mt-8">
          <h3>Ready to generate your llms.txt?</h3>
          <p>Use our generator to produce a well-formed llms.txt tailored to your site. You can copy, customise, and deploy the result in seconds.</p>
          <a href="/llms-generator" className="inline-flex items-center gap-3 mt-4 px-5 py-3 rounded-md bg-white border border-gray-200 text-gray-900 font-semibold shadow hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v1H4a2 2 0 00-2 2v6a2 2 0 002 2h8v1a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
              <path d="M14 7h4v6a2 2 0 01-2 2h-2V7z" />
            </svg>
            Open LLMS.txt Generator — Create & Download
          </a>
        </section>
      </article>
    </main>
  )
}
