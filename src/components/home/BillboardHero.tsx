import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Star,
} from 'lucide-react'
import type { GitHubRepo } from '@/types/github'
import { useLanguage } from '@/hooks/useLanguage'
import { getProjectPosterUrl } from '@/services/projectImages'

interface BillboardHeroProps {
  repos: GitHubRepo[]
  onOpenDetails: (repo: GitHubRepo) => void
}

// Map de tags e sinopses arquiteturais ricas para os títulos em destaque
const REPO_METADATA: Record<
  string,
  {
    tagline: string
    synopsis: string
    rating: string
    match: string
    seasons: string
  }
> = {
  'fastapi-game-center': {
    tagline: 'ARQUITETURA EM CAMADAS · ASSINATURA ORIGINAL',
    synopsis:
      'Uma imersão completa em engenharia back-end assíncrona: microsserviços FastAPI, camada estrita de Controller e Service, banco relacional SQLite e interface responsiva com Fetch API.',
    rating: '14',
    match: '99%',
    seasons: '1 Temporada (Full-Stack)',
  },
  'steam-store-analytics': {
    tagline: 'DATA PIPELINE & INTEGRAÇÃO REST · POPULAR NO BRASIL',
    synopsis:
      'Plataforma de coleta automatizada, armazenamento não relacional NoSQL e disponibilização via API REST com telemetria e análise estatística da Loja da Steam Brasil.',
    rating: 'L',
    match: '98%',
    seasons: '1 Temporada (Data & REST)',
  },
  'cp4-grid-responsividade': {
    tagline: 'CSS GRID PURO · DESIGN EDITORIAL MODULAR',
    synopsis:
      'Engenharia de layout responsivo sem dependência de frameworks. Duas seções completas utilizando CSS Grid nativo, subgrid e pontos de quebra fluídos do mobile ao ultra-wide.',
    rating: 'L',
    match: '96%',
    seasons: 'Minissérie (UI Design)',
  },
  'totem-ai-receptionist-wireframe': {
    tagline: 'INTERFACE INTELIGENTE · IA GENERATIVA',
    synopsis:
      'Wireframe funcional e fluxo interativo de autoatendimento para recepção corporativa, com processamento de linguagem natural e síntese de voz em tempo real.',
    rating: '12',
    match: '97%',
    seasons: '1 Temporada (AI & TS)',
  },
  'eco-impacto-brasil-portal': {
    tagline: 'SUSTENTABILIDADE & BIOMAS BRASILEIROS',
    synopsis:
      'Portal de monitoramento ecológico e telemetria de carbono para cidades inteligentes, construído com React 19, componentes atômicos e visualização geoespacial.',
    rating: 'L',
    match: '95%',
    seasons: '1 Temporada (React 19)',
  },
  'cinelog-tvtime': {
    tagline: 'CURADORIA DE FILMES & SÉRIES · REST API',
    synopsis:
      'Aplicação web completa para acompanhamento de episódios, temporadas e filmes favoritos com sincronização em nuvem e avaliação em tempo real.',
    rating: '10',
    match: '94%',
    seasons: '1 Temporada (Cinema & JS)',
  },
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ repos, onOpenDetails }) => {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const timerRef = useRef<number | null>(null)

  const activeRepos = repos && repos.length > 0 ? repos : []
  const total = activeRepos.length
  const currentRepo = activeRepos[currentIndex] || activeRepos[0]

  // Rotação automática a cada 5 segundos
  useEffect(() => {
    if (total <= 1 || isPaused) return

    timerRef.current = window.setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total)
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [total, isPaused, currentIndex])

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % total)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + total) % total)
  }

  if (!currentRepo) return null

  const meta = REPO_METADATA[currentRepo.name] || {
    tagline: currentRepo.language ? `W/${currentRepo.language.toUpperCase()}` : t.hero.originalBadge,
    synopsis: currentRepo.description || 'Repositório de código aberto no ecossistema do GitHub.',
    rating: '14',
    match: '97%',
    seasons: 'Edição Especial 2026',
  }

  const posterUrl = getProjectPosterUrl(currentRepo.name, currentRepo.language, 'banner')

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:h-[82vh] lg:min-h-[720px] lg:max-h-[860px] bg-[var(--nf-bg)] text-[var(--nf-text)] flex items-center overflow-hidden select-none transition-colors duration-200"
    >
      {/* ── BACKGROUND POSTER (IMAGEM CINEMATOGRÁFICA REPRESENTATIVA) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Imagem do Projeto em tela cheia no desktop com corte cinematográfico */}
        <img
          key={currentRepo.name}
          src={posterUrl}
          alt={currentRepo.name}
          className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_35%] transition-all duration-700 ease-out"
        />

        {/* Overlay escuro sutil para garantir contraste em fotos claras */}
        <div className="absolute inset-0 bg-black/25 dark:bg-black/40 z-5 pointer-events-none" />

        {/* Gradiente Lateral Esquerdo Adaptável ao Tema (protege leitura do texto) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--nf-bg)] via-[var(--nf-bg)]/85 sm:via-[var(--nf-bg)]/70 to-transparent w-full md:w-3/5 lg:w-1/2 z-10 pointer-events-none transition-colors duration-200" />

        {/* Gradiente Superior para integrar à Navbar perfeitamente sem cortes */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--nf-bg)]/90 via-[var(--nf-bg)]/40 to-transparent z-10 pointer-events-none transition-colors duration-200" />

        {/* Gradiente Inferior para fundir com os trilhos Lolomo */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[var(--nf-bg)] via-[var(--nf-bg)]/80 to-transparent z-10 pointer-events-none transition-colors duration-200" />
      </div>

      {/* ── MANUAL NAVIGATION BUTTONS (CHEVRONS) ── */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Projeto Anterior"
        className="absolute left-2 sm:left-4 z-30 p-2 sm:p-3 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/90 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/15 backdrop-blur-md transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Próximo Projeto"
        className="absolute right-2 sm:right-4 z-30 p-2 sm:p-3 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/90 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/15 backdrop-blur-md transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-xl"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── BILLBOARD MAIN CONTENT CARD ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-20 sm:pb-28 flex flex-col justify-center space-y-4 sm:space-y-5">
        {/* Top Tagline / Selo de Originalidade Netflix */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-xs bg-[#E50914] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-red-700/40">
            N
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#E50914] uppercase">
            {meta.tagline}
          </span>
        </div>

        {/* Nome do Projeto em Escala Monumental Netflix */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] max-w-3xl text-zinc-900 dark:text-white drop-shadow-md">
          {currentRepo.name}
        </h1>

        {/* Linha de Metadados Cinematográficos (Relevância, Ano, Classificação, Qualidade) */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium">
          <span className="font-bold text-[#16a34a] dark:text-[#46D369]">{meta.match} {t.hero.match}</span>
          <span className="text-zinc-500 dark:text-[#b3b3b3]">
            {currentRepo.updated_at
              ? new Date(currentRepo.updated_at).getFullYear()
              : '2026'}
          </span>
          <span className="px-1.5 py-0.2 rounded-xs border border-zinc-400 dark:border-white/40 text-zinc-800 dark:text-white font-mono text-xs">
            {meta.rating}
          </span>
          <span className="px-1.5 py-0.2 rounded-xs border border-zinc-300 dark:border-white/20 text-zinc-500 dark:text-[#b3b3b3] text-xs">
            ULTRA HD
          </span>
          <span className="text-zinc-500 dark:text-[#b3b3b3] hidden sm:inline">{meta.seasons}</span>
          <span className="text-[#E50914] font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{currentRepo.stargazers_count}</span>
          </span>
        </div>

        {/* Sinopse da Arquitetura */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed drop-shadow-xs line-clamp-3">
          {meta.synopsis}
        </p>

        {/* Botões de Ação do Billboard */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {/* Botão Primário ("Assistir" adaptado para Explorar Projeto) */}
          <Link
            to={`/projetos/${currentRepo.name}`}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-white/90 dark:text-black font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>{t.hero.exploreButton}</span>
          </Link>

          {/* Botão Secundário (Mais Informações com Modal) */}
          <button
            type="button"
            onClick={() => onOpenDetails(currentRepo)}
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-zinc-200/90 hover:bg-zinc-300 text-zinc-900 dark:bg-[rgba(109,109,110,0.7)] dark:hover:bg-[rgba(109,109,110,0.5)] dark:text-white font-bold text-sm sm:text-base flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer border border-zinc-300/80 dark:border-transparent"
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t.hero.moreInfoButton}</span>
          </button>
        </div>

        {/* Story Pagination Indicators (Progresso do Carrossel de 5s) */}
        <div className="flex items-center gap-1.5 pt-4">
          {activeRepos.map((r, idx) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Banner ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#E50914]'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
          <span className="text-[10px] text-zinc-400 font-mono ml-2">
            {language === 'pt' ? 'ROTAÇÃO: 5S' : 'ROTATION: 5S'} ({currentIndex + 1}/{total})
          </span>
        </div>
      </div>

      {/* ── RIGHT BADGE: AUDIO TOGGLE & MATURITY TAG ── */}
      <div className="absolute right-0 bottom-24 sm:bottom-28 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMuted(prev => !prev)}
          aria-label={isMuted ? t.hero.soundOn : t.hero.soundOff}
          title={isMuted ? t.hero.soundOn : t.hero.soundOff}
          className="p-2 sm:p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="bg-[#333333]/80 border-l-3 border-white py-1 px-3 sm:px-4 text-xs font-bold text-white tracking-wider flex items-center gap-2">
          <span>{meta.rating}</span>
          <span className="hidden sm:inline font-mono text-[10px] text-zinc-300">
            FIAP 2026
          </span>
        </div>
      </div>
    </div>
  )
}
