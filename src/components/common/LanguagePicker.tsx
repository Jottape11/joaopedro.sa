import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface LanguagePickerProps {
  variant?: 'minimal' | 'select' | 'compact'
  className?: string
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  variant = 'select',
  className = '',
}) => {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-white/40 transition-colors cursor-pointer text-zinc-800 dark:text-zinc-200 ${className}`}
        title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      >
        <Globe className="w-3.5 h-3.5 text-[#E50914]" />
        <span className="font-mono text-[11px] font-bold">{language.toUpperCase()}</span>
      </button>
    )
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border border-zinc-300 dark:border-white/20 bg-white/80 dark:bg-black/60 hover:border-zinc-400 dark:hover:border-white/40 transition-all text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t.lang.label}
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#E50914]" />
          <span>{language === 'pt' ? 'Português' : 'English'}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-1.5 w-36 rounded-md bg-white dark:bg-[#1f1f1f] border border-zinc-200 dark:border-white/15 shadow-xl py-1 z-50 text-xs font-medium text-zinc-800 dark:text-zinc-200 animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setLanguage('pt')
              setIsOpen(false)
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ${
              language === 'pt' ? 'text-[#E50914] font-bold bg-zinc-50 dark:bg-white/5' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇧🇷</span>
              <span>Português</span>
            </span>
            {language === 'pt' && <Check className="w-3.5 h-3.5 text-[#E50914]" />}
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setLanguage('en')
              setIsOpen(false)
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ${
              language === 'en' ? 'text-[#E50914] font-bold bg-zinc-50 dark:bg-white/5' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇺🇸</span>
              <span>English</span>
            </span>
            {language === 'en' && <Check className="w-3.5 h-3.5 text-[#E50914]" />}
          </button>
        </div>
      )}
    </div>
  )
}

