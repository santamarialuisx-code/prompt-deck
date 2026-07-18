"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface ProfileFormProps {
  currentName: string;
  userId: string;
}

export function ProfileForm({ currentName, userId }: ProfileFormProps) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("users")
        .update({ name: name.trim() })
        .eq("id", userId);

      if (error) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Display Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("idle");
            }}
            className="flex-1"
          />
          <Button onClick={handleSave} disabled={loading || name.trim() === currentName}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>

        {status === "success" && (
          <p className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
            <Check className="size-4" />
            Name updated successfully.
          </p>
        )}

        {status === "error" && (
          <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="size-4" />
            Failed to update name. Please try again.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
