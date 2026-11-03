"use client";

import { useState } from "react";
import Link from "next/link";

export default function BidTemplatePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg("Something went wrong. Please check your email and try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
          >
            ← Back to Calculator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Downloadable Toolkits
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Subcontractor Bid Estimating Template
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            A free, clean spreadsheet for Excel & Google Sheets with built-in labor burden and overhead recovery formulas.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 max-w-lg mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Free Instant Access
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Download the Starter Template
          </h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Enter your email to receive an instant copy link.
          </p>

          {submitted ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm text-center">
              🎉 Check your inbox! Your template download link has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {errorMsg && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition disabled:opacity-50"
              >
                {loading ? "Sending Link..." : "Send Free Template"}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SubShieldHQ.
      </footer>
    </div>
  );
}
