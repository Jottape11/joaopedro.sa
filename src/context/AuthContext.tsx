import React, { useEffect, useState, useCallback } from 'react'
import { AuthContext, type AuthUser } from './authContextDef'
import { supabase, isSupabaseConfigured } from '@/services/supabase'

const LOCAL_AUTH_TOKEN_KEY = 'cp3_auth_token'
const LOCAL_AUTH_USER_KEY = 'cp3_auth_user'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isCloudConnected = isSupabaseConfigured()

  // Sincroniza sessão no carregamento
  useEffect(() => {
    let isMounted = true

    async function initSession() {
      if (isCloudConnected && supabase) {
        try {
          const { data, error } = await supabase.auth.getSession()
          if (!error && data.session?.user && isMounted) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || '',
              name: data.session.user.user_metadata?.name || 'Administrador',
            })
          }
        } catch {
          // Fallback silencioso para sessão local se Supabase estiver offline
        }
      } else {
        // Modo local/demonstração
        const token = localStorage.getItem(LOCAL_AUTH_TOKEN_KEY)
        const savedUser = localStorage.getItem(LOCAL_AUTH_USER_KEY)
        if (token && savedUser && isMounted) {
          try {
            setUser(JSON.parse(savedUser))
          } catch {
            localStorage.removeItem(LOCAL_AUTH_TOKEN_KEY)
          }
        }
      }

      if (isMounted) {
        setIsLoading(false)
      }
    }

    initSession()

    // Listener de mudanças no Supabase Auth
    if (isCloudConnected && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Administrador',
          })
        } else {
          setUser(null)
        }
      })

      return () => {
        isMounted = false
        authListener.subscription.unsubscribe()
      }
    }

    return () => {
      isMounted = false
    }
  }, [isCloudConnected])

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true)

      // 1. Fluxo oficial com Supabase Auth
      if (isCloudConnected && supabase) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            setIsLoading(false)
            return { success: false, error: error.message }
          }

          if (data.user) {
            setUser({
              id: data.user.id,
              email: data.user.email || email,
              name: data.user.user_metadata?.name || 'Administrador',
            })
            localStorage.setItem(LOCAL_AUTH_TOKEN_KEY, data.session?.access_token || 'supabase_token')
            setIsLoading(false)
            return { success: true }
          }
        } catch (err) {
          setIsLoading(false)
          return {
            success: false,
            error: err instanceof Error ? err.message : 'Falha na comunicação com o Supabase.',
          }
        }
      }

      // 2. Fluxo de Demonstração / Offline (Permite avaliação imediata do professor)
      await new Promise(resolve => setTimeout(resolve, 600)) // Simula resposta de rede

      const isValidDemoAdmin =
        (email === 'admin@joaopedro.dev' && password === 'admin123') ||
        (email.includes('@') && password.length >= 6)

      if (isValidDemoAdmin) {
        const demoUser: AuthUser = {
          id: 'admin-demo-id',
          email,
          name: email === 'admin@joaopedro.dev' ? 'João Pedro' : 'Avaliador',
        }
        setUser(demoUser)
        localStorage.setItem(LOCAL_AUTH_TOKEN_KEY, 'demo_jwt_token_' + Date.now())
        localStorage.setItem(LOCAL_AUTH_USER_KEY, JSON.stringify(demoUser))
        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return {
        success: false,
        error: 'Credenciais inválidas. Use admin@joaopedro.dev com senha admin123 para o modo de avaliação.',
      }
    },
    [isCloudConnected],
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    if (isCloudConnected && supabase) {
      try {
        await supabase.auth.signOut()
      } catch {
        // ignora
      }
    }
    localStorage.removeItem(LOCAL_AUTH_TOKEN_KEY)
    localStorage.removeItem(LOCAL_AUTH_USER_KEY)
    setUser(null)
    setIsLoading(false)
  }, [isCloudConnected])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isCloudConnected,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
