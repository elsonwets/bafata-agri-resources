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
   * Two distinct dates, as confirmed by the client. Preparation (volume
   * reservation, logistics, contracts) opens well before the government
   * sets the reference price and village buying officially starts.
   */
  campaign: {
    year: 2027,
    preparationMonth: "February",
    openingMonth: "April",
    openingISO: "2027-04-01",
  },
} as const;

/**
 * Pre-filled WhatsApp deep links. Encoded once, reused everywhere, so every
 * entry point lands in the same inbox with context already attached.
 */
export const wa = (message: string) =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const waLinks = {
  general: wa(
    `Hello Bafata Agri Resources — I found you through your website and I'd like to discuss raw cashew nuts from Guinea-Bissau.`,
  ),
  campaign: wa(
    `Hello Bafata Agri Resources — I'd like to prepare the ${site.campaign.year} campaign and reserve volume. Please send me your terms.`,
  ),
  quote: wa(
    `Hello Bafata Agri Resources — I would like a quotation for raw cashew nuts (RCN). Volume: ___ MT. Destination port: ___. Incoterm: ___.`,
  ),
  documents: wa(
    `Hello Bafata Agri Resources — I have a question about export documentation for raw cashew nuts from Guinea-Bissau.`,
  ),
} as const;

export const nav = [
  { label: "Origin", href: "#origin" },
  { label: "Operation", href: "#operation" },
  { label: "Journey", href: "#journey" },
  { label: "Quality", href: "#quality" },
  { label: "Markets", href: "#markets" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;
