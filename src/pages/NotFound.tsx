import React from 'react'
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export const NotFound: React.FC = () => {
  const error = useRouteError()

  let errorMessage = 'A página que você está procurando não existe ou foi movida.'
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = 'Esta rota não foi encontrada na aplicação (Erro 404).'
    } else {
      errorMessage = error.statusText || 'Ocorreu um erro ao carregar os dados.'
    }
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="p-4 rounded-3xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Ops! Não encontramos nada aqui
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {errorMessage}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </Link>

        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explorar Projetos</span>
        </Link>
      </div>
    </div>
  )
}

