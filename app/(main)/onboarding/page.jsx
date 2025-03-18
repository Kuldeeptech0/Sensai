import React from 'react'
import { industries } from '@/data/industries'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import DashboardView from './../dashboard/_components/dashboard-view';



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
