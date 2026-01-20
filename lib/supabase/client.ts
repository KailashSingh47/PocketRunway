import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/database.types';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During Next.js build/prerendering, environment variables might be missing.
  // We return a dummy client or handle the missing values to prevent build failure.
  if (!url || !key) {
    return {} as any;
  }

  return createBrowserClient<Database>(url, key);
}
