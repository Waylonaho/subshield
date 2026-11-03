import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About & Methodology",
  description:
    "Learn about SubShieldHQ's mission, calculation methodology, and construction estimating standards.",
};

export default function AboutPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            About SubShieldHQ
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Independent Pricing Tools for Trade Contractors
          </h1>
        </div>

        <section className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            SubShieldHQ was created to solve a persistent problem faced by specialty subcontractors: 
            <strong> underbidding jobs due to hidden labor burden and unrecovered overhead costs.</strong>
          </p>
          <p>
            Many small trade contractors apply a flat markup (e.g., 20%) directly to raw wages and materials, 
            without accounting for employer payroll taxes, workers' compensation insurance, non-billable shop time, 
            or operating overhead. The result is often high job-site volume with near-zero net profit.
          </p>
        </section>

        <section className="border-t border-slate-800 pt-8 space-y-4 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Our Calculation Methodology</h2>
          
          <h3 className="text-base font-semibold text-amber-400 pt-2">1. Fully Burdened Labor</h3>
          <p>
            Raw hourly wages do not reflect the true cost of an employee on site. Our estimator applies a labor burden 
            multiplier that accounts for employer FICA (Social Security & Medicare), FUTA, SUTA, workers’ compensation 
            premiums by trade class code, paid leave, and safety allowances.
          </p>

          <h3 className="text-base font-semibold text-amber-400 pt-2">2. Break-Even Overhead Recovery</h3>
          <p>
            Every trade business incurs fixed indirect expenses (shop rent, estimating software, legal, insurance, truck payments). 
            Our model allocates an overhead recovery percentage across direct project costs so that baseline business expenses 
            are recovered before profit is calculated.
          </p>

          <h3 className="text-base font-semibold text-amber-400 pt-2">3. Markup vs. Gross Margin</h3>
          <p>
            Adding a 20% markup on costs is <em>not</em> the same as earning a 20% gross margin. We calculate target pricing using 
            the true gross margin formula:
          </p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg font-mono text-sm text-amber-300">
            Bid Price = Total Break-Even Cost ÷ (1 - Target Gross Margin %)
          </div>
        </section>

        <section className="border-t border-slate-800 pt-8 space-y-4 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Statutory Deadlines & Legal Notice Policy</h2>
          <p>
            Our lien deadline reference tool translates standard state statutory rules into estimated project reminder dates. 
            Because statutory deadlines depend on specific claimant classifications (prime contractor, 1st-tier sub, supplier), 
            contract language, and specific county filing rules, these dates are provided strictly as general reference baselines 
            and do not constitute formal legal counsel.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ. For informational estimating purposes only.
      </footer>
    </div>
  );
}
