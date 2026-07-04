'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Globe, Download, CheckCircle, AlertCircle, Eye, Loader2, MapPin, BarChart3 } from 'lucide-react'
import api, { endpoints } from '@/lib/api'

interface FormData {
  url: string
  maxDepth: number
  concurrency?: number
  maxPages?: number
  sitemapType: 'standard' | 'news' | 'image' | 'video'
  jsRendering?: boolean
}

export default function SitemapGeneratorPageClient() {
  const [loading, setLoading] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle')
  const [progress, setProgress] = useState(0)
  const [sitemapContent, setSitemapContent] = useState('')
  const [urlCount, setUrlCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastStatusRaw, setLastStatusRaw] = useState('')
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState('')
  const [isCancelling, setIsCancelling] = useState(false)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearPollInterval = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
  }

  const cancelJob = async (jobIdToCancel: string) => {
    if (!jobIdToCancel) return
    setIsCancelling(true)
    try {
      await endpoints.saasSitemap.cancel(jobIdToCancel)
      console.log(`[Cancel] Job ${jobIdToCancel} cancellation requested`)
    } catch (err) {
      console.warn(`[Cancel] Failed to cancel job ${jobIdToCancel}:`, err)
    } finally {
      setIsCancelling(false)
    }
  }

  const resetGenerator = async () => {
    if (jobId && status === 'processing') {
      await cancelJob(jobId)
      clearPollInterval()
    }

    setJobId(null)
    setStatus('idle')
    setLoading(false)
    setProgress(0)
    setUrlCount(0)
    setEstimatedTimeRemaining('')
    setErrorMessage('')
    setSitemapContent('')
  }

  useEffect(() => {
    const handleUnload = () => {
      if (!jobId || status !== 'processing') return
      const baseUrl = typeof api.defaults.baseURL === 'string' ? api.defaults.baseURL : window.location.origin
      const absoluteUrl = new URL(`/saas/sitemap/cancel/${jobId}`, baseUrl).toString()
      const payload = JSON.stringify({ reason: 'page unload' })

      const sendPayload = () => {
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          const blob = new Blob([payload], { type: 'application/json' })
          return navigator.sendBeacon(absoluteUrl, blob)
        }

        return false
      }

      const beaconSent = sendPayload()
      if (!beaconSent) {
        try {
          fetch(absoluteUrl, {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
          })
        } catch (error) {
          console.warn('Failed to send unload cancellation request', error)
        }
      }
    }

    window.addEventListener('pagehide', handleUnload)
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('pagehide', handleUnload)
      window.removeEventListener('beforeunload', handleUnload)
      clearPollInterval()
    }
  }, [jobId, status])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      url: '',
      maxDepth: 3,
      concurrency: 10,
      maxPages: 500,
      sitemapType: 'standard',
      jsRendering: false
    }
  })

  const fetchStatus = async (jobIdToCheck: string) => {
    if (!jobIdToCheck) return null

    try {
      const statusResponse = await endpoints.saasSitemap.status(jobIdToCheck)

      if (!statusResponse.data.success) {
        console.warn('Status API error:', statusResponse.data.error)
        if (statusResponse.data.status === 'failed' || statusResponse.data.status === 'removed') {
          setStatus('failed')
          setErrorMessage(statusResponse.data.error || 'Failed to retrieve status')
          setLoading(false)
          toast.error(statusResponse.data.error || 'Job failed or was removed')
          return 'failed'
        }
        return 'polling'
      }

      const progressValue = Number(statusResponse.data.progress) || 0
      const urlsValue = Number(statusResponse.data.urlCount) || 0
      const jobStatus = statusResponse.data.status

      console.log(`[Polling] Job ${jobIdToCheck}: ${jobStatus}, progress=${progressValue}, urls=${urlsValue}`)
      try { setLastStatusRaw(JSON.stringify(statusResponse.data, null, 2)) } catch (e) {}

      setProgress(progressValue)
      setUrlCount(urlsValue)
      setEstimatedTimeRemaining(statusResponse.data.estimatedTimeRemaining || '')

      if (jobStatus === 'completed') {
        if (statusResponse.data.sitemap) {
          setSitemapContent(statusResponse.data.sitemap)
        } else {
          try {
            const downloadResp = await endpoints.saasSitemap.download(jobIdToCheck, true)
            setSitemapContent(downloadResp.data)
          } catch (e) {
            console.error('Failed to fetch sitemap XML:', e)
          }
        }

        setStatus('completed')
        setLoading(false)
        toast.success('Sitemap generated successfully!')
        return 'completed'
      } else if (jobStatus === 'failed' || jobStatus === 'removed' || jobStatus === 'cancelled') {
        setStatus('failed')
        setErrorMessage(statusResponse.data.error || 'Job was cancelled or failed')
        setLoading(false)
        toast.error(statusResponse.data.error || 'Job was cancelled or failed')
        return 'failed'
      }

      return 'polling'
    } catch (error) {
      const err = error as any
      if (err?.response?.status === 404) {
        setStatus('failed')
        setErrorMessage('Job not found or was cancelled')
        setLoading(false)
        toast.error('Job not found or was cancelled')
        return 'failed'
      }
      console.error('Status check failed:', error)
      return 'polling'
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!data.url) {
      toast.error('Please enter a website URL')
      return
    }

    try {
      new URL(data.url)
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    if (jobId && status === 'processing') {
      await cancelJob(jobId)
      clearPollInterval()
    }

    setLoading(true)
    setStatus('processing')
    setProgress(0)
    setErrorMessage('')

    try {
      const response = await endpoints.saasSitemap.generate({
        url: data.url,
        maxDepth: data.maxDepth || 3,
        maxUrls: data.maxPages || 500,
        concurrency: data.concurrency || 10,
        jsRendering: data.jsRendering || false
      })

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to start sitemap generation job')
      }

      const newJobId = response.data.jobId
      if (!newJobId) {
        throw new Error('No jobId returned from server')
      }

      setJobId(newJobId)
      setStatus('processing')
      setProgress(0)
      setUrlCount(0)
      setEstimatedTimeRemaining('Initializing...')
      setSitemapContent('')
      setLastStatusRaw('')
      setErrorMessage('')
      console.log(`[Generate] Started job: ${newJobId}`)
      toast.success('Crawl job started!')

      let pollCount = 0
      const maxPollAttempts = 150
      clearPollInterval()

      const firstResult = await fetchStatus(newJobId)
      if (firstResult === 'completed' || firstResult === 'failed') {
        return
      }

      pollIntervalRef.current = setInterval(async () => {
        pollCount++
        const result = await fetchStatus(newJobId)
        if (result === 'completed' || result === 'failed') {
          clearPollInterval()
        } else if (pollCount >= maxPollAttempts) {
          clearPollInterval()
          setLoading(false)
          setStatus('failed')
          setErrorMessage('Job polling timeout after 5 minutes')
          toast.error('Polling timeout - job took too long')
        }
      }, 2000)
    } catch (error) {
      const err = error as any
      const errorMsg = err?.response?.data?.error || err.message || 'Failed to start job'
      setErrorMessage(errorMsg)
      setStatus('failed')
      toast.error(errorMsg)
      setLoading(false)
    }
  }

  const downloadFile = () => {
    const blob = new Blob([sitemapContent], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-cyan-900 p-8 text-white shadow-2xl shadow-blue-900/10 mb-10">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">XML Sitemap Generator</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Free XML Sitemap Generator</h1>
            <p className="mt-4 text-blue-200 leading-7">Create a valid sitemap.xml for your site quickly.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-blue-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-blue-300"><MapPin className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Comprehensive</span></div>
                <p className="mt-3 text-xl font-semibold">Full Site Discovery</p>
                <p className="mt-2 text-blue-300 text-sm">Crawl and map all URLs across your site.</p>
              </div>
              <div className="rounded-3xl bg-blue-900/90 p-5 border border-white/10">
                <div className="flex items-center gap-3 text-cyan-300"><BarChart3 className="w-5 h-5" /><span className="text-sm uppercase tracking-[0.2em]">Fast</span></div>
                <p className="mt-3 text-xl font-semibold">Optimized Crawling</p>
                <p className="mt-2 text-blue-300 text-sm">Parallel requests and smart caching.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-blue-950/90 p-6 border border-white/10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Generation Status</p>
                  <p className="mt-2 text-3xl font-semibold">
                    {status === 'processing'
                      ? 'In Progress'
                      : status === 'completed'
                      ? 'Ready'
                      : status === 'failed'
                      ? 'Failed'
                      : 'Ready'}
                  </p>
                </div>
              </div>
              {loading && (
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-blue-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-sm text-blue-300">
                    {progress}% complete • {urlCount} URLs found
                    {estimatedTimeRemaining ? ` • ${estimatedTimeRemaining}` : ''}
                  </p>
                </div>
              )}
            </div>

            {status === 'completed' && (
              <div className="rounded-3xl bg-emerald-950/90 p-5 border border-emerald-400/20">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">URLs</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-400">{urlCount}</p>
                <p className="mt-2 text-emerald-200 text-sm">Total URLs in Sitemap</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Configuration</h2>
                <p className="mt-2 text-slate-500">Set up your sitemap generation parameters.</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-3 text-sm text-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 text-yellow-700" />
                  <div>
                    <strong className="block font-semibold">Note:</strong>
                    Generating a sitemap can take a few minutes for large sites. Live progress updates appear on this page — please keep this tab open until the job completes.
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-1">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Website URL</span>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="url"
                      {...register('url', { required: true })}
                      placeholder="https://example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Max Depth</span>
                  <input type="number" {...register('maxDepth')} min="1" max="10" className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Max Pages</span>
                  <input type="number" {...register('maxPages')} min="1" className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Concurrency</span>
                  <input type="number" {...register('concurrency')} min="1" max="50" className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Sitemap Type</span>
                  <select {...register('sitemapType')} className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="standard">Standard</option>
                    <option value="news">News</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                <input type="checkbox" {...register('jsRendering')} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                <span className="text-sm text-slate-700">Render JavaScript</span>
              </label>

              <div className="flex flex-col gap-4 sm:flex-row items-center">
                <button type="submit" disabled={loading || isCancelling} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-800 disabled:opacity-50">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                  {loading ? 'Generating...' : 'Generate Sitemap'}
                </button>
                <button type="button" onClick={resetGenerator} disabled={isCancelling} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                  Reset
                </button>
              </div>

              {status === 'failed' && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700">{errorMessage}</div>}
            </form>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <h2 className="text-2xl font-semibold mb-4">Generation Info</h2>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
                <p className="mt-3 text-lg font-semibold text-slate-900 capitalize">{status}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total URLs</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{urlCount}</p>
              </div>
            </div>
          </section>
          {lastStatusRaw && (
            <section className="rounded-3xl bg-white p-4 shadow-lg border border-slate-200/70 mt-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Last status (raw)</p>
              <pre className="mt-2 text-xs max-h-48 overflow-auto bg-slate-50 p-2 border border-slate-100">{lastStatusRaw}</pre>
            </section>
          )}
        </div>
      </div>

      {status === 'processing' && jobId && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => cancelJob(jobId)}
            disabled={isCancelling}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Job'}
          </button>
        </div>
      )}
      {status === 'completed' && sitemapContent && (
        <div className="mt-10">
          <section className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/70">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Generated Sitemap</h2>
                <p className="mt-2 text-slate-500">Your XML sitemap is ready.</p>
              </div>
              <button onClick={downloadFile} className="inline-flex items-center gap-2 rounded-2xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 max-h-96 overflow-y-auto border border-slate-200 font-mono text-xs">
              <pre>{sitemapContent}</pre>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
