import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/requireAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage() {
  await requireAdmin()

  const embedUrl = process.env.NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Analytics</h1>
          <p style={{ opacity: 0.8 }}>Admin-only dashboard via Looker Studio.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/projects">Projects</Link>
        </div>
      </div>

      {!embedUrl ? (
        <div style={{ marginTop: 20, border: '1px solid #333', borderRadius: 12, padding: 14 }}>
          <p style={{ marginBottom: 8 }}>
            Missing <code>NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL</code>.
          </p>
          <p style={{ opacity: 0.8 }}>
            Create a Looker Studio report connected to GA4, enable embedding, then paste the embed URL into your env
            vars.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 20, border: '1px solid #333', borderRadius: 12, overflow: 'hidden' }}>
          <iframe src={embedUrl} style={{ width: '100%', height: '80vh', border: 0 }} allowFullScreen />
        </div>
      )}
    </div>
  )
}
