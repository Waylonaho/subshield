export interface StateLienRule {
  name: string;
  code: string;
  preliminaryNoticeDays: number | null; // null if not strictly mandated
  noticeTrigger: 'first_furnishing' | 'last_furnishing' | 'invoice_date' | 'none';
  lienFilingDays: number;
  lienTrigger: 'last_furnishing' | 'completion';
  statutoryNoticeName: string;
  notes: string;
}

export const STATE_LIEN_RULES: Record<string, StateLienRule> = {
  AL: {
    name: 'Alabama',
    code: 'AL',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120, // 4 months for subcontractors
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to Claim Lien (§ 35-11-218)',
    notes: 'Subcontractors must deliver formal written notice to owner prior to filing.'
  },
  AK: {
    name: 'Alaska',
    code: 'AK',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Right to Lien (AS 34.35.064)',
    notes: 'Optional but preserves priority against Notice of Completion recordings.'
  },
  AZ: {
    name: 'Arizona',
    code: 'AZ',
    preliminaryNoticeDays: 20,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'completion',
    statutoryNoticeName: '20-Day Preliminary Notice (A.R.S. § 33-992.01)',
    notes: 'Mandatory within 20 days of first furnishing to preserve complete lien rights.'
  },
  AR: {
    name: 'Arkansas',
    code: 'AR',
    preliminaryNoticeDays: 75,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Commercial Pre-Lien Notice (Ark. Code § 18-44-115)',
    notes: 'Subcontractors must serve notice to owner prior to or within 75 days.'
  },
  CA: {
    name: 'California',
    code: 'CA',
    preliminaryNoticeDays: 20,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: '20-Day Preliminary Notice (Civil Code § 8200)',
    notes: 'Notice must be served within 20 days of first furnishing labor or materials.'
  },
  CO: {
    name: 'Colorado',
    code: 'CO',
    preliminaryNoticeDays: 10,
    noticeTrigger: 'invoice_date',
    lienFilingDays: 120, // 4 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to File Lien (C.R.S. § 38-22-109)',
    notes: 'Must serve Notice of Intent at least 10 days before recording lien.'
  },
  CT: {
    name: 'Connecticut',
    code: 'CT',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to Claim Lien (Conn. Gen. Stat. § 49-34)',
    notes: 'Must be served on property owner within 90 days after ceasing labor.'
  },
  DE: {
    name: 'Delaware',
    code: 'DE',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Statement of Claim for Mechanics Lien (25 Del. C. § 2711)',
    notes: 'Subcontractors must file Statement of Claim within 120 days of completion.'
  },
  DC: {
    name: 'District of Columbia',
    code: 'DC',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'completion',
    statutoryNoticeName: 'Notice of Mechanics Lien (D.C. Code § 40-301.02)',
    notes: 'Must file and serve on owner within 90 days of project completion.'
  },
  FL: {
    name: 'Florida',
    code: 'FL',
    preliminaryNoticeDays: 45,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice to Owner (NTO) (Fla. Stat. § 713.06)',
    notes: 'Must be served within 45 days of first work or prior to final payment.'
  },
  GA: {
    name: 'Georgia',
    code: 'GA',
    preliminaryNoticeDays: 30,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice to Contractor (O.C.G.A. § 44-14-361.5)',
    notes: 'Required within 30 days if a Notice of Commencement is filed by owner/GC.'
  },
  HI: {
    name: 'Hawaii',
    code: 'HI',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 45,
    lienTrigger: 'completion',
    statutoryNoticeName: 'Application for Lien (HRS § 507-43)',
    notes: 'Hawaii requires a court hearing before a mechanics lien can formally attach.'
  },
  ID: {
    name: 'Idaho',
    code: 'ID',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Claim of Lien (Idaho Code § 45-507)',
    notes: 'Must be filed within 90 days of last work and served within 24 hours.'
  },
  IL: {
    name: 'Illinois',
    code: 'IL',
    preliminaryNoticeDays: 90,
    noticeTrigger: 'last_furnishing',
    lienFilingDays: 120, // 4 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: '90-Day Subcontractor Notice (770 ILCS 60/24)',
    notes: 'Notice of claim must be served on owner and lender within 90 days of completion.'
  },
  IN: {
    name: 'Indiana',
    code: 'IN',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Sworn Statement of Intent (IC 32-28-3-3)',
    notes: 'Commercial liens allow 90 days; residential is shortened to 60 days.'
  },
  IA: {
    name: 'Iowa',
    code: 'IA',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'MNLR Posting / Mechanics Notice (Iowa Code Ch. 572)',
    notes: 'Filings must be posted directly to Iowa’s Mechanics’ Notice and Lien Registry (MNLR).'
  },
  KS: {
    name: 'Kansas',
    code: 'KS',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90, // 3 months for subcontractors
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Mechanic’s Lien Statement (K.S.A. § 60-1103)',
    notes: 'Subcontractors must file within 3 months unless an extension is granted.'
  },
  KY: {
    name: 'Kentucky',
    code: 'KY',
    preliminaryNoticeDays: 75,
    noticeTrigger: 'last_furnishing',
    lienFilingDays: 180, // 6 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Preliminary Notice of Intent (KRS § 376.010)',
    notes: 'Notice must be served on owner within 75 days of last furnishing for sub claims.'
  },
  LA: {
    name: 'Louisiana',
    code: 'LA',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 60,
    lienTrigger: 'completion',
    statutoryNoticeName: 'Statement of Claim or Privilege (La. R.S. 9:4822)',
    notes: 'Rules depend on Notice of Contract; filing timeline typically 30–60 days.'
  },
  ME: {
    name: 'Maine',
    code: 'ME',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Lien Claim (10 M.R.S. § 3253)',
    notes: 'Must be preserved by filing certificate within 90 days of last work.'
  },
  MD: {
    name: 'Maryland',
    code: 'MD',
    preliminaryNoticeDays: 120,
    noticeTrigger: 'last_furnishing',
    lienFilingDays: 180,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to Claim a Lien (Md. Real Prop. § 9-104)',
    notes: 'Must give written notice to owner within 120 days of last furnishing.'
  },
  MA: {
    name: 'Massachusetts',
    code: 'MA',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Identification / Subcontract (M.G.L. c. 254 § 4)',
    notes: 'Subcontractors should record Notice of Subcontract early to protect equity.'
  },
  MI: {
    name: 'Michigan',
    code: 'MI',
    preliminaryNoticeDays: 20,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Furnishing (MCL 570.1109)',
    notes: 'Subcontractors must serve notice within 20 days of first furnishing.'
  },
  MN: {
    name: 'Minnesota',
    code: 'MN',
    preliminaryNoticeDays: 45,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Pre-Lien Notice (Minn. Stat. § 514.011)',
    notes: 'Notice must be delivered personally or by certified mail within 45 days.'
  },
  MS: {
    name: 'Mississippi',
    code: 'MS',
    preliminaryNoticeDays: 30,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Pre-Lien Notice to Owner (Miss. Code § 85-7-405)',
    notes: 'Subcontractors must provide notice to owner if GC has not filed Commencement.'
  },
  MO: {
    name: 'Missouri',
    code: 'MO',
    preliminaryNoticeDays: 10,
    noticeTrigger: 'invoice_date',
    lienFilingDays: 180, // 6 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to File Lien (Mo. Rev. Stat. § 429.100)',
    notes: 'Subcontractors must provide 10 days notice to owner prior to filing.'
  },
  MT: {
    name: 'Montana',
    code: 'MT',
    preliminaryNoticeDays: 20,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Right to Claim Lien (MCA 71-3-531)',
    notes: 'Must be filed/served within 20 days of first furnishing labor or materials.'
  },
  NE: {
    name: 'Nebraska',
    code: 'NE',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Commencement of Lien (Neb. Rev. Stat. § 52-137)',
    notes: 'Lien statement must be recorded within 120 days after last furnishing.'
  },
  NV: {
    name: 'Nevada',
    code: 'NV',
    preliminaryNoticeDays: 31,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Right to Lien (NRS 108.245)',
    notes: 'Must be delivered to owner and prime within 31 days of first work.'
  },
  NH: {
    name: 'New Hampshire',
    code: 'NH',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to Claim Lien (RSA 447:5)',
    notes: 'Subcontractors must notify owner in writing to capture unpaid retainage.'
  },
  NJ: {
    name: 'New Jersey',
    code: 'NJ',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Construction Lien Claim (N.J.S.A. 2A:44A-6)',
    notes: 'Commercial liens must be filed within 90 days. Residential requires NUB filing.'
  },
  NM: {
    name: 'New Mexico',
    code: 'NM',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'completion',
    statutoryNoticeName: 'Claim of Lien (NMSA § 48-2-6)',
    notes: 'Subcontractors have 90 days from project completion to record.'
  },
  NY: {
    name: 'New York',
    code: 'NY',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 240, // 8 months commercial
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: "Notice of Mechanic's Lien (Lien Law § 9)",
    notes: 'Commercial liens allow 8 months from last furnishing; 4 months for single-family.'
  },
  NC: {
    name: 'North Carolina',
    code: 'NC',
    preliminaryNoticeDays: 15,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice to Lien Agent (G.S. 44A-11.2)',
    notes: 'Must notify Lien Agent within 15 days of first work to protect priority.'
  },
  ND: {
    name: 'North Dakota',
    code: 'ND',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intent to File Lien (N.D.C.C. § 35-27-02)',
    notes: 'Must serve written notice on owner at least 10 days before recording.'
  },
  OH: {
    name: 'Ohio',
    code: 'OH',
    preliminaryNoticeDays: 21,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 75,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Furnishing (R.C. 1311.05)',
    notes: 'Subcontractors must serve notice within 21 days if owner recorded Commencement.'
  },
  OK: {
    name: 'Oklahoma',
    code: 'OK',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Pre-Lien Notice (42 O.S. § 142.6)',
    notes: 'Required for commercial projects within 75 days of last work.'
  },
  OR: {
    name: 'Oregon',
    code: 'OR',
    preliminaryNoticeDays: 8,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 75,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Right to a Lien (ORS 87.021)',
    notes: 'Notice must be delivered to owner within 8 days of first delivery.'
  },
  PA: {
    name: 'Pennsylvania',
    code: 'PA',
    preliminaryNoticeDays: 45,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 180, // 6 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Formal Notice of Intent to Lien (49 P.S. § 1501)',
    notes: 'Must provide 30-day formal notice to owner prior to recording lien.'
  },
  RI: {
    name: 'Rhode Island',
    code: 'RI',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 200,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Intention to Claim Lien (R.I.G.L. § 34-28-4)',
    notes: 'Notice must be filed within 200 days of last work.'
  },
  SC: {
    name: 'South Carolina',
    code: 'SC',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Furnishing Labor or Materials (Title 29 Ch 5)',
    notes: 'Must file mechanics lien within 90 days of last furnishing labor or materials.'
  },
  SD: {
    name: 'South Dakota',
    code: 'SD',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Mechanic’s Lien Statement (SDCL § 44-9-15)',
    notes: 'Must be filed in county records within 120 days of ceasing labor.'
  },
  TN: {
    name: 'Tennessee',
    code: 'TN',
    preliminaryNoticeDays: 90,
    noticeTrigger: 'last_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'completion',
    statutoryNoticeName: 'Notice of Nonpayment (Tenn. Code § 66-11-145)',
    notes: 'Must deliver notice within 90 days of the end of each month unpaid.'
  },
  TX: {
    name: 'Texas',
    code: 'TX',
    preliminaryNoticeDays: 45,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Claim / Monthly Notice (Property Code § 53.056)',
    notes: 'Derivative claimants must send monthly notices to owner and prime contractor.'
  },
  UT: {
    name: 'Utah',
    code: 'UT',
    preliminaryNoticeDays: 20,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 180,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Preliminary Notice via SCR (Utah Code § 38-1a-501)',
    notes: 'Must be filed online with the State Construction Registry (SCR) within 20 days.'
  },
  VT: {
    name: 'Vermont',
    code: 'VT',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 180,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Contractor’s Lien (9 V.S.A. § 1921)',
    notes: 'Must be recorded in town clerk’s office within 180 days of payment due.'
  },
  VA: {
    name: 'Virginia',
    code: 'VA',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Memorandum of Mechanic’s Lien (Va. Code § 43-4)',
    notes: 'Must be filed within 90 days. Virginia enforces a strict 150-day lookback rule.'
  },
  WA: {
    name: 'Washington',
    code: 'WA',
    preliminaryNoticeDays: 60,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 90,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice to Owner (RCW 60.04.031)',
    notes: 'Commercial subs must give notice within 60 days of first furnishing.'
  },
  WV: {
    name: 'West Virginia',
    code: 'WV',
    preliminaryNoticeDays: null,
    noticeTrigger: 'none',
    lienFilingDays: 100,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Notice of Mechanics Lien (W. Va. Code § 38-2-7)',
    notes: 'Subcontractors have 100 days from last labor to record lien.'
  },
  WI: {
    name: 'Wisconsin',
    code: 'WI',
    preliminaryNoticeDays: 60,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 180, // 6 months
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Subcontractor’s Identification Notice (Wis. Stat. § 779.02)',
    notes: 'Must be served within 60 days of first furnishing to maintain rights.'
  },
  WY: {
    name: 'Wyoming',
    code: 'WY',
    preliminaryNoticeDays: 30,
    noticeTrigger: 'first_furnishing',
    lienFilingDays: 120,
    lienTrigger: 'last_furnishing',
    statutoryNoticeName: 'Preliminary Notice (Wyo. Stat. § 29-1-311)',
    notes: 'Subcontractors must deliver notice to prime and owner within 30 days.'
  }
};