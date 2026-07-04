import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import { ClientRoutePrefetch } from '@/components/ClientRoutePrefetch'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Free Robots.txt, Sitemap.xml & LLMS.txt Generators — AI Crawlability Audit',
    template: '%s | SeoGenPro'
  },
  description: 'Generate robots.txt, create SEO-friendly sitemap.xml, and audit AI crawlability. Free tools to improve Google indexing and AI visibility.',
  keywords: ['SEO tools', 'robots.txt generator', 'sitemap generator', 'crawl audit', 'LLMS.txt', 'SeogenPro'],
  authors: [{ name: 'Sharjeel Tariq' }],
  creator: 'SeogenPro',
  publisher: 'SeogenPro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://seogenpro.com'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Robots.txt, Sitemap.xml & LLMS.txt Generators — AI Crawlability Audit',
    description: 'Generate robots.txt, create SEO-friendly sitemap.xml, and audit AI crawlability. Free tools to improve Google indexing and AI visibility.',
    url: 'https://seogenpro.com',
    siteName: 'SeogenPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SeoGenPro',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Robots.txt, Sitemap.xml & LLMS.txt Generators — AI Crawlability Audit',
    description: 'Generate robots.txt, create SEO-friendly sitemap.xml, and audit AI crawlability. Free tools to improve Google indexing and AI visibility.',
    images: ['/twitter-image.jpg'],
    creator: '@seogenpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "SeogenPro",
                  "url": "https://seogenpro.com",
                  "logo": "https://seogenpro.com/logo.png",
                  "sameAs": [
                    "https://www.facebook.com/seogenpro",
                    "https://twitter.com/seogenpro",
                    "https://www.linkedin.com/company/seogenpro"
                  ]
                },
                {
                  "@type": "WebSite",
                  "url": "https://seogenpro.com",
                  "name": "SeogenPro",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://seogenpro.com/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebPage",
                  "url": "https://seogenpro.com",
                  "name": "SeogenPro",
                  "description": "SeogenPro — AI-powered SEO tools for robots.txt, sitemap generation, crawl auditing, and LLMS.txt creation.",
                  "isPartOf": {
                    "@type": "WebSite",
                    "name": "SeogenPro",
                    "url": "https://seogenpro.com"
                  },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://seogenpro.com"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Robots.txt Generator",
                        "item": "https://seogenpro.com/robots-generator"
                      },
                      {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Sitemap Generator",
                        "item": "https://seogenpro.com/sitemap-generator"
                      },
                      {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Crawl Audit",
                        "item": "https://seogenpro.com/crawl-audit"
                      }
                    ]
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Robots.txt Generator",
                  "url": "https://seogenpro.com/robots-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Generate optimized robots.txt files for search engines and AI crawlers."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Sitemap Generator",
                  "url": "https://seogenpro.com/sitemap-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Build modern sitemap XML files and manage site URL discovery for SEO."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "LLMS.txt Generator",
                  "url": "https://seogenpro.com/llms-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Create llms.txt documentation for AI crawlers and data access policies."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Crawl Audit",
                  "url": "https://seogenpro.com/crawl-audit",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Audit website crawlability, broken links, robots rules, and indexability issues."
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ClientRoutePrefetch />
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}