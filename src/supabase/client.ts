import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oksjgslrdiokttzcigaj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rc2pnc2xyZGlva3R0emNpZ2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxOTQ5NjIsImV4cCI6MjA4Mzc3MDk2Mn0.-oTg_YZDeABX8ESXCYPhistt-NtKfsAosz_ce2fYnXk';

export const supabase = createClient(supabaseUrl, supabaseKey);
