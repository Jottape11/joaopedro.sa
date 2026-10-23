import { useContext } from 'react'
import { ThemeContext, type ThemeContextType } from '@/context/themeContextDef'

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider')
  }
  return context
}
