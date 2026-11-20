import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SubShieldHQ",
  description:
    "Privacy Policy detailing how SubShieldHQ handles browser-local estimating calculations, Pro account data, and third-party sub-processors.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            Data Protection &amp; Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Effective Date: November 20, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Client-Side Calculator Privacy</h2>
          <p>
            SubShieldHQ&apos;s free Direct Cost Bid Estimator, Labor Burden Calculator, Lien Waiver Generator, and Notice of Intent Letter Generator execute directly in your web browser. We do not transmit, log, or store your company labor rates, overhead percentages, profit margins, customer names, or generated PDF documents on our servers when you use our free browser tools. If you click <em>&ldquo;Save My Company Rates,&rdquo;</em> those percentages are stored strictly in your own browser&apos;s local storage (`localStorage`).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Information Collected for SubShield Pro Accounts</h2>
          <p>
            When you subscribe to SubShield Pro or request a free spreadsheet template, we collect only the information required to deliver the service:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li><strong>Account &amp; Billing Identifiers:</strong> Email address, Stripe customer ID, and subscription status. Credit card numbers are processed exclusively by Stripe and never touch SubShieldHQ servers.</li>
            <li><strong>Tracked Project Data:</strong> Project names, state jurisdictions, first work dates, last work dates, and calculated statutory reminder timestamps saved inside your authenticated dashboard.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Infrastructure &amp; Sub-Processors</h2>
          <p>
            We do not sell, rent, or trade your personal or project information to third parties. We rely on the following enterprise infrastructure providers solely to operate SubShieldHQ:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li><strong>Vercel Inc.:</strong> Application hosting and edge network delivery.</li>
            <li><strong>Supabase Inc.:</strong> Encrypted PostgreSQL database storage and passwordless magic-link authentication with Row Level Security (RLS).</li>
            <li><strong>Stripe Inc.:</strong> PCI-DSS Level 1 payment processing and self-serve subscription billing portal.</li>
            <li><strong>Resend Inc.:</strong> Transactional authentication emails and scheduled lien cutoff alert delivery.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Data Retention &amp; Deletion Requests</h2>
          <p>
            You may delete tracked projects directly inside your Member Dashboard at any time. To request permanent deletion of your account record, email <a href="mailto:support@subshieldhq.com" className="text-amber-400 underline">support@subshieldhq.com</a> from your registered email address and we will purge your account data within 7 business days.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SubShieldHQ. All rights reserved.</p>
      </footer>
    </div>
  );
}
