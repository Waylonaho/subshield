"use client";

import { useState } from "react";
import Link from "next/link";

export default function BidTemplatePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, connect this to your email list API (Resend, ConvertKit, etc.)
      setSubmitted(true);
    }
  };

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

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Downloadable Toolkits
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Subcontractor Bid & Estimating Templates (Excel / Sheets)
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Professional estimating spreadsheets pre-configured with burdened labor rates, 
            overhead recovery formulas, and change-order tracking logs.
          </p>
        </div>

        {/* Free Starter Tier vs Pro Pack Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Starter Download */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Free Download
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Starter Bid Estimator
              </h2>
              <div className="text-2xl font-extrabold text-white mt-2">$0</div>
              <p className="text-xs text-slate-400 mt-1">
                Instant download formatted for Excel & Google Sheets.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mt-6">
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">✓</span> Basic Direct Labor & Material Cost bridge
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">✓</span> Markup vs. Gross Margin automatic formula
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">✓</span> Client proposal summary export
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              {submitted ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs text-center">
                  Check your inbox! Download link sent.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your trade email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition border border-slate-700"
                  >
                    Send Free Template (.xlsx)
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Pro Toolkit ($29) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Most Popular
            </span>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Complete Contractor System
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                SubShield Pro Pricing Pack
              </h2>
              <div className="text-2xl font-extrabold text-amber-400 mt-2 font-mono">
                $29{" "}
                <span className="text-xs font-normal text-slate-400">
                  one-time payment
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Complete spreadsheet suite. No recurring monthly subscription.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mt-6">
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> Multi-tier Labor Burden Model (W-2 & Sub-tier)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> Annual Company Overhead Recovery allocation sheet
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> Change Order Log & Quote Expiration Tracker
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span> Scope Inclusions & Exclusions proposal template
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href="mailto:support@subshieldhq.com?subject=SubShield%20Pro%20Pack%20Inquiry"
                className="w-full block text-center py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
              >
                Get Pro Pack ($29)
              </a>
              <span className="text-[11px] text-slate-500 text-center block mt-2">
                Instant delivery • 30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
