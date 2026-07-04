export const SITE_NAME = 'SEO Generator Pro'
export const SITE_URL = 'https://seogenerator.pro'
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || '/api'

// SEO Constants
export const DEFAULT_META = {
  title: 'SEO Generator Pro - Free SEO File Generator Tools',
  description: 'Generate optimized robots.txt, sitemap.xml, and llms.txt files for free. Boost your website\'s SEO with our professional generator tools.',
  keywords: ['SEO tools', 'robots.txt generator', 'sitemap generator', 'llms.txt generator'],
}

// Generator Limits
export const FREE_TIER_LIMITS = {
  maxSitemapPages: 100,
  maxLlmsPages: 50,
  maxRequestsPerDay: 50,
}

export const PRO_TIER_LIMITS = {
  maxSitemapPages: 10000,
  maxLlmsPages: 1000,
  maxRequestsPerDay: 1000,
}

// Robots.txt Templates
export const ROBOTS_TEMPLATES = {
  basic: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: {url}/sitemap.xml`,

  withAIControl: `# General rules
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

# Block AI crawlers
User-agent: GPTBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

# Allow search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: {url}/sitemap.xml`,

  strict: `User-agent: *
Disallow: /

# Only allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: {url}/sitemap.xml`
}

// Sitemap Frequencies
export const CHANGE_FREQUENCIES = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never'
] as const

// Priority Levels
export const PRIORITY_LEVELS = [
  { value: 1.0, label: 'Very High' },
  { value: 0.9, label: 'High' },
  { value: 0.8, label: 'Medium-High' },
  { value: 0.7, label: 'Medium' },
  { value: 0.6, label: 'Medium-Low' },
  { value: 0.5, label: 'Low' },
  { value: 0.4, label: 'Very Low' },
  { value: 0.3, label: 'Minimal' },
  { value: 0.2, label: 'Very Minimal' },
  { value: 0.1, label: 'None' },
  { value: 0.0, label: 'Exclude' }
]

// User Agents
export const USER_AGENTS = [
  { value: '*', label: 'All Bots' },
  { value: 'Googlebot', label: 'Googlebot' },
  { value: 'Bingbot', label: 'Bingbot' },
  { value: 'Slurp', label: 'Yahoo Slurp' },
  { value: 'DuckDuckBot', label: 'DuckDuckGo' },
  { value: 'Baiduspider', label: 'Baidu' },
  { value: 'YandexBot', label: 'Yandex' },
  { value: 'GPTBot', label: 'GPTBot (OpenAI)' },
  { value: 'Claude-Web', label: 'Claude (Anthropic)' },
  { value: 'Google-Extended', label: 'Google-Extended (AI)' },
]

// Error Messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidUrl: 'Please enter a valid URL',
  invalidEmail: 'Please enter a valid email address',
  networkError: 'Network error. Please check your connection.',
  serverError: 'Server error. Please try again later.',
  notFound: 'Resource not found',
  unauthorized: 'You are not authorized to perform this action',
  forbidden: 'Access denied',
  rateLimit: 'Too many requests. Please try again later.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  generated: 'File generated successfully!',
  downloaded: 'File downloaded successfully!',
  copied: 'Copied to clipboard!',
  saved: 'Changes saved successfully!',
  sent: 'Message sent successfully!',
}

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/robots-generator', label: 'Robots.txt' },
  { href: '/sitemap-generator', label: 'Sitemap.xml' },
  { href: '/llms-generator', label: 'LLMS.txt' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/documentation', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
]

// Footer Links
export const FOOTER_LINKS = {
  generators: [
    { href: '/robots-generator', label: 'Robots.txt Generator' },
    { href: '/sitemap-generator', label: 'Sitemap.xml Generator' },
    { href: '/llms-generator', label: 'LLMS.txt Generator' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
  ],
  resources: [
    { href: '/documentation', label: 'Documentation' },
    { href: '/faq', label: 'FAQ' },
    { href: '/api-docs', label: 'API' },
    { href: '/status', label: 'Status' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ],
}

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/seogeneratorpro',
  github: 'https://github.com/seogeneratorpro',
  linkedin: 'https://linkedin.com/company/seogeneratorpro',
  facebook: 'https://facebook.com/seogeneratorpro',
}