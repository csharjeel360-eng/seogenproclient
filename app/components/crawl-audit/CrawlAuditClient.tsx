"use client"

import React, { useMemo, useState } from 'react'
import { BarChart3, CheckCircle2, Link2, Loader2, ShieldCheck, Sparkles, Telescope } from 'lucide-react'
import { api } from '@/lib/api'

type PerUrl = {
  url: string
  status: number | null
  ok: boolean
  canonical: string | null
  metaRobots: string | null
  links: string[]
  out_broken_sample: any[]
  hasQuery?: boolean | string
  depth?: number
}

function formatNumber(value: number | undefined | null) {
  return value ?? '—'
}

export default function CrawlAuditClient() {
  const [url, setUrl] = useState('')
  const [maxPages, setMaxPages] = useState(100)
  const [followExternal, setFollowExternal] = useState(false)
  const [depthLimit, setDepthLimit] = useState(2)
  const [rateLimitMs, setRateLimitMs] = useState(0)
  const [concurrency, setConcurrency] = useState(12)
  const [renderAllPages, setRenderAllPages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const applyPreset = (preset: string) => {
    if (preset === 'fast') {
      setMaxPages(50)
      setDepthLimit(1)
      setConcurrency(15)
      setRenderAllPages(false)
    } else if (preset === 'balanced') {
      setMaxPages(100)
      setDepthLimit(2)
      setConcurrency(12)
      setRenderAllPages(false)
    } else if (preset === 'thorough') {
      setMaxPages(500)
      setDepthLimit(3)
      setConcurrency(8)
      setRenderAllPages(true)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    if (!url) return setError('Please enter a URL')
    setLoading(true)

    try {
      const resp = await api.post('/analyze/crawl', {
        url,
        maxPages,
        followExternal,
        depthLimit,
        rateLimitMs,
        concurrency,
        renderAllPages,
      })
      const data = resp.data
      if (resp.status >= 400) {
        setError(data.error || data.details || 'Audit failed')
      } else {
        setResult(data.report)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  const urls = useMemo(() => {
    if (!result?.per_url) return [] as PerUrl[]
    return Object.values(result.per_url) as PerUrl[]
  }, [result])

  const brokenCount = urls.filter((item) => !item.ok).length
  const queryCount = urls.filter((item) => item.hasQuery).length
  const score = result?.crawl_results_summary?.final_score ?? 0
  const scorePercent = Math.min(100, Math.max(0, score))

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-2xl shadow-slate-900/10 mb-10">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">AI Crawlability Audit</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Modern crawl insights for search engines and AI bots</h1>
            <p className="mt-4 text-slate-300 leading-7">
              Scan your site with a smart crawl engine that highlights indexability issues, broken links, robots rules, and sitemap coverage.
              Get a visual audit dashboard and quick recommendations for improving crawlability.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-sky-300"><Sparkles className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Fast</span></div>
                <p className="mt-3 text-xl font-semibold">Optimized default crawl</p>
                <p className="mt-2 text-slate-400 text-sm">Designed for speed without sacrificing actionable signal.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-emerald-300"><ShieldCheck className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Trust</span></div>
                <p className="mt-3 text-xl font-semibold">Clear audit scoring</p>
                <p className="mt-2 text-slate-400 text-sm">Turn crawl data into a meaningful health score.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/90 p-6 border border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Current audit</p>
                  <p className="mt-2 text-3xl font-semibold">{url || 'Enter a URL to start'}</p>
                </div>
                <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-slate-300">Score</div>
              </div>
              <div className="mt-6 h-4 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400" style={{ width: `${scorePercent}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                <span>{scorePercent}% health</span>
                <span>{formatNumber(result?.total_urls_discovered)} pages</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Robots</p>
                <p className="mt-3 text-2xl font-semibold">{formatNumber((result?.robots?.allow?.length || 0) + (result?.robots?.disallow?.length || 0))}</p>
                <p className="mt-2 text-slate-400 text-sm">Parsed allow/disallow directives from robots.txt.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Sitemap</p>
                <p className="mt-3 text-2xl font-semibold">{formatNumber(result?.robots?.sitemaps?.length || result?.sitemap_urls?.length)}</p>
                <p className="mt-2 text-slate-400 text-sm">Discovered sitemap sources for coverage analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Audit settings</h2>
                <p className="mt-2 text-slate-500">Adjust crawl depth, concurrency, and rendering behavior before launching the audit.</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Smart defaults</div>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Website URL</span>
                  <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Max pages</span>
                  <input type="number" value={maxPages} onChange={(e) => setMaxPages(Number(e.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Depth limit</span>
                  <input type="number" value={depthLimit} onChange={(e) => setDepthLimit(Number(e.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Concurrency</span>
                  <input type="number" value={concurrency} onChange={(e) => setConcurrency(Number(e.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                  <input type="checkbox" checked={followExternal} onChange={(e) => setFollowExternal(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                  <span className="text-sm text-slate-700">Follow external links</span>
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                  <input type="checkbox" checked={renderAllPages} onChange={(e) => setRenderAllPages(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                  <span className="text-sm text-slate-700">Render JS pages</span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <button type="button" onClick={() => applyPreset('fast')} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">Fast</button>
                <button type="button" onClick={() => applyPreset('balanced')} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">Balanced</button>
                <button type="button" onClick={() => applyPreset('thorough')} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">Thorough</button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row items-center">
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Telescope className="h-4 w-4" />} {loading ? 'Running audit' : 'Run audit'}
                </button>
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => { setUrl(''); setResult(null); setError(null) }}>
                  Reset
                </button>
              </div>

              {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700">{error}</div>}
            </form>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex items-center gap-3 text-slate-900">
              <BarChart3 className="h-6 w-6 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold">Instant insights</h2>
                <p className="mt-2 text-slate-500">Your audit report appears in a clean dashboard with issue highlights and visual scoring.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Crawlable</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{formatNumber(result?.crawl_results_summary?.crawlable_urls)}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Broken</p>
                <p className="mt-3 text-3xl font-semibold text-rose-600">{formatNumber(result?.crawl_results_summary?.broken_count)}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Queries</p>
                <p className="mt-3 text-3xl font-semibold text-amber-600">{queryCount}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <h3 className="text-lg font-semibold">Top issues</h3>
            <p className="mt-2 text-sm text-slate-500">Highlights from the most urgent crawlability problems.</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">No issues found yet.</div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
