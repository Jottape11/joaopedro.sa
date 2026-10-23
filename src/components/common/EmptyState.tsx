import React from 'react'
import { FolderSearch } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhum resultado encontrado',
  description = 'Não encontramos nenhum item correspondente aos critérios selecionados.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-center max-w-md mx-auto space-y-4 my-8">
      <div className="inline-flex p-3 rounded-2xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <FolderSearch className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

