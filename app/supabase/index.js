

import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SECRET_KEY = process.env.SERVICE_KEY

const server = createClient(SUPABASE_URL, SECRET_KEY)
const client = createClient(SUPABASE_URL, ANON_KEY)


export { server, client }


