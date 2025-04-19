import {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} from "@/app/environments";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY!
);
