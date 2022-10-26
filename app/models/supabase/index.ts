import { createClient } from "@supabase/supabase-js";

export const supabaseUrl : string = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
export const service_key: string = process.env.SERVICE_KEY ? process.env.SERVICE_KEY : ""



const supabaseAnonKey : string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "";

// Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default supabase