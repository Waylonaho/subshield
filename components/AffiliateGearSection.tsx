import { getContextualAffiliateLinks } from "@/lib/affiliateLinks";

interface AffiliateGearSectionProps {
  tradeName?: string;
  context?: "estimating" | "lien_office" | "field_general";
  heading?: string;
}

export default function AffiliateGearSection({
  tradeName,
  context = "field_general",
  heading,
}: AffiliateGearSectionProps) {
  const links = getContextualAffiliateLinks({ tradeName, context });

  const resolvedHeading =
    heading ||
    (tradeName
      ? `Recommended ${tradeName} Field & Estimating Gear`
      : context === "lien_office"
      ? "Back-Office Lien & Document Processing Supplies"
      : "Contractor Estimating & Jobsite Essentials");

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 print:hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Field &amp; Office Resources
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
            {resolvedHeading}
          </h2>
        </div>
        <span className="text-[11px] text-slate-500 shrink-0">
          As an Amazon Associate I earn from qualifying purchases.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((item) => (
          <div
            key={item.label}
            className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-1.5">
              <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {item.badge}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {item.label}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div>
              <a
                href={item.url}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-block w-full text-center px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-amber-500 font-bold text-xs transition"
              >
                Browse on Amazon →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
