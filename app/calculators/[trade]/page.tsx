import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TRADE_PROFILES } from "@/lib/tradeProfiles";
import TradeBidCalculator from "@/components/TradeBidCalculator";

export async function generateStaticParams() {
  return Object.keys(TRADE_PROFILES).map((slug) => ({
    trade: `${slug}-bid-calculator`,
  }));
}

function getTradeFromParam(param: string) {
  const cleanSlug = param.replace(/-bid-calculator$/, "").toLowerCase();
  return TRADE_PROFILES[cleanSlug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const { trade: tradeParam } = await params;
  const trade = getTradeFromParam(tradeParam);

  if (!trade) {
    return { title: "Trade Bid Calculator Not Found" };
  }

  const title = `${trade.tradeName} Bid & Labor Burden Calculator (Free)`;
  const description = `Calculate ${trade.shortName.toLowerCase()} crew labor burden (${trade.workersCompRange} workers' comp), overhead recovery, and true gross profit margin for commercial and residential bids.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/calculators/${trade.slug}-bid-calculator`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.subshieldhq.com/calculators/${trade.slug}-bid-calculator`,
      siteName: "SubShieldHQ",
      type: "website",
    },
  };
}

export default async function TradeCalculatorPage({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade: tradeParam } = await params;
  const trade = getTradeFromParam(tradeParam);

  if (!trade) {
    notFound();
  }

  const allTrades = Object.values(TRADE_PROFILES);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: trade.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: trade.faqAnswer,
        },
      },
      {
        "@type": "Question",
        name: `What is the typical workers' compensation rate for ${trade.shortName.toLowerCase()} contractors?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${trade.shortName} subcontractors typically pay between ${trade.workersCompRange} of gross payroll for workers' compensation insurance, depending on state class codes and EMR rating.`,
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

      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/#deadline-calculator" className="text-slate-300 hover:text-white transition hidden sm:inline">
              State Lien Deadlines
            </Link>
            <Link
              href="/templates/subcontractor-bid-template"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
            >
              Free Bid Sheet
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        <div className="space-y-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-amber-400">{trade.shortName} Bid Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {trade.tradeName} Bid &amp; Labor Burden Calculator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Price {trade.shortName.toLowerCase()} jobs accurately by factoring true payroll burden, field overhead, and target gross profit margin.
          </p>
        </div>

        {/* Interactive Calculator */}
        <TradeBidCalculator trade={trade} />

        {/* Trade Cost Benchmarks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 print:hidden">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              {trade.shortName} Labor Burden &amp; Insurance Benchmarks
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {trade.typicalBurdenNote}
            </p>
            <div className="text-xs text-amber-400 font-semibold pt-1">
              Typical Workers' Comp Range: {trade.workersCompRange}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white">
              {trade.faqQuestion}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {trade.faqAnswer}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Common {trade.shortName} Takeoff Materials
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{trade.commonMaterials}</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Common {trade.shortName} Equipment &amp; Rentals
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{trade.commonEquipment}</p>
          </div>
        </section>

        {/* Other Trade Calculators Directory */}
        <section className="border-t border-slate-800 pt-10 space-y-4 print:hidden">
          <h2 className="text-base font-bold text-white">
            Specialty Trade Subcontractor Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
            {allTrades.map((t) => {
              const isCurrent = t.slug === trade.slug;
              return (
                <Link
                  key={t.slug}
                  href={`/calculators/${t.slug}-bid-calculator`}
                  className={`px-3 py-2 rounded-lg border transition truncate ${
                    isCurrent
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {t.shortName} Calculator
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500 print:hidden">
        © {new Date().getFullYear()} SubShieldHQ. Informational estimating tools only.
      </footer>
    </div>
  );
}
