import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json("Webhook secret not set", { status: 500 });
  }

  const rawBody = await request.text();

  const signature = request.headers.get("X-Signature") ?? "";
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const sigBuffer = Buffer.from(signature, "utf8");

  if (
    digest.length !== sigBuffer.length ||
    !crypto.timingSafeEqual(digest, sigBuffer)
  ) {
    return NextResponse.json("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta.event_name as string;
  const attributes = event.data.attributes;
  const userId = event.meta.custom_data?.user_id as string | undefined;

  if (!userId) {
    return NextResponse.json("No user_id", { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (eventName === "order_created") {
    await supabase
      .from("users")
      .update({ has_lifetime_access: true })
      .eq("id", userId);

    await supabase.from("purchases").insert({
      user_id: userId,
      amount: attributes.total,
      currency: attributes.currency,
      payment_method: "lemon_squeezy",
      status: "confirmed",
      lemon_squeezy_id: event.data.id,
      confirmed_at: new Date().toISOString(),
    });
  }

  return NextResponse.json("OK", { status: 200 });
}
