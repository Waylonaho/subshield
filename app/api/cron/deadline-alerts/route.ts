import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function diffDaysFromToday(isoDateStr: string): number {
  const [y, m, d] = isoDateStr.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch active Pro subscriber emails
  const { data: activeSubs } = await supabaseAdmin
    .from("subscriptions")
    .select("email")
    .eq("status", "active");

  if (!activeSubs || activeSubs.length === 0) {
    return NextResponse.json({ sent: 0, message: "No active subscribers" });
  }

  const proEmails = new Set(activeSubs.map((s) => s.email.toLowerCase()));

  // 2. Fetch tracked projects
  const { data: projects } = await supabaseAdmin.from("projects").select("*");
  if (!projects) {
    return NextResponse.json({ sent: 0 });
  }

  const ALERT_WINDOWS = new Set([14, 7, 2]);
  let emailsSent = 0;

  for (const job of projects) {
    if (!proEmails.has(job.user_email.toLowerCase())) continue;

    // Check Preliminary Notice Window
    if (job.prelim_deadline) {
      const prelimDays = diffDaysFromToday(job.prelim_deadline);
      if (ALERT_WINDOWS.has(prelimDays)) {
        await resend.emails.send({
          from: "SubShield Alerts <alerts@subshieldhq.com>",
          to: job.user_email,
          subject: `⚠️ ${prelimDays}-Day Warning: ${job.state_code} Preliminary Notice Due (${job.project_name})`,
          text: `Statutory Alert for ${job.project_name} (${job.state_code}):\n\nYour Preliminary Notice deadline is in ${prelimDays} days (${job.prelim_deadline}).\n\nDeliver your notice via USPS Certified Mail before this cutoff expires to preserve your mechanics lien rights.\n\nManage your jobs: https://www.subshieldhq.com/dashboard`,
        });
        emailsSent++;
      }
    }

    // Check Final Lien Filing Cutoff
    if (job.lien_deadline) {
      const lienDays = diffDaysFromToday(job.lien_deadline);
      if (ALERT_WINDOWS.has(lienDays)) {
        await resend.emails.send({
          from: "SubShield Alerts <alerts@subshieldhq.com>",
          to: job.user_email,
          subject: `🚨 ${lienDays}-Day Cutoff: ${job.state_code} Mechanics Lien Deadline (${job.project_name})`,
          text: `CRITICAL STATUTORY CUTOFF for ${job.project_name} (${job.state_code}):\n\nYour final deadline to record a Mechanics Lien is in ${lienDays} days (${job.lien_deadline}).\n\nGenerate a Notice of Intent to Lien immediately: https://www.subshieldhq.com/tools/notice-of-intent-to-lien\nManage your dashboard: https://www.subshieldhq.com/dashboard`,
        });
        emailsSent++;
      }
    }
  }

  return NextResponse.json({ success: true, emailsSent });
}
