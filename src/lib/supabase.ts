import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ejolboeirdtqcsuikayf.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__pxswqtkpbzEAlKBwk7fEQ_cE5fj5Sp';

function getStoredCredentials(): { url: string; anonKey: string } {
  try {
    const raw = localStorage.getItem('custom_supabase_config');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url, anonKey: parsed.anonKey };
      }
    }
  } catch (e) {
    // fallback
  }
  return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY };
}

let activeConfig = getStoredCredentials();
export let supabase: SupabaseClient = createClient(activeConfig.url, activeConfig.anonKey);

export function getActiveSupabaseConfig() {
  return activeConfig;
}

export function updateSupabaseCredentials(url: string, anonKey: string): boolean {
  try {
    activeConfig = { url: url.trim(), anonKey: anonKey.trim() };
    localStorage.setItem('custom_supabase_config', JSON.stringify(activeConfig));
    supabase = createClient(activeConfig.url, activeConfig.anonKey);
    return true;
  } catch (e) {
    console.error('Failed to update Supabase credentials', e);
    return false;
  }
}

export function resetSupabaseCredentials(): void {
  localStorage.removeItem('custom_supabase_config');
  activeConfig = { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY };
  supabase = createClient(activeConfig.url, activeConfig.anonKey);
}

export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.from('exam_attempts').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return {
          success: true,
          message: 'Connected to Supabase! (Table `exam_attempts` needs to be created via SQL Editor).',
        };
      }
      return { success: false, message: `Connection error: ${error.message}` };
    }
    return { success: true, message: 'Connected successfully to Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network / CORS connection failed' };
  }
}

