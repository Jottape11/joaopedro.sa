import React, { useState, useMemo } from 'react'
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
  Layers,
  Sparkles,
  Clapperboard,
  AlertCircle,
  Eye,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects'
import { useLanguage } from '@/hooks/useLanguage'
import { getContactMessages, toggleMessageStatus, deleteContactMessage } from '@/services/contact'
import { getProjectPosterUrl } from '@/services/projectImages'
import type { ContactMessage } from '@/types/contact'
import { EmptyState } from '@/components/common/EmptyState'

type MessageFilter = 'all' | 'unread' | 'replied'

export const Dashboard: React.FC = () => {
  const { user, logout, isCloudConnected } = useAuth()
  const { data: repos, isLoading: isReposLoading } = useGitHubRepos()
  const { featuredProjects, toggleFeatured, isToggling } = useFeaturedProjects()
  const { t } = useLanguage()

  // State
  const [messages, setMessages] = useState<ContactMessage[]>(() => getContactMessages())
  const [repoSearch, setRepoSearch] = useState('')
  const [messageFilter, setMessageFilter] = useState<MessageFilter>('all')
  const [activeTab, setActiveTab] = useState<'both' | 'messages' | 'featured'>('both')
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
    const isCurrentlyFeatured = featuredProjects.includes(repoName)
    if (!isCurrentlyFeatured && featuredProjects.length >= 6) {
      setFeaturedActionError(t.dashboard.maxLimitReached)
      return
    }
    try {
      await toggleFeatured(repoName)
    } catch (err) {
      setFeaturedActionError(err instanceof Error ? err.message : 'Falha ao alterar destaque.')
    }
  }

  const unreadCount = useMemo(() => messages.filter(m => m.status === 'unread').length, [messages])
  const repliedCount = useMemo(() => messages.filter(m => m.status === 'replied').length, [messages])

  const filteredMessages = useMemo(() => {
    if (messageFilter === 'unread') return messages.filter(m => m.status === 'unread')
    if (messageFilter === 'replied') return messages.filter(m => m.status === 'replied')
    return messages
  }, [messages, messageFilter])

  // Filtragem dos repositórios para seleção de destaques
  const filteredRepos = useMemo(() => {
    return (
      repos?.filter(
        r =>
          r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
          (r.language && r.language.toLowerCase().includes(repoSearch.toLowerCase())) ||
          (r.description && r.description.toLowerCase().includes(repoSearch.toLowerCase())),
      ) || []
    )
  }, [repos, repoSearch])

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#181818]/95 border border-zinc-200 dark:border-white/10 shadow-xl backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E50914] to-[#831010] flex items-center justify-center text-white shadow-lg shadow-[#E50914]/25">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#181818]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E50914]/10 text-[#E50914] text-[11px] font-bold uppercase tracking-wider border border-[#E50914]/20">
                <Clapperboard className="w-3 h-3" />
                <span>{t.dashboard.studioBadge}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                {t.dashboard.title}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-[#a3a3a3]">
              {t.dashboard.subtitle}
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {user?.email || 'studio.admin@netflix.edition'}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-[#252525] text-zinc-600 dark:text-zinc-300 font-mono text-[11px] border border-zinc-200 dark:border-white/10">
                <Database className="w-3 h-3 text-[#E50914]" />
                <span>{isCloudConnected ? t.dashboard.cloudStatus : t.dashboard.localStatus}</span>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer shadow-sm shrink-0 self-start md:self-center"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.dashboard.signOut}</span>
        </button>
      </div>

      {/* 4 Quick Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Repos */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181818] border border-zinc-200 dark:border-white/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-[#a3a3a3]">
            <span className="text-xs font-medium uppercase tracking-wider">{t.dashboard.statsTotalRepos}</span>
            <Layers className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            {repos?.length || 0}
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-[#737373]">Sincronizados via GitHub API</p>
        </div>

        {/* Featured Billboard */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181818] border border-zinc-200 dark:border-white/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-[#a3a3a3]">
            <span className="text-xs font-medium uppercase tracking-wider">{t.dashboard.statsFeatured}</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {featuredProjects.length}
            </span>
            <span className="text-xs font-semibold text-zinc-400">/ 6 max</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Carrossel com auto-rotação 5s
          </p>
        </div>

        {/* Total Messages */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181818] border border-zinc-200 dark:border-white/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-[#a3a3a3]">
            <span className="text-xs font-medium uppercase tracking-wider">{t.dashboard.statsTotalMessages}</span>
            <Mail className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            {messages.length}
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-[#737373]">Via Central de Contato</p>
        </div>

        {/* Pending Messages */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181818] border border-zinc-200 dark:border-white/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-zinc-500 dark:text-[#a3a3a3]">
            <span className="text-xs font-medium uppercase tracking-wider">{t.dashboard.statsPending}</span>
            <Clock className="w-4 h-4 text-[#E50914]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#E50914]">
              {unreadCount}
            </span>
            {unreadCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-bold">
                Ação Requerida
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-[#737373]">
            {repliedCount} mensagem{repliedCount !== 1 ? 's' : ''} respondida{repliedCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Tabs Selector on Mobile/Desktop */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visão Completa</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.dashboard.tabMessages}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {unreadCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('featured')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'featured'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{t.dashboard.tabFeatured}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              {featuredProjects.length}/6
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Messages (Left) & Featured Projects (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Messages Management */}
        {(activeTab === 'both' || activeTab === 'messages') && (
          <div
            className={`${
              activeTab === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'
            } space-y-4`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#E50914]" />
                <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                  {t.dashboard.tabMessages}
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#202020] p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setMessageFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    messageFilter === 'all'
                      ? 'bg-white dark:bg-[#2a2a2a] text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {t.dashboard.filterAll} ({messages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setMessageFilter('unread')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    messageFilter === 'unread'
                      ? 'bg-white dark:bg-[#2a2a2a] text-[#E50914] shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {t.dashboard.filterUnread} ({unreadCount})
                </button>
                <button
                  type="button"
                  onClick={() => setMessageFilter('replied')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    messageFilter === 'replied'
                      ? 'bg-white dark:bg-[#2a2a2a] text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {t.dashboard.filterReplied} ({repliedCount})
                </button>
              </div>
            </div>

            {filteredMessages.length === 0 ? (
              <EmptyState
                title={t.dashboard.emptyMessagesTitle}
                description={t.dashboard.emptyMessagesDesc}
              />
            ) : (
              <div className="space-y-3.5 max-h-[700px] overflow-y-auto pr-1">
                {filteredMessages.map(msg => {
                  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(msg.created_at))

                  return (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all shadow-sm ${
                        msg.status === 'unread'
                          ? 'border-[#E50914]/40 bg-[#E50914]/5 dark:border-[#E50914]/30 dark:bg-[#E50914]/5'
                          : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-[#181818]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-white/10">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                              {msg.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                msg.status === 'unread'
                                  ? 'bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/20'
                                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              }`}
                            >
                              {msg.status === 'unread' ? (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>{t.dashboard.statusPending}</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{t.dashboard.statusReplied}</span>
                                </>
                              )}
                            </span>
                          </div>

                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{msg.email}</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-[#737373]">
                          <Calendar className="w-3 h-3" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>

                      <div className="py-3 space-y-1.5">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                          {msg.subject}
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-[#a3a3a3] whitespace-pre-wrap leading-relaxed bg-zinc-50 dark:bg-[#202020] p-3 rounded-xl border border-zinc-100 dark:border-white/5">
                          {msg.message}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(msg.id)}
                          className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>
                            {msg.status === 'unread' ? t.dashboard.markReplied : t.dashboard.markUnread}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(msg.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                          title={t.dashboard.deleteMsg}
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
        )}

        {/* Right: Featured Projects Curation (Top 6 Billboard) */}
        {(activeTab === 'both' || activeTab === 'featured') && (
          <div
            className={`${
              activeTab === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'
            } space-y-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                  {t.dashboard.curationTitle}
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                {featuredProjects.length}/6 {t.dashboard.statsFeatured}
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#181818]/95 shadow-xl backdrop-blur-sm space-y-4">
              <p className="text-xs text-zinc-600 dark:text-[#a3a3a3] leading-relaxed">
                {t.dashboard.curationSubtitle}
              </p>

              {featuredActionError && (
                <div className="p-3.5 rounded-xl bg-[#E50914]/10 text-red-700 dark:text-red-300 border border-[#E50914]/30 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>{featuredActionError}</span>
                </div>
              )}

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={repoSearch}
                  onChange={e => setRepoSearch(e.target.value)}
                  placeholder={t.dashboard.searchRepoPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-[#232323] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#E50914] transition-all"
                />
              </div>

              {/* Repositories List */}
              {isReposLoading ? (
                <div className="py-10 text-center text-xs text-zinc-400">
                  Carregando títulos do catálogo...
                </div>
              ) : (
                <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                  {filteredRepos.map(repo => {
                    const isFeatured = featuredProjects.includes(repo.name)
                    const cardImage = getProjectPosterUrl(repo.name, repo.language, 'card')

                    return (
                      <div
                        key={repo.id}
                        className={`p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all shadow-sm ${
                          isFeatured
                            ? 'border-amber-400/80 bg-amber-50/20 dark:border-amber-500/50 dark:bg-amber-950/15 ring-1 ring-amber-400/30'
                            : 'border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#202020]/60 hover:bg-zinc-100/60 dark:hover:bg-[#262626]'
                        }`}
                      >
                        {/* Thumbnail & Title Info */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Real-life Photography Card Preview */}
                          <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-200 dark:border-white/10">
                            <img
                              src={cardImage}
                              alt={repo.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                            {isFeatured && (
                              <div className="absolute top-1 left-1 p-0.5 rounded-full bg-amber-500 text-white shadow-md">
                                <Star className="w-2.5 h-2.5 fill-white" />
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-zinc-900 dark:text-white truncate block">
                                {repo.name}
                              </span>
                              {repo.language && (
                                <span className="text-[10px] px-2 py-0.2 rounded-full font-mono bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                                  {repo.language}
                                </span>
                              )}
                              {isFeatured && (
                                <span className="text-[9px] px-2 py-0.2 rounded-full font-black tracking-wider bg-amber-500 text-white shadow-xs">
                                  {t.dashboard.featuredBadge}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-zinc-500 dark:text-[#a3a3a3] line-clamp-2 leading-relaxed">
                              {repo.description || 'Sem sinopse técnica cadastrada no repositório.'}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            disabled={isToggling}
                            onClick={() => handleToggleFeatured(repo.name)}
                            title={isFeatured ? t.dashboard.removeFromFeatured : t.dashboard.addToFeatured}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                              isFeatured
                                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                : 'bg-zinc-200 hover:bg-amber-100 hover:text-amber-800 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-amber-950 dark:hover:text-amber-300 text-zinc-700'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-white' : ''}`} />
                            <span className="hidden sm:inline">
                              {isFeatured ? 'Destaque' : 'Destacar'}
                            </span>
                          </button>

                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
                            title={t.dashboard.viewOnGithub}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <a
                            href={`/projeto/${repo.name}`}
                            className="p-2 rounded-xl text-zinc-400 hover:text-[#E50914] transition-colors"
                            title="Ver página de detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Bottom Tip */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex items-center gap-2 text-[11px] text-zinc-500 dark:text-[#737373]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Os títulos selecionados são ordenados e atualizados imediatamente no carrossel Billboard hero.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
