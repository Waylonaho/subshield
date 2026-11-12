import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const GOOGLE_SHEET_COPY_URL =
  "https://docs.google.com/spreadsheets/d/1GQXyl4rZxR4d35F9_qIzY88m02GCoZ9K4pTNqPEEwGw/copy";

const STRIPE_PRO_URL =
  "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // 1. Sends lead alert to you
    await resend.emails.send({
      from: "SubShield Leads <onboarding@resend.dev>",
      to: process.env.MY_EMAIL || "waylonaho@gmail.com",
      subject: "🚨 New SubShieldHQ Contractor Lead!",
      text: `A contractor just downloaded your SubShield Bid Estimator Template:\n\nEmail: ${email}`,
    });

    // 2. Sends the real Google Sheet copy link + Pro upgrade upsell to the contractor
    await resend.emails.send({
      from: "SubShieldHQ <onboarding@resend.dev>",
      to: email,
      subject: "Your Free Subcontractor Bid & Labor Burden Template",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="margin-top: 0; color: #0f172a;">Your SubShieldHQ Bid Estimator Template</h2>
          <p style="line-height: 1.6; color: #334155;">
            Thanks for downloading the SubShieldHQ Subcontractor Bid &amp; Labor Burden Estimator. Click the button below to save your own editable copy directly to Google Drive (or download as Excel):
          </p>
          <p style="margin: 24px 0;">
            <a href="${GOOGLE_SHEET_COPY_URL}"
               style="background:#f59e0b; color:#090d16; padding:14px 22px; font-weight:bold; text-decoration:none; border-radius:8px; display:inline-block;">
              Make Your Copy in Google Sheets →
            </a>
          </p>
          <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
            <strong>What's inside:</strong><br/>
            • Tab 1: Executive Bid Summary &amp; Markup vs. Margin Check<br/>
            • Tab 2: True Labor Burden &amp; Crew Cost Calculator<br/>
            • Tab 3: Itemized Materials, Waste Factor &amp; Rentals Takeoff<br/>
            • Tab 4: Change Order Profit Protection Log
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px; color: #0f172a;">
              Protecting Active Commercial Receivables?
            </p>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569; line-height: 1.5;">
              Never forfeit an unpaid invoice over a missed preliminary notice window. Track up to 30 jobs across all 50 states with automated SMS &amp; email statutory alarms.
            </p>
            <a href="${STRIPE_PRO_URL}" style="color: #d97706; font-weight: bold; font-size: 13px; text-decoration: none;">
              Activate SubShield Pro Alerts ($19/mo) →
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
