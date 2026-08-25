import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL =
  "https://uvtbntwgooxqjbyjkvkd.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ensrp6OEPwQCoY76nQMFDg_lEofX2qO";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);