"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { type UserProfile } from '@/lib/types'

// --- REAL GET-SESSION IMPLEMENTATION ---
export async function getSession(): Promise<{ user: UserProfile | null }> {
  console.log("Attempting to get session..."); // Log entry point
  
  const supabase = await createClient();
  const { 
    data: { user: authUser }, 
    error: authError 
  } = await supabase.auth.getUser();
  
  if (authError) {
    console.error("Supabase auth error in getSession:", authError.message); // Log any auth error
    return { user: null };
  }
  
  if (!authUser) {
    console.log("No authenticated user found in session."); // Log if no user
    return { user: null };
  }
  
  console.log(`User found: ${authUser.id}. Fetching profile...`); // Log successful user retrieval
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single();
  
  if (profileError) {
    console.error(`Error fetching profile for user ${authUser.id}:`, profileError.message); // Log profile fetch error
    // Still return the user, but without profile data
    const user: UserProfile = {
      id: authUser.id,
      email: authUser.email,
    };
    return { user };
  }
  
  console.log(`Profile found for user ${authUser.id}.`); // Log successful profile retrieval
  
  const user: UserProfile = {
    id: authUser.id,
    email: authUser.email,
    ...profile,
  };
  
  return { user };
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

