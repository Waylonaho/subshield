import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SubShieldHQ",
  description:
    "Terms of Service, Unauthorized Practice of Law (UPL) disclaimer, subscription billing terms, and limitation of liability for SubShieldHQ.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <Link
            href="/"
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8 text-sm text-slate-300 leading-relaxed">
        <div className="border-b border-slate-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Legal &amp; Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Effective Date: November 20, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using SubShieldHQ (the &ldquo;Service&rdquo;), including its free construction estimating calculators, lien waiver generators, Notice of Intent letter generators, statutory deadline reference guides, and SubShield Pro automated alert dashboard, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-xl bg-amber-950/25 border border-amber-500/35">
          <h2 className="text-lg font-bold text-amber-400">
            2. No Legal Advice &amp; No Attorney-Client Relationship (UPL Disclaimer)
          </h2>
          <p className="text-slate-200">
            <strong>SubShieldHQ is a self-help software and mathematical estimating platform—not a law firm, legal referral service, or licensed construction lien filing agency.</strong> Nothing provided on this website, in generated PDF templates, or in automated email reminders constitutes legal advice or creates an attorney-client relationship.
          </p>
          <p>
            Mechanics lien statutes, preliminary notice windows, mandatory statutory waiver forms, and county recording rules vary significantly depending on project ownership (private, commercial, residential, state public works, or federal Miller Act), claimant tier (prime contractor, first-tier subcontractor, sub-subcontractor, or material supplier), and prime contract terms. You are solely responsible for independently verifying all deadlines, statutory form language, and service requirements with a licensed construction attorney in the project&apos;s jurisdiction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">
            3. SubShield Pro Subscription, Auto-Renewal &amp; Cancellation
          </h2>
          <p>
            SubShield Pro is billed as a recurring monthly subscription at <strong>$19.00 USD per month</strong> (plus applicable taxes, if any) until canceled. By subscribing, you authorize our payment processor, Stripe, to charge your designated payment method on a recurring monthly basis.
          </p>
          <p>
            <strong>One-Click Cancellation:</strong> You may cancel your subscription at any time with zero cancellation fees by logging into your <Link href="/dashboard" className="text-amber-400 underline">Member Dashboard</Link> and clicking <em>&ldquo;Manage Billing / Cancel&rdquo;</em> to open the Stripe Customer Portal, or by emailing <a href="mailto:support@subshieldhq.com" className="text-amber-400 underline">support@subshieldhq.com</a> at least 24 hours prior to your next billing date. Upon cancellation, your Pro access continues through the end of the current paid billing period. Payments are non-refundable for partial billing months.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">
            4. Automated Alert Deliverability &amp; User Responsibility
          </h2>
          <p>
            SubShield Pro sends automated email countdown alerts (such as 14-day, 7-day, and 2-day reminders) based solely on the project state and work dates you enter into your dashboard. Email delivery depends on third-party networks, spam filters, and accurate user input. <strong>SubShieldHQ does not guarantee uninterrupted email delivery and is not liable for missed statutory deadlines, unrecorded liens, or forfeited payment rights.</strong> Always maintain redundant internal accounting controls and file liens well ahead of statutory expiration dates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">
            5. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p>
            THE SERVICE AND ALL CALCULATORS, TEMPLATES, AND REMINDERS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR STATUTORY ACCURACY.
          </p>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SUBSHIELDHQ, ITS OWNERS, OFFICERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF CONTRACT PROFITS, UNPAID INVOICES, RETAINAGE, OR MECHANICS LIEN RIGHTS ARISING OUT OF YOUR USE OF THE SERVICE. IN ALL CASES, SUBSHIELDHQ&apos;S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL SUBSCRIPTION FEES PAID BY YOU TO SUBSHIELDHQ IN THE THREE (3) MONTHS PRECEDING THE CLAIM, OR (B) FIFTY U.S. DOLLARS ($50.00).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Governing Law &amp; Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of the State of South Carolina, without regard to conflict-of-law principles. Any dispute arising out of or relating to the Service shall first be submitted to good-faith informal resolution via <a href="mailto:support@subshieldhq.com" className="text-amber-400 underline">support@subshieldhq.com</a>, and if unresolved within 30 days, resolved exclusively in the state or federal courts located in Spartanburg County, South Carolina.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SubShieldHQ. All rights reserved.</p>
      </footer>
    </div>
  );
}
