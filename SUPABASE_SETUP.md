# Supabase Backend Setup

This project uses Supabase as the backend database and authentication service.

## Database Schema

The following tables have been created with Row Level Security (RLS) enabled:

### 1. Projects Table
Stores portfolio projects for display on the website.

```sql
- id (uuid, primary key)
- title (text, required)
- description (text)
- image_url (text)
- project_url (text)
- technologies (text[])
- featured (boolean, default false)
- created_at (timestamp)
```

### 2. Blog Posts Table
Stores blog articles and content.

```sql
- id (uuid, primary key)
- title (text, required)
- slug (text, unique, required)
- content (text)
- excerpt (text)
- author (text)
- published (boolean, default false)
- published_at (timestamp)
- created_at (timestamp)
```

### 3. Contact Submissions Table
Stores contact form submissions from visitors.

```sql
- id (uuid, primary key)
- name (text, required)
- email (text, required)
- message (text, required)
- read (boolean, default false)
- created_at (timestamp)
```

### 4. Team Members Table
Stores team member information for the about/team section.

```sql
- id (uuid, primary key)
- name (text, required)
- role (text)
- bio (text)
- image_url (text)
- linkedin_url (text)
- twitter_url (text)
- order_index (integer)
- created_at (timestamp)
```

### 5. Testimonials Table
Stores client testimonials and reviews.

```sql
- id (uuid, primary key)
- client_name (text, required)
- company (text)
- content (text, required)
- rating (integer)
- image_url (text)
- featured (boolean, default false)
- created_at (timestamp)
```

## Setup Instructions

1. **Copy Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Get Your Supabase Credentials**
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy your project URL and anon public key
   - Add them to `.env.local`

3. **Install Dependencies** (if not already installed)
   ```bash
   npm install @supabase/supabase-js
   ```

## Usage Examples

### Fetching Projects
```typescript
import { supabase } from '@/lib/supabase'

// Get all featured projects
const { data: projects, error } = await supabase
  .from('projects')
  .select('*')
  .eq('featured', true)
  .order('created_at', { ascending: false })
```

### Submitting Contact Form
```typescript
import { supabase } from '@/lib/supabase'

const { data, error } = await supabase
  .from('contact_submissions')
  .insert([
    { name: 'John Doe', email: 'john@example.com', message: 'Hello!' }
  ])
```

### Fetching Blog Posts
```typescript
import { supabase } from '@/lib/supabase'

// Get all published blog posts
const { data: posts, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .order('published_at', { ascending: false })
```

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public Read Access**: Anyone can read data from all tables
- **No Public Write Access**: Only authenticated users with proper permissions can insert/update/delete

To modify data, you'll need to:
1. Set up authentication in Supabase
2. Update RLS policies to allow authenticated users
3. Or use the Supabase dashboard to manually add/edit content

## Next Steps

1. **Add Sample Data**: Use the Supabase dashboard to add some sample projects, blog posts, and testimonials
2. **Create Components**: Build React components that fetch and display this data
3. **Add Forms**: Create forms for contact submissions
4. **Enable Authentication** (optional): Set up Supabase Auth for admin features

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)    
