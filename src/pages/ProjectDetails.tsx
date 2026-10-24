import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  BookOpen,
  GitBranch,
} from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'
import { useGitHubRepoDetails, useGitHubRepoReadme } from '@/hooks/useGitHub'
import { useLanguage } from '@/hooks/useLanguage'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { getProjectPosterUrl } from '@/services/projectImages'
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer'

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { language } = useLanguage()
  const { data: repo, isLoading, isError, error, refetch } = useGitHubRepoDetails(id)
  const { data: readme, isLoading: isReadmeLoading } = useGitHubRepoReadme(id, repo?.default_branch)

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse py-6">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-64 sm:h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        <div className="p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#181818] space-y-6">
          <div className="h-8 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-16 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
        </div>
      </div>
    )
  }

  if (isError || !repo) {
    return (
      <div className="max-w-xl mx-auto py-16 space-y-6 text-center">
        <ErrorMessage
          title="Erro ao carregar repositório"
          message={error instanceof Error ? error.message : `O projeto "${id}" não pôde ser carregado.`}
          onRetry={() => refetch()}
        />
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#E50914] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao catálogo de projetos</span>
        </Link>
      </div>
    )
  }

  const formattedUpdate = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    dateStyle: 'medium',
  }).format(new Date(repo.updated_at))

  const formattedCreated = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    dateStyle: 'medium',
  }).format(new Date(repo.created_at))

  const posterUrl = getProjectPosterUrl(repo.name, repo.language, 'banner')

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 py-4 sm:py-6">
      {/* Back button */}
      <div>
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'pt' ? '← Voltar para o Catálogo' : '← Back to Catalog'}</span>
        </Link>
      </div>

      {/* Cinematic Hero Header com Fotografia Real */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-200 dark:border-white/10 flex flex-col justify-end p-6 sm:p-10 select-none">
        <img
          src={posterUrl}
          alt={repo.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl text-white">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-xs bg-[#E50914] text-white flex items-center justify-center text-xs font-black shadow-md">
              N
            </span>
            <span className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">
              PROJETO ORIGINAL · SÉRIE TÉCNICA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            {repo.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Deploy Demo</span>
              </a>
            )}

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-900/30"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Ver no GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Details Card com suporte total a Light e Dark Mode */}
      <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#181818] shadow-md space-y-8 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              {repo.language && (
                <span className="text-xs font-mono font-bold text-[#E50914] bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded border border-red-200 dark:border-red-900/40">
                  {repo.language}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 px-2.5 py-0.5 rounded flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                <span>{repo.default_branch}</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed pt-2">
              {repo.description || 'Repositório público de engenharia de software na FIAP.'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-200 dark:border-white/10 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Estrelas</span>
            <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{repo.stargazers_count}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Forks</span>
            <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span>{repo.forks_count}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Criado em</span>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>{formattedCreated}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Última atualização</span>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{formattedUpdate}</span>
            </div>
          </div>
        </div>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px]">
              Gêneros / Tags Técnicas
            </span>
            <div className="flex flex-wrap gap-2">
              {repo.topics.map(topic => (
                <span
                  key={topic}
                  className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 text-xs font-mono border border-zinc-200 dark:border-transparent"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* README Section Formatado com Alta Qualidade */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-[#E50914]" />
            <h2>Documentação Oficial do Projeto (README.md)</h2>
          </div>

          {isReadmeLoading ? (
            <div className="p-8 rounded-xl bg-zinc-50 dark:bg-black/50 text-xs text-zinc-500 font-mono animate-pulse text-center">
              Carregando e renderizando documentação técnica...
            </div>
          ) : readme ? (
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 shadow-inner">
              <MarkdownRenderer content={readme} maxHeightClass="max-h-[600px]" />
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
