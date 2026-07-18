"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type BuyButtonProps = {
  tier: string;
  label?: string;
  variant?: "default" | "outline";
};

export function BuyButton({ tier, label, variant = "default" }: BuyButtonProps) {
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
      const res = await fetch(`/api/checkout?tier=${encodeURIComponent(tier)}`, {
        method: "POST",
      });
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

  const getButtonText = () => {
    if (label) return label;
    
    switch (tier) {
      case "free":
        return "Get Started Free";
      case "pro-permanente":
        return "Get Lifetime Access — $29";
      case "pro-suscripcion":
        return "Subscribe Now — $9/mo";
      default:
        return "Get Access";
    }
  };

  return (
    <Button
      size="lg"
      variant={variant}
      onClick={handleBuy}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Creating checkout...
        </>
      ) : (
        getButtonText()
      )}
    </Button>
  );
}
