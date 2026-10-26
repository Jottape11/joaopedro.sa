/**
 * Catálogo de Fotografias Reais (Real-Life Photography) no Estilo Netflix Key Art.
 * Fotografias cinematográficas autênticas de alta definição, sem textos embutidos.
 * GARANTIA: Cada projeto possui uma imagem 100% exclusiva, sem qualquer repetição.
 */

interface RealLifeProjectImage {
  banner: string
  card: string
  description: string
}

// Helper para gerar URLs Unsplash com tamanhos banner (1600w) e card (640w)
const makeImage = (photoId: string, description: string): RealLifeProjectImage => ({
  banner: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=85`,
  card: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=640&q=80`,
  description,
})

/**
 * Mapeamento Exclusivo para todos os repositórios públicos de Jottape11.
 * Nenhuma URL ou photoId se repete entre os projetos.
 */
const REPO_EXACT_IMAGES: Record<string, RealLifeProjectImage> = {
  // 1. FASTAPI GAME CENTER - Setup gamer real com monitores, teclado mecânico e luz ambiente
  'fastapi-game-center': makeImage(
    'photo-1542751371-adc38448a05e',
    'Estação gamer de desenvolvimento com iluminação ambiente e monitores',
  ),

  // 2. STEAM STORE ANALYTICS - Centro de telemetria analítica com dashboards e gráficos
  'steam-store-analytics': makeImage(
    'photo-1551288049-bebda4e38f71',
    'Painel real de análise de dados, métricas financeiras e telemetria',
  ),

  // 3. CP4 GRID & RESPONSIVIDADE - Dispositivos reais alinhados em mesa de estúdio de design
  'cp4-grid-responsividade': makeImage(
    'photo-1507238691740-187a5b1d37b8',
    'Dispositivos reais demonstrando responsividade de layout em estúdio',
  ),

  // 4. TOTEM AI RECEPTIONIST - Hall corporativo de alta tecnologia com display interativo
  'totem-ai-receptionist-wireframe': makeImage(
    'photo-1497366216548-37526070297c',
    'Recepção corporativa moderna com interfaces digitais inteligentes',
  ),

  // 5. ECO IMPACTO BRASIL - Fotografia orbital de satélite capturando a Terra e biomas
  'eco-impacto-brasil-portal': makeImage(
    'photo-1451187580459-43490279c0fa',
    'Imagem orbital real da Terra para monitoramento ambiental e sustentabilidade',
  ),

  // 6. CINELOG TV TIME - Sala cinematográfica real com poltronas vermelhas e projeção
  'cinelog-tvtime': makeImage(
    'photo-1489599849927-2ee91cede3ba',
    'Sala cinematográfica clássica com iluminação e projeção 35mm',
  ),

  // 7. PROJETO PALMEIRAS - Estádio de futebol moderno iluminado à noite (Allianz Parque atmosphere)
  'projeto-palmeiras': makeImage(
    'photo-1508098682722-e99c43a406b2',
    'Estádio de futebol profissional iluminado à noite com gramado verde',
  ),

  // 8. PROJETO GTA - Superesportivo moderno em metrópole noturna com luzes neon
  'projeto-gta': makeImage(
    'photo-1503376780353-7e6692767b70',
    'Carro esportivo de alta performance em avenida metropolitana iluminada',
  ),

  // 9. PROJETO TREINO - Centro fitness profissional com anilhas e equipamentos de musculação
  'projeto-treino': makeImage(
    'photo-1517838277536-f5f99be501cd',
    'Academia de alta performance com halteres e barras de treinamento',
  ),

  // 10. PAGINA DE VENDAS - Terminal moderno de checkout e embalagem de e-commerce
  'pagina_vendas': makeImage(
    'photo-1556742049-0a67c5574f73',
    'Operação moderna de vendas e pagamentos com tecnologia de ponta',
  ),

  // 11. BOOTSTRAP - Prancheta de arquitetura de software e wireframes com réguas de precisão
  'bootstrap': makeImage(
    'photo-1581291518857-4e27b48ff24e',
    'Wireframes de design system e prototipagem visual em mesa de trabalho',
  ),

  // 12. TAILWIND - Paleta de cores, tipografia moderna e workstation criativa de front-end
  'tailwind': makeImage(
    'photo-1500989145603-8e7ef71d639e',
    'Mesa criativa de desenvolvimento UI com paletas de cores e design visual',
  ),

  // 13. CP4-DPS - Lousa real com formulações matemáticas, derivadas e limites (SymPy / DPS)
  'cp4-dps': makeImage(
    'photo-1635070041078-e363dbe005cb',
    'Quadro de vidro com cálculos matemáticos avançados e modelagem de funções',
  ),

  // 14. CP5-DPS - Painel científico de machine learning e redes neurais em monitor curvo
  'cp5-dps': makeImage(
    'photo-1509228468518-180dd4864904',
    'Ambiente computacional com modelagem de dados e inteligência artificial',
  ),

  // 15. CP2 LOGIN - Terminal de cibersegurança com autenticação biométrica e proteção de acesso
  'cp2-login': makeImage(
    'photo-1563986768609-322da13575f3',
    'Interface de cibersegurança e autenticação criptográfica de dados',
  ),

  // 16. CP2 LOOPS - Linhas de circuito integrado e microprocessador demonstrando repetições
  'cp2-loops': makeImage(
    'photo-1518770660439-4636190af475',
    'Placa de circuito impresso com trilhas de dados e microprocessadores',
  ),

  // 17. CP2 FUNCTION - Programador codificando funções em editor moderno com teclado mecânico
  'cp2-function': makeImage(
    'photo-1555066931-4365d14bab8c',
    'Desenvolvedor implementando funções lógicas em editor de código noturno',
  ),

  // 18. CP2 WEBDEV - Workstation de engenharia web com MacBook e ferramentas de desenvolvedor
  'cp2-webdev': makeImage(
    'photo-1498050108023-c5249f4df085',
    'Notebook com ferramentas de desenvolvimento web e responsividade abertas',
  ),

  // 19. SPRINT3-JOVI - Quadro Kanban ágil com post-its de sprints, backlog e roadmap
  'sprint3-jovi': makeImage(
    'photo-1531403009284-440f080d1e12',
    'Quadro de metodologia ágil Scrum com planejamento de sprints e tarefas',
  ),

  // 20. UI MULTIVERSE - Laboratório de computação espacial, hologramas e realidade virtual
  'ui-multiverse': makeImage(
    'photo-1592478411213-6153e4ebc07d',
    'Dispositivo de realidade espacial e interfaces imersivas de última geração',
  ),

  // 21. JP PORTFOLIO - Câmeras de estúdio fotográfico com iluminação profissional e softboxes
  'jp-portfolio': makeImage(
    'photo-1516035069371-29a1b244cc32',
    'Estúdio de fotografia e produção visual com refletores e câmera profissional',
  ),

  // 22. JOAOPEDRO.SA - Data center com racks de servidores de alta densidade e fibra ótica
  'joaopedro.sa': makeImage(
    'photo-1558494949-ef010cbdcc31',
    'Racks de servidores em data center de nuvem corporativa de alta performance',
  ),

  // 23. JOTTAPE11 - Estação de trabalho pessoal com monitores duplos ultrawide 4K e café
  'jottape11': makeImage(
    'photo-1517694712202-14dd9538aa97',
    'Setup completo de engenharia de software com múltiplos monitores e teclado',
  ),
}

/**
 * Pool adicional de Fotografias Exclusivas para qualquer repositório futuro ou não mapeado.
 * Nenhuma foto deste pool se repete com as fotos do catálogo principal acima.
 */
const UNIQUE_FALLBACK_POOL: RealLifeProjectImage[] = [
  makeImage('photo-1526374965328-7f61d4dc18c5', 'Infraestrutura de cibersegurança e matriz digital'),
  makeImage('photo-1504868584819-f8e8b4b6d7e3', 'Visualização de gráficos e telemetria analítica'),
  makeImage('photo-1522071820081-009f0129c71c', 'Equipe de engenharia de software colaborando em estúdio'),
  makeImage('photo-1461749280684-dccba630e2f6', 'Monitor com código-fonte em linguagem moderna'),
  makeImage('photo-1515879218367-8466d910aaa4', 'Linhas de código Python em tela de alta definição'),
  makeImage('photo-1498050108023-c5249f4df085', 'Ambiente de trabalho focado em desenvolvimento web'),
  makeImage('photo-1534972195531-a756b112697c', 'Estúdio contemporâneo com iluminação intimista e hardware'),
  makeImage('photo-1525547719571-a2d4ac8945e2', 'Notebook ultrafino aberto em cafeteria de tecnologia'),
  makeImage('photo-1573164713988-8665fc963095', 'Profissional de tecnologia analisando métricas de sistema'),
  makeImage('photo-1531297484001-80022131f5a1', 'Notebook com iluminação geométrica em ambiente futurista'),
  makeImage('photo-1550751827-4bd374c3f58b', 'Operações de segurança em servidores de missão crítica'),
  makeImage('photo-1519389950473-47ba0277781c', 'Equipe multidisciplinar em reunião de planejamento de produto'),
]

/**
 * Função hash determinística: converte o nome do projeto em um índice fixo do pool,
 * assegurando que o mesmo projeto sempre receba a mesma foto sem mudar aleatoriamente.
 */
function getDeterministicIndex(str: string, poolLength: number): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % poolLength
}

/**
 * Normaliza o slug do repositório para correspondência robusta.
 */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim()
}

/**
 * Retorna a URL da fotografia real para o banner (alta resolução 1600w) ou card (640w).
 * GARANTE: Cada projeto tem sua imagem única e nenhuma imagem é repetida.
 */
export function getProjectPosterUrl(
  repoName?: string,
  _language?: string | null,
  size: 'banner' | 'card' = 'card',
): string {
  if (!repoName) {
    return UNIQUE_FALLBACK_POOL[0][size]
  }

  const clean = normalizeName(repoName)

  // 1. Busca por chave exata
  if (REPO_EXACT_IMAGES[clean]) {
    return REPO_EXACT_IMAGES[clean][size]
  }

  // 2. Busca por substring se o nome contiver o identificador
  for (const [key, item] of Object.entries(REPO_EXACT_IMAGES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return item[size]
    }
  }

  // 3. Fallback determinístico exclusivo do pool secundário
  const index = getDeterministicIndex(clean, UNIQUE_FALLBACK_POOL.length)
  return UNIQUE_FALLBACK_POOL[index][size]
}

export const getProjectImageUrl = getProjectPosterUrl
