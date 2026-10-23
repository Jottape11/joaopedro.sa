import React from 'react'
import { Link } from 'react-router-dom'
import { Star, GitFork, ArrowRight } from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { GitHubRepo } from '@/types/github'

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
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(repo.updated_at))

  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || 'bg-zinc-400' : 'bg-zinc-400'

  return (
    <article className="p-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-md transition-all shadow-sm group">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between text-xs">
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              <span className={`w-2 h-2 rounded-full ${langColor}`} />
              <span>{repo.language}</span>
            </span>
          ) : (
            <span className="text-zinc-400">Geral</span>
          )}

          <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{repo.stargazers_count}</span>
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-blue-500" />
                <span>{repo.forks_count}</span>
              </span>
            )}
            <span className="text-[11px]">Atz. {formattedDate}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {repo.description || 'Repositório público desenvolvido no curso de Engenharia de Software.'}
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium">
        <Link
          to={`/projetos/${repo.name}`}
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Página do Projeto</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver código do repositório ${repo.name} no GitHub`}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  )
}
