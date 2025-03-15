import React from 'react'
import { industries } from '@/data/industries'
import OnboardingForm from './_componentes/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import DashboardView from './components/DashboardView';



const OnboardingPage = async () => {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

    if(isOnboarded)
      {
        redirect("/dashboard");
      }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage;
