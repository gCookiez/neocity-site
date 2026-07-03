import { createClient } from "@supabase/supabase-js"

const serverdb = {
    db: {
        schema: 'public'
    }
}

const apikey = import.meta.env.VITE_SUPABASE_API_KEY;
const apiurl = import.meta.env.VITE_SUPABASE_URL;
//remind self to move api key to env
export const supabase = await createClient(apiurl, apikey)

