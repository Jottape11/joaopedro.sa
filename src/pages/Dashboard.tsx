import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'
import { getContactMessages, toggleMessageStatus, deleteContactMessage } from '@/services/contact'
import type { ContactMessage } from '@/types/contact'
import { EmptyState } from '@/components/common/EmptyState'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  // Inicialização lazy direta do estado com dados do storage
  const [messages, setMessages] = useState<ContactMessage[]>(() => getContactMessages())

  const handleLogout = () => {
    localStorage.removeItem('cp3_auth_token')
    navigate('/login', { replace: true })
  }

  const handleToggleStatus = (id: string) => {
    const updated = toggleMessageStatus(id)
    setMessages(updated)
  }

  const handleDelete = (id: string) => {
    const updated = deleteContactMessage(id)
    setMessages(updated)
  }

  const unreadCount = messages.filter(m => m.status === 'unread').length

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Painel do Dono</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                Autenticado
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gestão de mensagens recebidas e curadoria de projetos em destaque.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Encerrar Sessão</span>
        </button>
      </div>

      {/* Grid: Messages & Featured Projects Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left (2 cols): Messages Received List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Mensagens de Contato
              </h2>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              {unreadCount} não lida{unreadCount !== 1 ? 's' : ''} / {messages.length} total
            </span>
          </div>

          {messages.length === 0 ? (
            <EmptyState
              title="Nenhuma mensagem recebida ainda"
              description="Quando recrutadores ou visitantes enviarem o formulário da página de contato, as mensagens aparecerão aqui."
            />
          ) : (
            <div className="space-y-4">
              {messages.map(msg => {
                const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(msg.created_at))

                return (
                  <div
                    key={msg.id}
                    className={`p-6 rounded-2xl border transition-all ${
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

        {/* Right (1 col): Featured Projects Management */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Destaques na Home
            </h2>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 space-y-4 text-xs">
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Atualmente os 3 repositórios mais recentes do seu GitHub são promovidos automaticamente na Home.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Na <strong>Fase 5</strong>, integraremos esta seleção com o banco relacional do <code>Supabase</code> para você marcar manualmente qualquer repositório favorito com um clique!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
