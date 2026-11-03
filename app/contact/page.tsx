import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SubShieldHQ for support, tool feedback, or statutory rule updates.",
};

export default function ContactPage() {
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
            Get In Touch
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Contact & Rule Feedback</h1>
          <p className="text-slate-400 mt-2">
            Have a suggestion for our bid calculator or noticed a recent change in your state's mechanics lien statutory timeline? We welcome your feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-2">Direct Support & Feedback</h2>
            <p className="text-slate-400 text-sm mb-4">
              For general inquiries, partnership questions, or spreadsheet download assistance:
            </p>
            <a
              href="mailto:support@subshieldhq.com"
              className="text-amber-400 font-semibold hover:underline"
            >
              support@subshieldhq.com
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-2">Submit Statutory Corrections</h2>
            <p className="text-slate-400 text-sm mb-4">
              If a state statute code, preliminary notice window, or lien filing timeframe has changed, please send us the citation so we can update our reference records:
            </p>
            <a
              href="mailto:corrections@subshieldhq.com"
              className="text-amber-400 font-semibold hover:underline"
            >
              corrections@subshieldhq.com
            </a>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-6">
          <h3 className="text-sm font-semibold text-white mb-1">Developer & Open Project Repository</h3>
          <p className="text-xs text-slate-400">
            SubShieldHQ’s public calculation tables and client-side logic are versioned transparently. You can report technical issues or review the codebase on GitHub.
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
