/**
 * Catálogo de Fotografias Reais (Real-Life Photography) no Estilo Netflix Key Art.
 * Fotografias cinematográficas autênticas de alta definição, sem textos embutidos,
 * garantindo legibilidade perfeita com as sobreposições dinâmicas da interface.
 */

interface RealLifeProjectImage {
  banner: string
  card: string
  description: string
}

const REAL_LIFE_IMAGES: Record<string, RealLifeProjectImage> = {
  // 1. FASTAPI GAME CENTER - Setup real de jogos com monitores, teclado mecânico e luz ambiente
  'fastapi-game-center': {
    banner:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=80',
    description: 'Estação real de jogos com iluminação ambiente e monitores',
  },

  // 2. STEAM STORE ANALYTICS - Centro de telemetria real com múltiplos painéis de dados e métricas
  'steam-store-analytics': {
    banner:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80',
    description: 'Painel real de análise de dados e métricas financeiras',
  },

  // 3. CP4 GRID & RESPONSIVIDADE - Dispositivos reais (MacBook, iPad e celular) alinhados em mesa de estúdio
  'cp4-grid-responsividade': {
    banner:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=640&q=80',
    description: 'Dispositivos reais demonstrando responsividade em estúdio',
  },

  // 4. TOTEM AI RECEPTIONIST - Hall corporativo moderno com displays digitais interativos e vidro
  'totem-ai-receptionist-wireframe': {
    banner:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=80',
    description: 'Recepção corporativa de alta tecnologia com interfaces digitais',
  },

  // 5. ECO IMPACTO BRASIL - Fotografia orbital real de satélite capturando a Terra e os biomas
  'eco-impacto-brasil-portal': {
    banner:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=640&q=80',
    description: 'Imagem orbital real da Terra e monitoramento ambiental',
  },

  // 6. CINELOG TV TIME - Sala real de cinema com poltronas vermelhas e feixe de luz de projetor 35mm
  'cinelog-tvtime': {
    banner:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=640&q=80',
    description: 'Sala cinematográfica real com atmosfera de projeção',
  },
}

// Fotografias reais para categorias e linguagens de outros repositórios
const STACK_REAL_IMAGES: Record<string, RealLifeProjectImage> = {
  python: {
    banner:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=80',
    description: 'Servidores reais em data center corporativo',
  },
  frontend: {
    banner:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&q=80',
    description: 'Mesa de trabalho real de desenvolvedor em ambiente noturno',
  },
  data: {
    banner:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=640&q=80',
    description: 'Visualização real de telemetria analítica',
  },
  math: {
    banner:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=640&q=80',
    description: 'Lousa real com formulações matemáticas avançadas',
  },
  default: {
    banner:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85',
    card:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=640&q=80',
    description: 'Ambiente cinematográfico real de tecnologia e software',
  },
}

/**
 * Retorna a URL da fotografia real para o banner (alta resolução) ou card (otimizada).
 * Totalmente real-life, sem desenhos ou ilustrações vetoriais, e sem texto embutido.
 */
export function getProjectPosterUrl(
  repoName?: string,
  language?: string | null,
  size: 'banner' | 'card' = 'card',
): string {
  if (!repoName) {
    return STACK_REAL_IMAGES.default[size]
  }

  const clean = repoName.toLowerCase().trim()

  // 1. Busca por correspondência direta nos projetos principais
  for (const [key, item] of Object.entries(REAL_LIFE_IMAGES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return item[size]
    }
  }

  // 2. Classificação por tecnologia/stack caso seja outro repositório
  const lang = (language || '').toLowerCase()
  if (lang.includes('python') || clean.includes('fastapi') || clean.includes('django')) {
    return STACK_REAL_IMAGES.python[size]
  }

  if (
    lang.includes('react') ||
    lang.includes('typescript') ||
    lang.includes('javascript') ||
    lang.includes('css') ||
    lang.includes('html')
  ) {
    return STACK_REAL_IMAGES.frontend[size]
  }

  if (clean.includes('analytics') || clean.includes('data') || clean.includes('sql')) {
    return STACK_REAL_IMAGES.data[size]
  }

  if (clean.includes('calculo') || clean.includes('math') || clean.includes('limite')) {
    return STACK_REAL_IMAGES.math[size]
  }

  // 3. Fallback fotográfico geral
  return STACK_REAL_IMAGES.default[size]
}

export const getProjectImageUrl = getProjectPosterUrl

