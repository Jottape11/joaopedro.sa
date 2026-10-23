import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense
    fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    }
  >
    {children}
  </Suspense>
)
