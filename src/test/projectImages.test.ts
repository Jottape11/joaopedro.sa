import { describe, it, expect } from 'vitest'
import { getProjectPosterUrl } from '@/services/projectImages'

describe('Serviço de Pôsteres Fotográficos Reais (Netflix Key Art)', () => {
  it('deve retornar pôster fotográfico específico para repositórios mapeados', () => {
    const bannerFastApi = getProjectPosterUrl('fastapi-game-center', 'Python', 'banner')
    const cardFastApi = getProjectPosterUrl('fastapi-game-center', 'Python', 'card')

    expect(bannerFastApi).toContain('unsplash.com')
    expect(bannerFastApi).toContain('w=1600')
    expect(cardFastApi).toContain('w=640')

    const bannerSteam = getProjectPosterUrl('steam-store-analytics', 'Python', 'banner')
    expect(bannerSteam).toContain('unsplash.com')
  })

  it('deve retornar imagem fotográfica adequada baseada na stack se o repo não tiver foto específica', () => {
    const pythonPhoto = getProjectPosterUrl('meu-script-novo', 'Python', 'card')
    expect(pythonPhoto).toBeDefined()
    expect(pythonPhoto).toContain('unsplash.com')

    const frontendPhoto = getProjectPosterUrl('meu-app-react', 'TypeScript', 'card')
    expect(frontendPhoto).toBeDefined()
    expect(frontendPhoto).toContain('unsplash.com')
  })

  it('deve retornar fallback fotográfico válido quando nenhum dado for passado', () => {
    const fallback = getProjectPosterUrl()
    expect(fallback).toBeDefined()
    expect(fallback).toContain('unsplash.com')
  })
})

