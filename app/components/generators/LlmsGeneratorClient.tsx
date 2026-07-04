'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Brain, Download, Copy, Globe, Shield, Settings, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import ReactMarkdown from 'react-markdown'

interface FormData {
  url: string
  title: string
  summary: string
  maxPages: number
  autoDiscover: boolean
  allowAITraining: boolean
  requireAttribution: boolean
  includeCategories: boolean
  includeMonetization: boolean
  includeLegal: boolean
  excludeFolders: string
}

export default function LlmsGeneratorClient() {
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle')
  const [progress, setProgress] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [crawledCount, setCrawledCount] = useState(0)
  const [maxCrawlPages, setMaxCrawlPages] = useState(0)
  const [aiReadinessScore, setAiReadinessScore] = useState(0)
  const [analysis, setAnalysis] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      url: '',
      title: '',
      summary: '',
      maxPages: 50,
      autoDiscover: true,
      allowAITraining: true,
      requireAttribution: true,
      includeCategories: true,
      includeMonetization: true,
      includeLegal: true,
      excludeFolders: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setStatus('processing')
    setProgress(0)

    try {
      const response = await api.post('/generate/llms', {
        url: data.url,
        title: data.title || `Documentation for ${data.url}`,
        summary: data.summary || `Important links and resources from ${data.url}`,
        maxPages: data.maxPages,
        autoDiscover: data.autoDiscover,
        allowAITraining: data.allowAITraining,
        requireAttribution: data.requireAttribution,
        includeCategories: data.includeCategories,
        includeMonetization: data.includeMonetization,
        includeLegal: data.includeLegal,
        excludeFolders: data.excludeFolders ? data.excludeFolders.split(',').map(folder => folder.trim()) : []
      }, { timeout: 10000 })

      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await api.get(`/llms/status/${response.data.jobId}`)
          const statusData = statusResponse.data

          setProgress(statusData.progress || 0)
          setPageCount(statusData.pageCount || 0)
          setCrawledCount(statusData.crawledCount || 0)
          setMaxCrawlPages(statusData.maxPages || data.maxPages || 0)
          setAiReadinessScore(statusData.aiReadinessScore || 0)
          setAnalysis(statusData.analysis || null)

          if (statusData.status === 'completed') {
            clearInterval(pollInterval)
            setStatus('completed')
            setGeneratedContent(statusData.content || '')
            setSuggestions(statusData.suggestions || [])
            toast.success(`LLMS.txt generated! AI Readiness Score: ${statusData.aiReadinessScore}/100`)
            setLoading(false)
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval)
            setStatus('failed')
            toast.error(statusData.error || 'Failed to generate LLMS.txt')
            setLoading(false)
          }
        } catch (pollError) {
          console.error('Status polling error:', pollError)
        }
      }, 2000)
    } catch (error) {
      toast.error('Failed to start LLMS.txt generation')
      console.error(error)
      setStatus('failed')
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
    a.download = 'llms.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-900 p-8 text-white shadow-2xl shadow-purple-900/10 mb-10">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300/80">LLMS.txt Generator</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Free LLMS.txt Generator</h1>
            <p className="mt-4 text-purple-200 leading-7">
              Generate a valid LLMS.txt file for your website in seconds. Help AI assistants and large language models discover your content with an optimized LLMS.txt file—free and easy to use.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-purple-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-purple-300"><Brain className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Smart</span></div>
                <p className="mt-3 text-xl font-semibold">AI readiness</p>
                <p className="mt-2 text-purple-300 text-sm">Generate a score for your site’s AI crawlability.</p>
              </div>
              <div className="rounded-3xl bg-purple-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-indigo-300"><Settings className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Control</span></div>
                <p className="mt-3 text-xl font-semibold">Policy options</p>
                <p className="mt-2 text-purple-300 text-sm">Fine-tune training, attribution, and content sections.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl bg-purple-950/90 p-6 border border-white/10">
            <div className="rounded-3xl bg-slate-950 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70">Generation Status</p>
              <p className="mt-4 text-3xl font-semibold text-white">{status === 'processing' ? 'In progress' : status === 'completed' ? 'Ready' : 'Ready to start'}</p>
              <p className="mt-2 text-sm text-slate-300">{status === 'completed' ? 'Your file is ready.' : 'Set your configuration and generate.'}</p>

              {(status === 'processing' || status === 'completed') && (
                <div className="mt-6">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800/60">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{progress}% complete{status === 'completed' ? ' — finished' : ''}</p>
                  {status === 'processing' && (
                    <p className="mt-2 text-sm text-slate-300">
                      Crawled {crawledCount} of {maxCrawlPages || 0} pages
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="rounded-3xl bg-slate-950 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/70">AI Score</p>
              <p className="mt-4 text-3xl font-semibold text-white">{aiReadinessScore}/100</p>
              <p className="mt-2 text-sm text-slate-300">AI readiness after generation.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Configuration</h2>
              <p className="mt-2 text-sm text-slate-500">Enter your site details and choose content options.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <Globe className="h-4 w-4 text-slate-500" /> llms.txt builder
            </div>
          </div>

          {/* UX notice: generation can take time */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Website URL</span>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  {...register('url')}
                  placeholder="https://example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-white/95 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Title (optional)</span>
                <input type="text" {...register('title')} placeholder="Site title for LLMS" className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Summary (optional)</span>
                <input type="text" {...register('summary')} placeholder="Short summary for LLMS.txt" className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-3 text-sm text-slate-900" />
              </label>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="inline-flex items-center gap-3 rounded-2xl bg-purple-900 px-6 py-3 text-sm font-semibold text-white">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Brain className="h-5 w-5" />}
                {loading ? 'Generating...' : 'Generate LLMS.txt'}
              </button>
              <button type="button" onClick={downloadFile} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <h2 className="text-2xl font-semibold text-slate-900">Analysis</h2>
            <p className="mt-2 text-sm text-slate-500">AI readiness, suggestions, and basic analytics appear here after generation.</p>
          </section>
        </aside>
      </div>

      {generatedContent && (
        <section className="mt-10 rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Generated LLMS.txt</h2>
              <p className="mt-2 text-sm text-slate-500">Copy, download, or review your full output below.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={copyToClipboard} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                <Copy className="h-4 w-4" /> Copy
              </button>
              <button type="button" onClick={downloadFile} className="inline-flex items-center gap-2 rounded-2xl bg-purple-900 px-4 py-2 text-sm font-semibold text-white">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-6 font-mono text-sm text-slate-100">
            <pre className="whitespace-pre-wrap break-words">{generatedContent}</pre>
          </div>
        </section>
      )}
    </div>
  )
}
