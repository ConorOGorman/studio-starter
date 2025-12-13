'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'

export default function AdminLoginPage() {
  const signIn = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Admin Login</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Sign in with your Google account. Access is restricted to allowlisted admins.
      </p>
      <button
        onClick={signIn}
        style={{
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #333',
          cursor: 'pointer',
        }}
      >
        Sign in with Google
      </button>
    </div>
  )
}
