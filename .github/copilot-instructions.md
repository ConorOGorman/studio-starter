# Studio Starter - AI Agent Instructions

## Architecture Overview

This is a **Next.js 14 (App Router) + Supabase** portfolio/studio site with a secure admin panel. The codebase follows a "container-first" responsive design system using Tailwind CSS.

**Key architectural decisions:**
- **Server-first auth**: Admin authentication uses Supabase SSR with server-side RLS enforcement via `requireAdmin()` helper
- **Separation of concerns**: Public routes (`/`) vs protected admin routes (`/admin/*`) with dedicated layouts
- **Container primitives**: [Container.tsx](src/components/Container.tsx) and [Section.tsx](src/components/Section.tsx) enforce consistent max-width (1280px) and responsive padding across all pages

## Critical Developer Workflows

### Starting Development
```bash
npm run dev  # Runs on http://localhost:3000
```

### Admin Panel Access
1. Visit `/admin/login` → Sign in with Google OAuth
2. User must exist in `public.admins` table (see [ADMIN_PANEL_IMPLEMENTATION.md](ADMIN_PANEL_IMPLEMENTATION.md) Step 4)
3. Protected routes automatically redirect via `requireAdmin()` in [src/lib/admin/requireAdmin.ts](src/lib/admin/requireAdmin.ts)

### Database Schema
See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for complete schema. Key tables:
- `projects` - Portfolio items (RLS: public read, admin write)
- `admins` - Authorized admin users (checked by `requireAdmin()`)
- `blog_posts`, `contact_submissions`, `team_members`, `testimonials`

## Supabase Client Patterns

**ALWAYS use the correct client for the context:**

### Server Components / Route Handlers / Server Actions
```typescript
import { supabaseServer } from '@/lib/supabase/server'
const supabase = supabaseServer()  // Uses cookies() from Next.js
```

### Client Components (for public data only)
```typescript
import { supabaseBrowser } from '@/lib/supabase/browser'
const supabase = supabaseBrowser()
```

### Admin Operations (always server-side)
```typescript
'use server'
import { requireAdmin } from '@/lib/admin/requireAdmin'

export async function myAdminAction() {
  const { supabase, user } = await requireAdmin()  // Auto-redirects if not admin
  // ... perform admin operations
}
```

**Example:** [src/app/admin/projects/actions.ts](src/app/admin/projects/actions.ts#L12-L37) shows the standard pattern for admin mutations

## Project-Specific Conventions

### Responsive Layout System
- **Enforce canonical padding**: `px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16` (see [Container.tsx](src/components/Container.tsx))
- **Max-width constraint**: All page content uses `max-w-screen-xl` (1280px)
- **Usage**: Wrap page content in `<Container>` or `<Section>` - never apply padding directly to pages

### Component Structure
```tsx
// Preferred pattern for new pages
import { Section } from '@/components/Section'

export default function MyPage() {
  return (
    <Section className="py-12 md:py-24">
      {/* Content automatically gets Container wrapper + correct padding */}
    </Section>
  )
}
```

### TypeScript Aliases
- `@/` maps to `src/` directory (see [tsconfig.json](tsconfig.json))
- Always use `@/components/*` not relative imports from `app/` to `components/`

### Dynamic Rendering
- Admin routes use `export const dynamic = 'force-dynamic'` in [layout.tsx](src/app/admin/layout.tsx) to ensure fresh auth checks
- Public routes can be statically generated unless they need real-time Supabase data

## Integration Points

### OAuth Flow
1. User clicks "Sign in with Google" → redirects to Supabase OAuth
2. Supabase redirects to `/auth/callback?code=...` ([route.ts](src/app/auth/callback/route.ts))
3. Callback exchanges code for session → redirects to `/admin`
4. Admin pages check session + `admins` table via `requireAdmin()`

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anon/public key
NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL=  # Optional: for /admin/analytics
```

## Common Pitfalls

1. **Don't use `supabaseBrowser()` in server components** - causes hydration errors. Always use `supabaseServer()` in RSC/actions
2. **Don't bypass `requireAdmin()`** - all admin mutations must call it to enforce RLS policies
3. **Don't add inline padding to pages** - use Container/Section primitives to maintain design system consistency
4. **Don't forget `'use server'`** - server actions in [actions.ts](src/app/admin/projects/actions.ts) must have this directive

## Key Files for Reference

- [requireAdmin.ts](src/lib/admin/requireAdmin.ts) - Auth guard pattern (use in all admin server actions)
- [projects/actions.ts](src/app/admin/projects/actions.ts) - Example of CRUD operations with admin checks
- [Container.tsx](src/components/Container.tsx) - Canonical responsive container implementation
- [ADMIN_PANEL_IMPLEMENTATION.md](ADMIN_PANEL_IMPLEMENTATION.md) - Setup checklist and OAuth configuration
