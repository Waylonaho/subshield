"use client";

import { useState } from "react";
import Link from "next/link";

export default function MarkupVsMarginGuide() {
  const [jobCost, setJobCost] = useState<number>(10000);
  const [markupPercent, setMarkupPercent] = useState<number>(20);

  // Math
  const markupPrice = jobCost * (1 + markupPercent / 100);
  const markupProfit = markupPrice - jobCost;
  const actualGrossMargin = (markupProfit / markupPrice) * 100;

  // Margin target price comparison
  const marginPrice = jobCost / (1 - markupPercent / 100);
  const marginProfit = marginPrice - jobCost;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <Link
            href="/tools/labor-burden-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
          >
            ← Labor Burden Tool
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Contractor Financial Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Construction Markup vs. Margin: The Math That Costs Subs Money
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Why adding a 20% markup does not give you a 20% margin—and how pricing errors compound over a commercial project.
          </p>
        </div>

        {/* Interactive Comparison Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-amber-500">
            Interactive Test: Enter Your Job Cost
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Total Job Cost ($)
              </label>
              <input
                type="number"
                value={jobCost || ""}
                onChange={(e) => setJobCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Entered Percentage (%)
              </label>
              <input
                type="number"
                value={markupPercent || ""}
                onChange={(e) => setMarkupPercent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
              <span className="text-xs uppercase text-slate-400 font-semibold block">
                Scenario A: Adding a {markupPercent}% Markup
              </span>
              <div className="text-2xl font-bold text-white mt-2 font-mono">
                ${markupPrice.toLocaleString()}
              </div>
              <div className="text-xs text-amber-400 mt-2">
                Actual Gross Margin: <strong>{actualGrossMargin.toFixed(1)}%</strong>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Profit: ${markupProfit.toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-amber-500/30">
              <span className="text-xs uppercase text-amber-400 font-semibold block">
                Scenario B: Targeting a True {markupPercent}% Gross Margin
              </span>
              <div className="text-2xl font-bold text-amber-400 mt-2 font-mono">
                ${Math.round(marginPrice).toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 mt-2">
                Actual Gross Margin: <strong>{markupPercent.toFixed(1)}%</strong>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Profit: ${Math.round(marginProfit).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            In this example, confusing markup with margin leaves 
            <strong className="text-amber-400"> ${(marginPrice - markupPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> of unrecovered revenue on the table.
          </p>
        </div>

        {/* Text Breakdown */}
        <section className="space-y-4 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">The Difference Between the Formulas</h2>
          <p>
            <strong>Markup</strong> is the percentage added directly to your cost to arrive at a selling price:
          </p>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded font-mono text-xs text-amber-300">
            Markup Price = Direct Cost × (1 + Markup %)
          </div>

          <p>
            <strong>Gross Margin</strong> is the percentage of the <em>final contract price</em> that is retained as profit after direct expenses:
          </p>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded font-mono text-xs text-amber-300">
            Margin Price = Direct Cost ÷ (1 - Margin %)
          </div>
        </section>

        <section className="border-t border-slate-800 pt-8 text-center space-y-4">
          <h3 className="text-lg font-bold text-white">Need a spreadsheet that handles the math automatically?</h3>
          <Link
            href="/templates/subcontractor-bid-template"
            className="inline-block px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
          >
            Download Free Contractor Bid Template
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
