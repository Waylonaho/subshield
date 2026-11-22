export const AMAZON_ASSOCIATE_TAG = "subshield-20";

export interface DynamicAffiliateLink {
  badge: string;
  label: string;
  description: string;
  url: string;
}

export function buildAmazonSearchLink(keywords: string): string {
  const params = new URLSearchParams({
    k: keywords.trim(),
    tag: AMAZON_ASSOCIATE_TAG,
  });
  return `https://www.amazon.com/s?${params.toString()}`;
}

export function getContextualAffiliateLinks(options?: {
  tradeName?: string;
  context?: "estimating" | "lien_office" | "field_general";
}): DynamicAffiliateLink[] {
  const trade = options?.tradeName?.trim();
  const context = options?.context || "field_general";

  if (trade) {
    return [
      {
        badge: `${trade} Tools`,
        label: `Commercial ${trade} Tools & Pro Equipment`,
        description: `Browse top-rated commercial ${trade.toLowerCase()} tools, testers, and jobsite gear on Amazon.`,
        url: buildAmazonSearchLink(`commercial ${trade} contractor tools`),
      },
      {
        badge: "Fast Site Takeoffs",
        label: "Bluetooth Laser Distance Measurers & Takeoff Gear",
        description:
          "Speed up field measurements and commercial square-footage estimates with jobsite laser measurers.",
        url: buildAmazonSearchLink("bluetooth laser distance measurer contractor"),
      },
      {
        badge: "Field Documentation",
        label: "Heavy-Duty Jobsite Clipboards & Field Organizers",
        description:
          "Keep change orders, delivery tickets, and field sign-offs protected in your truck.",
        url: buildAmazonSearchLink("heavy duty aluminum contractor storage clipboard"),
      },
    ];
  }

  if (context === "lien_office") {
    return [
      {
        badge: "Lien & Waiver Paperwork",
        label: "High-Speed Duplex Document Scanners",
        description:
          "Digitize signed conditional lien waivers, delivery receipts, and Certified Mail green cards into searchable PDFs.",
        url: buildAmazonSearchLink("compact duplex document scanner office"),
      },
      {
        badge: "Certified Mail Prep",
        label: "Security-Tint #10 Envelopes & Office Stamps",
        description:
          "Stock up on security envelopes, pre-inked date/copy stamps, and mailing supplies for pre-lien demand letters.",
        url: buildAmazonSearchLink("security tint envelopes and pre inked office stamps"),
      },
      {
        badge: "Contractor Reference",
        label: "Construction Estimating & Markup Reference Books",
        description:
          "Sharpen overhead recovery, job costing, and commercial contract protection strategies.",
        url: buildAmazonSearchLink("construction estimating markup and profit books"),
      },
    ];
  }

  return [
    {
      badge: "Estimating & Pricing",
      label: "Construction Estimating & Contractor Business Books",
      description:
        "Master labor burden, overhead recovery, and net gross margin formulas for specialty trades.",
      url: buildAmazonSearchLink("construction estimating markup and profit books"),
    },
    {
      badge: "Jobsite Measuring",
      label: "Laser Distance Measurers & Digital Takeoff Tools",
      description:
        "Capture accurate commercial jobsite dimensions quickly without a second set of hands.",
      url: buildAmazonSearchLink("bluetooth laser distance measurer contractor"),
    },
    {
      badge: "Field Operations",
      label: "Rugged Jobsite Tablets, Cases & Storage Clipboards",
      description:
        "Durable mobile field gear built for estimators, foremen, and specialty trade owners.",
      url: buildAmazonSearchLink("rugged contractor storage clipboard and field gear"),
    },
  ];
}
