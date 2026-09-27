'use client';

import React, { useState, useMemo } from 'react';
import { STATE_LIEN_RULES } from '@/lib/statutoryRules';
import { generateIcsFile } from '@/lib/generateIcs';
import { 
  Calculator, 
  ShieldAlert, 
  CalendarCheck, 
  Download, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function Home() {
  // Bid Estimator Inputs
  const [materialsCost, setMaterialsCost] = useState<number>(4500);
  const [laborHours, setLaborHours] = useState<number>(65);
  const [hourlyWage, setHourlyWage] = useState<number>(38);
  const [laborBurdenPercent, setLaborBurdenPercent] = useState<number>(24);
  const [overheadPercent, setOverheadPercent] = useState<number>(15);
  const [profitMarginPercent, setProfitMarginPercent] = useState<number>(20);

  // Lien Tracker Inputs
  const [projectName, setProjectName] = useState<string>('Main St Commercial Plaza');
  const [selectedState, setSelectedState] = useState<string>('SC');
  const [firstWorkDate, setFirstWorkDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [lastWorkDate, setLastWorkDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );

  // Sorted list of jurisdictions for the dropdown
  const sortedStateCodes = useMemo(() => {
    return Object.keys(STATE_LIEN_RULES).sort((a, b) =>
      STATE_LIEN_RULES[a].name.localeCompare(STATE_LIEN_RULES[b].name)
    );
  }, []);

  // Bid Math: Cost-Plus Markup & Burden calculations
  const calculations = useMemo(() => {
    const rawLaborCost = (laborHours || 0) * (hourlyWage || 0);
    const burdenedLaborCost = rawLaborCost * (1 + (laborBurdenPercent || 0) / 100);
    const directJobCost = (materialsCost || 0) + burdenedLaborCost;
    const overheadCost = directJobCost * ((overheadPercent || 0) / 100);
    const totalJobCost = directJobCost + overheadCost;
    
    // Target price based on gross margin: Cost / (1 - Margin%)
    const safeMargin = Math.min(profitMarginPercent || 0, 99) / 100;
    const targetBidPrice = safeMargin < 1 
      ? totalJobCost / (1 - safeMargin) 
      : totalJobCost * 1.5;
    const netProfit = targetBidPrice - totalJobCost;

    return {
      rawLaborCost,
      burdenedLaborCost,
      directJobCost,
      overheadCost,
      totalJobCost,
      targetBidPrice,
      netProfit,
    };
  }, [materialsCost, laborHours, hourlyWage, laborBurdenPercent, overheadPercent, profitMarginPercent]);

  // Statutory Date Math
  const statutoryData = useMemo(() => {
    const stateRule = STATE_LIEN_RULES[selectedState] || STATE_LIEN_RULES['SC'];
    
    let preliminaryDeadline: string | null = null;
    if (stateRule.preliminaryNoticeDays && firstWorkDate) {
      const pDate = new Date(firstWorkDate);
      pDate.setDate(pDate.getDate() + stateRule.preliminaryNoticeDays);
      preliminaryDeadline = pDate.toISOString().slice(0, 10);
    }

    let lienDeadline = '';
    if (lastWorkDate) {
      const lDate = new Date(lastWorkDate);
      lDate.setDate(lDate.getDate() + stateRule.lienFilingDays);
      lienDeadline = lDate.toISOString().slice(0, 10);
    }

    return {
      rule: stateRule,
      preliminaryDeadline,
      lienDeadline,
    };
  }, [selectedState, firstWorkDate, lastWorkDate]);

  const handleDownloadCalendar = () => {
    const icsContent = generateIcsFile(
      projectName || 'Job',
      statutoryData.preliminaryDeadline,
      statutoryData.lienDeadline
    );
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${(projectName || 'subcontractor-job').toLowerCase().replace(/\s+/g, '-')}-lien-deadlines.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded-lg text-slate-950 font-black shadow-md shadow-amber-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              SubShield<span className="text-amber-500">HQ</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
              50-State Statutory Engine Live
            </span>
            <button 
              onClick={() => alert('Sign-in portal for SubShield Pro subscribers.')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg border border-slate-700 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-4 uppercase tracking-wider">
          Specialty Subcontractor Compliance Suite
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Accurate Labor Burden Bidding. <br className="hidden sm:inline" />
          <span className="text-amber-500">Bulletproof Mechanics Lien Deadlines.</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Price commercial bids with realistic wage markups and automatically calculate statutory preliminary notice deadlines across all 50 US jurisdictions.
        </p>
      </section>

      {/* Main Interactive Tool Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bid Estimator Section (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
              <Calculator className="w-6 h-6 text-amber-500" />
              <div>
                <h2 className="text-lg font-bold text-white">Subcontractor Bid Estimator</h2>
                <p className="text-xs text-slate-400">Calculate burdened payroll costs, overhead absorption, and target margins.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Materials & Equipment ($)
                </label>
                <input
                  type="number"
                  value={materialsCost || ''}
                  onChange={(e) => setMaterialsCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Total Crew Hours
                </label>
                <input
                  type="number"
                  value={laborHours || ''}
                  onChange={(e) => setLaborHours(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="e.g. 60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Base Hourly Wage ($/hr)
                </label>
                <input
                  type="number"
                  value={hourlyWage || ''}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="35"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Labor Burden Rate (%)
                </label>
                <input
                  type="number"
                  value={laborBurdenPercent || ''}
                  onChange={(e) => setLaborBurdenPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="24"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Includes FICA, Workers Comp, FUTA/SUTA</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Overhead Recovery (%)
                </label>
                <input
                  type="number"
                  value={overheadPercent || ''}
                  onChange={(e) => setOverheadPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Target Profit Margin (%)
                </label>
                <input
                  type="number"
                  value={profitMarginPercent || ''}
                  onChange={(e) => setProfitMarginPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  placeholder="20"
                />
              </div>
            </div>

            {/* Calculations Breakdown Grid */}
            <div className="mt-8 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-slate-500 text-xs block">Burdened Labor</span>
                  <span className="text-base font-bold text-slate-200">
                    ${calculations.burdenedLaborCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Direct Job Cost</span>
                  <span className="text-base font-bold text-slate-200">
                    ${calculations.directJobCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Allocated Overhead</span>
                  <span className="text-base font-bold text-slate-200">
                    ${calculations.overheadCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Net Profit</span>
                  <span className="text-base font-bold text-emerald-400">
                    +${calculations.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Recommended Total Bid</span>
                  <p className="text-3xl font-black text-amber-400">
                    ${calculations.targetBidPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <button 
                  onClick={() => alert('PDF Estimate Generation Ready: Connect your client-side PDF export logic here.')}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Formal Bid
                </button>
              </div>
            </div>
          </div>

          {/* Lien Protection & Calendar Engine (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <ShieldAlert className="w-6 h-6 text-amber-500" />
                <div>
                  <h2 className="text-lg font-bold text-white">Lien Protection Engine</h2>
                  <p className="text-xs text-slate-400">Statutory notice requirements and mechanics lien cutoff dates.</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Project / Job Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Project Jurisdiction (All 50 States + DC)
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition"
                  >
                    {sortedStateCodes.map((stCode) => (
                      <option key={stCode} value={stCode}>
                        {STATE_LIEN_RULES[stCode].name} ({stCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      First Day On Job
                    </label>
                    <input
                      type="date"
                      value={firstWorkDate}
                      onChange={(e) => setFirstWorkDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white text-xs font-medium focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Est. Completion Date
                    </label>
                    <input
                      type="date"
                      value={lastWorkDate}
                      onChange={(e) => setLastWorkDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-white text-xs font-medium focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Statutory Output Details */}
              <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Required Notice</span>
                  <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                    {statutoryData.rule.name} Statute
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-200">
                  {statutoryData.rule.statutoryNoticeName}
                </p>

                <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Notice Deadline:</span>
                    <span className="font-bold text-amber-400 text-sm">
                      {statutoryData.preliminaryDeadline || 'Not Required'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Final Lien Cutoff:</span>
                    <span className="font-bold text-rose-400 text-sm">
                      {statutoryData.lienDeadline}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  *{statutoryData.rule.notes}
                </p>
              </div>
            </div>

            {/* Calendar (.ics) Download Button */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={handleDownloadCalendar}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99]"
              >
                <CalendarCheck className="w-5 h-5" />
                Sync Deadlines to Calendar (.ics)
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-2">
                Adds 14-day and 5-day warning triggers to Outlook, Google Calendar, and Apple Calendar.
              </p>
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
            <FileCheck className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-base font-bold text-white">Full 50-State Statutory Logic</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Every state enforces distinct preliminary notice triggers, lookback windows, and filing cutoffs. Keep your lien rights intact without legal consult fees.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
            <Calculator className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-base font-bold text-white">Real Labor Burden Factoring</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Bidding wages alone bleeds contractor profit. Account for workers' comp, FICA, unemployment insurance, and overhead on every single job.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
            <CalendarCheck className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-base font-bold text-white">Zero-Friction Calendar Sync</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Download standard .ics calendar appointments with automatic reminder alarms to ensure cutoff dates never pass unnoticed.
            </p>
          </div>
        </section>

        {/* SaaS Upsell Section */}
        <section className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs uppercase tracking-widest font-black px-3.5 py-1 rounded-full">
            SubShield Pro
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4">
            Automated Deadline Protection For $19/Month
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Stop tracking commercial job dates on whiteboards. SubShield Pro automatically monitors your jobs and fires SMS warnings before notice windows lapse.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold text-white">30 Active Projects</h4>
              <p className="text-xs text-slate-400 mt-1">Track jobs across multiple general contractors and states simultaneously.</p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold text-white">Automated SMS Alarms</h4>
              <p className="text-xs text-slate-400 mt-1">Direct alerts sent to your phone 14, 7, and 2 days before statutory expiration.</p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold text-white">Certified Mail Notices</h4>
              <p className="text-xs text-slate-400 mt-1">State-compliant Preliminary Notice and Notice to Owner forms ready to sign and send.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => alert('Connect your Stripe or Lemon Squeezy checkout URL here!')}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Lock className="w-4 h-4" />
              Upgrade to Pro ($19/mo)
            </button>
            <span className="text-xs text-slate-500">Cancel anytime • Instant activation</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 text-center text-xs text-slate-600">
        <p className="max-w-2xl mx-auto">
          SubShieldHQ provides estimate calculators and statutory deadline mapping for informational purposes only. Statutory rules may vary based on contract terms, tiers, and notice recordings. Not legal advice.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} SubShieldHQ. All rights reserved.</p>
      </footer>
    </div>
  );
}