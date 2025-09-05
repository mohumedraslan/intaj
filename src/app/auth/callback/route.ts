import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Create a Supabase client configured for this API route
  const supabase = await createClient();
  
  // Exchange the code for a session
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  
  if (code) {
    // The code is present in the URL - Supabase Auth needs this to complete the OAuth flow
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // Redirect to the dashboard after successful authentication
  return NextResponse.redirect(new URL('/dashboard', req.url));
}