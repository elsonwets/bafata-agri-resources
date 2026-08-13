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
  email: "contact@bafata-agri.com",

  /**
   * Null until the client supplies the number. The WhatsApp call to
   * action is not rendered while this is null, rather than pointing at
   * a placeholder.
   */
  whatsapp: null as string | null,

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

  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? null,
} as const;
