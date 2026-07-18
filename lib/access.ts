import { createClient } from "@/lib/supabase/server";

export async function hasLifetimeAccess(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("users")
    .select("has_lifetime_access")
    .eq("id", user.id)
    .single();

  return data?.has_lifetime_access ?? false;
}

export async function canAccessPrompt(promptIsFree: boolean): Promise<boolean> {
  if (promptIsFree) return true;
  return hasLifetimeAccess();
}
