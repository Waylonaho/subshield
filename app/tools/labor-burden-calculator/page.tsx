"use client";

import { useState } from "react";
import Link from "next/link";

export default function LaborBurdenCalculator() {
  // Base Wage & Hours
  const [hourlyWage, setHourlyWage] = useState<number>(32);
  const [annualHours, setAnnualHours] = useState<number>(2080); // 40 hrs * 52 wks

  // Statutory Payroll Taxes (%)
  const [ficaRate, setFicaRate] = useState<number>(7.65); // Social Security (6.2%) + Medicare (1.45%)
  const [futaRate, setFutaRate] = useState<number>(0.6); // Federal Unemployment on first $7,000
  const [sutaRate, setSutaRate] = useState<number>(3.5); // State Unemployment (varies)

  // Insurance & Benefits
  const [workersCompRate, setWorkersCompRate] = useState<number>(8.5); // % of payroll based on class code
  const [annualPaidLeaveHours, setAnnualPaidLeaveHours] = useState<number>(80); // 10 days PTO/holidays
  const [annualBenefitsCost, setAnnualBenefitsCost] = useState<number>(3600); // Health, safety gear, 401k

  // Calculations
  const grossAnnualBasePay = hourlyWage * annualHours;

  const annualFica = grossAnnualBasePay * (ficaRate / 100);
  // FUTA is capped at $7,000 max wage per employee in the US ($42 max), simplified:
  const annualFuta = Math.min(grossAnnualBasePay, 7000) * (futaRate / 100);
  const annualSuta = grossAnnualBasePay * (sutaRate / 100);
  const annualWorkersComp = grossAnnualBasePay * (workersCompRate / 100);

  const annualPaidLeaveCost = hourlyWage * annualPaidLeaveHours;
  const totalIndirectLaborCost =
    annualFica +
    annualFuta +
    annualSuta +
    annualWorkersComp +
    annualPaidLeaveCost +
    annualBenefitsCost;

  const totalTrueLaborCost = grossAnnualBasePay + totalIndirectLaborCost;
  const laborBurdenPercentage = (totalIndirectLaborCost / grossAnnualBasePay) * 100;
  const trueCostPerHour = totalTrueLaborCost / (annualHours - annualPaidLeaveHours); // True cost per actual working hour

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/guides/markup-vs-margin-construction"
              className="text-slate-300 hover:text-white transition hidden sm:inline"
            >
              Markup vs Margin Guide
            </Link>
            <Link
              href="/templates/subcontractor-bid-template"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition"
            >
              Download Bid Sheet
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        {/* Title & Introduction */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Trade Contractor Cost Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Contractor Labor Burden Calculator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
            An employee who earns $32/hour actually costs your business significantly more. 
            Use this calculator to audit payroll taxes, workers' compensation rates, and benefits 
            to discover your true cost per productive billable hour.
          </p>
        </div>

        {/* The Interactive Tool Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Column (2 cols wide) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              1. Base Wage & Hours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Hourly Base Wage ($/hr)
                </label>
                <input
                  type="number"
                  value={hourlyWage || ""}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Annual Working Hours
                </label>
                <input
                  type="number"
                  value={annualHours || ""}
                  onChange={(e) => setAnnualHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">Default: 2,080 (40 hrs × 52 weeks)</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 pt-2">
              2. Mandatory Employer Payroll Taxes & Insurance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  FICA (Social Security & Medicare) %
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={ficaRate || ""}
                  onChange={(e) => setFicaRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">Federal rate is 7.65%</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  State Unemployment (SUTA) %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sutaRate || ""}
                  onChange={(e) => setSutaRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">Varies by state & rating</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Workers' Comp (% of Payroll)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={workersCompRate || ""}
                  onChange={(e) => setWorkersCompRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">Class code specific</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 pt-2">
              3. Benefits & Non-Productive Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Annual Paid Time Off / Holidays (Hours)
                </label>
                <input
                  type="number"
                  value={annualPaidLeaveHours || ""}
                  onChange={(e) => setAnnualPaidLeaveHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">80 hrs = 10 standard days</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Annual Health/Retirement/Tools ($)
                </label>
                <input
                  type="number"
                  value={annualBenefitsCost || ""}
                  onChange={(e) => setAnnualBenefitsCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-xs text-slate-500 mt-1 block">Total perks & safety allowance</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-fit lg:sticky lg:top-24">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-4">
                Burden Analysis Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Gross Base Wage:</span>
                  <span className="font-mono text-white">${grossAnnualBasePay.toLocaleString()} /yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">FICA (Employer):</span>
                  <span className="font-mono text-white">${Math.round(annualFica).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">SUTA & FUTA:</span>
                  <span className="font-mono text-white">${Math.round(annualSuta + annualFuta).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Workers' Comp:</span>
                  <span className="font-mono text-white">${Math.round(annualWorkersComp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Paid Leave & Perks:</span>
                  <span className="font-mono text-white">
                    ${Math.round(annualPaidLeaveCost + annualBenefitsCost).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider block">
                  Calculated Labor Burden Rate
                </span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">
                  +{laborBurdenPercentage.toFixed(1)}%
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  On top of base hourly wages.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 bg-slate-950/60 p-4 rounded-lg">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider block">
                  True Cost Per Billable Hour
                </span>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  ${trueCostPerHour.toFixed(2)} <span className="text-xs font-normal text-slate-400">/hr</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Accounts for non-billable paid time off.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/templates/subcontractor-bid-template"
                className="w-full block text-center py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
              >
                Get Excel Estimator Sheet
              </Link>
            </div>
          </div>
        </div>

        {/* Educational Content Section (Crucial for SEO & Informational Intent) */}
        <div className="border-t border-slate-800 pt-12 space-y-8 text-slate-300 leading-relaxed">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              What is Labor Burden and Why Does It Break Trade Bids?
            </h2>
            <p className="mb-4">
              Labor burden is the actual cost of having an employee on your payroll beyond their raw hourly rate. 
              When a plumbing, electrical, framing, or HVAC subcontractor calculates a project estimate using 
              only base wages (e.g. $30/hr), they are absorbing 25% to 40% of hidden payroll costs straight out of their profit margin.
            </p>
            <p>
              The primary elements that comprise a contractor's labor burden include:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-slate-300">
              <li><strong>Employer FICA:</strong> 6.2% Social Security + 1.45% Medicare.</li>
              <li><strong>FUTA & SUTA:</strong> Federal and State unemployment insurance taxes.</li>
              <li><strong>Workers’ Compensation:</strong> Heavily elevated in construction trades depending on risk classifications (roofing and steel erection carry much higher rates than painting or trim carpentry).</li>
              <li><strong>Non-Productive Paid Hours:</strong> Holidays, sick days, weather cancellations, and training time that generate zero billable job revenue.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ. For operational estimating purposes only.
      </footer>
    </div>
  );
}
