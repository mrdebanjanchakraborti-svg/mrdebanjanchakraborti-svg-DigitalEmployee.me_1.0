
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Ensure these match your Supabase Project Settings > API
const supabaseUrl = 'https://fjrgnncuspzkpmtwymzj.supabase.co';

// Note: The key below looks like a placeholder. 
// For production, replace it with your project's 'anon' 'public' key (a long JWT string starting with 'eyJ').
const supabaseKey = 'sb_publishable_1pukg4LUb-tZMtsvJqqsfw_2mfSUln2';

export const supabase = createClient(supabaseUrl, supabaseKey);
