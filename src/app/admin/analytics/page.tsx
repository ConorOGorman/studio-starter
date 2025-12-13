import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/requireAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage() {
  await requireAdmin()

  const embedUrl = process.env.NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold mb-1 sm:mb-2">Analytics</h1>
          <p className="text-sm sm:text-base opacity-80">Admin-only dashboard via Looker Studio.</p>
        </div>
        <div className="flex gap-3 sm:gap-4 flex-shrink-0">
          <Link href="/admin" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="px-3 py-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center border border-[#333] rounded-lg hover:bg-gray-50 transition-colors">
            Projects
          </Link>
        </div>
      </div>

      {!embedUrl ? (
        <div className="mt-5 sm:mt-6 border border-[#333] rounded-xl p-3 sm:p-4">
          <p className="text-sm sm:text-base mb-2 sm:mb-3">
            Missing <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs sm:text-sm">NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL</code>.
          </p>
          <p className="text-sm sm:text-base opacity-80">
            Create a Looker Studio report connected to GA4, enable embedding, then paste the embed URL into your env
            vars.
          </p>
        </div>
      ) : (
        <div className="mt-5 sm:mt-6 border border-[#333] rounded-xl overflow-hidden">
          <iframe 
            src={embedUrl} 
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[80vh] border-0" 
            allowFullScreen 
            title="Analytics Dashboard"
          />
        </div>
      )}
    </div>
  )
}
