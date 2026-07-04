'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RoutePrefetchProps {
  routes: string[]
}

export function RoutePrefetch({ routes }: RoutePrefetchProps) {
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical routes on mount
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [router, routes])

  return null
}

// Hook for prefetching routes on hover
export function useRoutePrefetch() {
  const router = useRouter()

  const prefetchRoute = (route: string) => {
    router.prefetch(route)
  }

  return prefetchRoute
}