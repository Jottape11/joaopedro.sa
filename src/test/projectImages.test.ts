import { describe, it, expect } from 'vitest'
import { getProjectPosterUrl } from '@/services/projectImages'

const ALL_GITHUB_REPOS = [
  'bootstrap',
  'cinelog-tvtime',
  'cp2-function',
  'cp2-login',
  'cp2-loops',
  'cp2-webdev',
  'CP4-DPS',
  'cp4-grid-responsividade',
  'CP5-DPS',
  'eco-impacto-brasil-portal',
  'fastapi-game-center',
  'joaopedro.sa',
  'Jottape11',
  'jp-portfolio',
  'pagina_vendas',
  'projeto-gta',
  'projeto-palmeiras',
  'projeto-treino',
  'sprint3-Jovi',
  'steam-store-analytics',
  'tailwind',
  'totem-ai-receptionist-wireframe',
  'ui-multiverse',
]

describe('Serviço de Pôsteres Fotográficos Reais (Netflix Key Art)', () => {
  it('deve garantir que cada um dos 23 repositórios possua uma imagem ÚNICA e nunca repetida', () => {
    const bannerUrls = new Set<string>()
    const cardUrls = new Set<string>()

    for (const repo of ALL_GITHUB_REPOS) {
      const banner = getProjectPosterUrl(repo, null, 'banner')
      const card = getProjectPosterUrl(repo, null, 'card')

      expect(bannerUrls.has(banner)).toBe(false)
      expect(cardUrls.has(card)).toBe(false)

      bannerUrls.add(banner)
      cardUrls.add(card)
    }

    // O tamanho do Set deve ser exatamente o número total de repositórios (23 imagens distintas)
    expect(bannerUrls.size).toBe(ALL_GITHUB_REPOS.length)
    expect(cardUrls.size).toBe(ALL_GITHUB_REPOS.length)
  })

  it('deve retornar pôster fotográfico específico para repositórios mapeados', () => {
    const bannerFastApi = getProjectPosterUrl('fastapi-game-center', 'Python', 'banner')
    const cardFastApi = getProjectPosterUrl('fastapi-game-center', 'Python', 'card')

    expect(bannerFastApi).toContain('unsplash.com')
    expect(bannerFastApi).toContain('w=1600')
    expect(cardFastApi).toContain('w=640')

    const bannerSteam = getProjectPosterUrl('steam-store-analytics', 'Python', 'banner')
    expect(bannerSteam).toContain('unsplash.com')
  })

  it('deve retornar imagem fotográfica determinística quando repo não for mapeado diretamente', () => {
    const photo1 = getProjectPosterUrl('repo-novo-alpha', 'Python', 'card')
    const photo2 = getProjectPosterUrl('repo-novo-alpha', 'Python', 'card')
    expect(photo1).toBe(photo2)
    expect(photo1).toContain('unsplash.com')
  })

  it('deve retornar fallback fotográfico válido quando nenhum dado for passado', () => {
    const fallback = getProjectPosterUrl()
    expect(fallback).toBeDefined()
    expect(fallback).toContain('unsplash.com')
  })
})
