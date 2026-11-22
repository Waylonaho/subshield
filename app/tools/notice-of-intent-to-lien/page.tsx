"use client";

import { useState } from "react";
import Link from "next/link";
import { STATE_LIEN_RULES } from "@/lib/statutoryRules";
import AffiliateGearSection from "@/components/AffiliateGearSection";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

export default function NoticeOfIntentGenerator() {
  const [stateCode, setStateCode] = useState<string>("SC");
  const [claimantName, setClaimantName] = useState<string>("");
  const [claimantAddress, setClaimantAddress] = useState<string>("");
  const [gcName, setGcName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [projectAddress, setProjectAddress] = useState<string>("");
  const [unpaidAmount, setUnpaidAmount] = useState<string>("12,450.00");
  const [lastWorkDate, setLastWorkDate] = useState<string>("");
  const [demandDays, setDemandDays] = useState<string>("10");
  const [legalAccepted, setLegalAccepted] = useState<boolean>(false);

  const states = Object.values(STATE_LIEN_RULES).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const selectedState = STATE_LIEN_RULES[stateCode] || states[0];

  const handlePrint = () => {
    if (!legalAccepted) {
      alert("Please check the self-help acknowledgment box before printing or saving your PDF.");
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/tools" className="text-slate-300 hover:text-white transition hidden sm:inline">
              All Tools
            </Link>
            <Link href="/tools/lien-waiver-generator" className="text-slate-300 hover:text-white transition hidden md:inline">
              Lien Waiver Generator
            </Link>
            <Link href="/" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold transition">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        <div className="print:hidden space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Past-Due Invoice Recovery Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Notice of Intent to Lien (NOI) Letter Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl">
            Collect overdue commercial invoices without paying $1,500+ in attorney fees. Generate a formal Certified Mail Notice of Intent to File a Mechanics Lien pre-loaded with your state&apos;s statutory reference.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/35 border border-amber-500/35 text-amber-200 text-xs sm:text-sm print:hidden">
          <strong>Important Timing Note:</strong> Sending a Notice of Intent to Lien does <strong>not</strong> extend your statutory county recording deadline ({selectedState.lienFilingDays} days in {selectedState.name}). Always mail your NOI at least 15–20 days before your lien cutoff expires.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 print:hidden">
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
                Your Subcontractor Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Carolina Electrical Systems LLC"
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Your Return Mailing Address
              </label>
              <input
                type="text"
                placeholder="e.g. 120 Industrial Pkwy, Spartanburg, SC 29301"
                value={claimantAddress}
                onChange={(e) => setClaimantAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                General Contractor Name
              </label>
              <input
                type="text"
                placeholder="e.g. Metro Construction Group"
                value={gcName}
                onChange={(e) => setGcName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Property Owner Name
              </label>
              <input
                type="text"
                placeholder="e.g. Oakridge Development Partners"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Project Property Address
              </label>
              <input
                type="text"
                placeholder="e.g. 800 E Main St, Spartanburg, SC"
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Balance Due ($)
                </label>
                <input
                  type="text"
                  value={unpaidAmount}
                  onChange={(e) => setUnpaidAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Last Work Date
                </label>
                <input
                  type="date"
                  value={lastWorkDate}
                  onChange={(e) => setLastWorkDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Pay Cure Days
                </label>
                <input
                  type="number"
                  value={demandDays}
                  onChange={(e) => setDemandDays(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Active Clickwrap UPL Acknowledgment */}
            <label className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
                className="mt-0.5 accent-amber-500"
              />
              <span>
                I acknowledge SubShieldHQ is a self-help software tool, not a law firm, and that sending an NOI does not toll or extend statutory lien recording deadlines.
              </span>
            </label>

            <button
              type="button"
              onClick={handlePrint}
              disabled={!legalAccepted}
              className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                legalAccepted
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              Print / Save Letter as PDF
            </button>
          </div>

          {/* Preview Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white text-slate-900 rounded-xl p-8 sm:p-10 shadow-xl font-serif text-sm leading-relaxed space-y-4">
              <div className="flex justify-between items-start border-b border-slate-300 pb-4 text-xs">
                <div>
                  <p className="font-bold text-sm uppercase">{claimantName || "[Your Company Name]"}</p>
                  <p>{claimantAddress || "[Your Company Address]"}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">SENT VIA CERTIFIED MAIL</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-xs space-y-1 pt-2">
                <p><strong>TO PROPERTY OWNER:</strong> {ownerName || "[Property Owner Name]"}</p>
                <p><strong>COPY TO GENERAL CONTRACTOR:</strong> {gcName || "[General Contractor Name]"}</p>
                <p><strong>RE: PROJECT PROPERTY:</strong> {projectAddress || "[Project Address]"}</p>
                <p><strong>PAST-DUE PRINCIPAL BALANCE:</strong> ${unpaidAmount || "0.00"}</p>
              </div>

              <div className="bg-slate-100 p-3 text-center font-bold uppercase tracking-wide border border-slate-300 text-xs">
                NOTICE OF INTENT TO FILE MECHANICS LIEN ({selectedState.name.toUpperCase()})
              </div>

              <p>Dear Property Owner and General Contractor,</p>

              <p>
                Please be advised that <strong>{claimantName || "[Your Company Name]"}</strong> (&ldquo;Claimant&rdquo;) furnished labor, services, equipment, and/or materials for the improvement of the real property located at <strong>{projectAddress || "[Project Address]"}</strong> pursuant to a subcontract with <strong>{gcName || "[General Contractor]"}</strong>. Claimant last furnished labor or materials to the project on <strong>{lastWorkDate || "[Last Date of Work]"}</strong>.
              </p>

              <p>
                Despite satisfactory completion and invoicing, there remains an undisputed past-due balance of <strong>${unpaidAmount || "0.00"}</strong> owing to Claimant. Under the mechanics lien statutes of the State of {selectedState.name} ({selectedState.statutoryNoticeName}), Claimant is entitled to record a formal Mechanics Lien against the above-referenced real property within {selectedState.lienFilingDays} days of {selectedState.lienTrigger === "completion" ? "project completion" : "last furnishing"}.
              </p>

              <p>
                <strong>DEMAND FOR PAYMENT:</strong> Unless full payment in the amount of <strong>${unpaidAmount || "0.00"}</strong> is received by Claimant within <strong>{demandDays} calendar days</strong> from the date of this notice, Claimant intends to proceed immediately with recording a formal Mechanics Lien against the property and pursuing all statutory remedies, including interest, court costs, and attorney&apos;s fees as permitted by {selectedState.name} law.
              </p>

              <p>
                Please remit payment immediately or contact our office to confirm disbursement so that formal lien recording may be avoided.
              </p>

              <div className="pt-6 text-xs">
                <p>Sincerely,</p>
                <div className="border-b border-slate-900 w-64 h-8 mt-4"></div>
                <p className="font-bold mt-1">{claimantName || "[Authorized Representative]"}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 font-sans">
                Self-help demand template generated via SubShieldHQ. Informational resource only; does not constitute legal advice.
              </div>
            </div>

            {/* Panic-Moment Interception Box */}
            <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 print:hidden">
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                  ⚠️ Sending a Demand Letter? Watch Your Filing Clock
                </span>
                <h2 className="text-base font-extrabold text-white">
                  If the GC Stalls After This Letter, Do You Know Your Exact {selectedState.name} Recording Cutoff?
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  GCs routinely promise &ldquo;the check is in next week&apos;s run&rdquo; until your {selectedState.lienFilingDays}-day {selectedState.name} lien window expires. Track up to 30 jobs with automated 14-day, 7-day, and 2-day email countdown warnings for $19/mo.
                </p>
              </div>
              <a
                href={STRIPE_PRO_URL}
                className="shrink-0 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition"
              >
                Protect 30 Jobs ($19/mo) →
              </a>
            </div>
          </div>
        </div>

        {/* Back-Office Lien & Document Processing Supplies */}
        <AffiliateGearSection context="lien_office" />
      </main>
    </div>
  );
}
