import React from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  Play,
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  BookOpen,
} from 'lucide-react'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { GitHubRepo } from '@/types/github'
import { useGitHubRepoReadme } from '@/hooks/useGitHub'
import { useLanguage } from '@/hooks/useLanguage'
import { getProjectPosterUrl } from '@/services/projectImages'
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer'

interface ProjectQuickViewModalProps {
  repo: GitHubRepo | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectQuickViewModal: React.FC<ProjectQuickViewModalProps> = ({
  repo,
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage()
  const { data: readme, isLoading: isReadmeLoading } = useGitHubRepoReadme(
    repo?.name,
    repo?.default_branch,
  )

  if (!isOpen || !repo) return null

  const formattedDate = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(repo.updated_at))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop com desfoque escuro */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Detail Sheet Container (Max Width 860px) adaptável ao Tema Claro e Escuro */}
      <div className="relative z-10 w-full max-w-4xl rounded-xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-[#181818] text-zinc-900 dark:text-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors duration-200">
        {/* Modal Hero Banner com Fotografia Real de Fundo */}
        <div className="relative w-full min-h-[220px] sm:min-h-[280px] bg-black p-6 sm:p-8 flex flex-col justify-end overflow-hidden">
          {/* Real-Life Photographic Backdrop */}
          <img
            src={getProjectPosterUrl(repo.name, repo.language, 'banner')}
            alt={repo.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modal.close}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-20 backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

          {/* Banner Meta & Title */}
          <div className="relative z-10 space-y-3 max-w-2xl text-white">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-xs bg-[#E50914] text-white flex items-center justify-center text-xs font-black">
                N
              </span>
              <span className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">
                {t.modal.originalProject} · {t.modal.specs}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md">
              {repo.name}
            </h2>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <Link
                to={`/projetos/${repo.name}`}
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-white hover:bg-white/90 text-black font-bold text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{t.modal.fullPage}</span>
              </Link>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded border border-white/40 bg-black/40 hover:bg-black/70 text-white font-semibold text-sm flex items-center gap-2 transition-colors backdrop-blur-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>{t.modal.openGithub}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Body: 70/30 Split Layout */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Left Column (70%): Description and Formatted README documentation */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#E50914]" />
                <span>{t.modal.architecture}</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                {repo.description || 'Nenhuma descrição resumida informada no repositório.'}
              </p>
            </div>

            {/* Documentação Oficial README Renderizada com Alta Qualidade */}
            <div className="border border-zinc-200 dark:border-white/10 rounded-xl p-5 bg-zinc-50 dark:bg-black/50 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-white/10 pb-2.5">
                <span className="font-mono text-[#E50914] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                  DOCUMENTAÇÃO TÉCNICA (README.md)
                </span>
                <span className="font-mono text-[11px]">Branch: {repo.default_branch}</span>
              </div>

              {isReadmeLoading ? (
                <div className="text-xs text-zinc-500 font-mono py-8 text-center animate-pulse">
                  Carregando documentação técnica formatada...
                </div>
              ) : readme ? (
                <MarkdownRenderer content={readme} maxHeightClass="max-h-80" />
              ) : (
                <div className="text-xs text-zinc-500 py-4 italic">
                  Documentação README não encontrada na raiz da branch principal.
                </div>
              )}
            </div>
          </div>

          {/* Right Column (30%): Meta details, stack and dates */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/10 md:pl-6 text-xs text-zinc-500 dark:text-zinc-400">
            <div>
              <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500">
                {t.modal.mainLanguage}:
              </span>
              <span className="text-zinc-900 dark:text-white font-bold text-sm">
                {repo.language || 'Geral / Markdown'}
              </span>
            </div>

            <div>
              <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500">
                {t.modal.stars}:
              </span>
              <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>

            <div>
              <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500">
                {t.modal.forks}:
              </span>
              <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-sm">
                <GitFork className="w-4 h-4 text-blue-500" />
                <span>{repo.forks_count}</span>
              </div>
            </div>

            <div>
              <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500">
                {t.modal.lastUpdate}:
              </span>
              <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 text-xs">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div>
              <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500">
                {t.modal.license}:
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">
                MIT Open Source
              </span>
            </div>

            {repo.topics && repo.topics.length > 0 && (
              <div>
                <span className="uppercase tracking-wider block font-semibold text-[10px] text-zinc-400 dark:text-zinc-500 mb-1.5">
                  Gêneros / Stacks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {repo.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 dark:bg-white/10 dark:text-white text-[10px] font-mono border border-zinc-200 dark:border-transparent"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
