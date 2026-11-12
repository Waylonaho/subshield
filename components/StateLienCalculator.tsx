"use client";

import { useState, useMemo } from "react";
import { StateLienRule } from "@/lib/statutoryRules";
import { generateIcsFile } from "@/lib/generateIcs";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

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

export default function StateLienCalculator({ rule }: { rule: StateLienRule }) {
  const [projectName, setProjectName] = useState<string>(`${rule.name} Commercial Job`);
  const [firstWorkDate, setFirstWorkDate] = useState<string>("");
  const [lastWorkDate, setLastWorkDate] = useState<string>("");

  const { prelimDate, lienDate } = useMemo(() => {
    let pDate: Date | null = null;
    let lDate: Date | null = null;

    if (rule.preliminaryNoticeDays) {
      const triggerBaseStr =
        rule.noticeTrigger === "last_furnishing" ? lastWorkDate : firstWorkDate;
      const baseDate = parseLocalDate(triggerBaseStr);
      if (baseDate) {
        baseDate.setDate(baseDate.getDate() + rule.preliminaryNoticeDays);
        pDate = baseDate;
      }
    }

    if (lastWorkDate && rule.lienFilingDays) {
      const baseLastDate = parseLocalDate(lastWorkDate);
      if (baseLastDate) {
        baseLastDate.setDate(baseLastDate.getDate() + rule.lienFilingDays);
        lDate = baseLastDate;
      }
    }

    return { prelimDate: pDate, lienDate: lDate };
  }, [rule, firstWorkDate, lastWorkDate]);

  const handleDownloadCalendar = () => {
    if (!prelimDate && !lienDate) {
      alert("Please enter your project work dates first to calculate deadlines.");
      return;
    }

    const icsString = generateIcsFile(
      projectName || `${rule.name} Project`,
      prelimDate ? formatIsoDate(prelimDate) : null,
      lienDate ? formatIsoDate(lienDate) : ""
    );

    const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${rule.code}_SubShield_Lien_Deadlines.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderPrelimDisplay = () => {
    if (!rule.preliminaryNoticeDays) {
      return "Not Statutorily Mandated";
    }
    if (prelimDate) {
      return prelimDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    if (rule.noticeTrigger === "last_furnishing") {
      return "Enter Last Work Date";
    }
    if (rule.noticeTrigger === "invoice_date") {
      return "Enter First/Invoice Date";
    }
    return "Enter First Work Date";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-white">
            {rule.name} ({rule.code}) Mechanics Lien Deadline Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Statute Reference: {rule.statutoryNoticeName}
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          {rule.lienFilingDays}-Day Filing Window
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Project / Job Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            First Day of Work / Delivery
          </label>
          <input
            type="date"
            value={firstWorkDate}
            onChange={(e) => setFirstWorkDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Last Day of Work / Completion
          </label>
          <input
            type="date"
            value={lastWorkDate}
            onChange={(e) => setLastWorkDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-950 border border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {rule.name} Preliminary Notice Deadline
          </span>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">
            {renderPrelimDisplay()}
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {rule.notes}
          </p>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {rule.name} Final Mechanics Lien Cutoff
          </span>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">
            {lienDate
              ? lienDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Enter Last Work Date"}
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Calculated {rule.lienFilingDays} calendar days from{" "}
            {rule.lienTrigger === "completion"
              ? "overall project completion"
              : "your last day furnishing labor or materials"}
            .
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={handleDownloadCalendar}
          className="w-full sm:w-auto px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
        >
          Download {rule.code} Calendar Reminders (.ics)
        </button>

        <a
          href={STRIPE_PRO_URL}
          className="w-full sm:w-auto text-center px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-semibold text-sm transition"
        >
          Get Automated SMS Alerts ($19/mo) →
        </a>
      </div>
    </div>
  );
}
