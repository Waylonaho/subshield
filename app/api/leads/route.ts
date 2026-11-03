import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Sends the alert to you
    await resend.emails.send({
      from: "SubShield Leads <onboarding@resend.dev>",
      to: process.env.MY_EMAIL || "waylonaho@gmail.com",
      subject: "🚨 New Contractor Lead!",
      text: `A contractor requested your template:\n\nEmail: ${email}`,
    });

    // Sends the template to the contractor
    await resend.emails.send({
      from: "SubShieldHQ <onboarding@resend.dev>",
      to: email,
      subject: "Your Free Contractor Bid Estimator Template",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; padding: 20px;">
          <h2>Your SubShield Bid Template</h2>
          <p>Thanks for requesting the contractor bid template.</p>
          <p>Click below to copy the spreadsheet to your Google Drive or download it:</p>
          <p>
            <a href="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/copy" 
               style="background:#f59e0b; color:#000; padding:12px 20px; font-weight:bold; text-decoration:none; border-radius:6px; display:inline-block;">
              Open Template in Google Sheets
            </a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
