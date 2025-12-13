  # Admin Panel Implementation Guide

This branch (`feature/admin-panel`) contains the foundation for admin authentication and project management.

## ✅ What's Already Done

1. **Supabase Database** - `admins` table created with RLS policies
2. **Projects Security** - RLS policies requiring admin auth for writes
3. **Branch Created** - `feature/admin-panel` ready for implementation

## 📦 Step 1: Install Dependencies

```bash
npm install @supabase/ssr
```

## 📋 Step 2: Implementation Checklist

All code is available in your ChatGPT conversation. Copy each file from ChatGPT:

### Core Libraries (3 files):
- [ ] `src/lib/supabase/server.ts`
- [ ] `src/lib/supabase/browser.ts`
- [ ] `src/lib/admin/requireAdmin.ts`

### Auth Route (1 file):
- [ ] `src/app/auth/callback/route.ts`

### Admin Pages (7 files):
- [ ] `src/app/admin/layout.tsx`
- [ ] `src/app/admin/login/page.tsx`
- [ ] `src/app/admin/page.tsx`
- [ ] `src/app/admin/projects/page.tsx`
- [ ] `src/app/admin/projects/actions.ts`
- [ ] `src/app/admin/analytics/page.tsx`
- [ ] `src/app/admin/unauthorized/page.tsx`

### Config (1 file):
- [ ] Update `.env.local.example` - add `NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL=`

## 🔧 Step 3: Supabase OAuth Setup

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR_DOMAIN/auth/callback`

## 🎯 Step 4: Add Yourself as Admin

1. Sign in once with Google (creates user in `auth.users`)
2. Copy your `user_id` from Authentication → Users
3. Run in SQL Editor:

```sql
insert into public.admins (user_id, email)
values ('YOUR_USER_ID', 'your@email.com');
```

## 🚀 Step 5: Test

1. Visit `/admin/login`
2. Sign in with Google
3. Should redirect to `/admin` dashboard
4. Test creating/editing projects

## 📊 Step 6: Analytics (Optional)

1. Create Looker Studio report connected to GA4
2. Enable embedding
3. Add URL to `.env.local`

## 🔗 Resources

- All implementation code: Your ChatGPT conversation
- Supabase RLS: Already configured
- Branch: `feature/admin-panel`

## ✨ Next Steps After Implementation

1. Test all admin functionality
2. Create PR to merge into `main`
3. Deploy and configure production OAuth URLs

---

**Note**: This guide references code from your ChatGPT conversation. All 11 files with complete implementation are available there. Copy them into your VSCode workspace on this branch.
