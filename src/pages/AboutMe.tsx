import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WelcomeSection } from '@/components/common/WelcomeSection'

export const AboutMe: React.FC = () => {
  const navigate = useNavigate()
  const activeProfile = typeof window !== 'undefined'
    ? localStorage.getItem('nf_active_profile') || 'Recrutador'
    : 'Recrutador'

  return (
    <div className="py-4 sm:py-8">
      <WelcomeSection
        activeProfileId={activeProfile}
        onContinue={() => navigate('/')}
        isStandAlonePage={true}
      />
    </div>
  )
}

