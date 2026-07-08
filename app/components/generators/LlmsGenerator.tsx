'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Copy, Download, RefreshCw, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  websiteUrl: string
  siteDescription: string
  companyName: string
  contactEmail: string
  accessInstructions: string
  blockRobots: boolean
}

export default function LlmsGenerator() {
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      websiteUrl: '',
      siteDescription: '',
      companyName: '',
      contactEmail: '',
      accessInstructions: '',
      blockRobots: false,
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      let content = ''
      
      // First, generate base llms.txt with web crawling enabled
      const generateResponse = await api.post('/generate/llms', {
        url: data.websiteUrl,
        title: data.companyName,
        summary: data.siteDescription,
        maxPages: 100,
        autoDiscover: true
      }, {
        timeout: 120000 // 2 minute timeout for crawling to complete
      })

      content = generateResponse.data.content

      setGeneratedContent(content)
      setActiveTab('preview')
      toast.success('llms.txt generated successfully!')
    } catch (error) {
      toast.error('Failed to generate llms.txt')
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
    a.download = 'llms.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success('llms.txt downloaded!')
  }

  const resetForm = () => {
    setGeneratedContent('')
    setActiveTab('form')
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 px-4 sm:px-6 py-4 text-center font-medium transition-colors ${
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
              className={`flex-1 px-4 sm:px-6 py-4 text-center font-medium transition-colors ${
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

        <div className="p-4 sm:p-8">
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
                    {...register('websiteUrl', { required: 'URL is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    {...register('companyName', { required: 'Company name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    placeholder="Describe what your website does..."
                    {...register('siteDescription', { required: 'Description is required' })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.siteDescription && <p className="text-red-500 text-sm mt-1">{errors.siteDescription.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    {...register('contactEmail')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Instructions
                  </label>
                  <textarea
                    placeholder="Explain how LLMs can access and use your website..."
                    {...register('accessInstructions')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('blockRobots')}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label className="ml-3 text-gray-700">Block AI bots (noai)</label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Generating...' : 'Generate llms.txt'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap gap-3">
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

                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm overflow-auto max-h-96 whitespace-pre-wrap break-words">
                  {generatedContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
