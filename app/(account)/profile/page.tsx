import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./ProfileForm";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Profile",
};

export default async function AccountProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("name, has_lifetime_access, created_at")
    .eq("id", user.id)
    .single();

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account settings
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-lg border bg-white p-6 dark:bg-zinc-900">
        <div className="space-y-4">
          {/* Email (read-only) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>

          {/* Member since */}
          {memberSince && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Member Since
              </label>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {memberSince}
              </p>
            </div>
          )}

          {/* Account status */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Account Status
            </label>
            <div>
              {profile?.has_lifetime_access ? (
                <Badge className="bg-green-600 hover:bg-green-700">
                  Lifetime Access Active
                </Badge>
              ) : (
                <Badge variant="secondary">No Access</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit name form */}
      <ProfileForm currentName={profile?.name || ""} userId={user.id} />
    </div>
  );
}
