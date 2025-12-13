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
      <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <p className="text-sm sm:text-base">Failed to load projects: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold mb-1 sm:mb-2">Projects</h1>
          <p className="text-sm sm:text-base opacity-80">Create and manage portfolio projects.</p>
        </div>
        <div className="flex gap-3 sm:gap-4 flex-shrink-0">
          <Link href="/admin" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/analytics" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Analytics
          </Link>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 border border-[#333] rounded-xl p-3 sm:p-4">
        <h2 className="text-base sm:text-lg md:text-[18px] font-semibold mb-2 sm:mb-3">Add new project</h2>
        <form action={createProject} className="grid gap-3 sm:gap-4">
          <input
            name="title"
            placeholder="Title (required)"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] resize-y min-h-[80px]"
          />
          <input
            name="image_url"
            placeholder="Image URL"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
          />
          <input
            name="project_url"
            placeholder="Project URL"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
          />
          <input
            name="technologies"
            placeholder="Technologies (comma-separated)"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
          />
          <div className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
            <input type="checkbox" name="featured" className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
            <label className="text-sm sm:text-base cursor-pointer">Featured</label>
          </div>
          <button
            type="submit"
            className="px-4 py-3 sm:px-5 sm:py-3 min-h-[44px] text-sm sm:text-base rounded-lg border border-[#333] cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Create project
          </button>
        </form>
      </div>

      <div className="mt-5 sm:mt-6">
        <h2 className="text-base sm:text-lg md:text-[18px] font-semibold mb-2 sm:mb-3">Existing projects</h2>
        {!projects?.length ? (
          <p className="text-sm sm:text-base opacity-80">No projects yet.</p>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {projects.map((p) => (
              <div key={p.id} className="border border-[#333] rounded-xl p-3 sm:p-4">
                <details className="cursor-pointer text-sm sm:text-base">
                  <summary className="font-medium mb-2 sm:mb-3">{p.title} {p.featured ? '(featured)' : ''}</summary>
                  <form action={updateProject.bind(null, p.id)} className="grid gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <input
                      name="title"
                      defaultValue={p.title ?? ''}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
                    />
                    <textarea
                      name="description"
                      defaultValue={p.description ?? ''}
                      rows={3}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] resize-y min-h-[80px]"
                    />
                    <input
                      name="image_url"
                      defaultValue={p.image_url ?? ''}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
                    />
                    <input
                      name="project_url"
                      defaultValue={p.project_url ?? ''}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
                    />
                    <input
                      name="technologies"
                      defaultValue={Array.isArray(p.technologies) ? p.technologies.join(', ') : ''}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-lg border border-[#333] min-h-[44px]"
                    />
                    <div className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
                      <input type="checkbox" name="featured" defaultChecked={!!p.featured} className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                      <label className="text-sm sm:text-base cursor-pointer">Featured</label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        type="submit"
                        className="px-4 py-3 sm:px-5 sm:py-3 min-h-[44px] text-sm sm:text-base rounded-lg border border-[#333] cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      >
                        Save changes
                      </button>
                      <button
                        formAction={deleteProject.bind(null, p.id)}
                        className="px-4 py-3 sm:px-5 sm:py-3 min-h-[44px] text-sm sm:text-base rounded-lg border border-[#333] cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
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
