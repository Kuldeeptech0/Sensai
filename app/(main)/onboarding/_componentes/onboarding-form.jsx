"use client";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from '@/app/lib/schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OnboardingForm = ({industries}) => {

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router =useRouter();
  const { 
          register,
          handleSubmit,
          formState:{errors},
          setValue,
          watch,
        } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  return (
    <div>
       Onboardingform
    </div>
  )
}

export default OnboardingForm
