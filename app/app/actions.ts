'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createOrg(formData: FormData) {
  const supabase = await createClient()
  
  // Get user and session - ensure we have a valid session
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError) {
    redirect('/login?error=' + encodeURIComponent('Session expired. Please sign in again.'))
  }

  if (!user) {
    redirect('/login?error=' + encodeURIComponent('Please sign in to continue'))
  }

  // Verify user has confirmed email (if email confirmation is enabled)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/login?error=' + encodeURIComponent('Please sign in to continue'))
  }

  const name = formData.get('name') as string

  if (!name || name.trim().length === 0) {
    redirect('/app?error=' + encodeURIComponent('Organization name is required'))
  }

  // Insert organization with explicit user ID
  const { data: org, error } = await supabase
    .from('organizations')
    .insert({ 
      name: name.trim(), 
      created_by: user.id 
    })
    .select()
    .single()

  if (error) {
    console.error('Organization creation error:', error)
    redirect('/app?error=' + encodeURIComponent(error.message || 'Failed to create organization'))
  }

  if (!org) {
    redirect('/app?error=' + encodeURIComponent('Failed to create organization'))
  }

  // Trigger will create org_members entry automatically
  redirect(`/app/org/${org.id}/dashboard`)
}
