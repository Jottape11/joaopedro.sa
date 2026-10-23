import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, LogOut, Mail, Star } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('cp3_auth_token')
    navigate('/login', { replace: true })
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Painel do Dono</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gerencie mensagens de contato e a curadoria dos projetos em destaque.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>

      {/* Sections Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages Card */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2>Mensagens Recebidas</h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Nenhuma mensagem pendente no momento. As mensagens enviadas pelo formulário de contato aparecerão listadas aqui com opção de marcar como respondida.
          </p>
        </div>

        {/* Featured Projects Card */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
            <Star className="w-5 h-5 text-amber-500" />
            <h2>Projetos em Destaque</h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Na Fase 5, você poderá alternar e salvar diretamente no banco quais repositórios aparecem na Home do seu portfólio.
          </p>
        </div>
      </div>
    </div>
  )
}

