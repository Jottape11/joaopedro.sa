import React, { useEffect, useState } from 'react'
import { ThemeContext, type Theme } from './themeContextDef'

const STORAGE_KEY = 'cp3_portfolio_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    // 2. Se não houver, respeita a preferência do sistema operacional
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

