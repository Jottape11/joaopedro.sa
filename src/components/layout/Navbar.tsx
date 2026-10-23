import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, Menu, X, Code2, FolderGit2, Mail, ShieldAlert } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Início', path: '/', icon: Code2 },
    { name: 'Projetos', path: '/projetos', icon: FolderGit2 },
    { name: 'Contato', path: '/contato', icon: Mail },
    { name: 'Dashboard', path: '/dashboard', icon: ShieldAlert },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white'
        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            JP
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm tracking-tight leading-none">
              João Pedro
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Controls: Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
            className="p-2 rounded-lg border border-zinc-200 bg-zinc-100/50 text-zinc-700 hover:bg-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Abrir menu de navegação"
            className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

