import React from 'react'
import {
  Play,
  Briefcase,
  Terminal,
  GraduationCap,
  ShieldCheck,
  Compass,
  Code2,
  Cpu,
  CheckCircle2,
  Sparkles,
  Mail,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons'
import { useLanguage } from '@/hooks/useLanguage'

interface WelcomeSectionProps {
  activeProfileId?: string
  onContinue: () => void
  isStandAlonePage?: boolean
}

const PROFILE_ICONS: Record<string, React.ElementType> = {
  Recrutador: Briefcase,
  Engenharia: Terminal,
  FIAP: GraduationCap,
  Administrador: ShieldCheck,
  Visitante: Compass,
}

const PROFILE_COLORS: Record<string, string> = {
  Recrutador: 'from-[#E50914] to-[#7f0005] border-[#E50914]/40',
  Engenharia: 'from-blue-600 to-indigo-950 border-blue-500/40',
  FIAP: 'from-amber-500 to-amber-900 border-amber-500/40',
  Administrador: 'from-emerald-600 to-teal-950 border-emerald-500/40',
  Visitante: 'from-purple-600 to-violet-950 border-purple-500/40',
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  activeProfileId = 'Recrutador',
  onContinue,
  isStandAlonePage = false,
}) => {
  const { t } = useLanguage()

  const ProfileIcon = PROFILE_ICONS[activeProfileId] || Briefcase
  const colorClass = PROFILE_COLORS[activeProfileId] || PROFILE_COLORS.Recrutador

  // Mensagem personalizada por perfil
  const getProfileNote = () => {
    switch (activeProfileId) {
      case 'Engenharia':
        return t.about.profileNotes.engineer
      case 'FIAP':
        return t.about.profileNotes.fiap
      case 'Administrador':
        return t.about.profileNotes.admin
      case 'Visitante':
        return t.about.profileNotes.guest
      case 'Recrutador':
      default:
        return t.about.profileNotes.recruiter
    }
  }

  const skills = [
    { name: 'React 19 & TypeScript', desc: 'SPA moderna, custom hooks e tipagem estrita' },
    { name: 'Python & FastAPI', desc: 'Microsserviços assíncronos e arquitetura em camadas' },
    { name: 'Tailwind CSS & Design', desc: 'Hawkins Netflix System e responsividade fluida' },
    { name: 'TanStack Query', desc: 'Cache assíncrono, staleTime e resiliência de rede' },
    { name: 'Supabase BaaS', desc: 'PostgreSQL em nuvem, RLS e fallback transparente' },
    { name: 'Vitest & Oxlint', desc: '19 testes automatizados e governança de linter em Rust' },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fadeIn">
      {/* ── CARD PRINCIPAL COM ESTILO NETFLIX STUDIO ── */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 dark:bg-[#181818]/95 border border-zinc-200 dark:border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl space-y-8 sm:space-y-10">
        {/* Glow de fundo vermelho Netflix */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* ── TOP BADGE & PERFIL ATIVO ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E50914] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-700/30">
              JP
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase block">
                {t.about.badge}
              </span>
              <span className="text-xs text-zinc-500 dark:text-[#a3a3a3]">
                FIAP · Checkpoint 3 (CP3) · 2026
              </span>
            </div>
          </div>

          {/* Pill do Perfil Conectado */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#222222] border border-zinc-200 dark:border-white/10 text-xs font-semibold">
            <div className={`p-1 rounded-md bg-gradient-to-br ${colorClass} text-white shadow-xs`}>
              <ProfileIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-zinc-600 dark:text-zinc-400">{t.about.greetingFor}:</span>
            <span className="text-zinc-900 dark:text-white font-bold">{activeProfileId}</span>
          </div>
        </div>

        {/* ── HEADER DA APRESENTAÇÃO: AVATAR + BIO PRINCIPAL ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Avatar com moldura cinematográfica */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl p-1 bg-gradient-to-br from-[#E50914] via-zinc-400 dark:via-zinc-700 to-zinc-900 shadow-xl shadow-red-600/20">
                <div className="w-full h-full rounded-[22px] bg-zinc-900 flex flex-col items-center justify-center text-white p-4 overflow-hidden relative">
                  {/* Iniciais estilizadas */}
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                    JP
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#E50914] mt-1 font-bold">
                    STUDIO 2026
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#181818] shadow-md" title="Disponível para novos projetos" />
            </div>

            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                João Pedro Sá
              </h2>
              <p className="text-xs text-[#E50914] font-bold">
                {t.about.role}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-[#a3a3a3]">
                {t.about.university}
              </p>
            </div>

            {/* Redes Rápidas */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/Jottape11"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-[#252525] text-zinc-700 dark:text-zinc-200 hover:text-[#E50914] dark:hover:text-[#E50914] transition-all hover:scale-105"
                title="GitHub @Jottape11"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/joaopedrosa/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-[#252525] text-zinc-700 dark:text-zinc-200 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-105"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:joaopedro.sa@outlook.com"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-[#252525] text-zinc-700 dark:text-zinc-200 hover:text-red-500 transition-all hover:scale-105"
                title="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Texto de Apresentação e Mensagem ao Perfil */}
          <div className="md:col-span-8 space-y-4 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
              {t.about.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-[#b3b3b3] leading-relaxed">
              {t.about.bioParagraph1}
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-[#b3b3b3] leading-relaxed">
              {t.about.bioParagraph2}
            </p>

            {/* Caixa em destaque com a mensagem personalizada ao perfil escolhido */}
            <div className="p-4 rounded-2xl bg-zinc-100/90 dark:bg-[#222222] border-l-4 border-l-[#E50914] border border-zinc-200/60 dark:border-white/5 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mensagem para o perfil {activeProfileId}:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                "{getProfileNote()}"
              </p>
            </div>
          </div>
        </div>

        {/* ── STACKS & DOMÍNIOS TÉCNICOS ── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#b3b3b3]">
            <Cpu className="w-4 h-4 text-[#E50914]" />
            <span>{t.about.skillsTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map(skill => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#202020] hover:border-[#E50914]/50 transition-all flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div className="space-y-0.5 min-w-0">
                  <span className="font-bold text-xs text-zinc-900 dark:text-white block truncate">
                    {skill.name}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-[#a3a3a3] block leading-tight">
                    {skill.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTÃO DE AÇÃO: CONTINUAR PARA O CATÁLOGO ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 dark:border-white/10">
          <div className="text-xs text-zinc-500 dark:text-[#737373] flex items-center gap-2 text-center sm:text-left">
            <Code2 className="w-4 h-4 text-[#E50914]" />
            <span>Portfólio governado por IA com 0 warnings no linter e 19 testes automatizados.</span>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E50914] hover:bg-[#b80710] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#E50914]/30 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>{isStandAlonePage ? 'Explorar Catálogo Principal' : t.about.continueToCatalog}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
