'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createOrg(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string

  if (!name || name.trim().length === 0) {
    return { error: 'Organization name is required' }
  }

  const { data: org, error } = await supabase
    .from('organizations')
    .insert({ name: name.trim(), created_by: user.id })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Trigger will create org_members entry automatically
  redirect(`/app/org/${org.id}/dashboard`)
}
