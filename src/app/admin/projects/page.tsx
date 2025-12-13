import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/requireAdmin'
import { createProject, updateProject, deleteProject } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const { supabase } = await requireAdmin()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('id,title,description,image_url,project_url,technologies,featured,created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
        <p>Failed to load projects: {error.message}</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Projects</h1>
          <p style={{ opacity: 0.8 }}>Create and manage portfolio projects.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/analytics">Analytics</Link>
        </div>
      </div>

      <div style={{ marginTop: 20, border: '1px solid #333', borderRadius: 12, padding: 14 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Add new project</h2>
        <form action={createProject} style={{ display: 'grid', gap: 10 }}>
          <input
            name="title"
            placeholder="Title (required)"
            required
            style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
          />
          <input
            name="image_url"
            placeholder="Image URL"
            style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
          />
          <input
            name="project_url"
            placeholder="Project URL"
            style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
          />
          <input
            name="technologies"
            placeholder="Technologies (comma-separated)"
            style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="featured" />
            <label>Featured</label>
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #333',
              cursor: 'pointer',
            }}
          >
            Create project
          </button>
        </form>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Existing projects</h2>
        {!projects?.length ? (
          <p style={{ opacity: 0.8 }}>No projects yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {projects.map((p) => (
              <div key={p.id} style={{ border: '1px solid #333', borderRadius: 12, padding: 14 }}>
                <details style={{ cursor: 'pointer', fontSize: 16 }}>
                  <summary>
                    {p.title} {p.featured ? '(featured)' : ''}
                  </summary>
                  <form action={updateProject.bind(null, p.id)} style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                    <input
                      name="title"
                      defaultValue={p.title ?? ''}
                      required
                      style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
                    />
                    <textarea
                      name="description"
                      defaultValue={p.description ?? ''}
                      rows={3}
                      style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
                    />
                    <input
                      name="image_url"
                      defaultValue={p.image_url ?? ''}
                      style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
                    />
                    <input
                      name="project_url"
                      defaultValue={p.project_url ?? ''}
                      style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
                    />
                    <input
                      name="technologies"
                      defaultValue={Array.isArray(p.technologies) ? p.technologies.join(', ') : ''}
                      style={{ padding: 10, borderRadius: 10, border: '1px solid #333' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" name="featured" defaultChecked={!!p.featured} />
                      <label>Featured</label>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1px solid #333',
                          cursor: 'pointer',
                        }}
                      >
                        Save changes
                      </button>
                      <button
                        formAction={deleteProject.bind(null, p.id)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1px solid #333',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
