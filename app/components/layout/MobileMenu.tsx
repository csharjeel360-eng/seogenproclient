import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface DropdownItem {
  name: string
  href: string
  description: string
}

interface NavigationItem {
  name: string
  href: string
  dropdown?: DropdownItem[]
}

interface MobileMenuProps {
  isOpen: boolean
  navigation: NavigationItem[]
  mobileDropdown: string | null
  onToggleDropdown: (name: string) => void
  onClose: () => void
  pathname: string
}

export default function MobileMenu({
  isOpen,
  navigation,
  mobileDropdown,
  onToggleDropdown,
  onClose,
  pathname
}: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="lg:hidden overflow-hidden"
    >
      <div className="py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          {navigation.map((item) => (
            <div key={item.name} className="px-2">
              {item.dropdown ? (
                <div className="rounded-lg overflow-hidden">
                  <button
                    onClick={() => onToggleDropdown(item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                  >
                    <span>{item.name}</span>
                    <motion.div
                      animate={{ rotate: mobileDropdown === item.name ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="px-4 py-2 border-l-2 border-blue-500 ml-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Choose a generator tool:</p>
                          {item.dropdown.map((dropItem, index) => (
                            <Link
                              key={dropItem.name}
                              href={dropItem.href}
                              className="flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all hover:translate-x-1"
                              onClick={() => {
                                onClose()
                                onToggleDropdown('')
                              }}
                              onMouseEnter={() => {
                                // Prefetch route on hover
                                const link = document.createElement('link')
                                link.rel = 'prefetch'
                                link.href = dropItem.href
                                document.head.appendChild(link)
                              }}
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{index + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{dropItem.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{dropItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1'
                  }`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 px-2">
          <Link
            href="/contact"
            className="btn-primary w-full text-center block py-3 font-medium transition-all duration-200 hover:scale-105"
            onClick={onClose}
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  )
}