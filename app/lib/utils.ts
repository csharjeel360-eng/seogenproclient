// Format date
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Extract domain from URL
export const getDomainFromUrl = (url: string): string => {
  try {
    const { hostname } = new URL(url)
    return hostname
  } catch {
    return url
  }
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Generate random ID
export const generateId = (length: number = 8): string => {
  return Math.random().toString(36).substring(2, length + 2)
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Slugify string
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Parse robots.txt content
export const parseRobotsTxt = (content: string): any => {
  const lines = content.split('\n')
  const rules: any[] = []
  let currentRule: any = {}

  lines.forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) return

    const [directive, value] = line.split(':').map(s => s.trim())
    
    if (directive.toLowerCase() === 'user-agent') {
      if (Object.keys(currentRule).length > 0) {
        rules.push(currentRule)
      }
      currentRule = { userAgent: value, disallow: [], allow: [] }
    } else if (directive.toLowerCase() === 'disallow') {
      currentRule.disallow.push(value)
    } else if (directive.toLowerCase() === 'allow') {
      currentRule.allow.push(value)
    } else {
      currentRule[directive] = value
    }
  })

  if (Object.keys(currentRule).length > 0) {
    rules.push(currentRule)
  }

  return rules
}

// Download file
export const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}