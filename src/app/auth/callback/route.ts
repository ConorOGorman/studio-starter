import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const { origin, searchParams } = requestUrl
  const code = searchParams.get('code')
  const authError = searchParams.get('error')
  const authErrorDescription = searchParams.get('error_description')

  if (authError) {
    const redirectUrl = new URL('/admin/login', origin)
    redirectUrl.searchParams.set('error', authError)
    if (authErrorDescription) redirectUrl.searchParams.set('error_description', authErrorDescription)
    return NextResponse.redirect(redirectUrl)
  }

  if (!code) return NextResponse.redirect(`${origin}/admin/login`)

  try {
    const supabase = supabaseServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      const redirectUrl = new URL('/admin/login', origin)
      redirectUrl.searchParams.set('error', 'exchange_failed')
      redirectUrl.searchParams.set('error_description', error.message)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.redirect(`${origin}/admin`)
  } catch (error) {
    const redirectUrl = new URL('/admin/login', origin)
    redirectUrl.searchParams.set('error', 'exchange_failed')
    redirectUrl.searchParams.set('error_description', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.redirect(redirectUrl)
  }
}
