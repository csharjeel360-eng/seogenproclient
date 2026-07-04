import axios from 'axios'

const DEFAULT_API_URL = 'https://seogenpro.vercel.app/api'
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Runtime debug: log effective API base URL in the browser console
if (typeof window !== 'undefined') {
  try {
    // eslint-disable-next-line no-console
    console.info('[api] baseURL:', api.defaults.baseURL)
  } catch (e) {}
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout')
    } else if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data)
      
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          window.location.href = '/login'
          break
        case 403:
          // Forbidden
          console.error('Access denied')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server. Is the backend running?')
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  robots: {
    generate: (data: any) => api.post('/generate/robots', data),
    validate: (data: any) => api.post('/validate/robots', data),
  },
  sitemap: {
    generate: (data: any) => api.post('/generate/sitemap', data),
    status: (jobId: string) => api.get(`/sitemap/status/${jobId}`),
  },
  saasSitemap: {
    generate: (data: any) => api.post('/saas/sitemap/generate', data),
    status: (jobId: string) => api.get(`/saas/sitemap/status/${jobId}`),
    download: (jobId: string, inline = false) => api.get(`/saas/sitemap/download/${jobId}${inline ? '?inline=true' : ''}`, { responseType: 'text' }),
    cancel: (jobId: string) => api.post(`/saas/sitemap/cancel/${jobId}`),
  },
  llms: {
    generate: (data: any) => api.post('/generate/llms', data),
    enhance: (data: any) => api.post('/enhance/llms', data),
  },
  health: () => api.get('/health'),
}

export default api