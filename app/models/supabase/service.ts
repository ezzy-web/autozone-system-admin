import { createClient } from "@supabase/supabase-js";
import { service_key, supabaseUrl } from ".";

const supabase_service = createClient(supabaseUrl, service_key);

export default supabase_service