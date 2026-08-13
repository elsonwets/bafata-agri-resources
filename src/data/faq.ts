import { COMPANY } from "@/config/company";

export type FaqEntry = { question: string; answer: string };

/**
 * FAQ content, and the source for the FAQPage structured data.
 *
 * The first two entries are written for the questions buyers actually
 * type into a search box, which is also what an answer engine extracts.
 * Answers state facts and no more: no tonnage, no price, no outturn
 * figure, no certification.
 */
export const FAQ: FaqEntry[] = [
  {
    question: "When does the Guinea-Bissau cashew campaign start in 2027?",
    answer:
      `Two dates matter, and they are not the same one. Campaign ` +
      `preparation opens in ${COMPANY.campaign.preparation}: volumes are ` +
      `reserved, logistics are planned, and contracts and documents are ` +
      `framed. The official Guinea-Bissau campaign opens in ` +
      `${COMPANY.campaign.opening}, once the government sets the reference ` +
      `price, and village-level buying starts then. Buyers who wait for ` +
      `the official opening are negotiating for what is left.`,
  },
  {
    question:
      "Do I need a company or an export licence in Guinea-Bissau to buy raw cashew nuts?",
    answer:
      "Not necessarily. Where a buyer would rather not incorporate locally " +
      "or take out a new export licence, Bafata Agri Resources can organise " +
      "the export in its own name, subject to contractual and regulatory " +
      "validation. That is the arrangement most of our conversations start " +
      "from.",
  },
  {
    question: "Where do the nuts come from?",
    answer:
      "We buy at village level across the interior of Guinea-Bissau, region " +
      "by region, with Bafata as our home base. Lots are graded and tagged " +
      "on intake, stored in our own warehouse, then hauled to the port of " +
      "Bissau for stuffing and loading.",
  },
  {
    question: "Which markets do you ship to?",
    answer:
      "India, the United Arab Emirates and Vietnam. Every consignment " +
      "leaves through the port of Bissau.",
  },
  {
    question: "What outturn can I expect?",
    answer:
      "Outturn is recorded per lot on intake and stated per contract. We do " +
      "not publish a headline KOR figure, because a single number across a " +
      "campaign would not mean anything for the lot you are actually " +
      "buying.",
  },
  {
    question: "Which incoterms do you work on?",
    answer:
      "FOB Bissau is the usual basis. Other terms can be agreed as part of " +
      "the contract.",
  },
  {
    question: "How do I follow a consignment once it is bought?",
    answer:
      "A client portal covering stock, lots, contracts and shipment " +
      "milestones is in preparation, so you can see where a consignment " +
      "stands without travelling. The screens shown on this page are an " +
      "illustrative preview rather than the live product.",
  },
  {
    question: "How do we start?",
    answer:
      "Tell us the destination country, the volume you are looking for and " +
      "the incoterm you work on, and we will come back with what we can " +
      "commit to for the coming campaign.",
  },
];
