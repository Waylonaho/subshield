"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATE_CONTRACT_RULES, StateContractRule } from "@/lib/commercialContractRules";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

function slugifyState(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function RetainageAndPayWhenPaidGuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "void_pay_if_paid" | "capped_5">("all");

  const allStates = useMemo(() => {
    return Object.values(STATE_CONTRACT_RULES).sort((a, b) =>
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
        rule.statutoryCitation.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (filterMode === "void_pay_if_paid") {
        return rule.payIfPaidEnforceability === "Void / Unenforceable";
      }
      if (filterMode === "capped_5") {
        return (
          rule.privateRetainageCap.includes("5%") ||
          rule.privateRetainageCap.includes("0%")
        );
      }
      return true;
    });
  }, [allStates, searchQuery, filterMode]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between a Pay-When-Paid and Pay-If-Paid clause?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Pay-When-Paid clause is a timing mechanism that allows the general contractor a reasonable period to collect from the owner before paying the subcontractor, but does not eliminate the obligation to pay. A Pay-If-Paid clause shifts the entire risk of owner insolvency onto the subcontractor—and is void by statute or public policy in states like California, New York, North Carolina, South Carolina, Virginia, Illinois, and Maryland.",
        },
      },
      {
        "@type": "Question",
        name: "Does waiting for retainage extend my mechanics lien filing deadline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. In almost every state, your mechanics lien filing clock runs from your last day of substantive contract work—not from the date retainage is billed or punch-list walk-throughs occur. Waiting 90 to 120 days for retainage often causes subcontractors to accidentally forfeit their lien rights.",
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

      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/guides/mechanics-lien-deadlines-by-state" className="text-slate-300 hover:text-white transition hidden sm:inline">
              50-State Lien Deadlines
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
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Retainage &amp; Pay-When-Paid Laws by State</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Construction Retainage Caps &amp; Pay-If-Paid Laws by State (50-State Chart)
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Check statutory private and public retainage limits, prompt-payment release timelines, and whether pay-if-paid clauses are enforceable in your state before signing a commercial subcontract.
          </p>
        </div>

        {/* Retainage Lien Trap Warning */}
        <div className="bg-gradient-to-r from-rose-950/35 via-slate-900 to-amber-950/25 border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
              ⚠️ The #1 Retainage Trap for Subcontractors
            </span>
            <h2 className="text-lg font-extrabold text-white">
              Waiting 90 Days for Retainage Can Silently Kill Your Mechanics Lien Rights
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Your statutory lien filing window runs from your <strong>last day of substantive trade work</strong>—not when final retainage is invoiced. Put all 30 of your active jobs on automated 14-day, 7-day, and 2-day email cutoff warnings before your window closes.
            </p>
          </div>
          <a
            href={STRIPE_PRO_URL}
            className="shrink-0 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition"
          >
            Track Lien Cutoffs ($19/mo) →
          </a>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
          <input
            type="text"
            placeholder="Search by state name, code (e.g. SC, TX, NY), or statute..."
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
              onClick={() => setFilterMode("void_pay_if_paid")}
              className={`px-3 py-2 rounded-lg font-semibold transition cursor-pointer ${
                filterMode === "void_pay_if_paid"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Pay-If-Paid Void
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("capped_5")}
              className={`px-3 py-2 rounded-lg font-semibold transition cursor-pointer ${
                filterMode === "capped_5"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Private Retainage Capped ≤ 5%
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 font-semibold">State</th>
                  <th className="py-3.5 px-4 font-semibold">Private Retainage Cap</th>
                  <th className="py-3.5 px-4 font-semibold">Public Retainage Cap</th>
                  <th className="py-3.5 px-4 font-semibold">Pay-If-Paid Status</th>
                  <th className="py-3.5 px-4 font-semibold">Statute &amp; Key Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStates.map((rule: StateContractRule) => {
                  const slug = slugifyState(rule.name);
                  const isVoid = rule.payIfPaidEnforceability === "Void / Unenforceable";
                  return (
                    <tr key={rule.code} className="hover:bg-slate-800/40 transition align-top">
                      <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                        <Link
                          href={`/lien-deadlines/${slug}`}
                          className="hover:text-amber-400 transition block"
                        >
                          {rule.name} ({rule.code})
                        </Link>
                        <span className="text-[11px] font-normal text-slate-500">
                          {rule.statutoryCitation}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-200">
                        {rule.privateRetainageCap}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-300">
                        {rule.publicRetainageCap}
                      </td>
                      <td className="py-4 px-4 text-xs">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full font-semibold ${
                            isVoid
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {rule.payIfPaidEnforceability}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-400 max-w-md leading-relaxed">
                        {rule.keyTakeaway}{" "}
                        <Link
                          href={`/lien-deadlines/${slug}`}
                          className="text-amber-400 hover:underline font-semibold ml-1"
                        >
                          Check {rule.code} Lien Cutoff →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p className="max-w-3xl mx-auto">
          Disclaimer: Retainage and prompt-payment statutes summarized above apply primarily to commercial subcontracts and are subject to project-size thresholds and contract terms. Informational resource only; not legal advice.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} SubShieldHQ.</p>
      </footer>
    </div>
  );
}
