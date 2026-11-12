"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATE_LIEN_RULES as statutoryRules, StateLienRule } from "@/lib/statutoryRules";
import { generateIcsFile as generateIcsContent } from "@/lib/generateIcs";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

// Parse YYYY-MM-DD in local time to prevent UTC midnight off-by-one day shifts
function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

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
  const safeMargin = Math.min(Math.max(marginPercent || 0, 0), 99);
  const targetPrice = totalCost / (1 - safeMargin / 100);
  const projectedProfit = targetPrice - totalCost;

  // Alphabetically sorted array of state rules
  const rulesArray: StateLienRule[] = useMemo(() => {
    return Object.values(statutoryRules).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, []);

  const currentStateRule: StateLienRule =
    statutoryRules[selectedState] || rulesArray[0];

  // Accurate statutory trigger calculation (first_furnishing vs last_furnishing vs invoice_date)
  const { prelimDate, lienDate } = useMemo(() => {
    let pDate: Date | null = null;
    let lDate: Date | null = null;

    if (currentStateRule?.preliminaryNoticeDays) {
      const triggerBaseStr =
        currentStateRule.noticeTrigger === "last_furnishing"
          ? lastWorkDate
          : firstWorkDate; // handles 'first_furnishing' and 'invoice_date' fallback

      const baseDate = parseLocalDate(triggerBaseStr);
      if (baseDate) {
        baseDate.setDate(
          baseDate.getDate() + currentStateRule.preliminaryNoticeDays
        );
        pDate = baseDate;
      }
    }

    if (lastWorkDate && currentStateRule?.lienFilingDays) {
      const baseLastDate = parseLocalDate(lastWorkDate);
      if (baseLastDate) {
        baseLastDate.setDate(
          baseLastDate.getDate() + currentStateRule.lienFilingDays
        );
        lDate = baseLastDate;
      }
    }

    return { prelimDate: pDate, lienDate: lDate };
  }, [currentStateRule, firstWorkDate, lastWorkDate]);

  const handleDownloadCalendar = () => {
    if (!prelimDate && !lienDate) {
      alert("Please enter your work dates first to calculate statutory deadlines.");
      return;
    }

    const icsString = generateIcsContent(
      `${currentStateRule.name} Project`,
      prelimDate ? formatIsoDate(prelimDate) : null,
      lienDate ? formatIsoDate(lienDate) : ""
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
    window.URL.revokeObjectURL(url);
  };

  const handleProUpgrade = () => {
    window.location.href = STRIPE_PRO_URL;
  };

  // Dynamic helper label for preliminary notice result
  const renderPrelimDisplay = () => {
    if (!currentStateRule?.preliminaryNoticeDays) {
      return "Not Statutorily Required";
    }
    if (prelimDate) {
      return prelimDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    if (currentStateRule.noticeTrigger === "last_furnishing") {
      return "Enter Last Work Date";
    }
    if (currentStateRule.noticeTrigger === "invoice_date") {
      return "Enter First/Invoice Date";
    }
    return "Enter First Work Date";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
              Sub<span className="text-amber-500">Shield</span>HQ
            </Link>
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              50-State Edition
            </span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6">
            <a
              href="#bid-calculator"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Bid Estimator
            </a>
            <a
              href="#deadline-calculator"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Lien Deadlines
            </a>
            <Link
              href="/tools/labor-burden-calculator"
              className="hidden md:inline text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Labor Burden
            </Link>
            <Link
              href="/guides/markup-vs-margin-construction"
              className="hidden lg:inline text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Markup vs. Margin
            </Link>
            <button
              onClick={handleProUpgrade}
              className="text-xs font-bold px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer"
            >
              Pro Alerts ($19/mo)
            </button>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="py-16 md:py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
            Transparent Subcontractor Math & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Bid With Confidence. <br className="hidden sm:inline" />
            Protect Your Margin & Cash Flow.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            An open-access estimator for trade contractors. Factor in true labor
            burden, recover actual overhead, protect target profit margins, and
            verify statutory mechanics lien deadlines across all 50 states.
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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-500">01.</span> Direct Cost & Margin
                Calculator
              </h2>
              <p className="text-slate-400 text-sm">
                All calculations run client-side in your browser. Your rates and
                project values are never saved or sent to any server.
              </p>
            </div>
            <Link
              href="/tools/labor-burden-calculator"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
            >
              Need help finding your exact Labor Burden %? →
            </Link>
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
                  Formula: Break-Even Cost ÷ (1 - Margin%).{" "}
                  <Link
                    href="/guides/markup-vs-margin-construction"
                    className="text-amber-400/90 hover:underline"
                  >
                    See why markup ≠ margin.
                  </Link>
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
              Look up statutory preliminary notice and lien filing windows across
              all 50 states + D.C. and export calendar alerts (.ics).
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
                  Used for first-furnishing notice triggers
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
                  Used for lien filing & post-work notice triggers
                </span>
              </div>
            </div>

            {/* Statutory Rule Banner */}
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-amber-400">
                {currentStateRule?.name} Statute: {currentStateRule?.statutoryNoticeName}
              </span>
              <span className="text-slate-300">
                Filing Window: <strong>{currentStateRule?.lienFilingDays} Days</strong> from {currentStateRule?.lienTrigger === "completion" ? "Project Completion" : "Last Furnishing"}
              </span>
            </div>

            {/* Timeline Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-slate-950 border border-slate-800 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preliminary Notice Deadline
                </span>
                <div className="text-xl font-bold text-amber-400 mt-1">
                  {renderPrelimDisplay()}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {currentStateRule?.notes}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Final Mechanics Lien Cutoff
                </span>
                <div className="text-xl font-bold text-rose-400 mt-1">
                  {lienDate
                    ? lienDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Enter Last Work Date"}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Must be formally recorded in county land records before this date expires.
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition shrink-0 cursor-pointer"
              >
                Download Calendar Reminders (.ics)
              </button>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: DUAL MONETIZATION (FREE LEAD MAGNET + PRO SAAS) --- */}
        <section id="bid-toolkit" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: Free Spreadsheet Lead Magnet */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase bg-slate-800 text-slate-300 border border-slate-700 rounded-full">
                Free Download • Excel & Google Sheets
              </span>
              <h2 className="text-2xl font-extrabold text-white mb-3">
                Subcontractor Bid & Labor Burden Spreadsheet
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Take our exact estimating formulas offline. Includes a pre-built
                Labor Burden Calculator, Overhead Recovery Matrix, and Bid
                Summary sheet ready for Google Sheets or Excel.
              </p>
            </div>
            <div>
              <Link
                href="/templates/subcontractor-bid-template"
                className="inline-block w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm transition"
              >
                Get Free Bid Template →
              </Link>
            </div>
          </div>

          {/* Card B: Paid SubShield Pro Subscription */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950/25 border border-amber-500/40 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full">
                SubShield Pro • $19/month
              </span>
              <h2 className="text-2xl font-extrabold text-white mb-3">
                Automated SMS & Email Lien Deadline Alerts
              </h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Never forfeit an unpaid invoice over a missed notice window. Track
                up to 30 active jobs across all 50 states with automatic SMS &
                email countdown alarms sent 14, 7, and 2 days before statutory
                cutoffs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleProUpgrade}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition cursor-pointer shadow-lg shadow-amber-500/10"
              >
                Activate SubShield Pro ($19/mo)
              </button>
              <span className="text-xs text-slate-400">
                Cancel anytime • Instant setup
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 mt-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-bold text-white text-base">
                Sub<span className="text-amber-500">Shield</span>HQ
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Independent estimating & statutory deadline utilities for specialty
                trade subcontractors.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <Link href="/tools/labor-burden-calculator" className="hover:text-white transition">
                Labor Burden Calculator
              </Link>
              <Link href="/guides/markup-vs-margin-construction" className="hover:text-white transition">
                Markup vs. Margin Guide
              </Link>
              <Link href="/templates/subcontractor-bid-template" className="hover:text-white transition">
                Free Bid Template
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} SubShieldHQ. Informational tools only; not legal advice.</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/about" className="hover:text-slate-300 transition">
                About & Methodology
              </Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-300 transition">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-slate-300 transition">
                Contact & Corrections
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
