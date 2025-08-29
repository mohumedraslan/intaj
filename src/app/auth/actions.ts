"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { type UserProfile } from '@/lib/types'

// --- REAL GET-SESSION IMPLEMENTATION ---
export async function getSession(): Promise<{ user: UserProfile | null }> {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    return { user: null }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single()

  // Combine auth user and profile into our strongly-typed object
  const user: UserProfile = {
    id: authUser.id,
    email: authUser.email,
    ...profile,
  }
  
  return { user }
}

export async function login(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { message: error.message }
  }
  redirect('/dashboard')
}

export async function signup(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) {
    return { message: error.message }
  }
  redirect('/dashboard')
}

export async function signupWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google sign-in error:', error)
    redirect('/login?error=Could not authenticate with Google')
  }

  if (data.url) {
    redirect(data.url)
  }
}

