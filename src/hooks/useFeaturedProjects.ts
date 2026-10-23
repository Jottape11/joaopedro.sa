import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFeaturedProjects, toggleFeaturedProject } from '@/services/featuredProjects'

export function useFeaturedProjects() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['featured-projects'],
    queryFn: getFeaturedProjects,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  })

  const mutation = useMutation({
    mutationFn: (repoName: string) => toggleFeaturedProject(repoName),
    onSuccess: updated => {
      queryClient.setQueryData(['featured-projects'], updated)
      queryClient.invalidateQueries({ queryKey: ['featured-projects'] })
    },
  })

  return {
    featuredProjects: query.data || [],
    isLoading: query.isLoading,
    toggleFeatured: mutation.mutateAsync,
    isToggling: mutation.isPending,
  }
}
