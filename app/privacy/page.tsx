import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SubShieldHQ privacy policy: we respect contractor privacy and run all calculations client-side.",
};

export default function PrivacyPage() {
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
            Privacy & Data Security
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Client-Side Processing (Your Rates Stay Private)</h2>
          <p>
            We recognize that your hourly wage rates, trade margins, and bid calculations are sensitive, proprietary business assets. 
            All numbers entered into the SubShieldHQ calculators (direct labor, materials, equipment, overhead, and margin percentages) 
            are processed entirely in your web browser. <strong>We do not log, transmit, or store your calculator inputs on any server or database.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Information We May Collect</h2>
          <p>
            When you interact with our website, we may collect minimal standard data, including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li><strong>Voluntary Email Submissions:</strong> If you opt in to receive downloadable spreadsheet templates or product updates.</li>
            <li><strong>Aggregated Web Analytics:</strong> Privacy-conscious page visit metrics (e.g., pages viewed, referring sites) without logging personal identifying information.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Third-Party Services & Links</h2>
          <p>
            SubShieldHQ may contain links to external sites (such as construction software providers, trade associations, or statutory references). 
            We do not control the privacy practices of external websites. If you click on an affiliate or external link, review that third party’s privacy policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Contacting Us</h2>
          <p>
            For any privacy-related questions or data deletion requests, please contact us at{" "}
            <a href="mailto:support@subshieldhq.com" className="text-amber-400 underline">
              support@subshieldhq.com
            </a>.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
