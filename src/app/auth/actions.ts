"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { type UserProfile } from '@/lib/types'

// --- REAL GET-SESSION IMPLEMENTATION ---
export async function getSession(): Promise<{ user: UserProfile | null }> {
  try {
    console.log("Attempting to get session..."); // Log entry point
    
    const supabase = await createClient();
    const { 
      data: { user: authUser }, 
      error: authError 
    } = await supabase.auth.getUser();
    
    if (authError) {
      // Don't log as error for missing session - this is expected for non-logged in users
      if (authError.message === 'Auth session missing!') {
        console.log("No auth session found - user not logged in");
      } else {
        console.error("Supabase auth error in getSession:", authError.message);
      }
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
  } catch (error) {
    console.error("Unexpected error in getSession:", error);
    return { user: null };
  }
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
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const termsAccepted = formData.get('terms') === 'on'
  
  // Validate required fields
  if (!email || !password || !firstName || !lastName || !confirmPassword) {
    return { message: 'All fields are required' }
  }
  
  // Validate terms acceptance
  if (!termsAccepted) {
    return { message: 'You must accept the Terms of Service and Privacy Policy' }
  }
  
  // Validate passwords match
  if (password !== confirmPassword) {
    return { message: 'Passwords do not match' }
  }
  
  // Validate password strength
  if (password.length < 8) {
    return { message: 'Password must be at least 8 characters long' }
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`
        }
      }
    })
    
    if (error) {
      return { message: error.message }
    }
    
    // Create profile entry
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user?.id,
        email,
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        created_at: new Date().toISOString()
      })
    
    if (profileError) {
      console.error('Error creating profile:', profileError)
      return { message: 'Account created but profile setup failed. Please contact support.' }
    }
    
    return { message: 'Account created successfully! Please check your email for verification.' }
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
    return { message: 'An error occurred during signup' }
  }
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

