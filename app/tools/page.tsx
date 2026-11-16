import type { Metadata } from "next";
import Link from "next/link";
import { TRADE_PROFILES } from "@/lib/tradeProfiles";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

export const metadata: Metadata = {
  title: "Free Construction Estimating & Subcontractor Lien Tools | SubShieldHQ",
  description:
    "Free subcontractor calculators and payment protection generators: Direct Cost Bid Estimator, Labor Burden Calculator, Conditional Lien Waiver PDF Generator, Notice of Intent to Lien Letter, and 50-State Lien Deadlines.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Free Construction Estimating & Subcontractor Lien Tools | SubShieldHQ",
    description:
      "Open-access estimating calculators, PDF lien waiver generators, and 50-state statutory deadline trackers built for trade contractors.",
    url: "https://www.subshieldhq.com/tools",
    siteName: "SubShieldHQ",
    type: "website",
  },
};

export default function ToolsDirectoryPage() {
  const allTrades = Object.values(TRADE_PROFILES);

  const primaryTools = [
    {
      badge: "Estimating & Pricing",
      title: "Subcontractor Direct Cost & Margin Bid Calculator",
      description:
        "Calculate true burdened labor, overhead recovery, break-even cost, and target gross margin price without confusing markup with margin.",
      href: "/#bid-calculator",
      cta: "Open Bid Calculator →",
    },
    {
      badge: "Payroll & Workers' Comp",
      title: "Construction Labor Burden Calculator",
      description:
        "Determine your exact fully burdened hourly labor rate including FICA, FUTA, SUTA, workers' compensation insurance, and field benefits.",
      href: "/tools/labor-burden-calculator",
      cta: "Calculate Labor Burden →",
    },
    {
      badge: "Draw & Payout Protection",
      title: "Conditional & Unconditional Lien Waiver Generator",
      description:
        "Generate printable PDF progress and final lien waivers in 30 seconds with built-in warnings against signing away unpaid retainage.",
      href: "/tools/lien-waiver-generator",
      cta: "Create Lien Waiver PDF →",
    },
    {
      badge: "Past-Due Collections",
      title: "Notice of Intent to Lien (NOI) Demand Letter Generator",
      description:
        "Generate a formal Certified Mail pre-lien demand letter pre-loaded with your state's exact mechanics lien statute to collect overdue invoices.",
      href: "/tools/notice-of-intent-to-lien",
      cta: "Create Notice of Intent →",
    },
    {
      badge: "50-State Statutory Lookup",
      title: "Mechanics Lien & Preliminary Notice Deadline Calculator",
      description:
        "Calculate exact preliminary notice and county lien recording cutoffs across all 50 states + D.C. and export .ics calendar reminders.",
      href: "/#deadline-calculator",
      cta: "Check State Deadlines →",
    },
    {
      badge: "Free Excel & Google Sheets",
      title: "Subcontractor Bid & Labor Burden Spreadsheet Template",
      description:
        "Download our offline estimating workbook featuring a Labor Burden Matrix, Overhead Recovery Sheet, and Change Order Log.",
      href: "/templates/subcontractor-bid-template",
      cta: "Get Free Spreadsheet →",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are SubShieldHQ construction estimating and lien tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All calculators, PDF lien waiver generators, Notice of Intent to Lien letter builders, and 50-state deadline lookup tools on SubShieldHQ are 100% free to use with no account required.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a Conditional and Unconditional Lien Waiver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Conditional Lien Waiver only waives your mechanics lien rights once payment actually clears your bank account, making it safe to submit with a pay application. An Unconditional Lien Waiver waives your rights immediately upon signing—even if the check bounces.",
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

      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/guides/mechanics-lien-deadlines-by-state" className="text-slate-300 hover:text-white transition hidden sm:inline">
              50-State Lien Chart
            </Link>
            <Link href="/dashboard" className="text-slate-200 hover:text-amber-400 font-semibold transition">
              Member Login
            </Link>
            <a
              href={STRIPE_PRO_URL}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
            >
              Pro Alerts ($19/mo)
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Subcontractor Tools Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Free Construction Estimating &amp; Payment Protection Tools
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Built for specialty trade contractors, estimators, and construction office managers. Price commercial bids accurately, generate printable lien documents, and verify statutory notice deadlines across all 50 states.
          </p>
        </div>

        {/* Core Tool Suite Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primaryTools.map((tool) => (
            <div
              key={tool.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  {tool.badge}
                </span>
                <h2 className="text-lg font-bold text-white">{tool.title}</h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div>
                <Link
                  href={tool.href}
                  className="inline-block px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs transition"
                >
                  {tool.cta}
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Trade-Specific Calculators Directory */}
        <section className="border-t border-slate-800 pt-10 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Specialty Trade Bid &amp; Labor Burden Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pre-configured with trade-specific workers&apos; compensation, overhead, and gross margin benchmarks.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
            {allTrades.map((trade) => (
              <Link
                key={trade.slug}
                href={`/calculators/${trade.slug}-bid-calculator`}
                className="px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition truncate font-medium"
              >
                {trade.shortName} Bid Calculator
              </Link>
            ))}
          </div>
        </section>

        {/* Pro Conversion Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-amber-950/25 to-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              SubShield Pro • $19/month
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Automate Lien &amp; Preliminary Notice Countdown Alerts Across 30 Jobs
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Stop relying on sticky notes and manual spreadsheets. Receive automatic 14-day, 7-day, and 2-day email warnings before any preliminary notice or county lien filing deadline expires.
            </p>
          </div>
          <a
            href={STRIPE_PRO_URL}
            className="shrink-0 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition"
          >
            Activate Pro Alerts ($19/mo) →
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SubShieldHQ. Informational tools only; not legal advice.</p>
      </footer>
    </div>
  );
}
