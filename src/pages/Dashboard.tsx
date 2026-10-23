import React, { useState } from 'react'
import {
  ShieldCheck,
  LogOut,
  Mail,
  Star,
  CheckCircle2,
  Clock,
  Trash2,
  MailOpen,
  Calendar,
  Search,
  Database,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects'
import { getContactMessages, toggleMessageStatus, deleteContactMessage } from '@/services/contact'
import type { ContactMessage } from '@/types/contact'
import { EmptyState } from '@/components/common/EmptyState'

export const Dashboard: React.FC = () => {
  const { user, logout, isCloudConnected } = useAuth()
  const { data: repos } = useGitHubRepos()
  const { featuredProjects, toggleFeatured, isToggling } = useFeaturedProjects()

  // Inicialização lazy das mensagens
  const [messages, setMessages] = useState<ContactMessage[]>(() => getContactMessages())
  const [repoSearch, setRepoSearch] = useState('')
  const [featuredActionError, setFeaturedActionError] = useState<string | null>(null)

  const handleToggleStatus = (id: string) => {
    const updated = toggleMessageStatus(id)
    setMessages(updated)
  }

  const handleDelete = (id: string) => {
    const updated = deleteContactMessage(id)
    setMessages(updated)
  }

  const handleToggleFeatured = async (repoName: string) => {
    setFeaturedActionError(null)
    try {
      await toggleFeatured(repoName)
    } catch (err) {
      setFeaturedActionError(err instanceof Error ? err.message : 'Falha ao alterar destaque.')
    }
  }

  const unreadCount = messages.filter(m => m.status === 'unread').length

  // Filtragem dos repositórios para seleção de destaques
  const filteredRepos = repos?.filter(r =>
    r.name.toLowerCase().includes(repoSearch.toLowerCase()),
  ) || []

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Painel do Dono</h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                {user?.email || 'Administrador'}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center gap-1 font-mono">
                <Database className="w-3 h-3 text-blue-500" />
                <span>{isCloudConnected ? 'Supabase Conectado' : 'Storage Local'}</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Gestão de mensagens de contato e curadoria personalizada dos projetos em destaque na Home.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Encerrar Sessão</span>
        </button>
      </div>

      {/* Grid: Messages & Featured Projects Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): Messages Received List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Mensagens de Contato
              </h2>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              {unreadCount} pendente{unreadCount !== 1 ? 's' : ''} / {messages.length} total
            </span>
          </div>

          {messages.length === 0 ? (
            <EmptyState
              title="Nenhuma mensagem recebida ainda"
              description="Quando recrutadores ou visitantes enviarem o formulário da página de contato, as mensagens aparecerão aqui."
            />
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {messages.map(msg => {
                const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(msg.created_at))

                return (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.status === 'unread'
                        ? 'border-blue-300/80 bg-blue-50/20 dark:border-blue-900/50 dark:bg-blue-950/10'
                        : 'border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                            {msg.name}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                              msg.status === 'unread'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            }`}
                          >
                            {msg.status === 'unread' ? (
                              <>
                                <Clock className="w-3 h-3" />
                                <span>Pendente</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Respondida</span>
                              </>
                            )}
                          </span>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <div className="py-3 space-y-1">
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(msg.id)}
                        className="inline-flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        <MailOpen className="w-3.5 h-3.5" />
                        <span>
                          {msg.status === 'unread' ? 'Marcar como Respondida' : 'Marcar como Pendente'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(msg.id)}
                        className="p-1 rounded text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                        title="Excluir mensagem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right (5 cols): Featured Projects Selection (Atende Requisito 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Destaques da Home
              </h2>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              {featuredProjects.length} selecionado{featuredProjects.length !== 1 ? 's' : ''} (máx 6)
            </span>
          </div>

          <div className="p-5 rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900 shadow-sm space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Clique na estrela para destacar ou remover qualquer projeto da vitrine da Home.
              </p>
            </div>

            {featuredActionError && (
              <div className="p-3 rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 text-xs">
                {featuredActionError}
              </div>
            )}

            {/* Quick search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={repoSearch}
                onChange={e => setRepoSearch(e.target.value)}
                placeholder="Filtrar repositório..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>

            {/* Repos list with Star toggle */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredRepos.map(repo => {
                const isFeatured = featuredProjects.includes(repo.name)

                return (
                  <div
                    key={repo.id}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-colors ${
                      isFeatured
                        ? 'border-amber-300/80 bg-amber-50/30 dark:border-amber-800/60 dark:bg-amber-950/20'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/80'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
                          {repo.name}
                        </span>
                        {repo.language && (
                          <span className="text-[10px] text-zinc-500 font-mono">({repo.language})</span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate">
                        {repo.description || 'Sem descrição cadastrada'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        disabled={isToggling}
                        onClick={() => handleToggleFeatured(repo.name)}
                        title={isFeatured ? 'Remover dos destaques' : 'Destacar na Home'}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isFeatured
                            ? 'bg-amber-500 text-white shadow-sm hover:bg-amber-600'
                            : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-white' : ''}`} />
                      </button>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                        title="Ver no GitHub"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
