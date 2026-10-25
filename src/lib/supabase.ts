import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sem as chaves configuradas o chat simplesmente não aparece
export const supabase = url && key ? createClient(url, key) : null;

export interface ChatMessage {
  id: number;
  created_at: string;
  name: string | null;
  country: string | null;
  content: string;
  gif_url: string | null;
}
