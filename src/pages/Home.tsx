import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGitHubRepos } from '@/hooks/useGitHub'
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects'
import { useLanguage } from '@/hooks/useLanguage'
import { BillboardHero } from '@/components/home/BillboardHero'
import { LolomoRail } from '@/components/home/LolomoRail'
import { ProjectQuickViewModal } from '@/components/projects/ProjectQuickViewModal'
import type { GitHubRepo } from '@/types/github'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { data: repos, isLoading: isReposLoading } = useGitHubRepos()
  const { featuredProjects, isLoading: isFeaturedLoading } = useFeaturedProjects()

  const [modalRepo, setModalRepo] = useState<GitHubRepo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Redireciona para o fluxo inicial de Cadastro/Login e Seleção de Perfil caso ainda não tenha entrado
  useEffect(() => {
    const hasSelected = localStorage.getItem('nf_profile_selected') === 'true'
    if (!hasSelected) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const isLoading = isReposLoading || isFeaturedLoading

  const handleOpenDetails = (repo: GitHubRepo) => {
    setModalRepo(repo)
    setIsModalOpen(true)
  }

  // Projetos filtrados dinamicamente para o Billboard e Destaques
  const billboardRepos = useMemo(() => {
    if (!repos || repos.length === 0) return []
    // Prioriza os projetos selecionados no Dashboard como destaques
    const selected = repos.filter(repo => featuredProjects.includes(repo.name))
    if (selected.length > 0) return selected
    // Fallback: primeiros 6 repositórios
    return repos.slice(0, 6)
  }, [repos, featuredProjects])

  // Top 10 Títulos (Ordenados por estrelas e relevância)
  const top10Repos = useMemo(() => {
    if (!repos || repos.length === 0) return []
    return [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10)
  }, [repos])

  // Séries de Back-End & Python
  const pythonRepos = useMemo(() => {
    if (!repos) return []
    return repos.filter(
      r =>
        r.language?.toLowerCase() === 'python' ||
        r.name.toLowerCase().includes('fastapi') ||
        r.name.toLowerCase().includes('dps') ||
        r.name.toLowerCase().includes('analytics'),
    )
  }, [repos])

  // Front-End, React & UI Engineering
  const frontendRepos = useMemo(() => {
    if (!repos) return []
    return repos.filter(
      r =>
        r.language?.toLowerCase() === 'react' ||
        r.language?.toLowerCase() === 'typescript' ||
        r.language?.toLowerCase() === 'javascript' ||
        r.language?.toLowerCase() === 'css' ||
        r.language?.toLowerCase() === 'html' ||
        r.name.toLowerCase().includes('grid') ||
        r.name.toLowerCase().includes('totem') ||
        r.name.toLowerCase().includes('eco'),
    )
  }, [repos])

  return (
    <div className="w-full bg-[var(--nf-bg)] text-[var(--nf-text)] space-y-6 sm:space-y-10 pb-16 transition-colors duration-200">
      {/* ── 1. BILLBOARD HERO (BANNER PRINCIPAL COM ROTAÇÃO 5S + CONTROLES MANUAIS) ── */}
      {isLoading ? (
        <div className="w-full h-[520px] sm:h-[620px] bg-zinc-900 animate-pulse flex items-center justify-center">
          <div className="text-zinc-500 font-mono text-sm">
            {t.hero.loading}
          </div>
        </div>
      ) : (
        <BillboardHero
          repos={billboardRepos}
          onOpenDetails={handleOpenDetails}
        />
      )}

      {/* ── 2. LOLOMO RAILS (TRILHOS HORIZONTAIS ESTILO NETFLIX) ── */}
      <div className="space-y-6 sm:space-y-8 -mt-12 sm:-mt-16 relative z-20">
        {/* Trilho 1: Top 10 no Brasil Hoje (com os números gigantes vazados) */}
        {!isLoading && top10Repos.length > 0 && (
          <LolomoRail
            title={t.rails.top10Title}
            subtitle={t.rails.top10Subtitle}
            repos={top10Repos}
            isTop10
            onOpenDetails={handleOpenDetails}
          />
        )}

        {/* Trilho 2: Destaques Selecionados pelo Dono (Studio Picks) */}
        {!isLoading && billboardRepos.length > 0 && (
          <LolomoRail
            title={t.rails.popularTitle}
            subtitle={t.rails.popularSubtitle}
            repos={billboardRepos}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {/* Trilho 3: Séries de Back-End & Python */}
        {!isLoading && pythonRepos.length > 0 && (
          <LolomoRail
            title={t.rails.backendTitle}
            subtitle={t.rails.backendSubtitle}
            repos={pythonRepos}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {/* Trilho 4: Front-End & UI Engineering */}
        {!isLoading && frontendRepos.length > 0 && (
          <LolomoRail
            title={t.rails.frontendTitle}
            subtitle={t.rails.frontendSubtitle}
            repos={frontendRepos}
            onOpenDetails={handleOpenDetails}
          />
        )}
      </div>

      {/* ── 3. MODAL DE VISUALIZAÇÃO RÁPIDA (DETAIL SHEET ESTILO NETFLIX) ── */}
      <ProjectQuickViewModal
        repo={modalRepo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
