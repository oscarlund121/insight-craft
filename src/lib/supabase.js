// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

let supabase;

export function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  
  return supabase;
}

// Backward compatibility
export { getSupabaseClient as supabase };
