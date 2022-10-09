const { createClient } = require('@supabase/supabase-js')

const SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY
const SUPABASE_URL = 'https://dxdkkorsgfkznuvgqfkr.supabase.co'


export const supabaseServer = createClient(SUPABASE_URL, SERVICE_KEY)