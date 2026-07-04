import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface DropdownItem {
  name: string
  href: string
  description: string
}

interface DropdownMenuProps {
  items: DropdownItem[]
  isOpen: boolean
  onClose: () => void
}

export default function DropdownMenu({ items, isOpen, onClose }: DropdownMenuProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.14 }}
      data-dropdown-menu
      className="absolute left-0 top-full z-[100] mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="px-2 py-1">
        {items.map((dropItem) => (
          <Link
            key={dropItem.name}
            href={dropItem.href}
            suppressHydrationWarning={true}
            className="flex items-start gap-2 rounded-lg px-2 py-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
            onClick={() => onClose()}
            onMouseEnter={() => {
              const link = document.createElement('link')
              link.rel = 'prefetch'
              link.href = dropItem.href
              document.head.appendChild(link)
            }}
          >
            <div className="mt-0.5 text-sm font-semibold text-cyan-600">•</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{dropItem.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{dropItem.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}