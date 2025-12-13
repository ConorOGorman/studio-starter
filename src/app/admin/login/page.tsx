'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authError = searchParams.get('error')
  const authErrorDescription = searchParams.get('error_description')

  useEffect(() => {
    const supabase = supabaseBrowser()

    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) router.replace('/admin')
    }

    checkExistingSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace('/admin')
    })

    return () => subscription.unsubscribe()
  }, [router])

  const signIn = async () => {
    const supabase = supabaseBrowser()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error(error)
  }

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold mb-2 sm:mb-3">Admin Login</h1>
      {authError ? (
        <div className="mb-4 sm:mb-6 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          <p className="font-semibold">Sign-in failed</p>
          <p className="mt-1 opacity-90">{authErrorDescription ?? authError}</p>
        </div>
      ) : null}
      <p className="text-sm sm:text-base opacity-80 mb-4 sm:mb-6">
        Sign in with your Google account. Access is restricted to allowlisted admins.
      </p>
      <button
        onClick={signIn}
        className="px-4 py-3 sm:px-5 sm:py-3 min-h-[44px] text-sm sm:text-base rounded-lg border border-[#333] cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
      >
        Sign in with Google
      </button>
    </div>
  )
}
