"use client";

import { useState } from "react";
import Link from "next/link";
import { STATE_LIEN_RULES as statutoryRules, StateLienRule } from "@/lib/statutoryRules";
import { generateIcsFile as generateIcsContent } from "@/lib/generateIcs";

export default function Home() {
  // --- Bid Estimator State ---
  const [directLabor, setDirectLabor] = useState<number>(2500);
  const [burdenPercent, setBurdenPercent] = useState<number>(28);
  const [materials, setMaterials] = useState<number>(3200);
  const [equipment, setEquipment] = useState<number>(600);
  const [overheadPercent, setOverheadPercent] = useState<number>(15);
  const [marginPercent, setMarginPercent] = useState<number>(20);

  // --- Lien Calculation State ---
  const [selectedState, setSelectedState] = useState<string>("SC");
  const [firstWorkDate, setFirstWorkDate] = useState<string>("");
  const [lastWorkDate, setLastWorkDate] = useState<string>("");

  // Bid calculations
  const burdenedLabor = directLabor * (1 + burdenPercent / 100);
  const directCost = burdenedLabor + materials + equipment;
  const overheadCost = directCost * (overheadPercent / 100);
  const totalCost = directCost + overheadCost;
  const targetPrice =
    marginPercent < 100 ? totalCost / (1 - marginPercent / 100) : totalCost;
  const projectedProfit = targetPrice - totalCost;

  // Convert dictionary object to an array of rules safely
  const rulesArray: StateLienRule[] = Object.values(statutoryRules);

  // Lien rule calculations using correct interface properties ('code' instead of 'state')
  const currentStateRule: StateLienRule =
    rulesArray.find((r: StateLienRule) => r.code === selectedState) ||
    rulesArray[0];

  const calculateDeadlines = () => {
    let prelimDate: Date | null = null;
    let lienDate: Date | null = null;

    if (firstWorkDate && currentStateRule?.preliminaryNoticeDays) {
      const d = new Date(firstWorkDate);
      d.setDate(d.getDate() + currentStateRule.preliminaryNoticeDays);
      prelimDate = d;
    }

    if (lastWorkDate && currentStateRule?.lienFilingDays) {
      const d = new Date(lastWorkDate);
      d.setDate(d.getDate() + currentStateRule.lienFilingDays);
      lienDate = d;
    }

    return { prelimDate, lienDate };
  };

  const { prelimDate, lienDate } = calculateDeadlines();

  const handleDownloadCalendar = () => {
    if (!prelimDate && !lienDate) {
      alert("Please enter work dates first to calculate deadlines.");
      return;
    }

    // Fixed: Passing the 3 expected arguments to generateIcsContent
    const icsString = generateIcsContent(
      `${currentStateRule.name} Project`,
      prelimDate ? prelimDate.toISOString().split("T")[0] : null,
      lienDate ? lienDate.toISOString().split("T")[0] : ""
    );

    const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${currentStateRule.code}_SubShield_Deadlines.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-white">
              Sub<span className="text-amber-500">Shield</span>HQ
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Free Estimator
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <a
              href="#bid-calculator"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Bid Calculator
            </a>
            <a
              href="#deadline-calculator"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Lien Deadlines
            </a>
            <a
              href="#bid-toolkit"
              className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition"
            >
              Bid Toolkit
            </a>
            <a
              href="#bid-calculator"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
            >
              Launch Tool
            </a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="py-16 md:py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
            Transparent Subcontractor Math
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Bid With Confidence. <br className="hidden sm:inline" />
            Protect Your Margin & Cash Flow.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            An open-access estimator for trade contractors. Factor in true labor
            burden, recover actual overhead, protect target profit margins, and
            check standard statutory notice timelines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#bid-calculator"
              className="px-6 py-3 rounded-lg font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/10"
            >
              Open Bid Estimator
            </a>
            <a
              href="#deadline-calculator"
              className="px-6 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
            >
              Check State Deadlines
            </a>
          </div>
        </div>
      </section>

      {/* --- MAIN TOOL CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
        {/* --- SECTION 1: BID ESTIMATOR --- */}
        <section id="bid-calculator" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-500">01.</span> Direct Cost & Margin
              Calculator
            </h2>
            <p className="text-slate-400 text-sm">
              All calculations run client-side in your browser. Your rates and
              project values are never saved or sent to any server.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Column */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Direct Wages ($)
                  </label>
                  <input
                    type="number"
                    value={directLabor || ""}
                    onChange={(e) => setDirectLabor(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="2500"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">
                    Base field hourly or trade labor
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Labor Burden Rate (%)
                  </label>
                  <input
                    type="number"
                    value={burdenPercent || ""}
                    onChange={(e) => setBurdenPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="28"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">
                    FICA, FUTA, SUTA, workers' comp & benefits
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Direct Materials ($)
                  </label>
                  <input
                    type="number"
                    value={materials || ""}
                    onChange={(e) => setMaterials(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="3200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Equipment / Rentals ($)
                  </label>
                  <input
                    type="number"
                    value={equipment || ""}
                    onChange={(e) => setEquipment(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Company Overhead Recovery (%)
                  </label>
                  <input
                    type="number"
                    value={overheadPercent || ""}
                    onChange={(e) => setOverheadPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="15"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">
                    Shop, truck, insurance, software costs
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Target Gross Margin (%)
                  </label>
                  <input
                    type="number"
                    value={marginPercent || ""}
                    onChange={(e) => setMarginPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    placeholder="20"
                  />
                  <span className="text-xs text-slate-500 mt-1 block">
                    Target gross profit share of final contract
                  </span>
                </div>
              </div>
            </div>

            {/* Bid Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Bid Price Breakdown
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Burdened Labor:</span>
                    <span className="font-mono text-white">
                      ${burdenedLabor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Direct Cost Total:</span>
                    <span className="font-mono text-white">
                      ${directCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Overhead Added:</span>
                    <span className="font-mono text-white">
                      ${overheadCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Break-Even Cost:</span>
                    <span className="font-mono text-white font-medium">
                      ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 text-emerald-400">
                    <span>Projected Net Profit:</span>
                    <span className="font-mono font-medium">
                      +${projectedProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider block mb-1">
                  Recommended Bid Price
                </span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  ${targetPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Formula: Break-Even Cost ÷ (1 - Margin%). Covers direct costs,
                  recovers overhead, and delivers specified gross margin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: LIEN DEADLINE CALCULATOR --- */}
        <section id="deadline-calculator" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-500">02.</span> Mechanics Lien & Notice
              Calendar Estimator
            </h2>
            <p className="text-slate-400 text-sm">
              Look up standard statutory timeline windows by jurisdiction and
              export calendar reminder alerts (.ics).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Project Jurisdiction
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {rulesArray.map((rule: StateLienRule) => (
                    <option key={rule.code} value={rule.code}>
                      {rule.name} ({rule.code})
                    </option>
                  ))}
                </select>
                <span className="text-xs text-slate-500 mt-1 block">
                  Select where project work is located
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  First Day of Work / Material
                </label>
                <input
                  type="date"
                  value={firstWorkDate}
                  onChange={(e) => setFirstWorkDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-500 mt-1 block">
                  Used for preliminary notice trigger
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Last Day of Work (or Est. Completion)
                </label>
                <input
                  type="date"
                  value={lastWorkDate}
                  onChange={(e) => setLastWorkDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-500 mt-1 block">
                  Used for lien filing deadline trigger
                </span>
              </div>
            </div>

            {/* Timeline Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-slate-950 border border-slate-800 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preliminary Notice Window
                </span>
                <div className="text-xl font-bold text-white mt-1">
                  {prelimDate ? prelimDate.toLocaleDateString() : "Enter First Work Date"}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {currentStateRule?.notes || currentStateRule?.statutoryNoticeName || "Standard state rule window."}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Lien Filing Deadline
                </span>
                <div className="text-xl font-bold text-white mt-1">
                  {lienDate ? lienDate.toLocaleDateString() : "Enter Last Work Date"}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {currentStateRule?.notes || currentStateRule?.statutoryNoticeName || "Standard state rule window."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 max-w-xl">
                <strong>Legal Disclaimer:</strong> Mechanics lien laws vary by
                claimant tier, project type, and contract terms. These dates are
                informational approximations and do not constitute formal legal
                counsel. Always consult a qualified construction attorney to
                protect your lien rights.
              </p>
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shrink-0"
              >
                Download Calendar Reminders (.ics)
              </button>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: REVENUE / TOOLKIT OFFER --- */}
        <section id="bid-toolkit" className="scroll-mt-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                Subcontractor Offline Toolkit
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Want to run your estimating and job-costing in Excel or Google
                Sheets?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                Take our proven bid math with you. The SubShield Contractor Bid
                Pack includes a pre-configured Labor Burden Calculator, Overhead
                Recovery Matrix, Proposal Scope & Exclusion Sheets, and a Change
                Order Log.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                >
                  Join Pro Template Waitlist (Free Sample)
                </a>
                <span className="text-xs text-slate-400">
                  No subscription required • One-time download
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 mt-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-bold text-white text-base">
              Sub<span className="text-amber-500">Shield</span>HQ
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Independent estimating & workflow utilities for specialty trade
              subcontractors.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-400">
            <Link href="/about" className="hover:text-white transition">
              About & Methodology
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact & Corrections
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
