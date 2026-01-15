import { NextRequest, NextResponse } from 'next/server'
import { saveOrganizationSettings } from '@/app/onboarding/actions'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await saveOrganizationSettings(formData)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in onboarding organization route:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
