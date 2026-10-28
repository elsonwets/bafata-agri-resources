import { site } from "./site.ts";
import { en } from "../i18n/en.ts";

/**
 * Buyer guides — one page per search intent, in English (the language of
 * the RCN trade). Each guide answers its question in depth from facts the
 * client has confirmed; it must not introduce new figures, certifications,
 * client names or volumes. Process descriptions are general trade practice.
 */

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  /** A definition list: term → explanation. */
  terms?: { term: string; text: string }[];
  /** A numbered sequence — only for content that really is a sequence. */
  steps?: { title: string; text: string }[];
  table?: { head: string[]; rows: string[][]; caption: string };
};

export type Guide = {
  slug: string;
  /** Short label for navigation. */
  label: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  photo: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
};

const { year } = site.campaign;
const q = en.quality.table;

export const guides: Guide[] = [
  {
    slug: "raw-cashew-nuts-guinea-bissau",
    label: "Raw cashew nuts from Guinea-Bissau",
    title: "Raw Cashew Nuts from Guinea-Bissau: Origin, Quality, Campaign | Bafata Agri",
    description:
      `Guinea-Bissau raw cashew nuts (RCN): producing regions, the ${year} campaign calendar, KOR, moisture and nut count, and where the crop is shipped.`,
    h1: "Raw cashew nuts from Guinea-Bissau",
    lead: "What buyers need to know about Guinea-Bissau as a raw cashew nut (RCN) origin: where the crop grows, when the campaign opens, which quality parameters to check, and how a lot travels from the village to the Port of Bissau.",
    photo: "warehouse-team-stacking",
    sections: [
      {
        heading: "Guinea-Bissau as a cashew origin",
        paragraphs: [
          "Guinea-Bissau is one of the world's largest exporters of raw cashew nuts, and cashew is the backbone of its economy. The crop is grown by smallholder farmers across most of the country and sold at village level during the campaign.",
          `Bafata Agri Resources buys in the regions of ${site.sourcingRegions.join(", ")}. Lots are bought village by village, graded, stored and trucked to Bissau, where they are stuffed into containers and loaded at the Port of Bissau.`,
        ],
      },
      {
        heading: `The ${year} Guinea-Bissau cashew campaign`,
        steps: [
          { title: `Preparation — February ${year}`, text: "Volume reservation, logistics planning and contract framing with buyers, before the season starts." },
          { title: `Official opening — April ${year}`, text: "The government sets the reference price and village-level buying officially begins." },
          { title: "Buying, grading and haulage", text: "Lots are bought, cut-tested, weighed, stored and trucked to Bissau as the campaign progresses." },
          { title: "Stuffing and loading", text: "Containers are stuffed and loaded at the Port of Bissau against each buyer's contract and documents." },
        ],
        paragraphs: [
          "The gap between preparation and opening matters: buyers who wait for the official opening negotiate for what is left.",
        ],
      },
      {
        heading: "Quality parameters buyers check",
        terms: [
          { term: "Outturn (KOR)", text: "Kernel outturn ratio: the weight in pounds of usable kernel recovered from an 80 kg bag of raw nuts. It is the main driver of value — the higher, the better." },
          { term: "Moisture", text: "The water content of the nuts. Lower moisture keeps the lot stable in storage and during the voyage." },
          { term: "Nut count", text: "The number of nuts per kilogram. The lower the count, the larger the nuts." },
          { term: "Defective nuts", text: "The share of spotted, immature or damaged nuts found in the cut test." },
          { term: "Foreign matter", text: "Stones, shells, dust and other material that is not cashew." },
        ],
        table: {
          caption: "Raw cashew quality parameters: contract target, typical market range and the range Bafata Agri Resources lots deliver",
          head: q.head,
          rows: q.rows.map((r) => [r.param, r.target, r.market, r.ours]),
        },
        paragraphs: [en.origin.disclaimer],
      },
      {
        heading: "Where Guinea-Bissau raw cashew is shipped",
        paragraphs: [
          "Guinea-Bissau RCN feeds the world's cashew processing hubs. Our buyers are processors and importers in India (Kollam, Mangalore, Panruti), Vietnam (Binh Phuoc, Long An) and the United Arab Emirates (Dubai re-export traders).",
          `We ship ${site.incoterms.join(", ")} from the Port of Bissau.`,
        ],
      },
    ],
    faqs: [
      en.faq.items[3],
      en.faq.items[4],
      en.faq.items[5],
    ],
  },
  {
    slug: "cashew-export-documentation",
    label: "Cashew export documentation",
    title: "Cashew Export Documents from Guinea-Bissau: What You Receive | Bafata Agri",
    description:
      "The export documents that come with a raw cashew nut shipment from Guinea-Bissau — phytosanitary certificate, certificate of origin, bill of lading and more — and how to match your L/C.",
    h1: "Cashew export documentation from Guinea-Bissau",
    lead: "Every raw cashew shipment from Guinea-Bissau travels with a set of documents issued by several administrations. This guide explains what each one is, what it proves, and how to make sure the set matches your contract and your bank's letter of credit.",
    photo: "weighbridge-ticket",
    sections: [
      {
        heading: "The documents in a raw cashew export file",
        terms: en.paperwork.docs.map((d) => ({ term: d.title, text: d.text })),
      },
      {
        heading: "In what order the documents are issued",
        steps: [
          { title: "Before the campaign", text: "The exporter's registration and campaign authorisation are in place, so the lot can legally leave the country." },
          { title: "While the lot is built", text: "Quality analysis and weighbridge tickets are produced lot by lot, as nuts are cut-tested and weighed." },
          { title: "Before loading", text: "The phytosanitary inspection, certificate of origin and customs declaration are completed; the commercial invoice and packing list are drawn up." },
          { title: "After loading", text: "The carrier issues the bill of lading, which is released according to the agreed payment terms." },
        ],
      },
      {
        heading: "Matching your letter of credit",
        paragraphs: [
          "Most delays at the bank come from small discrepancies between the documents and the wording of the letter of credit or contract: a product description, a port name, a quantity format.",
          en.paperwork.note,
        ],
      },
      {
        heading: "Buying without a company in Guinea-Bissau",
        paragraphs: [en.faq.items[9].a],
      },
    ],
    faqs: [en.faq.items[7], en.faq.items[9], en.faq.items[10]],
  },
  {
    slug: "buy-raw-cashew-nuts",
    label: "How to buy raw cashew nuts",
    title: "How to Buy Raw Cashew Nuts from Guinea-Bissau | Bafata Agri Resources",
    description:
      "A step-by-step guide to buying raw cashew nuts (RCN) from Guinea-Bissau: what to send, offer and contract, Incoterms, payment terms and loading at the Port of Bissau.",
    h1: "How to buy raw cashew nuts from Guinea-Bissau",
    lead: "Buying RCN from Guinea-Bissau does not require a local company or an agent of your own. This guide walks through the process with Bafata Agri Resources, from the first message to the vessel leaving the Port of Bissau.",
    photo: "port-cargo-net",
    sections: [
      {
        heading: "What to send in your first message",
        terms: [
          { term: "Volume", text: "In metric tonnes or containers — even approximate." },
          { term: "Destination port", text: "Where the containers should be discharged." },
          { term: "Incoterm", text: `${site.incoterms.join(", ")} — or tell us you are not sure yet.` },
          { term: "Target specification", text: "Your outturn (KOR), moisture and nut count requirements." },
          { term: "Shipment window", text: `When you need the cargo to sail. The ${year} campaign opens in April; preparation starts in February.` },
        ],
      },
      {
        heading: "The buying process, step by step",
        steps: en.howToBuy.steps,
      },
      {
        heading: "Incoterms for raw cashew from Bissau",
        terms: [
          { term: "FOB Bissau", text: "We deliver the goods loaded on board the vessel at the Port of Bissau; freight and insurance are yours." },
          { term: "FAS", text: "We deliver the goods alongside the vessel at the Port of Bissau; loading, freight and insurance are yours." },
          { term: "CFR", text: "We also pay the sea freight to your destination port; the risk passes to you once the goods are on board." },
          { term: "CIF", text: "As CFR, plus marine insurance for the voyage to your destination port." },
        ],
      },
      {
        heading: "Payment terms",
        paragraphs: [en.faq.items[10].a],
      },
    ],
    faqs: [en.faq.items[9], en.faq.items[11], en.faq.items[12]],
  },
];

export const guideBySlug = (slug: string) => {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
};
