export interface TradeProfile {
  slug: string;
  tradeName: string;
  shortName: string;
  defaultHourlyWage: number;
  defaultBurdenPercent: number;
  defaultOverheadPercent: number;
  defaultMarginPercent: number;
  workersCompRange: string;
  typicalBurdenNote: string;
  commonMaterials: string;
  commonEquipment: string;
  faqQuestion: string;
  faqAnswer: string;
}

export const TRADE_PROFILES: Record<string, TradeProfile> = {
  electrical: {
    slug: "electrical",
    tradeName: "Electrical Subcontractor",
    shortName: "Electrical",
    defaultHourlyWage: 42,
    defaultBurdenPercent: 26,
    defaultOverheadPercent: 18,
    defaultMarginPercent: 22,
    workersCompRange: "4.5% – 8.0%",
    typicalBurdenNote:
      "Electrical contractors carry lower workers' comp class codes than structural trades, but high licensing, continuing education, fleet, and copper volatility risks.",
    commonMaterials: "EMT/PVC conduit, THHN wire, panels, breakers, lighting fixtures, junction boxes",
    commonEquipment: "Scissor lifts, trenchers, cable pullers, core drills, testing meters",
    faqQuestion: "What is a healthy gross profit margin for an electrical subcontractor?",
    faqAnswer:
      "Most commercial electrical subcontractors target a 20% to 28% gross profit margin after accounting for a 24%–28% labor burden rate and 15%–20% company overhead."
  },
  plumbing: {
    slug: "plumbing",
    tradeName: "Plumbing & Piping Subcontractor",
    shortName: "Plumbing",
    defaultHourlyWage: 40,
    defaultBurdenPercent: 28,
    defaultOverheadPercent: 18,
    defaultMarginPercent: 22,
    workersCompRange: "5.5% – 9.5%",
    typicalBurdenNote:
      "Plumbing labor burden includes FICA, SUTA, moderate workers' compensation, and specialized service truck/tool allowances.",
    commonMaterials: "PEX/copper/PVC piping, cast iron fittings, valves, water heaters, fixtures",
    commonEquipment: "Mini-excavators, press tools, hydro-jetters, inspection cameras, trench shoring",
    faqQuestion: "How should plumbing subcontractors calculate labor burden?",
    faqAnswer:
      "Combine employer FICA (7.65%), state/federal unemployment (2%–5%), plumbing workers' comp (5.5%–9.5%), and paid holidays/benefits—typically resulting in a 26% to 32% burden multiplier on base wages."
  },
  hvac: {
    slug: "hvac",
    tradeName: "HVAC & Mechanical Subcontractor",
    shortName: "HVAC",
    defaultHourlyWage: 39,
    defaultBurdenPercent: 28,
    defaultOverheadPercent: 20,
    defaultMarginPercent: 24,
    workersCompRange: "6.0% – 10.5%",
    typicalBurdenNote:
      "HVAC contractors face elevated overhead from service fleets, EPA refrigerant compliance, sheet metal shop fabrication, and warranty callbacks.",
    commonMaterials: "RTUs, split systems, sheet metal ductwork, refrigerant lines, thermostats, dampers",
    commonEquipment: "Cranes/rigging, vacuum pumps, recovery machines, scissor lifts, duct lifts",
    faqQuestion: "Why do HVAC subcontractors frequently underbid commercial change-outs?",
    faqAnswer:
      "Many HVAC bids omit crane rigging hours, start-up/commissioning labor, and a 18%–22% overhead allocation needed to cover service vehicles and warranty reserve."
  },
  concrete: {
    slug: "concrete",
    tradeName: "Concrete, Curb & Flatwork Subcontractor",
    shortName: "Concrete & Curb",
    defaultHourlyWage: 34,
    defaultBurdenPercent: 34,
    defaultOverheadPercent: 16,
    defaultMarginPercent: 20,
    workersCompRange: "10.0% – 16.5%",
    typicalBurdenNote:
      "Concrete and curb finishing carry high workers' compensation rates, weather-delay non-productive hours, and heavy equipment maintenance overhead.",
    commonMaterials: "Ready-mix concrete (CY), rebar, wire mesh, expansion joints, curing compound, form lumber",
    commonEquipment: "Curb machines, skid steers, laser screeds, power trowels, concrete saws, vibratory plates",
    faqQuestion: "What labor burden rate should concrete and curb contractors use?",
    faqAnswer:
      "Because concrete workers' comp classifications often exceed 10%–15% and weather rainouts reduce billable hours, most profitable concrete subs apply a 32% to 38% labor burden rate."
  },
  roofing: {
    slug: "roofing",
    tradeName: "Commercial & Residential Roofing Subcontractor",
    shortName: "Roofing",
    defaultHourlyWage: 32,
    defaultBurdenPercent: 42,
    defaultOverheadPercent: 18,
    defaultMarginPercent: 25,
    workersCompRange: "18.0% – 28.0%",
    typicalBurdenNote:
      "Roofing carries one of the highest workers' compensation class rates in construction, making strict burden calculation essential to avoid losing money on every square.",
    commonMaterials: "TPO/EPDM membrane, architectural shingles, ISO board insulation, flashing, fasteners, adhesives",
    commonEquipment: "Telehandlers, kettles/welders, safety fall-arrest systems, dump trailers, hoists",
    faqQuestion: "Why is roofing labor burden higher than almost any other trade?",
    faqAnswer:
      "Roofing workers' compensation premiums frequently run 18% to 28% of gross payroll. Combined with FICA (7.65%) and SUTA, total roofing labor burden commonly reaches 38% to 45%."
  },
  drywall: {
    slug: "drywall",
    tradeName: "Drywall, Metal Framing & Acoustical Subcontractor",
    shortName: "Drywall & Framing",
    defaultHourlyWage: 33,
    defaultBurdenPercent: 31,
    defaultOverheadPercent: 15,
    defaultMarginPercent: 20,
    workersCompRange: "8.5% – 13.0%",
    typicalBurdenNote:
      "Drywall and metal stud framing require tight production-rate estimating across hanging, taping/finishing, and scrap waste factors (typically 8%–12%).",
    commonMaterials: "5/8\" Type X gypsum board, 20ga/18ga metal studs, track, joint compound, tape, corner bead",
    commonEquipment: "Scissor lifts, drywall lifts, bazookas/taping tools, laser levels, scaffolding",
    faqQuestion: "How much waste factor should drywall subcontractors include in material bids?",
    faqAnswer:
      "Commercial drywall bids typically include an 8% to 12% material waste factor for soffits, window/door cutouts, and damaged sheets, plus a 28%–33% labor burden rate."
  },
  painting: {
    slug: "painting",
    tradeName: "Commercial Painting & Coatings Subcontractor",
    shortName: "Painting",
    defaultHourlyWage: 30,
    defaultBurdenPercent: 27,
    defaultOverheadPercent: 15,
    defaultMarginPercent: 25,
    workersCompRange: "6.5% – 10.5%",
    typicalBurdenNote:
      "Painting is heavily labor-driven (often 65%–75% of total job cost), meaning even a 5% error in labor burden wipes out net profit.",
    commonMaterials: "Primer, elastomeric/acrylic coatings, epoxies, caulk, masking tape, plastic sheeting, sundries",
    commonEquipment: "Boom lifts, airless sprayers, pressure washers, scaffolding, HEPA sanders",
    faqQuestion: "What markup vs. margin should commercial painters use?",
    faqAnswer:
      "Because labor makes up the majority of painting costs, painters should target a 25% to 30% true gross margin (which equals a 33.3% to 42.8% markup on break-even cost)."
  },
  excavation: {
    slug: "excavation",
    tradeName: "Excavation, Grading & Utility Subcontractor",
    shortName: "Excavation & Grading",
    defaultHourlyWage: 36,
    defaultBurdenPercent: 32,
    defaultOverheadPercent: 22,
    defaultMarginPercent: 22,
    workersCompRange: "8.0% – 13.5%",
    typicalBurdenNote:
      "Sitework contractors carry heavy yellow-iron depreciation, fuel surcharges, mobilization fees, and underground utility insurance overhead.",
    commonMaterials: "Crushed stone/aggregate, geotextile fabric, HDPE/RCP storm pipe, silt fence, bedding sand",
    commonEquipment: "Excavators, bulldozers, skid steers, dump trucks, GPS grade control, trench boxes",
    faqQuestion: "How do excavation subcontractors recover heavy equipment overhead?",
    faqAnswer:
      "Bill owned machinery as a direct equipment line item at internal hourly/daily ownership rates rather than burying machine payments inside general company overhead."
  },
  masonry: {
    slug: "masonry",
    tradeName: "Masonry, Brick & CMU Block Subcontractor",
    shortName: "Masonry",
    defaultHourlyWage: 35,
    defaultBurdenPercent: 33,
    defaultOverheadPercent: 16,
    defaultMarginPercent: 20,
    workersCompRange: "9.5% – 14.5%",
    typicalBurdenNote:
      "Masonry bids require balancing skilled mason rates with tender/laborer ratios, scaffold mobilization, and mortar/grout waste.",
    commonMaterials: "CMU block, face brick, Type S/N mortar, grout, vertical/horizontal rebar, wall ties, flashing",
    commonEquipment: "Mast climbers, pipe scaffolding, rough-terrain forklifts, mortar mixers, wet masonry saws",
    faqQuestion: "What is a standard labor burden rate for masonry subcontractors?",
    faqAnswer:
      "Masonry workers' compensation rates typically range from 9.5% to 14.5%, putting total employer labor burden between 30% and 36% above base hourly pay."
  },
  flooring: {
    slug: "flooring",
    tradeName: "Commercial Flooring & Tile Subcontractor",
    shortName: "Flooring & Tile",
    defaultHourlyWage: 32,
    defaultBurdenPercent: 27,
    defaultOverheadPercent: 15,
    defaultMarginPercent: 22,
    workersCompRange: "6.0% – 9.5%",
    typicalBurdenNote:
      "Flooring bids must account for substrate moisture mitigation, self-leveling underlayment, attic stock requirements, and pattern waste.",
    commonMaterials: "LVT/VCT, carpet tile, porcelain tile, thinset, grout, self-leveler, transitions, adhesives",
    commonEquipment: "Concrete grinders, HEPA dust extractors, floor strippers, wet tile saws, moisture meters",
    faqQuestion: "How much extra material should commercial flooring bids include?",
    faqAnswer:
      "Include 5%–7% waste for carpet tile/LVT, 10%–15% for diagonal or herringbone tile layouts, plus any contract-mandated 2%–5% owner attic stock."
  },
  "fire-protection": {
    slug: "fire-protection",
    tradeName: "Fire Sprinkler & Suppression Subcontractor",
    shortName: "Fire Protection",
    defaultHourlyWage: 43,
    defaultBurdenPercent: 29,
    defaultOverheadPercent: 19,
    defaultMarginPercent: 24,
    workersCompRange: "6.5% – 10.0%",
    typicalBurdenNote:
      "Fire protection bids require NICET engineering/shop drawings, hydraulic calculations, Fire Marshal permitting, and hydrostatic testing labor.",
    commonMaterials: "Schedule 10/40 black steel pipe, CPVC pipe, sprinkler heads, grooved couplings, backflow preventers",
    commonEquipment: "Scissor lifts, pipe threaders/groovers, hydrostatic test pumps, BIM/CAD design stations",
    faqQuestion: "What overhead items do fire sprinkler contractors often overlook?",
    faqAnswer:
      "Hydraulic engineering submittals, Fire Marshal plan review fees, and post-installation hydrostatic inspection labor must be itemized or recovered via a 18%–22% overhead rate."
  },
  landscaping: {
    slug: "landscaping",
    tradeName: "Commercial Landscaping & Hardscape Subcontractor",
    shortName: "Landscaping & Hardscape",
    defaultHourlyWage: 28,
    defaultBurdenPercent: 29,
    defaultOverheadPercent: 17,
    defaultMarginPercent: 24,
    workersCompRange: "7.0% – 11.5%",
    typicalBurdenNote:
      "Commercial landscape and retaining-wall subs face seasonal crew turnover, nursery plant warranty replacements, and truck/trailer fleet overhead.",
    commonMaterials: "Segmental retaining wall block, pavers, topsoil, mulch, sod, trees/shrubs, irrigation PVC/valves",
    commonEquipment: "Compact track loaders, trenchers, plate compactors, sod cutters, dump trucks",
    faqQuestion: "How should commercial landscapers price plant warranty risk?",
    faqAnswer:
      "Include a 5%–10% plant material contingency or target a 24%–28% gross margin to absorb one-year establishment warranty replacements without eroding profit."
  }
};
