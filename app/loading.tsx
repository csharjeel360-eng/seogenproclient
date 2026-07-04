export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Loading...
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Preparing your content
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}