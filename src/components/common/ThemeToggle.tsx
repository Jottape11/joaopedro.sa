import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 p-2 rounded-md border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-black/60 hover:border-zinc-400 dark:hover:border-white/40 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer shadow-xs ${className}`}
      title={isDark ? t.theme.light : t.theme.dark}
      aria-label={t.theme.toggle}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-90 duration-200" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold">{isDark ? t.theme.light : t.theme.dark}</span>
      )}
    </button>
  )
}

