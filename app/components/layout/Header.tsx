'use client'

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRoutePrefetch } from '@/lib/route-prefetch'

// Lazy load heavy components
const MobileMenu = lazy(() => import('./MobileMenu'))
// Import DropdownMenu directly since it's critical for navigation
import DropdownMenu from './DropdownMenu'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Generators',
    href: '#',
    dropdown: [
      { name: 'Robots.txt Generator', href: '/robots-generator', description: 'Create optimized robots.txt files' },
      { name: 'Sitemap.xml Generator', href: '/sitemap-generator', description: 'Generate comprehensive sitemaps' },
      { name: 'LLMS.txt Generator', href: '/llms-generator', description: 'AI-friendly content indexing' },
      { name: 'AI Crawlability Audit', href: '/crawl-audit', description: 'Analyze AI crawler access' }
    ]
  },
  { name: 'Documentation', href: '/documentation' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const prefetchRoute = useRoutePrefetch()

  // Initialize dark mode state properly
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    // Preload critical routes
    const criticalRoutes = ['/robots-generator', '/sitemap-generator', '/llms-generator', '/crawl-audit']
    criticalRoutes.forEach(route => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = route
      document.head.appendChild(link)
    })
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
    setMobileDropdown(null)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is on the button or within the dropdown
      const target = event.target as HTMLElement
      const isDropdownButton = target.closest('[data-dropdown-button]')
      const isDropdownMenu = target.closest('[data-dropdown-menu]')
      
      if (!isDropdownButton && !isDropdownMenu) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown(mobileDropdown === name ? null : name)
  }

  const generatorsDropdown = navigation.find(item => item.name === 'Generators')?.dropdown || []

  return (
    <header suppressHydrationWarning={true} className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-[0_6px_24px_rgba(15,23,42,0.05)] dark:border-slate-800/80 dark:bg-slate-950/85">
      <nav suppressHydrationWarning={true} className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link href="/" suppressHydrationWarning={true} className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/logo.svg"
              alt="SeogenPro Logo"
              className="h-8 w-8 object-contain"
              loading="eager"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span suppressHydrationWarning={true} className="text-[0.98rem] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 sm:text-base">
              SeogenPro
            </span>
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:block">
              AI SEO PLATFORM
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <button
                  data-dropdown-button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                >
                  <span>{item.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  suppressHydrationWarning={true}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400'
                  }`}
                  onMouseEnter={() => prefetchRoute(item.href)}
                >
                  {item.name}
                </Link>
              )}

              {item.dropdown && (
                <DropdownMenu
                  items={generatorsDropdown}
                  isOpen={activeDropdown === item.name}
                  onClose={() => setActiveDropdown(null)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleDarkMode}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link
            href="/sitemap-generator"
            suppressHydrationWarning={true}
            className="hidden rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </button>
        </div>
      </nav>

      <Suspense fallback={<div className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800"></div>}>
        <MobileMenu
          isOpen={isOpen}
          navigation={navigation}
          mobileDropdown={mobileDropdown}
          onToggleDropdown={toggleMobileDropdown}
          onClose={() => setIsOpen(false)}
          pathname={pathname}
        />
      </Suspense>
    </header>
  )
}