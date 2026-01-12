
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjrgnncuspzkpmtwymzj.supabase.co';
const supabaseKey = 'sb_publishable_1pukg4LUb-tZMtsvJqqsfw_2mfSUln2';

export const supabase = createClient(supabaseUrl, supabaseKey);
