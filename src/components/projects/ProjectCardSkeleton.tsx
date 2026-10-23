import React from 'react'

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 flex flex-col justify-between space-y-4 animate-pulse shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  )
}

