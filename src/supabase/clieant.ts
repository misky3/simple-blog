import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwtjsusogrepilgyqafw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dGpzdXNvZ3JlcGlsZ3lxYWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTMzODksImV4cCI6MjA2NDE2OTM4OX0.vZKskKV3l0WEZdbLovGE7oU2yBA3YHz2YFZ8hbMXLU4';

export const supabase = createClient(supabaseUrl, supabaseKey);
