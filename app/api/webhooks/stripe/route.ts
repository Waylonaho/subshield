import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.split("=")[1];
  const v1Signature = parts.find((p) => p.startsWith("v1="))?.split("=")[1];

  if (!timestamp || !v1Signature) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(v1Signature),
      Buffer.from(expectedSig)
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = (
        session.customer_details?.email ||
        session.customer_email ||
        ""
      )
        .toLowerCase()
        .trim();

      if (email) {
        await supabaseAdmin.from("subscriptions").upsert({
          email,
          stripe_customer_id: session.customer || null,
          status: "active",
          updated_at: new Date().toISOString(),
        });
      }
    } else if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object;
      const status =
        subscription.status === "active" || subscription.status === "trialing"
          ? "active"
          : "inactive";

      if (subscription.customer) {
        await supabaseAdmin
          .from("subscriptions")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("stripe_customer_id", subscription.customer);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}
