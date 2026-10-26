import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import { useLanguage } from '@/hooks/useLanguage'

describe('Internacionalização i18n - LanguageContext (Requisito 6)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  )

  it('deve inicializar com idioma padrão em português e carregar textos corretos', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })

    expect(result.current.language).toBe('pt')
    expect(result.current.t.nav.home).toBe('Início')
    expect(result.current.t.nav.about).toBe('Sobre Mim')
    expect(result.current.t.nav.projects).toBe('Séries & Projetos')
    expect(result.current.t.contact.badge).toBe('Central de Atendimento a Recrutadores & Produção')
    expect(result.current.t.about.title).toBe('Olá, eu sou o João Pedro Sá!')
  })

  it('deve alternar para inglês e carregar traduções correspondentes', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })

    act(() => {
      result.current.setLanguage('en')
    })

    expect(result.current.language).toBe('en')
    expect(result.current.t.nav.home).toBe('Home')
    expect(result.current.t.nav.about).toBe('About Me')
    expect(result.current.t.nav.projects).toBe('Series & Projects')
    expect(result.current.t.contact.badge).toBe('Recruiter & Production Help Center')
    expect(result.current.t.about.title).toBe('Hello, I am João Pedro Sá!')
  })

  it('deve alternar ciclicamente com toggleLanguage', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper })

    act(() => {
      result.current.toggleLanguage()
    })
    expect(result.current.language).toBe('en')

    act(() => {
      result.current.toggleLanguage()
    })
    expect(result.current.language).toBe('pt')
  })
})

