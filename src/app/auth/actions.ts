"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

// --- REAL GET-SESSION IMPLEMENTATION ---
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, profile: null }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const userWithProfile = { ...user, ...profile }
  return { user: userWithProfile }
}

export async function login(
  prevState: { message: string } | undefined,
  formData: z.infer<any>
) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(formData as any)
  if (error) {
    return { message: error.message }
  }
  redirect('/dashboard')
}

export async function signup(
  prevState: { message: string } | undefined,
  formData: z.infer<any>
) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp(formData as any)
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

