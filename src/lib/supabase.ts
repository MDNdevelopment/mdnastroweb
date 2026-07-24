import { createClient } from '@supabase/supabase-js';

// Server-only client using the service-role key. Never import this from a
// React island or any client-rendered code — the key must stay server-side.
export const supabaseAdmin = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
