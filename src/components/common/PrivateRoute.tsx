import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Verificando credenciais...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redireciona para o login preservando a rota de destino
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
