import React from 'react'
import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguagePicker } from '@/components/common/LanguagePicker'
import { ThemeToggle } from '@/components/common/ThemeToggle'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-white/10 bg-zinc-100/60 dark:bg-[#141414] text-zinc-500 dark:text-[#808080] py-12 px-4 sm:px-6 lg:px-10 transition-colors duration-200 text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        <p className="text-zinc-600 dark:text-[#b3b3b3] text-sm">
          {t.footer.questions}{' '}
          <Link to="/contato" className="underline hover:text-[#E50914] transition-colors">
            {t.nav.contact}
          </Link>
          .
        </p>

        {/* 4-Columns Netflix Style Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="space-y-2.5">
            <Link to="/" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              {t.nav.home}
            </Link>
            <Link to="/projetos" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              {t.nav.projects}
            </Link>
            <a href="https://github.com/Jottape11" target="_blank" rel="noreferrer" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              GitHub Repos
            </a>
          </div>

          <div className="space-y-2.5">
            <Link to="/login?step=profiles" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              {t.profiles.title}
            </Link>
            <Link to="/dashboard" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              {t.nav.dashboard}
            </Link>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="block hover:underline hover:text-zinc-800 dark:hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>

          <div className="space-y-2.5">
            <span className="block text-zinc-400 dark:text-[#666666]">
              FIAP · 1ES 2026
            </span>
            <span className="block text-zinc-400 dark:text-[#666666]">
              Engenharia de Software
            </span>
            <span className="block text-zinc-400 dark:text-[#666666]">
              Checkpoint 3 (CP3)
            </span>
          </div>

          <div className="space-y-2.5">
            <span className="block text-zinc-400 dark:text-[#666666]">
              React 19 & TypeScript
            </span>
            <span className="block text-zinc-400 dark:text-[#666666]">
              BaaS Híbrido Supabase
            </span>
            <span className="block text-zinc-400 dark:text-[#666666]">
              Tailwind CSS & Three.js
            </span>
          </div>
        </div>

        {/* Controls row: Language & Theme & Service Code */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <LanguagePicker variant="select" />
          <ThemeToggle showLabel />
          <button
            type="button"
            className="px-3 py-1.5 border border-zinc-400 dark:border-[#808080] text-zinc-600 dark:text-[#808080] hover:text-zinc-900 dark:hover:text-white hover:border-zinc-700 dark:hover:border-white text-[11px] font-mono transition-colors cursor-pointer"
          >
            {t.footer.serviceCode}
          </button>
        </div>

        {/* Bottom Credits & Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200/60 dark:border-white/5 text-[11px]">
          <p>© {CURRENT_YEAR} João Pedro Sá. {t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Jottape11"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E50914] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
