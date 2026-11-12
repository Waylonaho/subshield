import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATE_LIEN_RULES, StateLienRule } from "@/lib/statutoryRules";

const STRIPE_PRO_URL = "https://buy.stripe.com/28E14n6FPd3fgpK8K52VG00";

function slugifyState(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getRuleFromNoticeSlug(slug: string): StateLienRule | undefined {
  const cleanStateSlug = slug.replace(/-preliminary-notice$/, "").toLowerCase();
  return Object.values(STATE_LIEN_RULES).find(
    (rule) => slugifyState(rule.name) === cleanStateSlug
  );
}

export async function generateStaticParams() {
  return Object.values(STATE_LIEN_RULES).map((rule) => ({
    slug: `${slugifyState(rule.name)}-preliminary-notice`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rule = getRuleFromNoticeSlug(slug);

  if (!rule) {
    return { title: "Preliminary Notice Guide Not Found" };
  }

  const stateSlug = slugifyState(rule.name);
  const title = `${rule.name} Preliminary Notice Requirements & How to Send (${rule.code})`;
  const description = `Complete subcontractor guide to ${rule.name} preliminary notices (${rule.statutoryNoticeName}). Learn required recipients, delivery deadlines, and how to protect your ${rule.code} mechanics lien rights.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/notices/${stateSlug}-preliminary-notice`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.subshieldhq.com/notices/${stateSlug}-preliminary-notice`,
      siteName: "SubShieldHQ",
      type: "website",
    },
  };
}

export default async function StatePreliminaryNoticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rule = getRuleFromNoticeSlug(slug);

  if (!rule) {
    notFound();
  }

  const stateSlug = slugifyState(rule.name);
  const allStates = Object.values(STATE_LIEN_RULES).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Tailored trigger explanation
  const triggerPhrase = rule.preliminaryNoticeDays
    ? rule.noticeTrigger === "last_furnishing"
      ? `within ${rule.preliminaryNoticeDays} days after your last day furnishing labor or materials`
      : rule.noticeTrigger === "invoice_date"
      ? `at least ${rule.preliminaryNoticeDays} days prior to recording a formal mechanics lien`
      : `within ${rule.preliminaryNoticeDays} days of first furnishing labor or materials to the job site`
    : "prior to or alongside lien filing as dictated by project tier";

  // State-specific registry notes for UT, IA, NC
  const getDeliveryGuidance = (code: string) => {
    if (code === "UT") {
      return "Utah requires online filing directly through the Utah State Construction Registry (SCR) within 20 days of first work—certified mail alone does not satisfy the registry mandate.";
    }
    if (code === "IA") {
      return "Iowa requires electronic posting to the Iowa Mechanics' Notice and Lien Registry (MNLR) to preserve subcontractor lien priority.";
    }
    if (code === "NC") {
      return "North Carolina requires delivering a Notice to Lien Agent via the state's designated online portal (LiensNC) or certified mail within 15 days of first furnishing.";
    }
    return "Serve via USPS Certified Mail with Return Receipt Requested (or statutory overnight courier) to the Property Owner, General Contractor, and Construction Lender (if applicable). Retain the stamped USPS mailing receipt as proof of timely service.";
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is a preliminary notice mandatory for subcontractors in ${rule.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: rule.preliminaryNoticeDays
            ? `Yes. Under ${rule.statutoryNoticeName}, subcontractors in ${rule.name} must deliver formal notice ${triggerPhrase} to protect mechanics lien rights. ${rule.notes}`
            : `${rule.name} does not impose a universal early preliminary notice requirement at project start, though pre-lien notices or notices of intent may still apply. ${rule.notes}`,
        },
      },
      {
        "@type": "Question",
        name: `How do you send a ${rule.name} ${rule.statutoryNoticeName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: getDeliveryGuidance(rule.code),
        },
      },
      {
        "@type": "Question",
        name: `What happens if you miss the preliminary notice deadline in ${rule.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Missing the statutory notice window in ${rule.name} can completely extinguish your mechanics lien rights against the property or limit your recovery strictly to unpaid funds still held by the property owner at the time late notice is received.`,
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
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-white">
            Sub<span className="text-amber-500">Shield</span>HQ
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href={`/lien-deadlines/${stateSlug}`}
              className="text-slate-300 hover:text-white transition hidden sm:inline"
            >
              {rule.code} Deadline Calculator
            </Link>
            <a
              href={STRIPE_PRO_URL}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
            >
              Pro SMS Alerts ($19/mo)
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        {/* Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href={`/lien-deadlines/${stateSlug}`} className="hover:text-white">
              {rule.name} Lien Deadlines
            </Link>
            <span>/</span>
            <span className="text-amber-400">Preliminary Notice Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {rule.name} Preliminary Notice Guide: {rule.statutoryNoticeName}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Everything specialty trade subcontractors need to know about serving a compliant preliminary notice in {rule.name} ({rule.code}), required recipients, and preserving full mechanics lien rights.
          </p>
        </div>

        {/* Quick Statutory Snapshot Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Statutory Notice Form
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              {rule.statutoryNoticeName}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Notice Deadline Window
            </span>
            <span className="text-lg font-extrabold text-amber-400 mt-1 block">
              {rule.preliminaryNoticeDays
                ? `${rule.preliminaryNoticeDays} Days (${
                    rule.noticeTrigger === "last_furnishing"
                      ? "From Last Work"
                      : rule.noticeTrigger === "invoice_date"
                      ? "Before Lien Filing"
                      : "From First Work"
                  })`
                : "Not Strictly Mandated"}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Final Lien Recording Cutoff
            </span>
            <span className="text-lg font-extrabold text-rose-400 mt-1 block">
              {rule.lienFilingDays} Days ({rule.lienTrigger === "completion" ? "Completion" : "Last Work"})
            </span>
          </div>
        </div>

        {/* Action Bar to State Calculator */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-200">
            <strong className="text-amber-400">Have an active job in {rule.name}?</strong>{" "}
            Calculate your exact calendar cutoff dates and export `.ics` phone reminders.
          </div>
          <Link
            href={`/lien-deadlines/${stateSlug}`}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
          >
            Open {rule.name} Date Calculator →
          </Link>
        </div>

        {/* Step-by-Step Compliance Breakdown */}
        <section className="space-y-6 text-slate-300 leading-relaxed">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">
              1. When Must a Subcontractor Send Notice in {rule.name}?
            </h2>
            <p className="text-sm">
              {rule.preliminaryNoticeDays
                ? `In ${rule.name}, subcontractors and material suppliers who do not contract directly with the property owner must serve a ${rule.statutoryNoticeName} ${triggerPhrase}.`
                : `In ${rule.name}, an early preliminary notice at the start of work is not universally required across all commercial tiers, though delivering formal written notice prior to filing is essential.`}
            </p>
            <p className="text-sm text-amber-300/90">
              <strong>Key Statutory Rule:</strong> {rule.notes}
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">
              2. Who Must Receive the Notice &amp; Proof of Service
            </h2>
            <p className="text-sm">
              {getDeliveryGuidance(rule.code)}
            </p>
            <ul className="list-disc list-inside text-sm space-y-1.5 text-slate-400 pt-1">
              <li><strong>Property Owner:</strong> Listed on the building permit, Notice of Commencement, or county tax assessor parcel record.</li>
              <li><strong>Prime / General Contractor:</strong> The entity holding the direct contract with the owner.</li>
              <li><strong>Construction Lender (if any):</strong> Protects priority if a bank or lender is financing the commercial build.</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">
              3. Essential Information to Include in Your Notice
            </h2>
            <p className="text-sm">
              To avoid technical invalidation in {rule.name}, verify that your notice clearly states:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1.5 text-slate-400">
              <li>Your company&apos;s legal business name, address, and contact information.</li>
              <li>Name and address of the General Contractor or party who hired you.</li>
              <li>Street address and legal/parcel description of the job site.</li>
              <li>Clear description of the trade labor, services, or materials furnished.</li>
              <li>Estimated or contracted dollar value of your subcontract scope.</li>
            </ul>
          </div>
        </section>

        {/* Cross-Linking to Related Payment Tools */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <span className="text-xs font-bold uppercase text-amber-500">Past-Due Invoice?</span>
            <h3 className="text-lg font-bold text-white">
              {rule.name} Notice of Intent to Lien Generator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your preliminary notice window is satisfied and an invoice is overdue, generate a formal Certified Mail Notice of Intent to Lien before your {rule.lienFilingDays}-day cutoff expires.
            </p>
            <Link
              href="/tools/notice-of-intent-to-lien"
              className="inline-block text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              Generate Demand Letter PDF →
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <span className="text-xs font-bold uppercase text-amber-500">Submitting a Pay App?</span>
            <h3 className="text-lg font-bold text-white">
              Conditional Lien Waiver Generator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never sign an unconditional waiver before funds clear. Generate a safe Conditional Waiver for your progress draw or final retainage payout.
            </p>
            <Link
              href="/tools/lien-waiver-generator"
              className="inline-block text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              Generate Lien Waiver PDF →
            </Link>
          </div>
        </section>

        {/* All 51 Preliminary Notice Guides Directory */}
        <section className="border-t border-slate-800 pt-10 space-y-4">
          <h2 className="text-base font-bold text-white">
            Preliminary Notice Requirements by State (All 50 States + D.C.)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs">
            {allStates.map((st) => {
              const stSlug = slugifyState(st.name);
              const isCurrent = st.code === rule.code;
              return (
                <Link
                  key={st.code}
                  href={`/notices/${stSlug}-preliminary-notice`}
                  className={`px-3 py-2 rounded-lg border transition truncate ${
                    isCurrent
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {st.name} Notice ({st.code})
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <p className="max-w-3xl mx-auto">
          Disclaimer: Statutory notice requirements vary by project type (commercial, residential, public bonded) and claimant tier. Informational guide only; not legal advice.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} SubShieldHQ.</p>
      </footer>
    </div>
  );
}
