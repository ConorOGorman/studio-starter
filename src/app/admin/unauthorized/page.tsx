'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'

export default function UnauthorizedPage() {
  const signOut = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Not authorised</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        This account is not on the admin allowlist. If you believe this is a mistake, sign out and try a different
        account.
      </p>
      <button
        onClick={signOut}
        style={{
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #333',
          cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </div>
  )
}
