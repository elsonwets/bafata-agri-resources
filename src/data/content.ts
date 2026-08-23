import { site } from "./site";

/**
 * All page copy. Written for two readers at once: a procurement manager
 * scanning for specs and terms, and an answer engine extracting a direct
 * response. Headings are phrased as the questions buyers actually type.
 *
 * NOTE ON HEADINGS: every `heading` array is one visual line per entry, and
 * each line animates up behind its own mask. If a line is long enough to
 * wrap, the mask reveals half a line and the effect breaks — so keep lines
 * short, or check them against `.type-h2` in globals.css after editing.
 */

export const seo = {
  title: "Raw Cashew Nuts from Guinea-Bissau | Bafata Agri Resources",
  description:
    "Bafata Agri Resources sources, inspects and exports raw cashew nuts (RCN) from Guinea-Bissau. Verified sellers, full export documentation, delivery to your port. Talk to us about the 2027 campaign.",
  keywords: [
    "raw cashew nuts Guinea-Bissau",
    "RCN exporter Guinea-Bissau",
    "buy raw cashew nuts Bissau",
    "Guinea-Bissau cashew export",
    "cashew nut supplier West Africa",
    "RCN outturn KOR moisture",
    "cashew campaign 2027",
    "Bafata Agri Resources",
  ],
  ogAlt:
    "Raw cashew nut bags being loaded at the Port of Bissau, Guinea-Bissau",
} as const;

export const hero = {
  eyebrow: "Bissau · Guinea-Bissau",
  headline: ["Raw cashew.", "From Bissau", "to the world."],
  lead: "Bafata Agri Resources connects international buyers to Guinea-Bissau's raw cashew nut supply — and manages the sourcing, the inspection, the paperwork and the shipping until the container reaches your port.",
  primaryCta: "Start a buying request",
  secondaryCta: "Talk to us on WhatsApp",
  meta: [
    { k: "Coordinates", v: "11°51′N · 15°35′W" },
    { k: "Base", v: "Bissau, Guinea-Bissau" },
    { k: "Next campaign", v: `${site.campaign.opensMonth} ${site.campaign.year}` },
  ],
  scrollHint: "Scroll to follow the nut",
} as const;

export const origin = {
  eyebrow: "The origin",
  heading: ["One of West Africa's", "great cashew origins."],
  body: [
    "Guinea-Bissau is one of the world's largest exporters of raw cashew nuts, and cashew is the backbone of its economy. The crop grows across Bafatá, Gabú, Oio, Quinara and Cacheu — smallholder orchards feeding a harvest that opens every year in February.",
    "What the origin does not have is an easy interface. Sellers are dispersed, the paperwork is local, and the port has its own rhythm. That gap is exactly what we exist to close.",
  ],
  stats: [
    { value: "Feb → Jun", label: "Campaign window", note: "Harvest opens in February and runs to the rains" },
    { value: "46–52 lbs", label: "Typical outturn (KOR)", note: "Confirmed lot by lot before shipment" },
    { value: "8–10%", label: "Typical moisture", note: "Measured at the weighbridge, not estimated" },
    { value: "180–200", label: "Nut count per kg", note: "Graded on arrival at the warehouse" },
  ],
  disclaimer:
    "Ranges reflect what Guinea-Bissau origin typically delivers across a campaign. Every lot ships against its own analysis — never against a brochure figure.",
} as const;

export const operation = {
  eyebrow: "Why work with us",
  heading: ["You don't need", "to build this.", "We're already here."],
  body: "Buying raw cashew from a new origin usually means hiring an agent, chasing a warehouse, arguing about weights and learning a customs regime. We have spent our campaigns building that infrastructure so you can skip it.",
  capabilities: [
    { n: "01", title: "Sourcing", text: "We identify and vet sellers across the producing regions and negotiate on your behalf." },
    { n: "02", title: "Verified counterparties", text: "No anonymous middlemen. Every seller we bring you is one we have physically visited." },
    { n: "03", title: "Quality & moisture control", text: "Outturn, moisture and nut count checked before a lot enters your shipment." },
    { n: "04", title: "Certified weighing", text: "Loaded trucks pass a certified weighbridge. You get the ticket, not a promise." },
    { n: "05", title: "Warehousing", text: "Covered storage in Bissau while your lot is consolidated and prepared." },
    { n: "06", title: "Export documentation", text: "Phytosanitary, certificate of origin, customs clearance, bill of lading." },
    { n: "07", title: "Port & vessel handling", text: "Stuffing, trucking to the terminal and loading supervision at the Port of Bissau." },
    { n: "08", title: "Follow-through", text: "One contact from first enquiry to arrival at your discharge port." },
  ],
} as const;

export const journey = {
  eyebrow: "From soil to ship",
  heading: "The journey of your shipment",
  lead: "Eight stages, each one documented. This is what happens between a farmer's orchard in Bafatá and a vessel leaving the Port of Bissau.",
  steps: [
    {
      n: "01",
      title: "Source",
      sub: "Producing regions",
      text: "We buy at the market and at the farm gate across Bafatá, Gabú, Oio and Quinara — where the crop actually comes from.",
      photo: "bissau-street-pickup-3",
    },
    {
      n: "02",
      title: "Collect",
      sub: "Bagging & aggregation",
      text: "Nuts are bagged in jute at 80 kg net and aggregated into lots large enough to move economically.",
      photo: "warehouse-carry-bag",
    },
    {
      n: "03",
      title: "Control",
      sub: "Grading & moisture",
      text: "Each lot is cut-tested for outturn, checked for moisture and counted per kilo before it is accepted.",
      photo: "warehouse-stack-crew",
    },
    {
      n: "04",
      title: "Weigh",
      sub: "Certified weighbridge",
      text: "Every loaded truck is weighed on a certified bridge. Gross, tare and net go on a ticket that travels with the lot.",
      photo: "weighbridge-weighing",
    },
    {
      n: "05",
      title: "Store",
      sub: "Bissau warehouse",
      text: "Covered, ventilated storage keeps moisture stable while your shipment is consolidated.",
      photo: "warehouse-bulk-store",
    },
    {
      n: "06",
      title: "Document",
      sub: "Export file",
      text: "Phytosanitary certificate, certificate of origin, customs declaration, invoice, packing list, bill of lading.",
      photo: "weighbridge-ticket",
    },
    {
      n: "07",
      title: "Move",
      sub: "Trucking to the port",
      text: "Tarped convoys run from the warehouse to the terminal, tracked from departure to gate-in.",
      photo: "truck-tarped-load",
    },
    {
      n: "08",
      title: "Load",
      sub: "Port of Bissau",
      text: "Slinging, crane operation and stowage supervised on the quay until the hold is closed.",
      photo: "vessel-hold-loaded",
    },
  ],
} as const;

/**
 * The section modelled on the reference film at 06s–09s: a scrolling wall of
 * field photography that resolves into a precision weighing console.
 */
export const quality = {
  eyebrow: "Quality & moisture",
  heading: ["Quality starts", "before the shipment."],
  lead: "The best lot in Guinea-Bissau is worth nothing to you if it is weighed loosely or dried carelessly. We measure first and ship second.",
  console: {
    label: "Precision weighing",
    badge: "Quality assured",
    unit: "kg",
    target: 98.69,
    caption: "Certified weighbridge · Bissau",
  },
  table: {
    head: ["Parameter", "Target", "Market", "Our lots"],
    rows: [
      { param: "Outturn (KOR)", target: "≥ 48 lbs", market: "44–48 lbs", ours: "46–52 lbs" },
      { param: "Moisture", target: "≤ 10%", market: "10–14%", ours: "8–10%" },
      { param: "Nut count / kg", target: "≤ 200", market: "195–215", ours: "180–200" },
      { param: "Defective nuts", target: "≤ 10%", market: "10–15%", ours: "6–10%" },
      { param: "Foreign matter", target: "≤ 1%", market: "1–3%", ours: "< 1%" },
    ],
  },
  points: [
    { title: "Measured, not estimated", text: "Moisture meters and cut tests on every lot — results recorded before acceptance." },
    { title: "Weighed on a certified bridge", text: "Gross, tare and net on an official ticket that travels with your shipment." },
    { title: "Stored dry", text: "Covered, ventilated warehousing so moisture does not climb between purchase and stuffing." },
    { title: "Documented per lot", text: "You receive the analysis for the nuts you are actually buying." },
  ],
  claim:
    "Our objective every campaign is simple: the best quality and the lowest moisture available on the Guinea-Bissau market.",
} as const;

export const paperwork = {
  eyebrow: "Documentation",
  heading: ["Local complexity.", "One point of contact."],
  body: "Exporting from Guinea-Bissau touches several administrations, each with its own timing. We hold the file, chase the signatures and send you the documents as they are issued — so nothing is discovered at the last minute.",
  docs: [
    { title: "Export licence", text: "Registration and campaign authorisation with the competent authority." },
    { title: "Phytosanitary certificate", text: "Plant health inspection and certification for the destination country." },
    { title: "Certificate of origin", text: "Chamber of Commerce certification of Guinea-Bissau origin." },
    { title: "Customs declaration", text: "Declaration, duties and clearance handled by our licensed broker." },
    { title: "Quality analysis", text: "Outturn, moisture and defect report attached to your lot." },
    { title: "Weighbridge tickets", text: "Certified gross / tare / net for every truck in your shipment." },
    { title: "Commercial invoice & packing list", text: "Issued to match your L/C or contract wording exactly." },
    { title: "Bill of lading", text: "Issued after loading and released per your agreed payment terms." },
  ],
  note: "We send the full document set as a single, indexed file. If your bank or your customs broker needs a specific wording, tell us before loading and we build the file around it.",
} as const;

export const markets = {
  eyebrow: "Destinations",
  heading: ["From Bissau", "to global markets."],
  body: "Guinea-Bissau's raw cashew feeds the world's processing hubs. We ship from the Port of Bissau to the destinations our buyers actually work in, on the Incoterm you prefer.",
  incoterms: ["FOB Bissau", "CFR", "CIF", "FAS"],
  routes: [
    { city: "Mumbai / Tuticorin", country: "India", lat: 19.08, lng: 72.88 },
    { city: "Ho Chi Minh City", country: "Vietnam", lat: 10.82, lng: 106.63 },
    { city: "Jebel Ali", country: "UAE", lat: 25.01, lng: 55.06 },
    { city: "Singapore", country: "Singapore", lat: 1.29, lng: 103.85 },
    { city: "Rotterdam", country: "Netherlands", lat: 51.92, lng: 4.48 },
    { city: "Istanbul", country: "Türkiye", lat: 41.01, lng: 28.98 },
  ],
  origin: { city: "Bissau", country: "Guinea-Bissau", lat: 11.86, lng: -15.6 },
} as const;

export const pillars = {
  eyebrow: "What you get",
  heading: "Four reasons buyers stay with us",
  items: [
    {
      n: "01",
      title: "Local presence",
      text: "We are based in Bissau all year, not flown in for the campaign. We know the sellers, the warehouses and the port staff by name.",
      photo: "bissau-founder-monument",
    },
    {
      n: "02",
      title: "One operational partner",
      text: "Sourcing, quality, weighing, documents, trucking and loading run through a single team — so nobody can point at somebody else.",
      photo: "team-fleet-portrait",
    },
    {
      n: "03",
      title: "Transparency",
      text: "Weighbridge tickets, analysis reports and photographs of your actual lot. You see what you are buying before it sails.",
      photo: "weighbridge-second-pass",
    },
    {
      n: "04",
      title: "International mindset",
      text: "We work to your contract, your Incoterm and your bank's document wording. We speak your process, not just ours.",
      photo: "port-dual-cranes",
    },
  ],
} as const;

export const howToBuy = {
  eyebrow: "How it works",
  heading: "How to buy with us",
  lead: "Six steps from first message to arrival. Most buyers get to a firm offer within 48 hours.",
  steps: [
    { n: "01", title: "Tell us what you need", text: "Volume in MT, destination port, Incoterm, target specification and shipment window." },
    { n: "02", title: "Receive our offer", text: "A firm price with the specification we commit to, plus the document list you will receive." },
    { n: "03", title: "Contract", text: "We sign your contract or issue ours, and agree payment terms — L/C, CAD or a structure that suits both sides." },
    { n: "04", title: "Sourcing & control", text: "We buy, grade and weigh your lot, and send you the analysis and photographs as it builds." },
    { n: "05", title: "Documentation", text: "The full export file is assembled and shared before the vessel sails — no surprises at your bank." },
    { n: "06", title: "Loading & follow-up", text: "Stuffing and loading are supervised on the quay, and we stay with you until discharge." },
  ],
} as const;

/** FAQ block — also emitted as FAQPage JSON-LD for AI answer engines. */
export const faqs = [
  {
    q: "What does Bafata Agri Resources do?",
    a: "Bafata Agri Resources, SARL is a raw cashew nut (RCN) export company based in Bissau, Guinea-Bissau. We help international buyers find verified cashew sellers, control quality and moisture, handle the complete export documentation, and ship to the buyer's destination port — staying with the client until the shipment is delivered and accepted.",
  },
  {
    q: "When does the Guinea-Bissau cashew campaign start?",
    a: `Guinea-Bissau's raw cashew campaign opens in February and runs until the rains, usually through June. The ${site.campaign.year} campaign starts in ${site.campaign.opensMonth} ${site.campaign.year}, and buyers who position early get the better lots and the better freight.`,
  },
  {
    q: "What quality of raw cashew nuts does Guinea-Bissau produce?",
    a: "Guinea-Bissau RCN typically delivers an outturn (KOR) of 46 to 52 lbs, moisture of 8 to 10%, a nut count of 180 to 200 per kilogram and defects under 10%. Every lot we ship is cut-tested and moisture-checked, and the analysis travels with the shipment.",
  },
  {
    q: "Which export documents do you provide?",
    a: "Export licence, phytosanitary certificate, certificate of origin, customs declaration, quality analysis report, certified weighbridge tickets, commercial invoice, packing list and bill of lading. We assemble the set as one indexed file and can match your bank's or broker's required wording.",
  },
  {
    q: "Which Incoterms do you work on?",
    a: "We ship FOB Bissau, FAS, CFR and CIF to the destination ports our buyers work in — including India, Vietnam, the UAE, Singapore, Türkiye and Northern Europe.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "We work in full container loads and vessel parcels. Tell us your target volume in metric tonnes and your destination port, and we will confirm what is workable for your shipment window.",
  },
  {
    q: "How do I start?",
    a: `Send us a message on WhatsApp at ${site.phoneDisplay} or submit a buying request on this page with your volume, destination port and Incoterm. We usually come back with a firm offer within 48 hours.`,
  },
] as const;

export const cta = {
  eyebrow: `Campaign ${site.campaign.year}`,
  heading: ["Looking for raw cashew nuts", "from Guinea-Bissau?"],
  body: `The ${site.campaign.year} campaign opens in ${site.campaign.opensMonth}. Buyers who talk to us now secure allocation, agree specification and lock freight before the origin gets busy. Send us a message — we answer personally.`,
  primary: "Send a buying request",
  secondary: "WhatsApp us now",
  form: {
    title: "Buying request",
    subtitle: "We reply within one business day.",
    fields: {
      name: "Full name",
      company: "Company",
      email: "Email",
      country: "Destination country",
      volume: "Volume required (MT)",
      port: "Destination port",
      incoterm: "Incoterm",
      window: "Shipment window",
      message: "Anything else we should know",
    },
    submit: "Send my buying request",
    note: "Submitting opens WhatsApp with your request pre-filled, so it reaches us instantly.",
  },
} as const;

export const footer = {
  address: ["Bissau", "Guinea-Bissau", "West Africa"],
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "Origin", href: "#origin" },
        { label: "Operation", href: "#operation" },
        { label: "Journey", href: "#journey" },
        { label: "Quality", href: "#quality" },
        { label: "Markets", href: "#markets" },
        { label: "Gallery", href: "#gallery" },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} ${site.name}. Raw cashew nut exports, Guinea-Bissau.`,
} as const;
