import { useQuery } from '@tanstack/react-query'
import { fetchUserRepos, fetchRepoDetails, fetchRepoReadme } from '@/services/github'

export function useGitHubRepos() {
  return useQuery({
    queryKey: ['github-repos'],
    queryFn: () => fetchUserRepos(),
    staleTime: 1000 * 60 * 10, // 10 minutos de cache fresco (atende Requisito 8: sem requisições repetidas ao navegar)
    gcTime: 1000 * 60 * 30, // 30 minutos de persistência em memória
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useGitHubRepoDetails(repoName: string | undefined) {
  return useQuery({
    queryKey: ['github-repo', repoName],
    queryFn: () => fetchRepoDetails(repoName!),
    enabled: Boolean(repoName),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useGitHubRepoReadme(repoName: string | undefined, defaultBranch = 'main') {
  return useQuery({
    queryKey: ['github-readme', repoName, defaultBranch],
    queryFn: () => fetchRepoReadme(repoName!, defaultBranch),
    enabled: Boolean(repoName),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  })
}
