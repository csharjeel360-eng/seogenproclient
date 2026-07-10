import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import { ClientRoutePrefetch } from '@/components/ClientRoutePrefetch'

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
  metadataBase: new URL('https://seogenpro.online'),
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
    url: 'https://seogenpro.online',
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
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MD7KNRNS');`
        }} />
        {/* End Google Tag Manager */}

        <meta name="google-site-verification" content="lzAJ81Xob8zLqzbn-Kn5yWpG2M9zyD1yR8LJOpWDZkE" />
        <meta name="msvalidate.01" content="67245BF246BB1B327993A151BCE35CAB" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "SeogenPro",
                  "url": "https://seogenpro.online",
                  "logo": "https://seogenpro.online/logo.png",
                  "sameAs": [
                    "https://www.facebook.com/seogenpro",
                    "https://twitter.com/seogenpro",
                    "https://www.linkedin.com/company/seogenpro"
                  ]
                },
                {
                  "@type": "WebSite",
                  "url": "https://seogenpro.online",
                  "name": "SeogenPro",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://seogenpro.online/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebPage",
                  "url": "https://seogenpro.online",
                  "name": "SeogenPro",
                  "description": "SeogenPro — AI-powered SEO tools for robots.txt, sitemap generation, crawl auditing, and LLMS.txt creation.",
                  "isPartOf": {
                    "@type": "WebSite",
                    "name": "SeogenPro",
                    "url": "https://seogenpro.online"
                  },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://seogenpro.online"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Robots.txt Generator",
                        "item": "https://seogenpro.online/robots-generator"
                      },
                      {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Sitemap Generator",
                        "item": "https://seogenpro.online/sitemap-generator"
                      },
                      {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Crawl Audit",
                        "item": "https://seogenpro.online/crawl-audit"
                      }
                    ]
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Robots.txt Generator",
                  "url": "https://seogenpro.online/robots-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Generate optimized robots.txt files for search engines and AI crawlers."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Sitemap Generator",
                  "url": "https://seogenpro.online/sitemap-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Build modern sitemap XML files and manage site URL discovery for SEO."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "LLMS.txt Generator",
                  "url": "https://seogenpro.online/llms-generator",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Create llms.txt documentation for AI crawlers and data access policies."
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Crawl Audit",
                  "url": "https://seogenpro.online/crawl-audit",
                  "applicationCategory": "WebApplication",
                  "operatingSystem": "Web",
                  "description": "Audit website crawlability, broken links, robots rules, and indexability issues."
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MD7KNRNS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
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