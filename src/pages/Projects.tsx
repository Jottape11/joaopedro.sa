import React from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, Search, ArrowRight, ExternalLink } from 'lucide-react'

export const Projects: React.FC = () => {
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
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Todos os projetos abaixo são integrados diretamente da API do GitHub da conta @Jottape11, incluindo linguagens, estatísticas e datas de atualização.
        </p>
      </div>

      {/* Filter / Search Bar Placeholder */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por tecnologia ou nome..."
            disabled
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
          />
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Integração com TanStack Query na Fase 3
        </span>
      </div>

      {/* Projects Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'fastapi-game-center', lang: 'Python', desc: 'API e e-commerce de games em FastAPI com camadas limpas.' },
          { name: 'steam-store-analytics', lang: 'Data/API', desc: 'Plataforma de coleta automatizada e visualização de dados Steam.' },
          { name: 'cp4-grid-responsividade', lang: 'CSS', desc: 'Projeto responsivo com CSS Grid sem frameworks.' },
          { name: 'eco-impacto-brasil-portal', lang: 'TypeScript', desc: 'Portal sustentável em TypeScript.' },
          { name: 'totem-ai-receptionist-wireframe', lang: 'TypeScript', desc: 'Interface de recepção com inteligência artificial.' },
          { name: 'cinelog-tvtime', lang: 'JavaScript', desc: 'Catálogo de filmes e séries em JavaScript.' },
        ].map(item => (
          <div
            key={item.name}
            className="p-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-sm group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                  {item.lang}
                </span>
                <span className="text-xs text-zinc-400">Atualizado recentemente</span>
              </div>
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm">
              <Link
                to={`/projetos/${item.name}`}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Ver página individual</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://github.com/Jottape11/${item.name}`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
