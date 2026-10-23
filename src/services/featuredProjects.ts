import { supabase, isSupabaseConfigured } from './supabase'

const STORAGE_KEY = 'cp3_featured_projects'
const DEFAULT_FEATURED = ['fastapi-game-center', 'steam-store-analytics', 'eco-impacto-brasil-portal']

export async function getFeaturedProjects(): Promise<string[]> {
  // 1. Tenta carregar do Supabase se configurado
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('featured_projects')
        .select('repo_name')
        .order('created_at', { ascending: true })

      if (!error && data && data.length > 0) {
        return data.map((item: { repo_name: string }) => item.repo_name)
      }
    } catch {
      // Fallback para storage local
    }
  }

  // 2. Carrega do localStorage ou retorna padrão
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Ignora erro
    }
  }

  return DEFAULT_FEATURED
}

export async function toggleFeaturedProject(repoName: string): Promise<string[]> {
  const current = await getFeaturedProjects()
  let updated: string[]

  if (current.includes(repoName)) {
    // Não permite remover se for o único destaque
    if (current.length <= 1) {
      throw new Error('Você deve manter pelo menos um projeto em destaque.')
    }
    updated = current.filter(name => name !== repoName)

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('featured_projects').delete().eq('repo_name', repoName)
      } catch {
        // Ignora
      }
    }
  } else {
    // Limite máximo de 6 projetos em destaque na Home
    if (current.length >= 6) {
      throw new Error('Você pode selecionar no máximo 6 projetos para a vitrine principal.')
    }
    updated = [...current, repoName]

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('featured_projects').insert([{ repo_name: repoName }])
      } catch {
        // Ignora
      }
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return updated
}
