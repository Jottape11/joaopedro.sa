import type { GitHubRepo } from '@/types/github'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Jottape11'

export const getGitHubUsername = () => GITHUB_USERNAME

export async function fetchUserRepos(username = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    },
  )

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error(
        'Limite de requisições da API pública do GitHub atingido (Rate Limit). Tente novamente em alguns minutos.',
      )
    }
    if (response.status === 404) {
      throw new Error(`Usuário "${username}" não foi encontrado no GitHub.`)
    }
    throw new Error(`Erro ao buscar repositórios do GitHub: ${response.statusText}`)
  }

  const data: GitHubRepo[] = await response.json()

  // Filtra forks vazios ou arquivados se desejar, e ordena pelos mais recentemente atualizados
  return data
    .filter(repo => !repo.fork)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export async function fetchRepoDetails(
  repoName: string,
  username = GITHUB_USERNAME,
): Promise<GitHubRepo> {
  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`O repositório "${repoName}" não foi encontrado.`)
    }
    if (response.status === 403 || response.status === 429) {
      throw new Error(
        'Limite de requisições da API pública do GitHub atingido. Tente novamente mais tarde.',
      )
    }
    throw new Error(`Falha ao carregar detalhes do projeto: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchRepoReadme(
  repoName: string,
  defaultBranch = 'main',
  username = GITHUB_USERNAME,
): Promise<string | null> {
  try {
    const branches = [defaultBranch, 'main', 'master']
    for (const branch of branches) {
      const res = await fetch(
        `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`,
      )
      if (res.ok) {
        return await res.text()
      }
    }
    return null
  } catch {
    return null
  }
}
