import { NextResponse } from "next/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const tier = url.searchParams.get("tier") || "pro-permanente";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Map tier to variant ID
  const variantMap: Record<string, string | undefined> = {
    free: process.env.LEMONSQUEEZY_VARIANT_FREE,
    "pro-permanente": process.env.LEMONSQUEEZY_VARIANT_PERMANENTE,
    "pro-suscripcion": process.env.LEMONSQUEEZY_VARIANT_SUSCRIPCION,
  };

  const variantId = variantMap[tier];

  if (!variantId) {
    return NextResponse.json(
      { error: "Invalid tier" },
      { status: 400 }
    );
  }

  // For free tier, skip purchase check
  if (tier !== "free") {
    const { data: userData } = await supabase
      .from("users")
      .select("has_lifetime_access")
      .eq("id", user.id)
      .single();

    if (userData?.has_lifetime_access) {
      return NextResponse.json(
        { error: "Already purchased" },
        { status: 400 }
      );
    }
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutData: {
        email: user.email ?? undefined,
        custom: {
          user_id: user.id,
          tier: tier,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      },
    }
  );

  return NextResponse.json({
    checkoutUrl: checkout.data?.data.attributes.url,
  });
}
