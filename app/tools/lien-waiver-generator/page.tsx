"use client";

import { useState } from "react";
import Link from "next/link";
import { STATE_LIEN_RULES } from "@/lib/statutoryRules";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

type WaiverType =
  | "conditional_progress"
  | "unconditional_progress"
  | "conditional_final"
  | "unconditional_final";

export default function LienWaiverGenerator() {
  const [waiverType, setWaiverType] = useState<WaiverType>("conditional_progress");
  const [stateCode, setStateCode] = useState<string>("SC");
  const [claimantName, setClaimantName] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [projectLocation, setProjectLocation] = useState<string>("");
  const [throughDate, setThroughDate] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("5000.00");
  const [exceptions, setExceptions] = useState<string>("Unbilled change orders and retainage");

  const states = Object.values(STATE_LIEN_RULES).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const selectedState = STATE_LIEN_RULES[stateCode] || states[0];

  const isUnconditional = waiverType.startsWith("unconditional");
  const isFinal = waiverType.endsWith("final");

  const waiverTitleMap: Record<WaiverType, string> = {
    conditional_progress: "CONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT",
    unconditional_progress: "UNCONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT",
    conditional_final: "CONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT",
    unconditional_final: "UNCONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/tools/notice-of-intent-to-lien" className="text-slate-300 hover:text-white transition hidden sm:inline">
              Notice of Intent Generator
            </Link>
            <Link href="/" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold transition">
              ← Main Tools
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        <div className="print:hidden space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Subcontractor Payment Protection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Free Construction Lien Waiver Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Generate clean Conditional or Unconditional Lien Waivers for progress draws and final retainage payouts. Print or save directly as a PDF.
          </p>
        </div>

        {/* Critical Safety Warning */}
        {isUnconditional ? (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs sm:text-sm print:hidden">
            <strong>⚠️ CRITICAL WARNING:</strong> You selected an <strong>UNCONDITIONAL</strong> waiver. Never sign or deliver an unconditional lien waiver until the check has physically cleared your bank account. If the check bounces, you may still forfeit your mechanics lien rights.
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm print:hidden">
            <strong>✓ SAFE CHOICE:</strong> A <strong>Conditional</strong> waiver only becomes legally effective once actual payment clears your account. Always use conditional waivers when submitting a pay application.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 print:hidden">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Waiver Type
              </label>
              <select
                value={waiverType}
                onChange={(e) => setWaiverType(e.target.value as WaiverType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="conditional_progress">Conditional — Progress Payment (Recommended)</option>
                <option value="conditional_final">Conditional — Final Payment</option>
                <option value="unconditional_progress">Unconditional — Progress Payment (Funds Cleared)</option>
                <option value="unconditional_final">Unconditional — Final Payment (Funds Cleared)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Project State
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {states.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Your Subcontractor Company Name (Claimant)
              </label>
              <input
                type="text"
                placeholder="e.g. Palmetto Curb & Concrete LLC"
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                General Contractor / Customer Name
              </label>
              <input
                type="text"
                placeholder="e.g. Summit General Contractors"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Property Owner Name
              </label>
              <input
                type="text"
                placeholder="e.g. Main Street Retail Holdings LLC"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Job Name &amp; Street Address
              </label>
              <input
                type="text"
                placeholder="e.g. 450 Commerce Blvd, Greenville, SC"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Payment Amount ($)
                </label>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Work Through Date
                </label>
                <input
                  type="date"
                  value={throughDate}
                  onChange={(e) => setThroughDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {!isFinal && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Exceptions / Retained Rights
                </label>
                <input
                  type="text"
                  value={exceptions}
                  onChange={(e) => setExceptions(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
            >
              Print / Save Waiver as PDF
            </button>
          </div>

          {/* Live Document Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white text-slate-900 rounded-xl p-8 sm:p-10 shadow-xl font-serif text-sm leading-relaxed space-y-5">
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <h2 className="text-lg font-bold tracking-wide uppercase">
                  {waiverTitleMap[waiverType]}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  State of {selectedState.name} ({selectedState.code})
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 border border-slate-200">
                <div><strong>Claimant:</strong> {claimantName || "[Subcontractor Name]"}</div>
                <div><strong>Customer / GC:</strong> {customerName || "[General Contractor]"}</div>
                <div><strong>Property Owner:</strong> {ownerName || "[Property Owner]"}</div>
                <div><strong>Through Date:</strong> {throughDate || "[YYYY-MM-DD]"}</div>
                <div className="sm:col-span-2"><strong>Job Location:</strong> {projectLocation || "[Project Address]"}</div>
                <div className="sm:col-span-2"><strong>Payment Amount:</strong> ${paymentAmount || "0.00"}</div>
              </div>

              {isUnconditional ? (
                <p>
                  <strong>NOTICE TO CLAIMANT:</strong> This document waives and releases lien, stop payment notice, and payment bond rights the claimant has for labor and service provided, and equipment and material delivered, to the customer on this job {isFinal ? "through final completion" : `through ${throughDate || "[Through Date]"}`}. Rights based upon labor or service provided, or equipment or material delivered, pursuant to a written change order that has been fully executed by the parties prior to the date that this document is signed by the claimant, are waived and released by this document, unless listed as an Exception below. The claimant has received the following {isFinal ? "final" : "progress"} payment: <strong>${paymentAmount || "0.00"}</strong>.
                </p>
              ) : (
                <p>
                  On receipt by the signer of this document of a check from <strong>{customerName || "[Customer/GC]"}</strong> in the sum of <strong>${paymentAmount || "0.00"}</strong> payable to <strong>{claimantName || "[Claimant]"}</strong> and when the check has been properly endorsed and has been paid by the bank on which it is drawn, this document becomes effective to release any mechanic&apos;s lien right, any right arising from a payment bond that complies with a state or federal statute, any common law payment bond right, any claim for payment, and any rights under any similar ordinance, rule, or statute related to claim or payment rights for persons in the signer&apos;s position that the signer has on the property of <strong>{ownerName || "[Owner]"}</strong> located at <strong>{projectLocation || "[Job Location]"}</strong> {isFinal ? "for the entire project." : `to the following extent: labor, services, equipment, or materials furnished through ${throughDate || "[Through Date]"}.`}
                </p>
              )}

              {!isFinal && (
                <p className="text-xs bg-slate-50 p-3 border border-slate-200">
                  <strong>Exceptions:</strong> This document does not affect any of the following: {exceptions || "None"}.
                </p>
              )}

              <div className="pt-8 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <div className="border-b border-slate-900 h-8"></div>
                  <p className="mt-1 font-bold">{claimantName || "Authorized Claimant Signature"}</p>
                  <p className="text-slate-600">Title / Officer</p>
                </div>
                <div>
                  <div className="border-b border-slate-900 h-8"></div>
                  <p className="mt-1 font-bold">Date Signed</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="text-xs text-slate-300">
                <strong className="text-amber-400 block text-sm mb-0.5">Note on Statutory Forms (CA, TX, FL, GA, AZ, MI, MO, MS, NV, UT, WY):</strong>
                Certain states mandate exact statutory wording by code. Always verify statutory form text and track your {selectedState.name} lien cutoff ({selectedState.lienFilingDays} days) automatically.
              </div>
              <a
                href={STRIPE_PRO_URL}
                className="shrink-0 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                Track Deadlines ($19/mo)
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
