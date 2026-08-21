export type Market = {
  id: "in" | "ae" | "vn";
  label: string;
  lon: number;
  lat: number;
};

/**
 * Every contact detail, date and market on the site resolves here.
 * Nothing in this file may be invented: each value is either supplied by
 * the client or is a published geographic fact.
 */
export const COMPANY = {
  name: "Bafata Agri Resources",
  legalName: "Bafata Agri Resources, SARL",
  domain: "bafata-agri.com",
  url: "https://bafata-agri.com",
  email: "nouna.esteves@gmail.com",

  /**
   * Guinea-Bissau country code is 245. The CTA renders only when this is
   * set, so an unconfigured deployment hides the button rather than
   * linking somewhere useless.
   */
  whatsapp: "+245955903406" as string | null,

  origin: { label: "Port of Bissau", lon: -15.5977, lat: 11.8637 },

  markets: [
    { id: "in", label: "India", lon: 72.9481, lat: 18.9498 },
    { id: "ae", label: "United Arab Emirates", lon: 55.2708, lat: 25.2048 },
    { id: "vn", label: "Vietnam", lon: 106.6297, lat: 10.8231 },
  ] as Market[],

  /**
   * Two distinct dates, deliberately. Preparation opens well before the
   * government sets the reference price and village buying starts.
   */
  campaign: {
    preparation: "February 2027",
    opening: "April 2027",
  },

  partners: ["AgroTrucks", "AgroStock"],

  /**
   * Named buyers the company has actually exported for, confirmed by the
   * client. Only names supplied by them appear here.
   */
  clients: ["JKT"],

  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? null,
} as const;
