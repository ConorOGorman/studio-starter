'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'

export default function UnauthorizedPage() {
  const signOut = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold mb-2 sm:mb-3">Not authorised</h1>
      <p className="text-sm sm:text-base opacity-80 mb-4 sm:mb-6">
        This account is not on the admin allowlist. If you believe this is a mistake, sign out and try a different
        account.
      </p>
      <button
        onClick={signOut}
        className="px-4 py-3 sm:px-5 sm:py-3 min-h-[44px] text-sm sm:text-base rounded-lg border border-[#333] cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
      >
        Sign out
      </button>
    </div>
  )
}
