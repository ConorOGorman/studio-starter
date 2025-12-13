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
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold mb-1 sm:mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base opacity-80 break-words">Signed in as {user.email}</p>
        </div>
        <div className="flex gap-3 sm:gap-4 flex-shrink-0">
          <Link href="/admin/projects" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Projects
          </Link>
          <Link href="/admin/analytics" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Analytics
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6">
        <div className="border border-[#333] rounded-xl p-3 sm:p-4">
          <p className="text-sm sm:text-base opacity-75">Total Projects</p>
          <p className="text-2xl sm:text-3xl md:text-[26px] mt-2 sm:mt-3 font-semibold">{totalProjects ?? 0}</p>
        </div>
        <div className="border border-[#333] rounded-xl p-3 sm:p-4">
          <p className="text-sm sm:text-base opacity-75">Featured Projects</p>
          <p className="text-2xl sm:text-3xl md:text-[26px] mt-2 sm:mt-3 font-semibold">{featuredProjects ?? 0}</p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h2 className="text-base sm:text-lg md:text-[18px] font-semibold mb-2 sm:mb-3">Recent Projects</h2>
        <div className="border border-[#333] rounded-xl p-3 sm:p-4">
          {!recentProjects?.length ? (
            <p className="text-sm sm:text-base opacity-80">No projects yet.</p>
          ) : (
            <ul className="m-0 pl-4 sm:pl-5 space-y-2">
              {recentProjects.map((p) => (
                <li key={p.id} className="text-sm sm:text-base mb-2 last:mb-0">
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
