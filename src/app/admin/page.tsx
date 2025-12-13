import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/requireAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireAdmin()

  const [{ count: totalProjects }, { count: featuredProjects }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('featured', true),
  ])

  const { data: recentProjects } = await supabase
    .from('projects')
    .select('id,title,featured,created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Admin Dashboard</h1>
          <p style={{ opacity: 0.8 }}>Signed in as {user.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/analytics">Analytics</Link>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginTop: 20,
        }}
      >
        <div style={{ border: '1px solid #333', borderRadius: 12, padding: 14 }}>
          <p style={{ opacity: 0.75 }}>Total Projects</p>
          <p style={{ fontSize: 26, marginTop: 6 }}>{totalProjects ?? 0}</p>
        </div>
        <div style={{ border: '1px solid #333', borderRadius: 12, padding: 14 }}>
          <p style={{ opacity: 0.75 }}>Featured Projects</p>
          <p style={{ fontSize: 26, marginTop: 6 }}>{featuredProjects ?? 0}</p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Recent Projects</h2>
        <div style={{ border: '1px solid #333', borderRadius: 12, padding: 14 }}>
          {!recentProjects?.length ? (
            <p style={{ opacity: 0.8 }}>No projects yet.</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {recentProjects.map((p) => (
                <li key={p.id} style={{ marginBottom: 6 }}>
                  {p.title} {p.featured ? '(featured)' : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
