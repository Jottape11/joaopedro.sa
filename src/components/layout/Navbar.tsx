import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Briefcase,
  Terminal,
  GraduationCap,
  ShieldCheck,
  Compass,
  LogOut,
  LogIn,
  Sparkles,
  Users,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguagePicker } from '@/components/common/LanguagePicker'
import { ThemeToggle } from '@/components/common/ThemeToggle'

interface ProfileDef {
  id: string
  nameKey: 'recruiter' | 'engineer' | 'fiap' | 'admin' | 'guest'
  icon: React.ElementType
  color: string
}

const PROFILES: ProfileDef[] = [
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

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [activeProfile, setActiveProfile] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nf_active_profile') || 'Recrutador'
    }
    return 'Recrutador'
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      setActiveProfile(localStorage.getItem('nf_active_profile') || 'Recrutador')
    }
    window.addEventListener('nf-profile-change', handleStorageChange)
    return () => window.removeEventListener('nf-profile-change', handleStorageChange)
  }, [])

  const selectProfile = (profileId: string) => {
    localStorage.setItem('nf_active_profile', profileId)
    localStorage.setItem('nf_profile_selected', 'true')
    setActiveProfile(profileId)
    setProfileMenuOpen(false)
    window.dispatchEvent(new Event('nf-profile-change'))
  }

  const currentProfileDef = PROFILES.find(p => p.id === activeProfile) || PROFILES[0]
  const ActiveIcon = currentProfileDef.icon

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/sobre' },
    { name: t.nav.projects, path: '/projetos' },
    { name: t.nav.contact, path: '/contato' },
    { name: t.nav.dashboard, path: '/dashboard' },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors duration-200 ${
      isActive
        ? 'font-bold text-zinc-900 dark:text-white'
        : 'font-normal text-zinc-600 hover:text-zinc-900 dark:text-[#e5e5e5]/75 dark:hover:text-[#b3b3b3]'
    }`

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#141414]/98 backdrop-blur-md shadow-md shadow-black/10 dark:shadow-black/70'
          : 'bg-gradient-to-b from-white/90 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        {/* Left: Brand Wordmark + Primary Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 group select-none"
            aria-label="João Pedro Sá — Portfólio Início"
          >
            {/* Emblema N / JP Vermelho Netflix */}
            <div className="w-7 h-7 rounded-xs bg-[#E50914] flex items-center justify-center text-white font-black text-base tracking-tighter shadow-sm shadow-red-600/40 group-hover:scale-105 transition-transform">
              JP
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-[#E50914] uppercase">
                JOÃO PEDRO SÁ
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold tracking-widest text-zinc-500 dark:text-[#a3a3a3] uppercase border-l border-zinc-300 dark:border-white/20 pl-2">
                PORTFÓLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Navegação principal">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: Search, Notifications, Language, Theme & Profile Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={() => navigate('/projetos')}
            aria-label={t.nav.searchPlaceholder}
            title={t.nav.searchPlaceholder}
            className="p-2 rounded-full text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen(prev => !prev)
                setProfileMenuOpen(false)
              }}
              aria-label="Notificações"
              className="relative p-2 rounded-full text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E50914]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-md border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3.5 py-2 border-b border-zinc-200 dark:border-white/10 font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>Novidades no Catálogo</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E50914] text-white">TOP 10</span>
                </div>
                <Link
                  to="/projetos/fastapi-game-center"
                  onClick={() => setNotifOpen(false)}
                  className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-6 rounded-xs bg-gradient-to-br from-[#E50914] to-zinc-900 shrink-0 flex items-center justify-center text-[9px] font-bold text-white">
                    N
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">FastAPI Game Center</p>
                    <p className="text-zinc-500 dark:text-[#b3b3b3]">Novo episódio: Arquitetura Async + SQLite</p>
                  </div>
                </Link>
                <Link
                  to="/projetos/steam-store-analytics"
                  onClick={() => setNotifOpen(false)}
                  className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-6 rounded-xs bg-gradient-to-br from-emerald-600 to-zinc-900 shrink-0 flex items-center justify-center text-[9px] font-bold text-white">
                    99%
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">Steam Store Analytics</p>
                    <p className="text-zinc-500 dark:text-[#b3b3b3]">Pipeline de dados em alta no Brasil</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Language Selector (PT/EN) */}
          <div className="hidden sm:block">
            <LanguagePicker variant="compact" />
          </div>

          {/* Theme Switcher (Claro/Escuro) */}
          <ThemeToggle />

          {/* Netflix Profile Avatar + Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen(prev => !prev)
                setNotifOpen(false)
              }}
              className="flex items-center gap-1.5 cursor-pointer group"
              aria-label="Menu de perfil do usuário"
              title={`Perfil ativo: ${t.profiles.list[currentProfileDef.nameKey]?.title}`}
            >
              <div
                className={`w-8 h-8 rounded-sm bg-gradient-to-br ${currentProfileDef.color} flex items-center justify-center text-white shadow-sm border border-white/20 group-hover:border-white transition-all`}
              >
                <ActiveIcon className="w-4 h-4 text-white drop-shadow-sm" />
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 ${
                  profileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-md border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-[#808080]">
                  {t.profiles.title}
                </div>

                {PROFILES.map(prof => {
                  const Icon = prof.icon
                  const info = t.profiles.list[prof.nameKey]
                  const isActive = activeProfile === prof.id

                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => selectProfile(prof.id)}
                      className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-sm bg-gradient-to-br ${prof.color} flex items-center justify-center text-white shadow-xs`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p
                            className={`font-semibold ${
                              isActive
                                ? 'text-[#E50914] font-bold'
                                : 'text-zinc-800 dark:text-zinc-200'
                            }`}
                          >
                            {info.title}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-mono">{info.badge}</p>
                        </div>
                      </div>
                      {isActive && <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />}
                    </button>
                  )
                })}

                <div className="my-1.5 border-t border-zinc-200 dark:border-white/10" />

                {/* Ir para tela de perfis completa */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false)
                    navigate('/login?step=profiles')
                  }}
                  className="w-full px-3.5 py-2 flex items-center gap-2 text-zinc-700 dark:text-[#e5e5e5] hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-left font-medium"
                >
                  <Users className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>{t.nav.switchProfile}</span>
                </button>

                {/* Idioma no Dropdown */}
                <div className="px-3.5 py-2 sm:hidden border-t border-zinc-200 dark:border-white/10">
                  <LanguagePicker variant="select" className="w-full" />
                </div>

                {/* Sair ou Entrar */}
                <div className="border-t border-zinc-200 dark:border-white/10 mt-1 pt-1">
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setProfileMenuOpen(false)
                        navigate('/login')
                      }}
                      className="w-full px-3.5 py-2 flex items-center gap-2 text-[#E50914] hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.nav.signOut}</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setProfileMenuOpen(false)}
                      className="px-3.5 py-2 flex items-center gap-2 text-[#E50914] hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors font-semibold"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>{t.nav.signIn} / {t.auth.signUpTab}</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Abrir menu de navegação"
            className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-[#E50914] text-white font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <LanguagePicker variant="select" />
            <ThemeToggle showLabel />
          </div>
        </div>
      )}
    </header>
  )
}
