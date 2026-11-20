import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server Supabase configuration missing." },
        { status: 500 }
      );
    }

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    // Verify user session JWT
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser(token);

    if (authError || !user?.email) {
      return NextResponse.json(
        { error: "Invalid or expired session." },
        { status: 401 }
      );
    }

    // Fetch Stripe customer ID via service role
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const { data: subRecord, error: subError } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (subError || !subRecord?.stripe_customer_id) {
      return NextResponse.json(
        {
          error:
            "No Stripe customer record found for this account. Contact support@subshieldhq.com for assistance.",
        },
        { status: 404 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const origin =
      req.headers.get("origin") || "https://www.subshieldhq.com";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subRecord.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create billing portal session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
