/**
 * Single source of truth for company facts, contact routes and SEO constants.
 * Everything the client may want to correct later lives here, not in components.
 */

export const site = {
  name: "Bafata Agri Resources, SARL",
  legalName: "Bafata Agri Resources, SARL",
  shortName: "Bafata Agri Resources",
  legalForm: "SARL",
  tagline: "Raw cashew. From Bissau to the world.",
  url: "https://bafata-agri.com",
  locale: "en",
  country: "Guinea-Bissau",
  countryCode: "GW",
  city: "Bissau",

  /** Geographic centre of Bissau — used by the map and LocalBusiness schema. */
  geo: { lat: 11.8637, lng: -15.5977 },

  phone: "+245955903406",
  phoneDisplay: "+245 955 903 406",
  whatsapp: "https://wa.me/245955903406",
  email: "nouna.esteves@gmail.com",

  /** Regions we buy raw cashew in. Keep in step with SOURCING in
   *  scripts/build-country.mjs, which highlights them on the map. */
  sourcingRegions: ["Bafatá", "Gabú", "Oio", "Quinara", "Cacheu"],

  /**
   * Official profiles that confirm this is the same company: LinkedIn,
   * Google Business Profile, trade-directory listings. Answer engines use
   * these links to tie the website to the company's other mentions online.
   * Add each URL as soon as the profile exists.
   */
  sameAs: [] as string[],

  /** Last substantive content review — feeds dateModified and the sitemap. */
  updated: "2026-10-28",

  /**
   * Two distinct dates, as confirmed by the client: preparation (volume
   * reservation, logistics, contracts) opens in February, well before the
   * government sets the reference price and village buying officially
   * starts in April. Month names per language live in the dictionaries.
   */
  campaign: {
    year: 2027,
    preparationISO: "2027-02-01",
    openingISO: "2027-04-01",
  },

  incoterms: ["FOB Bissau", "CFR", "CIF", "FAS"],
} as const;

/** Pre-filled WhatsApp deep link, so every entry point lands in the same
 *  inbox with context already attached. Messages live in the dictionaries. */
export const wa = (message: string) =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;
