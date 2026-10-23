export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('cp3_auth_token') !== null
}

