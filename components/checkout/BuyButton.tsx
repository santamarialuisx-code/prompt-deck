"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      // Silently fail — button remains usable
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="lg" onClick={handleBuy} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Creating checkout...
        </>
      ) : (
        "Get Lifetime Access — $29"
      )}
    </Button>
  );
}
