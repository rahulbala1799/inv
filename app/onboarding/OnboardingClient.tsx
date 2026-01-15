'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingProgress from '@/components/onboarding/OnboardingProgress'
import OrganizationSetupStep from '@/components/onboarding/OrganizationSetupStep'
import CustomerSetupStep from '@/components/onboarding/CustomerSetupStep'

interface OnboardingClientProps {
  orgId: string
  initialChargesVat: boolean
}

export default function OnboardingClient({
  orgId,
  initialChargesVat,
}: OnboardingClientProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [organizationData, setOrganizationData] = useState<{
    charges_vat: boolean
  } | null>(null)

  const handleOrganizationComplete = (data: {
    business_name: string
    address_line1?: string
    address_line2?: string
    city?: string
    county?: string
    postcode?: string
    country?: string
    default_currency: string
    charges_vat: boolean
    vat_number?: string
  }) => {
    setOrganizationData({ charges_vat: data.charges_vat })
    setCurrentStep(2)
  }

  const handleCustomerSkip = () => {
    router.push(`/app/org/${orgId}/dashboard`)
  }

  const handleCustomerComplete = () => {
    router.push(`/app/org/${orgId}/dashboard`)
  }

  const chargesVat = organizationData?.charges_vat ?? initialChargesVat

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Welcome! Let&apos;s get you set up
            </h1>
            <p className="text-lg text-gray-600">
              We&apos;ll help you configure your account in just a few steps
            </p>
          </div>

          <OnboardingProgress currentStep={currentStep} totalSteps={2} />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OrganizationSetupStep
                  orgId={orgId}
                  onComplete={handleOrganizationComplete}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CustomerSetupStep
                  orgId={orgId}
                  chargesVat={chargesVat}
                  onSkip={handleCustomerSkip}
                  onComplete={handleCustomerComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
