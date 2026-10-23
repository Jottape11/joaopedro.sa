import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Star,
  GitFork,
  Tag,
  ExternalLink,
  BookOpen,
  GitBranch,
} from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'
import { useGitHubRepoDetails, useGitHubRepoReadme } from '@/hooks/useGitHub'
import { ErrorMessage } from '@/components/common/ErrorMessage'

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: repo, isLoading, isError, error, refetch } = useGitHubRepoDetails(id)
  const { data: readme, isLoading: isReadmeLoading } = useGitHubRepoReadme(id, repo?.default_branch)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6">
          <div className="h-8 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-16 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !repo) {
    return (
      <div className="max-w-xl mx-auto py-12 space-y-6 text-center">
        <ErrorMessage
          title="Erro ao carregar repositório"
          message={error instanceof Error ? error.message : `O projeto "${id}" não pôde ser carregado.`}
          onRetry={() => refetch()}
        />
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à lista de projetos</span>
        </Link>
      </div>
    )
  }

  const formattedUpdate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(repo.updated_at))

  const formattedCreated = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(repo.created_at))

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

      {/* Main Project Card */}
      <div className="p-8 rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {repo.language && (
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                  {repo.language}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                <span>{repo.default_branch}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {repo.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Deploy Demo</span>
              </a>
            )}

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Ver no GitHub</span>
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {repo.description || 'Repositório público sem descrição cadastrada.'}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400">Estrelas</span>
            <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{repo.stargazers_count}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-400">Forks</span>
            <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span>{repo.forks_count}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-400">Criado em</span>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>{formattedCreated}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-400">Última atualização</span>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{formattedUpdate}</span>
            </div>
          </div>
        </div>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tópicos</span>
            <div className="flex flex-wrap gap-2">
              {repo.topics.map(topic => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  <Tag className="w-3 h-3 text-zinc-400" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* README Section */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2>Documentação do Repositório (README)</h2>
          </div>

          {isReadmeLoading ? (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500 animate-pulse">
              Carregando documentação oficial do repositório...
            </div>
          ) : readme ? (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
              {readme}
            </div>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
              Este repositório ainda não possui um arquivo README.md publicado.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
