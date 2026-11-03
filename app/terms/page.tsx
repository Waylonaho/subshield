import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "SubShieldHQ terms of service, estimation disclaimers, and legal notices.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
          >
            ← Back to Calculator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8 text-slate-300 leading-relaxed text-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Terms of Use
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Not Certified Accounting or Legal Counsel</h2>
          <p>
            SubShieldHQ provides operational tools, spreadsheets, and reference formulas for informational estimating purposes only. 
            Use of our tools does not establish an attorney-client or certified accounting relationship. You are solely responsible for 
            verifying your project bids, contracts, tax obligations, and statutory lien notices with qualified professionals in your state.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Accuracy of Estimating Formulas</h2>
          <p>
            While our tools use standard cost-plus construction pricing principles, output prices are entirely dependent on user-entered values. 
            SubShieldHQ is not liable for project underbids, job cost overruns, bid rejections, or business losses resulting from the use of our calculators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Statutory Deadline Reminders</h2>
          <p>
            Statutory notice and mechanics lien deadlines vary widely across jurisdictions and are subject to judicial interpretations, 
            contractual waivers, and legislative amendments. The calendar export (.ics) is a personal reminder tool and does not guarantee legal compliance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, SubShieldHQ and its creators shall not be liable for any indirect, incidental, 
            or consequential damages arising out of your access to or use of the website and downloadable materials.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
