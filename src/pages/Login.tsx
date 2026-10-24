import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  LogIn,
  UserPlus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Database,
  ShieldCheck,
  Briefcase,
  Terminal,
  GraduationCap,
  Compass,
  Check,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguagePicker } from '@/components/common/LanguagePicker'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export interface ProfileItem {
  id: string
  nameKey: 'recruiter' | 'engineer' | 'fiap' | 'admin' | 'guest'
  icon: React.ElementType
  color: string
}

const PROFILES: ProfileItem[] = [
  {
    id: 'Recrutador',
    nameKey: 'recruiter',
    icon: Briefcase,
    color: 'from-[#E50914] to-[#7f0005]',
  },
  {
    id: 'Engenharia',
    nameKey: 'engineer',
    icon: Terminal,
    color: 'from-blue-600 to-indigo-950',
  },
  {
    id: 'FIAP',
    nameKey: 'fiap',
    icon: GraduationCap,
    color: 'from-amber-500 to-amber-900',
  },
  {
    id: 'Administrador',
    nameKey: 'admin',
    icon: ShieldCheck,
    color: 'from-emerald-600 to-teal-950',
  },
  {
    id: 'Visitante',
    nameKey: 'guest',
    icon: Compass,
    color: 'from-purple-600 to-violet-950',
  },
]

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, register, isCloudConnected } = useAuth()
  const { t } = useLanguage()

  // Passo da tela: 'auth' (cadastro/login) ou 'profiles' (quem está assistindo)
  const requestedStep = searchParams.get('step')
  const [stepState, setStepState] = useState<'auth' | 'profiles'>('auth')
  const step = requestedStep === 'profiles' ? 'profiles' : stepState
  const setStep = setStepState

  // Modo dentro da etapa de autenticação: 'login' | 'signup'
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  // Estados dos formulários
  const [name, setName] = useState('')
  const [email, setEmail] = useState('admin@joaopedro.dev')
  const [password, setPassword] = useState('admin123')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Perfil selecionado
  const [selectedProfile, setSelectedProfile] = useState<string>(() => {
    return localStorage.getItem('nf_active_profile') || 'Recrutador'
  })

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    const result = await login(email, password)

    if (result.success) {
      setIsSubmitting(false)
      // Avança para a etapa de seleção de perfil
      setStep('profiles')
    } else {
      setErrorMessage(result.error || 'Credenciais inválidas.')
      setIsSubmitting(false)
    }
  }

  // Cadastro handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (password !== confirmPassword) {
      setErrorMessage(t.auth.passwordMismatch)
      return
    }

    setIsSubmitting(true)
    const result = await register(name, email, password)

    if (result.success) {
      setIsSubmitting(false)
      setSuccessMessage(t.auth.accountCreatedSuccess)
      // Avança para a tela de quem está assistindo
      setTimeout(() => {
        setStep('profiles')
      }, 700)
    } else {
      setErrorMessage(result.error || 'Falha ao realizar cadastro.')
      setIsSubmitting(false)
    }
  }

  // 1-Click para Avaliador FIAP
  const fillDemoCredentials = () => {
    setEmail('admin@joaopedro.dev')
    setPassword('admin123')
    setErrorMessage(null)
  }

  // Avançar como Visitante sem precisar logar
  const handleContinueAsGuest = () => {
    setStep('profiles')
  }

  // Escolha do perfil
  const handleSelectProfile = (profileId: string) => {
    setSelectedProfile(profileId)
    localStorage.setItem('nf_active_profile', profileId)
    localStorage.setItem('nf_profile_selected', 'true')
    window.dispatchEvent(new Event('nf-profile-change'))

    // Redireciona para o catálogo principal (Home)
    navigate('/', { replace: true })
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[var(--nf-bg)] text-[var(--nf-text)] selection:bg-[#E50914] selection:text-white transition-colors duration-200">
      {/* ── BACKGROUND POSTER & VIGNETTE ── */}
      <div className="absolute inset-0 z-0 bg-[#f5f5f7] dark:bg-[#141414] transition-colors duration-200">
        <div
          className="absolute inset-0 opacity-15 dark:opacity-25 bg-cover bg-center mix-blend-overlay filter blur-xs"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(20,20,20,0.15) 0%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-zinc-200/50 dark:via-[#141414]/85 to-zinc-300/60 dark:to-[#141414]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--nf-bg)] via-transparent to-[var(--nf-bg)]" />
      </div>

      {/* ── TOP NAV HEADER (LOGO + LANGUAGE + THEME) ── */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none"
          aria-label="João Pedro — Início"
        >
          <div className="w-8 h-8 rounded-xs bg-[#E50914] flex items-center justify-center text-white font-black text-lg tracking-tighter shadow-md shadow-red-600/40 group-hover:scale-105 transition-transform">
            JP
          </div>
          <span className="font-black text-xl sm:text-2xl tracking-tight text-[#E50914] uppercase">
            JOÃO PEDRO
          </span>
        </Link>

        {/* Top Right Controls: Language Picker & Theme Switcher */}
        <div className="flex items-center gap-3">
          <LanguagePicker variant="select" />
          <ThemeToggle />
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        {/* ═══════════════════════════════════════════════════════════════
            ETAPA 1: CADASTRO / LOGIN
           ═══════════════════════════════════════════════════════════════ */}
        {step === 'auth' && (
          <div className="w-full max-w-[480px] bg-white/95 dark:bg-black/85 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 rounded-xl p-7 sm:p-10 shadow-2xl space-y-6 text-zinc-900 dark:text-white animate-in fade-in zoom-in-95 duration-300">
            {/* Header Tabs: Entrar vs Cadastrar */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/15 pb-3">
              <div className="flex items-center gap-6 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login')
                    setErrorMessage(null)
                  }}
                  className={`pb-1 border-b-2 transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'border-[#E50914] text-zinc-900 dark:text-white font-bold'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {t.auth.signInTab}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup')
                    setErrorMessage(null)
                  }}
                  className={`pb-1 border-b-2 transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'border-[#E50914] text-zinc-900 dark:text-white font-bold'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {t.auth.signUpTab}
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#E50914] font-bold">NETFLIX UI</span>
            </div>

            {/* BaaS Provider Status */}
            <div className="flex items-center justify-between text-xs px-3.5 py-2.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
              <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Database className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{t.auth.baasProvider}</span>
              </span>
              <span
                className={`font-semibold px-2.5 py-0.5 rounded-full text-[10px] ${
                  isCloudConnected
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-400 border border-blue-300 dark:border-blue-800'
                }`}
              >
                {isCloudConnected ? t.auth.supabaseCloud : t.auth.demoMode}
              </span>
            </div>

            {/* Error & Success Messages */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-[#E50914]/20 border border-[#E50914]/50 flex items-start gap-2.5 text-xs text-red-300 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E50914] mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="p-3.5 rounded-lg bg-emerald-900/30 border border-emerald-500/50 flex items-start gap-2.5 text-xs text-emerald-300 animate-in fade-in duration-200"
              >
                <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* ── FORMULÁRIO DE LOGIN ── */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {t.auth.signInTitle}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {t.auth.signInSubtitle}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.emailLabel}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="admin@joaopedro.dev"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.passwordLabel}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-md bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.auth.authenticating}</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{t.auth.signInButton}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded bg-[#333333] border-none text-[#E50914] focus:ring-0"
                    />
                    <span>{t.auth.rememberMe}</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleContinueAsGuest}
                    className="hover:underline text-zinc-300 hover:text-white cursor-pointer font-medium"
                  >
                    {t.auth.guestButton} →
                  </button>
                </div>

                {/* 1-Click Evaluator Button */}
                <div className="pt-3 border-t border-white/10 text-center">
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#E50914]" />
                    <span>{t.auth.demoButton}</span>
                  </button>
                </div>

                {/* Alternar para Cadastro */}
                <div className="pt-2 text-center text-xs text-zinc-400">
                  <span>{t.auth.dontHaveAccount} </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup')
                      setErrorMessage(null)
                    }}
                    className="font-bold text-white hover:underline cursor-pointer"
                  >
                    {t.auth.signUpNow}
                  </button>
                </div>
              </form>
            ) : (
              /* ── FORMULÁRIO DE CADASTRO ── */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {t.auth.signUpTitle}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {t.auth.signUpSubtitle}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.nameLabel}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.emailLabel}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.passwordLabel}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-600 dark:text-zinc-400">{t.auth.confirmPasswordLabel}</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Repita sua senha"
                    className="w-full px-4 py-3 rounded-md bg-zinc-100 dark:bg-[#333333] border border-zinc-300 dark:border-transparent focus:border-zinc-500 dark:focus:border-white/40 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-md bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.auth.creatingAccount}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{t.auth.signUpButton}</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-xs text-zinc-400">
                  <span>{t.auth.alreadyHaveAccount} </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login')
                      setErrorMessage(null)
                    }}
                    className="font-bold text-white hover:underline cursor-pointer"
                  >
                    {t.auth.signInNow}
                  </button>
                </div>
              </form>
            )}

            {/* Rodapé: Pular para Visitante */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer"
              >
                {t.auth.guestButton} →
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ETAPA 2: QUEM ESTÁ ASSISTINDO? (ICÔNICA TELA NETFLIX COM ÍCONES)
           ═══════════════════════════════════════════════════════════════ */}
        {step === 'profiles' && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-10 sm:space-y-12 animate-in fade-in zoom-in-95 duration-300">
            {/* Header Titles */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                {t.profiles.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                {t.profiles.subtitle}
              </p>
            </div>

            {/* ── GRADE DOS PERFIS COM ÍCONES TEMÁTICOS ── */}
            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10">
              {PROFILES.map(prof => {
                const IconComponent = prof.icon
                const info = t.profiles.list[prof.nameKey]
                const isCurrentActive = selectedProfile === prof.id

                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => handleSelectProfile(prof.id)}
                    className="group flex flex-col items-center w-28 sm:w-36 text-center cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none"
                    aria-label={`${info.title} — ${info.subtitle}`}
                  >
                    {/* Avatar Tile com Gradiente e Ícone Temático */}
                    <div
                      className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-gradient-to-br ${prof.color} flex items-center justify-center shadow-2xl border-2 transition-all duration-200 ${
                        isCurrentActive
                          ? 'border-white ring-4 ring-[#E50914] shadow-red-900/40'
                          : 'border-transparent group-hover:border-white group-hover:ring-2 group-hover:ring-white/40'
                      }`}
                    >
                      {/* Ícone de Usuário Temático em Destaque */}
                      <IconComponent className="w-10 h-10 sm:w-14 sm:h-14 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-200" />

                      {/* Selo ativo */}
                      {isCurrentActive && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E50914] border-2 border-black flex items-center justify-center text-white shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Título do Perfil */}
                    <span className="mt-3 text-sm sm:text-base font-bold text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200 tracking-tight">
                      {info.title}
                    </span>

                    {/* Badge do Perfil */}
                    <span className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                      {info.badge}
                    </span>

                    {/* Descrição em tooltip sutil */}
                    <span className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 px-1 leading-snug">
                      {info.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Bottom Actions: Gerenciar Perfis / Voltar ao Login */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => setStep('auth')}
                className="px-6 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-white text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer bg-white/60 dark:bg-transparent"
              >
                ← {t.nav.signOut} / Voltar ao Login
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-2.5 rounded-md bg-[#E50914] hover:bg-[#f40612] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-lg shadow-red-900/30"
              >
                {t.hero.exploreButton} (Início) →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER DISCRETO ── */}
      <footer className="relative z-20 py-4 px-6 text-center text-xs text-zinc-600">
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            <span>{t.auth.backToHome}</span>
          </Link>
          <span>•</span>
          <span>{t.footer.copyright}</span>
        </div>
      </footer>
    </div>
  )
}
