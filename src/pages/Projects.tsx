import React, { useState, useMemo } from 'react'
import {
  Search,
  X,
  LayoutGrid,
  Rows3,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { useLanguage } from '@/hooks/useLanguage'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { LolomoRail } from '@/components/home/LolomoRail'
import { ProjectQuickViewModal } from '@/components/projects/ProjectQuickViewModal'
import { ProjectCardSkeleton } from '@/components/projects/ProjectCardSkeleton'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import type { GitHubRepo } from '@/types/github'

type ViewMode = 'grid' | 'rails'

const GENRES = [
  { id: 'all', labelPt: 'Todos os Gêneros', labelEn: 'All Genres' },
  { id: 'python', labelPt: 'Back-End & Python', labelEn: 'Back-End & Python' },
  { id: 'frontend', labelPt: 'Front-End, React & UI', labelEn: 'Front-End, React & UI' },
  { id: 'data', labelPt: 'Data & Analytics', labelEn: 'Data & Analytics' },
  { id: 'css', labelPt: 'Arquitetura CSS Grid', labelEn: 'CSS Grid Architecture' },
  { id: 'ai', labelPt: 'IA & Automação', labelEn: 'AI & Automation' },
]

export const Projects: React.FC = () => {
  const { t, language } = useLanguage()
  const { data: repos, isLoading, isError, error, refetch } = useGitHubRepos()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false)

  // Estado para o modal rápido
  const [modalRepo, setModalRepo] = useState<GitHubRepo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDetails = (repo: GitHubRepo) => {
    setModalRepo(repo)
    setIsModalOpen(true)
  }

  // Filtragem dos repositórios por texto de busca e gênero técnico
  const filteredRepos = useMemo(() => {
    if (!repos) return []

    return repos.filter(repo => {
      // 1. Filtro de busca textual
      const matchesSearch =
        !searchTerm.trim() ||
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.topics && repo.topics.some(tp => tp.toLowerCase().includes(searchTerm.toLowerCase())))

      if (!matchesSearch) return false

      // 2. Filtro de Gênero
      if (selectedGenre === 'all') return true

      const name = repo.name.toLowerCase()
      const lang = (repo.language || '').toLowerCase()
      const desc = (repo.description || '').toLowerCase()
      const topics = (repo.topics || []).map(t => t.toLowerCase())

      if (selectedGenre === 'python') {
        return (
          lang === 'python' ||
          name.includes('fastapi') ||
          name.includes('dps') ||
          desc.includes('python') ||
          topics.includes('python')
        )
      }

      if (selectedGenre === 'frontend') {
        return (
          lang === 'typescript' ||
          lang === 'javascript' ||
          lang === 'react' ||
          lang === 'css' ||
          lang === 'html' ||
          name.includes('eco') ||
          name.includes('cinelog')
        )
      }

      if (selectedGenre === 'data') {
        return (
          name.includes('analytics') ||
          name.includes('steam') ||
          desc.includes('dados') ||
          desc.includes('telemetria') ||
          topics.includes('analytics')
        )
      }

      if (selectedGenre === 'css') {
        return (
          name.includes('grid') ||
          name.includes('responsividade') ||
          name.includes('cp4') ||
          lang === 'css'
        )
      }

      if (selectedGenre === 'ai') {
        return (
          name.includes('totem') ||
          name.includes('ai') ||
          desc.includes('ia') ||
          desc.includes('generativa')
        )
      }

      return true
    })
  }, [repos, searchTerm, selectedGenre])

  // Repositórios agrupados para o modo Trilhos (Rails)
  const pythonRailRepos = useMemo(() => {
    return filteredRepos.filter(
      r => r.language?.toLowerCase() === 'python' || r.name.toLowerCase().includes('fastapi'),
    )
  }, [filteredRepos])

  const frontendRailRepos = useMemo(() => {
    return filteredRepos.filter(
      r =>
        r.language?.toLowerCase() === 'typescript' ||
        r.language?.toLowerCase() === 'javascript' ||
        r.language?.toLowerCase() === 'react' ||
        r.name.toLowerCase().includes('eco') ||
        r.name.toLowerCase().includes('grid'),
    )
  }, [filteredRepos])

  const dataRailRepos = useMemo(() => {
    return filteredRepos.filter(
      r =>
        r.name.toLowerCase().includes('analytics') ||
        r.name.toLowerCase().includes('steam') ||
        (r.description && r.description.toLowerCase().includes('data')),
    )
  }, [filteredRepos])

  const currentGenreObj = GENRES.find(g => g.id === selectedGenre) || GENRES[0]
  const currentGenreLabel = language === 'pt' ? currentGenreObj.labelPt : currentGenreObj.labelEn

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* ── 1. SUB-HEADER NETFLIX COM GÊNEROS, BUSCA E MODO DE EXIBIÇÃO ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        {/* Lado Esquerdo: Título da Seção + Dropdown de Gêneros estilo Netflix */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
            {language === 'pt' ? 'Séries & Projetos' : 'Series & Projects'}
          </h1>

          {/* Netflix Style Genre Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setGenreDropdownOpen(prev => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-zinc-300 dark:border-white/20 bg-white/90 dark:bg-black/80 hover:border-zinc-500 dark:hover:border-white/50 text-xs font-bold text-zinc-900 dark:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Filtrar por gênero"
            >
              <span>{currentGenreLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${genreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {genreDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-52 rounded-md bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/15 shadow-2xl py-1.5 z-40 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  {language === 'pt' ? 'Selecione o Gênero' : 'Select Genre'}
                </div>
                {GENRES.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setSelectedGenre(g.id)
                      setGenreDropdownOpen(false)
                    }}
                    className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ${
                      selectedGenre === g.id
                        ? 'font-bold text-[#E50914] bg-zinc-50 dark:bg-white/5'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span>{language === 'pt' ? g.labelPt : g.labelEn}</span>
                    {selectedGenre === g.id && <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Barra de Busca Instantânea + Alternador Grade vs Trilhos */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Instant Search Bar */}
          <div className="relative flex-1 md:w-64 lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-md border border-zinc-300 dark:border-white/15 bg-white dark:bg-black/60 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#E50914] transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid (Grade) vs Rails (Trilhos) */}
          <div className="flex items-center rounded-md border border-zinc-300 dark:border-white/15 bg-white dark:bg-black/60 p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title={language === 'pt' ? 'Modo Grade' : 'Grid Mode'}
              aria-label="Modo Grade"
              className={`p-1.5 rounded transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('rails')}
              title={language === 'pt' ? 'Modo Trilhos (Lolomo)' : 'Rails Mode (Lolomo)'}
              aria-label="Modo Trilhos"
              className={`p-1.5 rounded transition-all cursor-pointer ${
                viewMode === 'rails'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Rows3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. ESTADOS DE CARREGAMENTO & ERRO ── */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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

      {/* ── 3. ESTADO VAZIO (SEM CORRESPONDÊNCIA) ── */}
      {!isLoading && !isError && filteredRepos.length === 0 && (
        <EmptyState
          title={language === 'pt' ? 'Nenhum título encontrado' : 'No titles found'}
          description={
            language === 'pt'
              ? 'Nenhum projeto corresponde à sua busca ou ao gênero selecionado. Tente redefinir os filtros.'
              : 'No project matches your search query or selected genre. Try resetting filters.'
          }
          actionLabel={language === 'pt' ? 'Limpar Filtros & Busca' : 'Clear Filters & Search'}
          onAction={() => {
            setSearchTerm('')
            setSelectedGenre('all')
          }}
        />
      )}

      {/* ── 4. CONTEÚDO PRINCIPAL (MODO GRADE OU MODO TRILHOS) ── */}
      {!isLoading && !isError && filteredRepos.length > 0 && (
        <>
          {/* Header de Contador de Resultados */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 border-b border-zinc-200 dark:border-white/10 pb-2">
            <span className="font-medium">
              {language === 'pt'
                ? `Exibindo ${filteredRepos.length} título${filteredRepos.length > 1 ? 's' : ''} em destaque`
                : `Showing ${filteredRepos.length} featured title${filteredRepos.length > 1 ? 's' : ''}`}
            </span>
            <span className="font-mono text-[11px]">
              Total GitHub: {repos?.length || 0}
            </span>
          </div>

          {/* MODO 1: GRADE CINEMATOGRÁFICA (GRID 16:9) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {filteredRepos.map(repo => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}

          {/* MODO 2: TRILHOS TEMÁTICOS (LOLOMO RAILS) */}
          {viewMode === 'rails' && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 -mx-4 sm:-mx-6 lg:-mx-10">
              {/* Trilho 1: Todos os Filtrados */}
              <LolomoRail
                title={
                  selectedGenre === 'all'
                    ? language === 'pt' ? 'Catálogo Geral de Séries' : 'General Series Catalog'
                    : currentGenreLabel
                }
                subtitle={`${filteredRepos.length} ${language === 'pt' ? 'títulos' : 'titles'}`}
                repos={filteredRepos}
                onOpenDetails={handleOpenDetails}
              />

              {/* Trilhos específicos se gênero for 'all' */}
              {selectedGenre === 'all' && (
                <>
                  {pythonRailRepos.length > 0 && (
                    <LolomoRail
                      title={t.rails.backendTitle}
                      subtitle={t.rails.backendSubtitle}
                      repos={pythonRailRepos}
                      onOpenDetails={handleOpenDetails}
                    />
                  )}

                  {frontendRailRepos.length > 0 && (
                    <LolomoRail
                      title={t.rails.frontendTitle}
                      subtitle={t.rails.frontendSubtitle}
                      repos={frontendRailRepos}
                      onOpenDetails={handleOpenDetails}
                    />
                  )}

                  {dataRailRepos.length > 0 && (
                    <LolomoRail
                      title="Séries de Data Science & Analytics"
                      subtitle="ETL, pipelines e dashboards em tempo real"
                      repos={dataRailRepos}
                      onOpenDetails={handleOpenDetails}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* ── 5. MODAL DE DETALHES RÁPIDOS ── */}
      <ProjectQuickViewModal
        repo={modalRepo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
