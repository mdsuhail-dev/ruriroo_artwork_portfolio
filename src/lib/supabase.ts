import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-only client with full privileges (used in API routes)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export const STORAGE_BUCKET = "artwork-images";
