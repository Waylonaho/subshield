"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TradeProfile } from "@/lib/tradeProfiles";

const STORAGE_KEY = "subshield_company_rates_v1";

export default function TradeBidCalculator({ trade }: { trade: TradeProfile }) {
  const [projectName, setProjectName] = useState<string>(`${trade.shortName} Subcontract Proposal`);
  const [clientName, setClientName] = useState<string>("");
  const [crewHours, setCrewHours] = useState<number>(80);
  const [hourlyWage, setHourlyWage] = useState<number>(trade.defaultHourlyWage);
  const [burdenPercent, setBurdenPercent] = useState<number>(trade.defaultBurdenPercent);
  const [materials, setMaterials] = useState<number>(4500);
  const [equipment, setEquipment] = useState<number>(850);
  const [overheadPercent, setOverheadPercent] = useState<number>(trade.defaultOverheadPercent);
  const [marginPercent, setMarginPercent] = useState<number>(trade.defaultMarginPercent);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Load saved company rates if contractor saved them previously
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.burdenPercent === "number") setBurdenPercent(parsed.burdenPercent);
        if (typeof parsed.overheadPercent === "number") setOverheadPercent(parsed.overheadPercent);
        if (typeof parsed.marginPercent === "number") setMarginPercent(parsed.marginPercent);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleSaveRates = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ burdenPercent, overheadPercent, marginPercent })
      );
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch {
      alert("Unable to save settings in private browsing mode.");
    }
  };

  // Bid Math
  const rawLabor = (crewHours || 0) * (hourlyWage || 0);
  const burdenedLabor = rawLabor * (1 + (burdenPercent || 0) / 100);
  const directCost = burdenedLabor + (materials || 0) + (equipment || 0);
  const overheadCost = directCost * ((overheadPercent || 0) / 100);
  const totalCost = directCost + overheadCost;
  const safeMargin = Math.min(Math.max(marginPercent || 0, 0), 99);
  const targetPrice = totalCost / (1 - safeMargin / 100);
  const projectedProfit = targetPrice - totalCost;

  const handlePrintProposal = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-3 print:hidden">
        <span className="text-xs text-slate-400">
          Pre-loaded with <strong>{trade.shortName}</strong> benchmarks (Workers' Comp: {trade.workersCompRange})
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveRates}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition cursor-pointer"
          >
            {savedNotice ? "✓ Rates Saved to Browser" : "Save My Company Rates"}
          </button>
          <button
            type="button"
            onClick={handlePrintProposal}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer"
          >
            Print / Save PDF Proposal
          </button>
        </div>
      </div>

      {/* Main Estimator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Project / Bid Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                General Contractor / Client (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Commercial Builders"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Total Crew Hours
              </label>
              <input
                type="number"
                value={crewHours || ""}
                onChange={(e) => setCrewHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Avg. Base Hourly Wage ($/hr)
              </label>
              <input
                type="number"
                value={hourlyWage || ""}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {trade.shortName} Labor Burden (%)
              </label>
              <input
                type="number"
                value={burdenPercent || ""}
                onChange={(e) => setBurdenPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                FICA, SUTA + Workers' Comp ({trade.workersCompRange})
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Direct Materials ($)
              </label>
              <input
                type="number"
                value={materials || ""}
                onChange={(e) => setMaterials(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Equipment & Rentals ($)
              </label>
              <input
                type="number"
                value={equipment || ""}
                onChange={(e) => setEquipment(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Overhead Recovery (%)
              </label>
              <input
                type="number"
                value={overheadPercent || ""}
                onChange={(e) => setOverheadPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Gross Profit Margin (%)
              </label>
              <input
                type="number"
                value={marginPercent || ""}
                onChange={(e) => setMarginPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Summary Card (Print-Friendly) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between print:col-span-3 print:bg-white print:text-black print:border-slate-300">
          <div>
            <div className="hidden print:block mb-4 pb-3 border-b border-slate-300">
              <h2 className="text-xl font-bold">{projectName}</h2>
              {clientName && <p className="text-sm">Prepared for: {clientName}</p>}
              <p className="text-xs text-slate-600">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-4 print:text-black">
              {trade.shortName} Bid Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800 print:border-slate-200">
                <span className="text-slate-400 print:text-slate-600">Raw Field Wages ({crewHours} hrs):</span>
                <span className="font-mono text-white print:text-black">
                  ${rawLabor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 print:border-slate-200">
                <span className="text-slate-400 print:text-slate-600">Burdened Labor (+{burdenPercent}%):</span>
                <span className="font-mono text-white print:text-black">
                  ${burdenedLabor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 print:border-slate-200">
                <span className="text-slate-400 print:text-slate-600">Materials & Equipment:</span>
                <span className="font-mono text-white print:text-black">
                  ${(materials + equipment).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 print:border-slate-200">
                <span className="text-slate-400 print:text-slate-600">Overhead Allocated ({overheadPercent}%):</span>
                <span className="font-mono text-white print:text-black">
                  ${overheadCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 print:border-slate-200">
                <span className="text-slate-400 print:text-slate-600">Break-Even Cost:</span>
                <span className="font-mono font-semibold text-white print:text-black">
                  ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-emerald-400 print:hidden">
                <span>Projected Gross Profit ({marginPercent}%):</span>
                <span className="font-mono font-semibold">
                  +${projectedProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 print:border-slate-300">
            <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider block mb-1 print:text-slate-600">
              Recommended Total Bid Price
            </span>
            <div className="text-3xl font-extrabold text-amber-400 font-mono print:text-black">
              ${targetPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="hidden print:block text-[10px] text-slate-500 mt-4">
              Estimated via SubShieldHQ.com • Valid for 30 days from proposal date.
            </p>
            <div className="mt-4 print:hidden">
              <Link
                href="/templates/subcontractor-bid-template"
                className="w-full block text-center py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition"
              >
                Download Full {trade.shortName} Excel Sheet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
