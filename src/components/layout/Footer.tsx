import React from 'react'
import { Cpu, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 py-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright & Degree */}
        <div className="flex flex-col sm:items-start items-center text-xs text-zinc-500 dark:text-zinc-400 gap-1">
          <p>© {CURRENT_YEAR} João Pedro. FIAP - Engenharia de Software.</p>
          <p className="flex items-center gap-1">
            Construído com React, TypeScript & Tailwind <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>

        {/* Right: Social & AI Harness link */}
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/Jottape11"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <Cpu className="w-3 h-3" />
            <span>AI Harness v1.0</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

