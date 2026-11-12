import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATE_LIEN_RULES, StateLienRule } from "@/lib/statutoryRules";
import StateLienCalculator from "@/components/StateLienCalculator";

function slugifyState(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getRuleBySlug(slug: string): StateLienRule | undefined {
  return Object.values(STATE_LIEN_RULES).find(
    (rule) => slugifyState(rule.name) === slug.toLowerCase()
  );
}

export async function generateStaticParams() {
  return Object.values(STATE_LIEN_RULES).map((rule) => ({
    state: slugifyState(rule.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const rule = getRuleBySlug(state);

  if (!rule) {
    return { title: "State Lien Deadlines Not Found" };
  }

  const slug = slugifyState(rule.name);
  const title = `${rule.name} Mechanics Lien Deadline Calculator & Notice Rules (${rule.code})`;
  const description = `Calculate ${rule.name} preliminary notice and mechanics lien filing deadlines (${rule.lienFilingDays}-day statutory window under ${rule.statutoryNoticeName}). Free subcontractor calculator & .ics reminders.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/lien-deadlines/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.subshieldhq.com/lien-deadlines/${slug}`,
      siteName: "SubShieldHQ",
      type: "website",
    },
  };
}

export default async function StateLienDeadlinePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const rule = getRuleBySlug(state);

  if (!rule) {
    notFound();
  }

  const allStates = Object.values(STATE_LIEN_RULES).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const prelimQuestion = rule.preliminaryNoticeDays
    ? `When is a preliminary notice due in ${rule.name}?`
    : `Does ${rule.name} require a preliminary notice before filing a mechanics lien?`;

  const prelimAnswer = rule.preliminaryNoticeDays
    ? `In ${rule.name}, specialty subcontractors must serve a ${rule.statutoryNoticeName} within ${rule.preliminaryNoticeDays} days of ${
        rule.noticeTrigger === "last_furnishing"
          ? "last furnishing labor or materials"
          : rule.noticeTrigger === "invoice_date"
          ? "invoice or pre-filing notice date"
          : "first furnishing labor or materials"
      }. ${rule.notes}`
    : `${rule.name} does not mandate a universal early preliminary notice at the start of work, though formal notice prior to filing may still apply. ${rule.notes}`;

  const filingAnswer = `Under ${rule.statutoryNoticeName}, a ${rule.name} mechanics lien must generally be filed within ${rule.lienFilingDays} days from ${
    rule.lienTrigger === "completion"
      ? "project completion"
      : "the last day labor or materials were furnished to the project"
  }.`;

  // JSON-LD FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: prelimQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: prelimAnswer,
        },
      },
      {
        "@type": "Question",
        name: `How many days do you have to file a mechanics lien in ${rule.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: filingAnswer,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/tools/labor-burden-calculator"
              className="text-slate-300 hover:text-white transition hidden sm:inline"
            >
              Labor Burden Calculator
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
            >
              Bid Estimator
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        {/* Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400">{rule.name} Lien Deadlines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {rule.name} Mechanics Lien &amp; Preliminary Notice Deadline Calculator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Calculate exact statutory cutoff dates for commercial subcontractors in{" "}
            {rule.name} ({rule.code}) under <strong>{rule.statutoryNoticeName}</strong>{" "}
            and export calendar reminder alerts.
          </p>
        </div>

        {/* Interactive Calculator */}
        <StateLienCalculator rule={rule} />

        {/* Statutory Breakdown & FAQ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">{prelimQuestion}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{prelimAnswer}</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              How many days do you have to file a mechanics lien in {rule.name}?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{filingAnswer}</p>
          </div>
        </section>

        {/* Cross-Sell Bid & Labor Burden Tools */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Free Subcontractor Estimating Suite
            </span>
            <h3 className="text-xl font-bold text-white">
              Pricing your next {rule.name} commercial bid?
            </h3>
            <p className="text-sm text-slate-400">
              Calculate true payroll burden, overhead recovery, and gross profit margin before submitting your proposal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
            >
              Open Bid Calculator
            </Link>
            <Link
              href="/templates/subcontractor-bid-template"
              className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition"
            >
              Free Bid Spreadsheet
            </Link>
          </div>
        </section>

        {/* Internal Link Directory of All 51 Jurisdictions */}
        <section className="border-t border-slate-800 pt-10 space-y-4">
          <h2 className="text-base font-bold text-white">
            Mechanics Lien Deadlines by State (All 50 States + D.C.)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs">
            {allStates.map((st) => {
              const stSlug = slugifyState(st.name);
              const isCurrent = st.code === rule.code;
              return (
                <Link
                  key={st.code}
                  href={`/lien-deadlines/${stSlug}`}
                  className={`px-3 py-2 rounded-lg border transition truncate ${
                    isCurrent
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {st.name} ({st.code})
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p className="max-w-3xl mx-auto">
          Disclaimer: Statutory deadlines are general informational baselines and do not constitute legal advice. Verify claimant tier and county recording rules with a licensed {rule.name} construction attorney.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} SubShieldHQ.</p>
      </footer>
    </div>
  );
}
