'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/components/ui/utils'

interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
}

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  const steps = [
    { number: 1, label: 'Organization' },
    { number: 2, label: 'Customer' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors',
                  step.number < currentStep
                    ? 'bg-green-600 text-white'
                    : step.number === currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'font-medium hidden sm:block',
                  step.number <= currentStep
                    ? 'text-gray-900'
                    : 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  step.number < currentStep ? 'bg-green-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
