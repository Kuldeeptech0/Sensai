import React from 'react'
import { industries } from '@/data/industries'

// Check if user is already onboarded

const Onboarding = () => {
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default Onboarding
