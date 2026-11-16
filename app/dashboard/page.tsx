"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { STATE_LIEN_RULES } from "@/lib/statutoryRules";
import type { User } from "@supabase/supabase-js";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

interface TrackedProject {
  id: string;
  project_name: string;
  state_code: string;
  first_work_date: string | null;
  last_work_date: string;
  prelim_deadline: string | null;
  lien_deadline: string;
}

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

export default function ProDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const [isPro, setIsPro] = useState(false);
  const [projects, setProjects] = useState<TrackedProject[]>([]);
  const [savingProject, setSavingProject] = useState(false);

  // New Project Form
  const [projectName, setProjectName] = useState("");
  const [stateCode, setStateCode] = useState("SC");
  const [firstWorkDate, setFirstWorkDate] = useState("");
  const [lastWorkDate, setLastWorkDate] = useState("");

  const sortedStates = useMemo(
    () =>
      Object.values(STATE_LIEN_RULES).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    []
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const loadAccountData = async () => {
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("email", user.email!.toLowerCase())
        .maybeSingle();

      setIsPro(sub?.status === "active");

      const { data: userProjects } = await supabase
        .from("projects")
        .select("*")
        .order("lien_deadline", { ascending: true });

      if (userProjects) setProjects(userProjects);
    };

    loadAccountData();
  }, [user]);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      alert(error.message);
    } else {
      setMagicLinkSent(true);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    if (projects.length >= 30) {
      alert("Pro accounts support up to 30 active projects.");
      return;
    }

    const rule = STATE_LIEN_RULES[stateCode];
    if (!rule || !lastWorkDate) return;

    let prelimStr: string | null = null;
    if (rule.preliminaryNoticeDays) {
      const baseStr =
        rule.noticeTrigger === "last_furnishing" ? lastWorkDate : firstWorkDate;
      const baseDate = parseLocalDate(baseStr);
      if (baseDate) {
        baseDate.setDate(baseDate.getDate() + rule.preliminaryNoticeDays);
        prelimStr = formatIsoDate(baseDate);
      }
    }

    const lastDateObj = parseLocalDate(lastWorkDate);
    if (!lastDateObj) return;
    lastDateObj.setDate(lastDateObj.getDate() + rule.lienFilingDays);
    const lienStr = formatIsoDate(lastDateObj);

    setSavingProject(true);
    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        user_email: user.email.toLowerCase(),
        project_name: projectName.trim(),
        state_code: stateCode,
        first_work_date: firstWorkDate || null,
        last_work_date: lastWorkDate,
        prelim_deadline: prelimStr,
        lien_deadline: lienStr,
      })
      .select()
      .single();

    setSavingProject(false);
    if (error) {
      alert(error.message);
    } else if (data) {
      setProjects((prev) =>
        [...prev, data].sort((a, b) =>
          a.lien_deadline.localeCompare(b.lien_deadline)
        )
      );
      setProjectName("");
      setFirstWorkDate("");
      setLastWorkDate("");
    }
  };

  const handleDeleteProject = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const daysRemaining = (dateStr: string) => {
    const target = parseLocalDate(dateStr);
    if (!target) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center">
        Loading SubShield Pro Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="text-slate-300 hover:text-white">
              Calculators
            </Link>
            {user && (
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full">
        {!user ? (
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              SubShield Pro Member Portal
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Sign In to Your Project Tracker
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter the email address you used at Stripe checkout. We&apos;ll send an instant 1-click sign-in link—no password required.
            </p>

            {magicLinkSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                ✓ Sign-in link sent to <strong>{loginEmail}</strong>. Check your inbox and tap the link to open your dashboard.
              </div>
            ) : (
              <form onSubmit={handleSendMagicLink} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="you@yourcompany.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
                >
                  Send 1-Click Login Link
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Subscription Status Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-white">
                    Active Lien Deadline Tracker
                  </h1>
                  {isPro ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      PRO ACTIVE ({projects.length}/30 Jobs)
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      FREE PREVIEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Signed in as {user.email} • Automated countdown warnings fire 14, 7, and 2 days before statutory cutoffs.
                </p>
              </div>

              {!isPro && (
                <a
                  href={STRIPE_PRO_URL}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0"
                >
                  Activate Automated Alerts ($19/mo)
                </a>
              )}
            </div>

            {/* Add New Job Form */}
            <form
              onSubmit={handleAddProject}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                + Track New Commercial Project
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Project / GC Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oakridge Medical"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">State</label>
                  <select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {sortedStates.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">First Work Date</label>
                  <input
                    type="date"
                    value={firstWorkDate}
                    onChange={(e) => setFirstWorkDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Last / Est. Completion Date</label>
                  <input
                    type="date"
                    required
                    value={lastWorkDate}
                    onChange={(e) => setLastWorkDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={savingProject}
                className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-50"
              >
                {savingProject ? "Saving..." : "Add Job & Calculate Deadlines"}
              </button>
            </form>

            {/* Tracked Jobs List */}
            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl text-sm text-slate-400">
                  No active jobs tracked yet. Add your first project above to start monitoring statutory deadlines.
                </div>
              ) : (
                projects.map((job) => {
                  const lienDaysLeft = daysRemaining(job.lien_deadline);
                  return (
                    <div
                      key={job.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">
                            {job.project_name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-semibold">
                            {job.state_code}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-1.5">
                          <span>
                            Preliminary Notice:{" "}
                            <strong className="text-slate-200">
                              {job.prelim_deadline || "Not Required"}
                            </strong>
                          </span>
                          <span>
                            Final Lien Cutoff:{" "}
                            <strong className="text-rose-400">
                              {job.lien_deadline}
                            </strong>{" "}
                            ({lienDaysLeft >= 0 ? `${lienDaysLeft} days left` : "Expired"})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(job.id)}
                        className="text-xs text-slate-500 hover:text-rose-400 transition self-end sm:self-center cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
