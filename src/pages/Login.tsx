import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Lock, LogIn, ArrowLeft, Loader2, AlertCircle, Database, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isCloudConnected } = useAuth()

  const [email, setEmail] = useState('admin@joaopedro.dev')
  const [password, setPassword] = useState('admin123')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Rota de retorno após autenticação bem-sucedida
  const redirectPath = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoggingIn(true)

    const result = await login(email, password)

    if (result.success) {
      navigate(redirectPath, { replace: true })
    } else {
      setErrorMessage(result.error || 'Credenciais inválidas.')
      setIsLoggingIn(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('admin@joaopedro.dev')
    setPassword('admin123')
    setErrorMessage(null)
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pt-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 shadow-sm">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Área Administrativa</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Acesso restrito para gerenciamento de mensagens e curadoria da vitrine.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900 shadow-sm space-y-5">
        {/* Backend status badge */}
        <div className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>Provedor BaaS:</span>
          </span>
          <span
            className={`font-medium px-2 py-0.5 rounded-full text-[11px] ${
              isCloudConnected
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
            }`}
          >
            {isCloudConnected ? 'Supabase Nuvem' : 'Modo Demonstração'}
          </span>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">E-mail do Administrador</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@joaopedro.dev"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Acessar Painel</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-fill button */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Preencher credenciais para avaliação</span>
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para a página inicial</span>
        </Link>
      </div>
    </div>
  )
}
