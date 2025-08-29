// src/lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

// IMPORTANT: This client uses the SERVICE_ROLE_KEY and should ONLY be used on the server,
// in places like API routes or server actions where you need to bypass RLS.
export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}


