'use server'

import { requireAdmin } from '@/lib/admin/requireAdmin'

function parseTechnologies(input: string): string[] {
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export async function createProject(formData: FormData) {
  const { supabase } = await requireAdmin()

  const title = String(formData.get('title') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const image_url = String(formData.get('image_url') || '').trim()
  const project_url = String(formData.get('project_url') || '').trim()
  const technologiesRaw = String(formData.get('technologies') || '').trim()
  const featured = formData.get('featured') === 'on'

  if (!title) throw new Error('Title is required')

  const technologies = technologiesRaw ? parseTechnologies(technologiesRaw) : null

  const { error } = await supabase.from('projects').insert([
    {
      title,
      description: description || null,
      image_url: image_url || null,
      project_url: project_url || null,
      technologies,
      featured,
    },
  ])

  if (error) throw new Error(error.message)
}

export async function updateProject(projectId: string, formData: FormData) {
  const { supabase } = await requireAdmin()

  const title = String(formData.get('title') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const image_url = String(formData.get('image_url') || '').trim()
  const project_url = String(formData.get('project_url') || '').trim()
  const technologiesRaw = String(formData.get('technologies') || '').trim()
  const featured = formData.get('featured') === 'on'

  if (!title) throw new Error('Title is required')

  const technologies = technologiesRaw ? parseTechnologies(technologiesRaw) : null

  const { error } = await supabase
    .from('projects')
    .update({
      title,
      description: description || null,
      image_url: image_url || null,
      project_url: project_url || null,
      technologies,
      featured,
    })
    .eq('id', projectId)

  if (error) throw new Error(error.message)
}

export async function deleteProject(projectId: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase.from('projects').delete().eq('id', projectId)

  if (error) throw new Error(error.message)
}
