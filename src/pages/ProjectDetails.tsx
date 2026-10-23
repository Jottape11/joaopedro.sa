import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Star, GitFork, Tag } from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todos os projetos</span>
        </Link>
      </div>

      {/* Project Card Header */}
      <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
              Repositório GitHub
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight pt-2">
              {id || 'Projeto'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/Jottape11/${id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Ver no GitHub</span>
            </a>
          </div>
        </div>

        {/* Info stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800 text-sm">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Star className="w-4 h-4 text-amber-500" />
            <span>0 estrelas</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <GitFork className="w-4 h-4 text-blue-500" />
            <span>0 forks</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Tag className="w-4 h-4 text-emerald-500" />
            <span>Linguagem principal</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>Atualizado recente</span>
          </div>
        </div>

        {/* Description body */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sobre este projeto</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Esta é a rota dinâmica individual <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">/projetos/{id}</code>, atendendo ao Requisito 1 do edital.
            Na Fase 3, ela consumirá os detalhes e o README oficial do repositório através do TanStack Query com cache otimizado.
          </p>
        </div>
      </div>
    </div>
  )
}
