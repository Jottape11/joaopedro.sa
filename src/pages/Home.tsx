import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, FolderGit2, Mail } from 'lucide-react'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectCardSkeleton } from '@/components/projects/ProjectCardSkeleton'

export const Home: React.FC = () => {
  const { data: repos, isLoading: isReposLoading } = useGitHubRepos()
  const { featuredProjects, isLoading: isFeaturedLoading } = useFeaturedProjects()

  const isLoading = isReposLoading || isFeaturedLoading

  // Filtra dinamicamente os projetos escolhidos no Dashboard como destaques
  const displayedProjects = useMemo(() => {
    if (!repos) return []
    const selected = repos.filter(repo => featuredProjects.includes(repo.name))
    // Fallback: se ainda não houver nenhum selecionado, exibe os 3 mais recentes
    if (selected.length === 0) {
      return repos.slice(0, 3)
    }
    return selected
  }, [repos, featuredProjects])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-6 py-8 md:py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portfólio & Engenharia Front-end</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
          Construindo experiências digitais modernas, eficientes e escaláveis.
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Olá! Sou o <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">João Pedro</strong>, estudante de Engenharia de Software na FIAP. 
          Especializado no ecossistema React, TypeScript, APIs REST e arquiteturas orientadas a performance e IA.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Ver Meus Projetos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 font-medium hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Entrar em Contato</span>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Projetos em Destaque
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Projetos selecionados pelo proprietário no Dashboard administrativo.
            </p>
          </div>
          <Link
            to="/projetos"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading state or cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
