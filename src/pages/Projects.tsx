import React, { useState, useMemo } from 'react'
import { FolderGit2, Search, X } from 'lucide-react'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectCardSkeleton } from '@/components/projects/ProjectCardSkeleton'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'

export const Projects: React.FC = () => {
  const { data: repos, isLoading, isError, error, refetch } = useGitHubRepos()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  // Obter lista única de linguagens dos repositórios
  const availableLanguages = useMemo(() => {
    if (!repos) return []
    const langs = new Set<string>()
    repos.forEach(r => {
      if (r.language) langs.add(r.language)
    })
    return Array.from(langs).sort()
  }, [repos])

  // Filtragem dos repositórios por texto e linguagem
  const filteredRepos = useMemo(() => {
    if (!repos) return []
    return repos.filter(repo => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLanguage =
        selectedLanguage === 'all' || repo.language === selectedLanguage

      return matchesSearch && matchesLanguage
    })
  }, [repos, searchTerm, selectedLanguage])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <FolderGit2 className="w-4 h-4" />
          <span>Portfólio de Repositórios</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Meus Projetos no GitHub
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Repositórios sincronizados automaticamente pela API pública do GitHub, com cache gerenciado pelo TanStack Query e suporte a rotas individuais.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="all">Todas as linguagens</option>
            {availableLanguages.map(lang => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Rendering: Loading, Error or Projects Grid */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <ErrorMessage
          message={error instanceof Error ? error.message : 'Não foi possível carregar os repositórios.'}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && filteredRepos.length === 0 && (
        <EmptyState
          title="Nenhum projeto encontrado"
          description="Tente ajustar a busca ou o filtro de linguagem para encontrar outros repositórios."
          actionLabel="Limpar filtros"
          onAction={() => {
            setSearchTerm('')
            setSelectedLanguage('all')
          }}
        />
      )}

      {!isLoading && !isError && filteredRepos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>Exibindo {filteredRepos.length} projeto{filteredRepos.length > 1 ? 's' : ''}</span>
            <span>Total da conta: {repos?.length || 0}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
