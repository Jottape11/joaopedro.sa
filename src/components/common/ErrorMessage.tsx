import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Falha ao carregar dados',
  message,
  onRetry,
}) => {
  return (
    <div className="p-6 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-center max-w-lg mx-auto space-y-4 my-8">
      <div className="inline-flex p-3 rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tentar Novamente</span>
        </button>
      )}
    </div>
  )
}

