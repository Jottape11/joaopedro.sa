import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, LogIn, ArrowLeft } from 'lucide-react'

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação temporária até a Fase 5 (Supabase Auth)
    localStorage.setItem('cp3_auth_token', 'simulated_token')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pt-8">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Área Administrativa</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Acesso restrito ao proprietário do portfólio.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4">
        <form onSubmit={handleSimulatedLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">E-mail</label>
            <input
              type="email"
              defaultValue="admin@joaopedro.dev"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
            <input
              type="password"
              defaultValue="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar no Dashboard</span>
          </button>
        </form>

        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 pt-2">
          Integração oficial de autenticação via Supabase será finalizada na Fase 5.
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para a página inicial</span>
        </Link>
      </div>
    </div>
  )
}

