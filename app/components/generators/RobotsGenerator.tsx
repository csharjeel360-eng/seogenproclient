'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Copy, Download, Shield, AlertCircle, CheckCircle, Loader2, Globe } from 'lucide-react'
import { api } from '@/lib/api'

interface FormData {
  url: string
  userAgent: string
  disallowPaths: string
  allowPaths: string
  sitemapUrl: string
  crawlDelay: number
  blockAI: boolean
  customRules: string
}

export default function RobotsGenerator() {
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      url: '',
      userAgent: '*',
      disallowPaths: '',
      allowPaths: '',
      sitemapUrl: '',
      crawlDelay: 1,
      blockAI: true,
      customRules: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await api.post('/generate/robots', {
        url: data.url,
        userAgents: [{
          name: data.userAgent,
          disallow: data.disallowPaths.split('\n').filter(p => p.trim()),
          allow: data.allowPaths.split('\n').filter(p => p.trim())
        }],
        sitemapUrl: data.sitemapUrl,
        crawlDelay: data.crawlDelay,
        additionalRules: data.customRules.split('\n').filter(r => r.trim())
      })

      setGeneratedContent(response.data.content)
      setValidationResult({
        valid: response.data.warnings?.length === 0,
        errors: response.data.warnings || []
      })
      
      toast.success('Robots.txt generated successfully!')
    } catch (error) {
      toast.error('Failed to generate robots.txt')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    toast.success('Copied to clipboard!')
  }

  const downloadFile = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  return (
    <div className="min-h-screen bg-slate-950/5 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-10 text-white shadow-2xl shadow-cyan-950/20 mb-10">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Robots.txt Generator</p>
              <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight">Free Robots.txt Generator</h1>
              <p className="mt-4 text-slate-200 leading-7">
                Generate a valid robots.txt file in seconds — control crawlers, include sitemaps, and improve website SEO for Google, Bing, and AI crawlers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <article className="rounded-3xl bg-white/10 p-6 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Control</p>
                  <p className="mt-3 text-xl font-semibold">Crawl access</p>
                  <p className="mt-2 text-sm text-slate-300">Configure disallow, allow, and sitemap rules in one place.</p>
                </article>
                <article className="rounded-3xl bg-white/10 p-6 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Validate</p>
                  <p className="mt-3 text-xl font-semibold">Immediate feedback</p>
                  <p className="mt-2 text-sm text-slate-300">See warnings and copy/download your robots.txt instantly.</p>
                </article>
              </div>
            </div>

            <div className="space-y-5 rounded-3xl bg-slate-900/80 p-8 border border-white/10">
              <div className="rounded-3xl bg-slate-950 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Status</p>
                <p className="mt-4 text-3xl font-semibold text-white">{generatedContent ? 'Generated' : 'Ready to create'}</p>
                <p className="mt-2 text-sm text-slate-300">{generatedContent ? 'Robots.txt is ready to review.' : 'Complete the form to generate your file.'}</p>
              </div>
              <div className="rounded-3xl bg-slate-950 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Format</p>
                <p className="mt-4 text-3xl font-semibold text-white">robots.txt</p>
                <p className="mt-2 text-sm text-slate-300">Download or copy your file when finished.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">


          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Configuration</h2>
                <p className="mt-2 text-sm text-slate-500">Set rules, add crawlers, and include sitemap details.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                <Globe className="h-4 w-4 text-slate-500" />
                robots.txt builder
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Website URL</span>
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    {...register('url', { required: 'URL is required' })}
                    placeholder="https://example.com"
                    className="w-full rounded-2xl border border-slate-300 bg-white/95 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
                {errors.url && <p className="mt-2 text-sm text-red-600">{errors.url.message}</p>}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">User-Agent</span>
                  <input
                    type="text"
                    {...register('userAgent')}
                    placeholder="* (all bots)"
                    className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Crawl Delay (seconds)</span>
                  <input
                    type="number"
                    {...register('crawlDelay')}
                    min="0"
                    step="0.1"
                    className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Disallow Paths (one per line)</span>
                <textarea
                  {...register('disallowPaths')}
                  rows={4}
                  placeholder="/admin
/wp-admin
/private"
                  className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 font-mono"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Allow Paths (one per line)</span>
                <textarea
                  {...register('allowPaths')}
                  rows={4}
                  placeholder="/public
/css
/js"
                  className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 font-mono"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Sitemap URL</span>
                <input
                  type="url"
                  {...register('sitemapUrl')}
                  placeholder="https://example.com/sitemap.xml"
                  className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-cyan-500">
                <input type="checkbox" {...register('blockAI')} className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                <span>Block AI crawlers by default</span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Custom Rules (one per line)</span>
                <textarea
                  {...register('customRules')}
                  rows={4}
                  placeholder="User-agent: SemrushBot
Disallow: /
Host: https://example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 font-mono"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Shield className="h-5 w-5" />}
                {loading ? 'Generating robots.txt' : 'Generate Robots.txt'}
              </button>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
              <h2 className="text-2xl font-semibold text-slate-900">Validation</h2>
              <p className="mt-2 text-sm text-slate-500">Warnings appear here after generation.</p>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Generated file</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">robots.txt</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Sitemap</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">Optional URL</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
              <h2 className="text-2xl font-semibold text-slate-900">Workflow</h2>
              <ul className="mt-6 space-y-4 text-sm text-slate-600">
                <li className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">Step 1</p>
                  <p className="mt-1">Enter your website source and crawler preferences.</p>
                </li>
                <li className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">Step 2</p>
                  <p className="mt-1">Generate and review warnings in the validation panel.</p>
                </li>
                <li className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">Step 3</p>
                  <p className="mt-1">Copy or download the robots.txt output.</p>
                </li>
              </ul>
            </section>
          </aside>
        </div>

        {generatedContent && (
          <section className="mt-10 rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Generated Robots.txt</h2>
                <p className="mt-2 text-sm text-slate-500">Copy, download, or review your full output below.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  <Copy className="h-4 w-4" /> Copy
                </button>
                <button
                  type="button"
                  onClick={downloadFile}
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-900"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>

            {validationResult && (
              <div className={`mt-8 rounded-3xl p-5 ${validationResult.valid ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="flex items-center gap-3">
                  {validationResult.valid ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  )}
                  <p className={`font-semibold ${validationResult.valid ? 'text-emerald-900' : 'text-amber-900'}`}>
                    {validationResult.valid ? 'Valid robots.txt' : 'Warnings found'}
                  </p>
                </div>
                {validationResult.errors.length > 0 && (
                  <ul className={`mt-4 list-disc list-inside space-y-2 text-sm ${validationResult.valid ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-6 font-mono text-sm text-slate-100">
              <pre className="whitespace-pre-wrap break-words">{generatedContent}</pre>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}