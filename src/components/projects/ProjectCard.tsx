import React from 'react'
import { Link } from 'react-router-dom'
import { Star, GitFork, ArrowRight, Play } from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { GitHubRepo } from '@/types/github'
import { getProjectPosterUrl } from '@/services/projectImages'
import { useLanguage } from '@/hooks/useLanguage'

interface ProjectCardProps {
  repo: GitHubRepo
}

// Mapa de cores para linguagens populares
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-amber-400',
  Python: 'bg-emerald-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-sky-500',
  'Jupyter Notebook': 'bg-pink-500',
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const { t, language } = useLanguage()
  const formattedDate = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(repo.updated_at))

  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || 'bg-zinc-400' : 'bg-zinc-400'
  const posterUrl = getProjectPosterUrl(repo.name, repo.language, 'card')

  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-[#181818] flex flex-col justify-between hover:border-[#E50914]/60 hover:shadow-xl transition-all duration-300 group">
      {/* ── 1. NETFLIX 16:9 TITLE IMAGE HEADER ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-black select-none">
        <img
          src={posterUrl}
          alt={repo.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Selo N Original no canto superior */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs">
          <span className="w-4 h-4 rounded-xs bg-[#E50914] text-white flex items-center justify-center font-black text-[10px]">
            N
          </span>
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
            {repo.language || 'ORIGINAL'}
          </span>
        </div>

        {/* Hover Quick Action Play Icon */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-[1px]">
          <Link
            to={`/projetos/${repo.name}`}
            className="w-11 h-11 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
            title={t.hero.exploreButton}
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </Link>
        </div>

        {/* Match / Relevância no canto inferior */}
        <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono">
          <span className="font-bold text-[#46D369] drop-shadow-md">
            98% {t.hero.match}
          </span>
          <div className="flex items-center gap-2 text-zinc-300 drop-shadow-md">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{repo.stargazers_count}</span>
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3 text-blue-400" />
                <span>{repo.forks_count}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. CARD BODY & DESCRIPTION ── */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Language & Updated */}
          <div className="flex items-center justify-between text-xs">
            {repo.language ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 text-[11px]">
                <span className={`w-2 h-2 rounded-full ${langColor}`} />
                <span>{repo.language}</span>
              </span>
            ) : (
              <span className="text-zinc-400 text-[11px]">Geral</span>
            )}

            <span className="text-[11px] text-zinc-400">Atz. {formattedDate}</span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
              {repo.name}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-[#b3b3b3] mt-1 line-clamp-2 leading-relaxed">
              {repo.description || 'Repositório de engenharia de software da FIAP.'}
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold">
          <Link
            to={`/projetos/${repo.name}`}
            className="text-[#E50914] hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>{t.hero.exploreButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver código do repositório ${repo.name} no GitHub`}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
