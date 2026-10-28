import { site } from "../data/site.ts";

/**
 * English copy — the reference dictionary. `fr.ts` and `pt.ts` must match
 * its shape exactly (the `Dict` type enforces it).
 *
 * Written for two readers at once: a procurement manager scanning for specs
 * and terms, and an answer engine extracting a direct response. Headings are
 * phrased as the questions buyers actually type. Heading arrays are joined
 * into one line; `text-wrap: balance` handles the breaks.
 *
 * Facts (contacts, dates, markets) come from src/data/site.ts and must stay
 * the ones the client confirmed — never add a figure here that the client
 * has not supplied.
 */

const { year } = site.campaign;
const prep = "February";
const opening = "April";

export const en = {
  lang: "en",
  langName: "English",

  meta: {
    title: "Raw Cashew Nut Exporter in Guinea-Bissau | Bafata Agri Resources",
    description:
      "Raw cashew nut (RCN) exporter in Bissau, Guinea-Bissau: sourcing, quality and moisture control, export documents and shipment coordination to your port.",
    ogAlt: "Raw cashew nut bags being loaded at the Port of Bissau, Guinea-Bissau",
    ogLocale: "en_GB",
  },

  campaign: { prep, opening },

  ui: {
    skip: "Skip to main content",
    backToTop: "back to top",
    sections: "Sections",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    buyingRequest: "Buying request",
    language: "Language",
    home: "Home",
    guides: "Buyer guides",
    englishOnly: "",
    updated: "Updated",
  },

  nav: [
    { label: "Origin", id: "origin" },
    { label: "Operation", id: "operation" },
    { label: "Journey", id: "journey" },
    { label: "Quality", id: "quality" },
    { label: "Markets", id: "markets" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ],

  hero: {
    pill: `${year} campaign: preparation opens in ${prep}`,
    headline: ["Raw cashew nuts", "from Guinea-Bissau."],
    /** Entity-first: the sentence an answer engine should lift verbatim. */
    lead: "Bafata Agri Resources is a raw cashew nut exporter based in Bissau, Guinea-Bissau. We source, inspect, document and ship RCN for international buyers — from the producing regions to the vessel at the Port of Bissau.",
    primaryCta: "Start a buying request",
    secondaryCta: "Talk to us on WhatsApp",
    meta: [
      { k: "Coordinates", v: "11°51′N · 15°35′W" },
      { k: "Base", v: "Bissau, Guinea-Bissau" },
      { k: "Campaign opening", v: `${opening} ${year}` },
    ],
  },

  origin: {
    heading: ["Raw cashew nut sourcing", "in Guinea-Bissau"],
    body: [
      "Guinea-Bissau is one of the world's largest exporters of raw cashew nuts, and cashew is the backbone of its economy. The crop comes from smallholder orchards across Bafatá, Gabú, Oio, Quinara and Cacheu, and the official campaign opens each year once the government sets the reference price.",
      "What the origin does not have is an easy interface. Sellers are dispersed, the paperwork is local, and the port has its own rhythm. That gap is exactly what we exist to close.",
    ],
    stats: [
      { value: `${opening} ${year}`, label: "Official campaign opening", note: `Preparation and volume reservation open in ${prep}` },
      { value: "46–52 lbs", label: "Typical outturn (KOR)", note: "Confirmed lot by lot before shipment" },
      { value: "8–10%", label: "Typical moisture", note: "Measured at the weighbridge, not estimated" },
      { value: "180–200", label: "Nut count per kg", note: "Graded on arrival at the warehouse" },
    ],
    disclaimer:
      "Ranges reflect what Guinea-Bissau origin typically delivers across a campaign. Every lot ships against its own analysis — never against a brochure figure.",
    mapAlt: (regions: string) =>
      `Map of Guinea-Bissau. Bissau is marked on the Atlantic coast; the highlighted raw cashew sourcing regions are ${regions}.`,
    mapLegend: "Regions we buy in",
    boundaries: "Boundaries",
  },

  operation: {
    heading: ["A local export partner", "for international cashew buyers"],
    body: "Buying raw cashew from a new origin usually means hiring an agent, chasing a warehouse, arguing about weights and learning a customs regime. We have spent our campaigns building that infrastructure so you can skip it.",
    capabilities: [
      { title: "Sourcing", text: "We identify and vet sellers across the producing regions and negotiate on your behalf." },
      { title: "Verified counterparties", text: "No anonymous middlemen. Every seller we bring you is one we have physically visited." },
      { title: "Quality & moisture control", text: "Outturn, moisture and nut count checked before a lot enters your shipment." },
      { title: "Certified weighing", text: "Loaded trucks pass a certified weighbridge. You get the ticket, not a promise." },
      { title: "Warehousing", text: "Covered storage while your lot is consolidated and prepared." },
      { title: "Export documentation", text: "Phytosanitary, certificate of origin, customs clearance, bill of lading." },
      { title: "Port & vessel handling", text: "Stuffing, trucking to the terminal and loading supervision at the Port of Bissau." },
      { title: "Follow-through", text: "One contact from first enquiry to arrival at your discharge port." },
    ],
  },

  journey: {
    heading: "From cashew sourcing to export shipment",
    lead: "Eight stages, each one documented. This is what happens between a farmer's orchard in Bafatá and a vessel leaving the Port of Bissau.",
    stage: (n: number, total: number) => `Stage ${n} of ${total}`,
    steps: [
      { title: "Source", sub: "Producing regions", text: "We buy at the market and at the farm gate across Bafatá, Gabú, Oio and Quinara — where the crop actually comes from.", photo: "bissau-street-pickup-3" },
      { title: "Collect", sub: "Bagging & aggregation", text: "Nuts are bagged in jute at 80 kg net and aggregated into lots large enough to move economically.", photo: "warehouse-carry-bag" },
      { title: "Control", sub: "Grading & moisture", text: "Each lot is cut-tested for outturn, checked for moisture and counted per kilo before it is accepted.", photo: "warehouse-stack-crew" },
      { title: "Weigh", sub: "Certified weighbridge", text: "Every loaded truck is weighed on a certified bridge. Gross, tare and net go on a ticket that travels with the lot.", photo: "weighbridge-weighing" },
      { title: "Store", sub: "Warehouse", text: "Covered, ventilated storage keeps moisture stable while your shipment is consolidated.", photo: "warehouse-bulk-store" },
      { title: "Document", sub: "Export file", text: "Phytosanitary certificate, certificate of origin, customs declaration, invoice, packing list, bill of lading.", photo: "weighbridge-ticket" },
      { title: "Move", sub: "Trucking to the port", text: "Tarped convoys run from the warehouse to the terminal, tracked from departure to gate-in.", photo: "truck-tarped-load" },
      { title: "Load", sub: "Port of Bissau", text: "Slinging, crane operation and stowage supervised on the quay until the hold is closed.", photo: "vessel-hold-loaded" },
    ],
  },

  quality: {
    heading: ["Raw cashew quality control", "before shipment"],
    lead: "The best lot in Guinea-Bissau is worth nothing to you if it is weighed loosely or dried carelessly. We measure first and ship second.",
    tableCaption:
      "Raw cashew quality parameters: contract target, typical market range and the range our lots deliver",
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
  },

  paperwork: {
    heading: ["Guinea-Bissau export documentation,", "handled by one team"],
    body: "Exporting from Guinea-Bissau touches several administrations, each with its own timing. We hold the file, chase the signatures and send you the documents as they are issued — so nothing is discovered at the last minute.",
    ask: "Ask about a document",
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
  },

  markets: {
    heading: ["Raw cashew exports", "from the Port of Bissau"],
    body: "Guinea-Bissau's raw cashew feeds the world's processing hubs. We ship from the Port of Bissau to the destinations our buyers actually work in, on the Incoterm you prefer.",
    incotermsLabel: "Incoterms we ship on",
    mapLabel: (cities: string) => `Shipping routes from the Port of Bissau to ${cities}`,
    /** `id` must match a destination in src/data/map-points.ts. */
    routes: [
      { id: "india", city: "Kollam · Mangalore · Panruti", country: "India" },
      { id: "vietnam", city: "Binh Phuoc · Long An", country: "Vietnam" },
      { id: "uae", city: "Dubai", country: "UAE" },
    ],
  },

  pillars: {
    heading: "Why cashew buyers work with us",
    items: [
      { title: "Local presence", text: "We are based in Bissau all year, not flown in for the campaign. We know the sellers, the warehouses and the port staff by name.", photo: "bissau-founder-monument" },
      { title: "One operational partner", text: "Sourcing, quality, weighing, documents, trucking and loading run through a single team — so nobody can point at somebody else.", photo: "team-fleet-portrait" },
      { title: "Transparency", text: "Weighbridge tickets, analysis reports and photographs of your actual lot. You see what you are buying before it sails.", photo: "weighbridge-second-pass" },
      { title: "International mindset", text: "We work to your contract, your Incoterm and your bank's document wording. We speak your process, not just ours.", photo: "port-dual-cranes" },
    ],
  },

  howToBuy: {
    heading: "How to buy raw cashew nuts from Guinea-Bissau",
    lead: "Six steps from first message to arrival. We reply to every request within one business day.",
    steps: [
      { title: "Tell us what you need", text: "Volume in MT, destination port, Incoterm, target specification and shipment window." },
      { title: "Receive our offer", text: "A firm price with the specification we commit to, plus the document list you will receive." },
      { title: "Contract", text: "We sign your contract or issue ours, and agree payment terms — L/C, CAD or a structure that suits both sides." },
      { title: "Sourcing & control", text: "We buy, grade and weigh your lot, and send you the analysis and photographs as it builds." },
      { title: "Documentation", text: "The full export file is assembled and shared before the vessel sails — no surprises at your bank." },
      { title: "Loading & follow-up", text: "Stuffing and loading are supervised on the quay, and we stay with you until discharge." },
    ],
  },

  gallery: {
    heading: "Our cashew export operation in Bissau",
    prev: "Previous photos",
    next: "Next photos",
  },

  facts: {
    heading: "Bafata Agri Resources at a glance",
    lead: "The essentials buyers ask for when they qualify a new cashew supplier in Guinea-Bissau.",
    rows: {
      company: "Company",
      activity: "Activity",
      activityValue: "Raw cashew nut (RCN) sourcing and export",
      base: "Based in",
      regions: "Sourcing regions",
      port: "Export port",
      portValue: "Port of Bissau",
      campaign: "Campaign",
      campaignValue: `Preparation opens ${prep} ${year}; official opening ${opening} ${year}`,
      incoterms: "Incoterms",
      destinations: "Destinations",
      contact: "Contact",
    },
  },

  faq: {
    heading: "Raw cashew export questions",
    items: [
      {
        q: "What does Bafata Agri Resources do?",
        a: "Bafata Agri Resources, SARL is a raw cashew nut (RCN) export company based in Bissau, Guinea-Bissau. We help international buyers find verified cashew sellers, control quality and moisture, handle the export documentation, and coordinate shipment from the Port of Bissau to the buyer's destination port.",
      },
      {
        q: "Who exports raw cashew nuts from Guinea-Bissau?",
        a: "Raw cashew nuts from Guinea-Bissau are exported by licensed exporting companies based in Bissau, which buy from smallholder producers across the country and ship through the Port of Bissau. Bafata Agri Resources, SARL is one of these exporters: a Bissau-based company that sources, inspects, documents and ships RCN for international buyers.",
      },
      {
        q: "Where are cashews grown in Guinea-Bissau?",
        a: "Cashew is grown by smallholder farmers across most of Guinea-Bissau. Bafata Agri Resources buys in the regions of Bafatá, Gabú, Oio, Quinara and Cacheu, and consolidates lots before trucking them to the Port of Bissau.",
      },
      {
        q: "When does the Guinea-Bissau cashew campaign start?",
        a: `Guinea-Bissau's official raw cashew campaign opens once the government sets the reference price — for ${year}, in ${opening} ${year}, when village-level buying starts. Preparation opens earlier, in ${prep} ${year}: volume reservation, logistics planning and contract framing. Buyers who wait for the opening negotiate for what is left.`,
      },
      {
        q: "What quality of raw cashew nuts does Guinea-Bissau produce?",
        a: "Guinea-Bissau RCN typically delivers an outturn (KOR) of 46 to 52 lbs, moisture of 8 to 10%, a nut count of 180 to 200 per kilogram and defects under 10%. Every lot we ship is cut-tested and moisture-checked, and the analysis travels with the shipment.",
      },
      {
        q: "What do KOR, outturn and nut count mean for raw cashew nuts?",
        a: "Outturn, or KOR (kernel outturn ratio), is the weight in pounds of usable kernel recovered from an 80 kg bag of raw cashew nuts — the higher, the better. Nut count is the number of nuts per kilogram — the lower, the larger the nuts. Moisture is the water content of the nuts; lower moisture keeps the lot stable in storage and transit.",
      },
      {
        q: "Which port are Guinea-Bissau cashews shipped from?",
        a: "Guinea-Bissau's raw cashew exports are shipped from the Port of Bissau. Bafata Agri Resources trucks lots from the warehouse to the terminal and supervises stuffing and loading on the quay.",
      },
      {
        q: "Which export documents do you provide?",
        a: "Export licence, phytosanitary certificate, certificate of origin, customs declaration, quality analysis report, certified weighbridge tickets, commercial invoice, packing list and bill of lading. We assemble the set as one indexed file and can match your bank's or broker's required wording.",
      },
      {
        q: "Which Incoterms do you work on, and where do you ship?",
        a: "We ship FOB Bissau, FAS, CFR and CIF. Our buyers are cashew processors and importers in India, Vietnam and the United Arab Emirates.",
      },
      {
        q: "Do I need a company or an export licence in Guinea-Bissau to buy from you?",
        a: "No. Where a buyer does not want to incorporate locally or take out an export licence, Bafata Agri Resources can organise the export in its own name, subject to contractual and regulatory validation.",
      },
      {
        q: "What payment terms do you accept?",
        a: "We agree payment terms contract by contract — typically a letter of credit (L/C) or cash against documents (CAD), or another structure that works for both sides. The document set is prepared to match your bank's wording.",
      },
      {
        q: "What is the minimum order quantity?",
        a: "We work in full container loads and vessel parcels. Tell us your target volume in metric tonnes and your destination port, and we will confirm what is workable for your shipment window.",
      },
      {
        q: "How do I start?",
        a: `Send us a message on WhatsApp at ${site.phoneDisplay} or submit a buying request on this page with your volume, destination port and Incoterm. We reply within one business day and send an offer once the specification and volume are confirmed.`,
      },
    ],
  },

  cta: {
    heading: ["Looking for raw cashew nuts", "from Guinea-Bissau?"],
    body: `Preparation for the ${year} campaign opens in ${prep}; official buying starts in ${opening}. Buyers who talk to us now reserve volume and agree terms before the origin gets busy. Send us a message — we answer personally.`,
    phoneLabel: "WhatsApp and phone",
    emailLabel: "Email",
    officeLabel: "Office",
    office: "Bissau, Guinea-Bissau",
    form: {
      title: "Buying request",
      subtitle: "We reply within one business day.",
      optional: "optional",
      choose: "Choose",
      notSure: "Not sure yet",
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
      placeholders: {
        volume: "e.g. 500",
        port: "e.g. Nhava Sheva",
        window: `e.g. ${opening}–May ${year}`,
      },
      submit: "Send my buying request",
      note: "Submitting opens WhatsApp with your request pre-filled, so it reaches us instantly.",
      sentTitle: "Your request is ready in WhatsApp",
      sentBody: "Press send in WhatsApp and it reaches us in Bissau. If the app didn't open, message us directly.",
      openWhatsApp: "Open WhatsApp",
      edit: "Edit my request",
      messageTitle: "New buying request — raw cashew nuts, Guinea-Bissau",
      messageLabels: {
        name: "Name",
        company: "Company",
        email: "Email",
        country: "Destination country",
        volume: "Volume (MT)",
        port: "Destination port",
        incoterm: "Incoterm",
        window: "Shipment window",
        message: "Notes",
      },
      sentFrom: "Sent from",
    },
  },

  wa: {
    general: "Hello Bafata Agri Resources — I found you through your website and I'd like to discuss raw cashew nuts from Guinea-Bissau.",
    documents: "Hello Bafata Agri Resources — I have a question about export documentation for raw cashew nuts from Guinea-Bissau.",
  },

  footer: {
    navigate: "Navigate",
    contact: "Contact",
    address: "Bissau, Guinea-Bissau, West Africa",
    legal: "Raw cashew nut exports, Guinea-Bissau.",
  },
};

export type Dict = typeof en;
