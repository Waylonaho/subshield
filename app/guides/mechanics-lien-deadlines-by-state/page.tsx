"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATE_LIEN_RULES, StateLienRule } from "@/lib/statutoryRules";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

function slugifyState(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MechanicsLienDeadlinesByStatePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "prelim_required" | "no_prelim">("all");

  const allStates = useMemo(() => {
    return Object.values(STATE_LIEN_RULES).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, []);

  const filteredStates = useMemo(() => {
    return allStates.filter((rule) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        rule.name.toLowerCase().includes(q) ||
        rule.code.toLowerCase().includes(q) ||
        rule.statutoryNoticeName.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (filterMode === "prelim_required") return Boolean(rule.preliminaryNoticeDays);
      if (filterMode === "no_prelim") return !rule.preliminaryNoticeDays;
      return true;
    });
  }, [allStates, searchQuery, filterMode]);

  const formatTrigger = (rule: StateLienRule) => {
    if (!rule.preliminaryNoticeDays) return "No universal early notice";
    if (rule.noticeTrigger === "last_furnishing") {
      return `${rule.preliminaryNoticeDays} days after last work`;
    }
    if (rule.noticeTrigger === "invoice_date") {
      return `${rule.preliminaryNoticeDays} days prior to lien filing`;
    }
    return `${rule.preliminaryNoticeDays} days from first work`;
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which states have the shortest mechanics lien filing deadlines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "States with some of the strictest commercial subcontractor filing cutoffs include Alabama (4 months / 120 days), Pennsylvania (6 months), California (90 days from completion), and New Jersey (90 days from last furnishing). Preliminary notice windows can be as short as 15 to 20 days from first furnishing in states like California, Arizona, Utah, and North Carolina.",
        },
      },
      {
        "@type": "Question",
        name: "Do weekends and holidays extend mechanics lien deadlines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most states, if a statutory filing cutoff lands on a weekend or legal court holiday, the deadline rolls to the next business day—however, county recorder cutoffs and certified mail lead times mean subcontractors should file at least 5 to 7 business days before the statutory expiration date.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a Preliminary Notice and a Notice of Intent to Lien?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Preliminary Notice (or Notice to Owner) is sent near the start of a project to preserve your legal right to file a lien later. A Notice of Intent to Lien (NOI) is a formal pre-lien demand letter sent after an invoice goes unpaid, warning the owner and general contractor before recording the lien.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="text-slate-300 hover:text-white transition hidden sm:inline">
              Bid &amp; Lien Calculators
            </Link>
            <Link href="/dashboard" className="text-slate-200 hover:text-amber-400 font-semibold transition">
              Member Login
            </Link>
            <a
              href={STRIPE_PRO_URL}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
            >
              Pro Alerts ($19/mo)
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        {/* Hero */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-amber-400">50-State Mechanics Lien Deadlines Chart</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mechanics Lien &amp; Preliminary Notice Deadlines by State (50-State Chart)
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Compare statutory preliminary notice windows, trigger events, and final county recording deadlines across all 50 states and Washington, D.C. Select any state to calculate exact calendar cutoff dates or read step-by-step notice service rules.
          </p>
        </div>

        {/* High-Conversion Alert Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/25 to-slate-900 border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Tracking Jobs Across Multiple States?
            </span>
            <h2 className="text-lg font-extrabold text-white">
              Automate 14-Day, 7-Day &amp; 2-Day Cutoff Warnings for Up to 30 Active Jobs
            </h2>
            <p className="text-xs text-slate-300">
              One missed notice window forfeits 100% of your mechanics lien leverage. Protect your receivables for $19/month.
            </p>
          </div>
          <a
            href={STRIPE_PRO_URL}
            className="shrink-0 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition"
          >
            Activate Pro Alerts ($19/mo) →
          </a>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
          <input
            type="text"
            placeholder="Search by state name, abbreviation (e.g. TX, CA, SC), or statute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
          />
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`px-3 py-2 rounded-lg font-semibold transition cursor-pointer ${
                filterMode === "all"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All ({allStates.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("prelim_required")}
              className={`px-3 py-2 rounded-lg font-semibold transition cursor-pointer ${
                filterMode === "prelim_required"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Preliminary Notice Required
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("no_prelim")}
              className={`px-3 py-2 rounded-lg font-semibold transition cursor-pointer ${
                filterMode === "no_prelim"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              No Early Notice
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 font-semibold">State</th>
                  <th className="py-3.5 px-4 font-semibold">Statutory Notice / Form</th>
                  <th className="py-3.5 px-4 font-semibold">Preliminary Notice Cutoff</th>
                  <th className="py-3.5 px-4 font-semibold">Final Lien Recording Cutoff</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Tools &amp; Guides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStates.map((rule) => {
                  const slug = slugifyState(rule.name);
                  return (
                    <tr key={rule.code} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        <Link
                          href={`/lien-deadlines/${slug}`}
                          className="hover:text-amber-400 transition"
                        >
                          {rule.name} ({rule.code})
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-xs">
                        {rule.statutoryNoticeName}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span
                          className={
                            rule.preliminaryNoticeDays
                              ? "text-amber-400 font-semibold"
                              : "text-slate-400"
                          }
                        >
                          {formatTrigger(rule)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-rose-400 whitespace-nowrap">
                        {rule.lienFilingDays} days from{" "}
                        {rule.lienTrigger === "completion" ? "completion" : "last work"}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-3 text-xs">
                        <Link
                          href={`/lien-deadlines/${slug}`}
                          className="font-bold text-amber-400 hover:underline"
                        >
                          Date Calculator
                        </Link>
                        <span className="text-slate-700">|</span>
                        <Link
                          href={`/notices/${slug}-preliminary-notice`}
                          className="text-slate-300 hover:text-white hover:underline"
                        >
                          Notice Guide
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredStates.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">
              No matching states found for &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p className="max-w-3xl mx-auto">
          Disclaimer: Statutory deadlines are general commercial subcontractor baselines and do not constitute legal advice. Verify claimant tier and county recording rules with a licensed construction attorney.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} SubShieldHQ.</p>
      </footer>
    </div>
  );
}
