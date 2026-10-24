import { useContext } from 'react'
import { LanguageContext } from '@/context/languageContextDef'

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser utilizado dentro de um LanguageProvider')
  }
  return context
}

