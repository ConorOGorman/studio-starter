import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

type RequireAdminOptions = {
  redirectToLogin?: string
  redirectToUnauthorized?: string
}

export async function requireAdmin(options: RequireAdminOptions = {}) {
  const {
    redirectToLogin = '/admin/login',
    redirectToUnauthorized = '/admin/unauthorized',
  } = options

  const supabase = supabaseServer()
  const { data: userRes, error: userErr } = await supabase.auth.getUser()
  const user = userRes?.user

  if (userErr || !user) redirect(redirectToLogin)

  const { data: adminRow, error: adminErr } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  // If table missing/misconfigured, treat as unauthorized for safety
  if (adminErr || !adminRow) redirect(redirectToUnauthorized)

  return { supabase, user }
}
