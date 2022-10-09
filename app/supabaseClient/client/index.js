import { createClient } from '@supabase/supabase-js'


const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4ZGtrb3JzZ2Zrem51dmdxZmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMyODEzNTMsImV4cCI6MTk3ODg1NzM1M30.ZpVuf7ydWV7zJ3ZI2w002PG7JInsQegOLv144ZSUNOs"
const SUPABASE_URL = "https://dxdkkorsgfkznuvgqfkr.supabase.co"


export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)