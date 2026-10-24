import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Play, Info, Star, GitFork } from 'lucide-react'
import type { GitHubRepo } from '@/types/github'
import { useLanguage } from '@/hooks/useLanguage'
import { getProjectPosterUrl } from '@/services/projectImages'

interface LolomoRailProps {
  title: string
  subtitle?: string
  repos: GitHubRepo[]
  isTop10?: boolean
  onOpenDetails: (repo: GitHubRepo) => void
}

export const LolomoRail: React.FC<LolomoRailProps> = ({
  title,
  subtitle,
  repos,
  isTop10 = false,
  onOpenDetails,
}) => {
  const { t } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.75
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (!repos || repos.length === 0) return null

  return (
    <section className="relative w-full space-y-2.5 py-3 group/rail">
      {/* Rail Header com suporte total ao tema Claro e Escuro */}
      <div className="flex items-baseline justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex items-baseline gap-2">
          <Link
            to="/projetos"
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-[#E50914] dark:hover:text-[#E50914] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>{title}</span>
            <span className="text-xs text-[#E50914] font-mono tracking-wider opacity-0 group-hover/rail:opacity-100 transition-opacity">
              {t.rails.viewAll} &gt;
            </span>
          </Link>
          {subtitle && (
            <span className="hidden sm:inline text-xs text-zinc-500 dark:text-[#b3b3b3]">
              · {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Rail Scroll Container with Arrows */}
      <div className="relative w-full">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Rolar para esquerda"
          className="absolute left-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-white/80 dark:bg-black/70 hover:bg-white dark:hover:bg-black/95 text-zinc-900 dark:text-white flex items-center justify-center opacity-0 group-hover/rail:opacity-100 transition-all cursor-pointer backdrop-blur-xs border-r border-zinc-200/80 dark:border-white/10 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Rolar para direita"
          className="absolute right-0 top-0 bottom-0 z-30 w-10 sm:w-12 bg-white/80 dark:bg-black/70 hover:bg-white dark:hover:bg-black/95 text-zinc-900 dark:text-white flex items-center justify-center opacity-0 group-hover/rail:opacity-100 transition-all cursor-pointer backdrop-blur-xs border-l border-zinc-200/80 dark:border-white/10 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Horizontal Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 py-4"
        >
          {repos.map((repo, idx) => {
            const rank = idx + 1
            const posterUrl = getProjectPosterUrl(repo.name, repo.language, 'card')

            if (isTop10) {
              return (
                <div
                  key={repo.name}
                  className="flex items-center shrink-0 group/card cursor-pointer"
                  onClick={() => onOpenDetails(repo)}
                >
                  {/* Huge Netflix Stroked Outline Number */}
                  <div className="text-7xl sm:text-8xl md:text-9xl font-black font-mono leading-none select-none tracking-tighter nf-rank-stroke -mr-4 sm:-mr-6 z-10 drop-shadow-2xl">
                    {rank}
                  </div>

                  {/* Vertical Poster Card com Imagem do Título */}
                  <div className="relative w-36 sm:w-44 md:w-48 h-52 sm:h-60 rounded-md overflow-hidden border border-zinc-200 dark:border-white/10 group-hover/card:border-white/50 group-hover/card:scale-105 transition-all duration-300 shadow-2xl flex flex-col justify-between p-3.5 bg-black">
                    {/* Imagem de Fundo do Card */}
                    <img
                      src={posterUrl}
                      alt={repo.name}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay Escuro */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                    {/* Conteúdo do Card Sobreposto */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="w-5 h-5 rounded-xs bg-[#E50914] flex items-center justify-center text-white font-black text-xs shadow-md">
                        N
                      </div>
                      <span className="text-[10px] font-mono text-[#46D369] font-bold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                        ★ {repo.stargazers_count}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-white uppercase leading-tight line-clamp-2 drop-shadow-md">
                        {repo.name}
                      </p>
                      <p className="text-[10px] text-zinc-300 font-mono drop-shadow-sm">
                        {repo.language || 'Software'} · 2026
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 pt-1 border-t border-white/20">
                      <Link
                        to={`/projetos/${repo.name}`}
                        onClick={e => e.stopPropagation()}
                        className="p-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-md"
                        title={t.hero.exploreButton}
                      >
                        <Play className="w-3 h-3 fill-black" />
                      </Link>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          onOpenDetails(repo)
                        }}
                        className="p-1.5 rounded-full border border-white/40 bg-black/40 text-white hover:border-white transition-colors cursor-pointer backdrop-blur-xs"
                        title={t.hero.moreInfoButton}
                      >
                        <Info className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            }

            // Standard Widescreen Card (16:9 Estilo Netflix)
            return (
              <div
                key={repo.name}
                onClick={() => onOpenDetails(repo)}
                className="relative shrink-0 w-60 sm:w-72 md:w-80 h-36 sm:h-44 rounded-md overflow-hidden border border-zinc-200 dark:border-white/10 group-hover/card:border-white/50 group-hover/card:scale-105 transition-all duration-300 shadow-2xl cursor-pointer p-3.5 sm:p-4 flex flex-col justify-between bg-black"
              >
                {/* Imagem de Fundo do Card 16:9 */}
                <img
                  src={posterUrl}
                  alt={repo.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Gradient Overlay Escuro Suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />

                {/* Top Badge: Netflix Original + Match % */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                    <span className="text-[10px] font-mono font-bold text-[#E50914] uppercase">
                      {repo.language ? `N ${repo.language.toUpperCase()}` : 'N ORIGINAL'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#46D369] font-bold px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                    98% Match
                  </span>
                </div>

                {/* Title & Short Description */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1 drop-shadow-md">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed drop-shadow-sm">
                    {repo.description || 'Repositório de engenharia de software da FIAP.'}
                  </p>
                </div>

                {/* Bottom Stats & Action Buttons */}
                <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/20 text-xs">
                  <div className="flex items-center gap-3 text-zinc-300 font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-white">
                      <Star className="w-3 h-3 fill-current text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-blue-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/projetos/${repo.name}`}
                      onClick={e => e.stopPropagation()}
                      className="p-1.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-md"
                      title={t.hero.exploreButton}
                    >
                      <Play className="w-3 h-3 fill-black" />
                    </Link>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation()
                        onOpenDetails(repo)
                      }}
                      className="p-1.5 rounded-full border border-white/40 bg-black/40 text-white hover:border-white transition-colors cursor-pointer backdrop-blur-xs"
                      title={t.hero.moreInfoButton}
                    >
                      <Info className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
