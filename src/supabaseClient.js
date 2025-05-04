import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cjfuzgoebhtngxajcvhf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnV6Z29lYmh0bmd4YWpjdmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDc3MTIsImV4cCI6MjA2MDU4MzcxMn0.b4Dfi-C0xY0kpcminBgsi02aEjgcNz_VYJmWfF4d-eA';

export const supabase = createClient(supabaseUrl, supabaseKey);
