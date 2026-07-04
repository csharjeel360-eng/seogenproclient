'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Copy, Download, RefreshCw, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  url: string
  maxPages: number
  excludePatterns: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  respectRobotsTxt: boolean
}

export default function SitemapGenerator() {
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
  const [jobId, setJobId] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('idle')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      url: '',
      maxPages: 100,
      excludePatterns: '',
      changeFrequency: 'weekly',
      priority: 0.5,
      respectRobotsTxt: true
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setStatus('processing')
    try {
      const response = await api.post('/generate/sitemap', {
        url: data.url,
        maxPages: data.maxPages,
        respectRobots: data.respectRobotsTxt
      })

      setJobId(response.data.jobId)
      
      // Check if sitemap was generated immediately
      if (response.data.sitemap) {
        setGeneratedContent(response.data.sitemap)
        setStatus('completed')
        setActiveTab('preview')
        const urlCount = response.data.stats?.totalUrls || 0
        toast.success(`Sitemap generated successfully with ${urlCount} URLs!`)
      } else {
        // Otherwise poll for status
        let pollCount = 0
        const maxPolls = 150 // Max 5 minutes of polling (150 * 2 seconds)
        
        // Poll for status
        const pollStatus = async () => {
          try {
            const statusResponse = await api.get(
              `/sitemap/status/${response.data.jobId}`
            )
            
            pollCount++
            console.log(`Poll #${pollCount}: Status = ${statusResponse.data.status}, Found ${statusResponse.data.urlCount || 0} URLs`)
            
            if (statusResponse.data.status === 'completed') {
              setGeneratedContent(statusResponse.data.sitemapXml)
              setStatus('completed')
              setActiveTab('preview')
              toast.success(`Sitemap generated successfully with ${statusResponse.data.urlCount} URLs!`)
            } else if (statusResponse.data.status === 'failed') {
              toast.error(`Sitemap generation failed: ${statusResponse.data.error}`)
              setStatus('failed')
            } else if (pollCount >= maxPolls) {
              toast.error('Sitemap generation timeout. The website may be blocking crawlers.')
              setStatus('failed')
            } else {
              setTimeout(pollStatus, 2000)
            }
          } catch (error) {
            console.error('Polling error:', error)
            if (pollCount < maxPolls) {
              setTimeout(pollStatus, 2000)
            } else {
              toast.error('Polling timeout')
              setStatus('failed')
            }
          }
        }
        
        pollStatus()
      }
    } catch (error) {
      toast.error('Failed to generate sitemap')
      console.error(error)
      setStatus('failed')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    toast.success('Copied to clipboard!')
  }

  const downloadFile = () => {
    const blob = new Blob([generatedContent], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('Sitemap downloaded!')
  }

  const resetForm = () => {
    setGeneratedContent('')
    setJobId(null)
    setStatus('idle')
    setActiveTab('form')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'form'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Zap className="inline-block w-4 h-4 mr-2" />
            Generator
          </button>
          {generatedContent && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle className="inline-block w-4 h-4 mr-2" />
              Preview
            </button>
          )}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    {...register('url', { required: 'URL is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Pages
                    </label>
                    <input
                      type="number"
                      {...register('maxPages', { min: 1, max: 50000 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Frequency
                    </label>
                    <select
                      {...register('changeFrequency')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority (0.0 - 1.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    {...register('priority')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclude Patterns (one per line)
                  </label>
                  <textarea
                    placeholder="/admin/*&#10;/private/*"
                    {...register('excludePatterns')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('respectRobotsTxt')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label className="ml-3 text-gray-700">Respect robots.txt</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Generating...' : 'Generate Sitemap'}
                </button>

                {status && (
                  <div className={`p-4 rounded-lg flex items-center ${
                    status === 'completed' ? 'bg-green-50 text-green-800' :
                    status === 'failed' ? 'bg-red-50 text-red-800' :
                    'bg-blue-50 text-blue-800'
                  }`}>
                    {status === 'processing' && <span className="animate-spin mr-2">⏳</span>}
                    <p className="font-medium">
                      {status === 'completed' && 'Sitemap generated successfully!'}
                      {status === 'processing' && 'Generating sitemap...'}
                      {status === 'failed' && 'Sitemap generation failed'}
                    </p>
                  </div>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadFile}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm overflow-auto max-h-96">
                  <pre>{generatedContent}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
