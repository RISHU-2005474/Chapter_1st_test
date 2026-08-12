import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ejolboeirdtqcsuikayf.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__pxswqtkpbzEAlKBwk7fEQ_cE5fj5Sp';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
