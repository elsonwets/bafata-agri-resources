/**
 * Single source of truth for company facts, contact routes and SEO constants.
 * Everything the client may want to correct later lives here, not in components.
 */

export const site = {
  name: "Bafata Agri Resources, SARL",
  shortName: "Bafata Agri Resources",
  legalForm: "SARL",
  tagline: "Raw cashew. From Bissau to the world.",
  url: "https://bafata-agri-resources.netlify.app",
  locale: "en",
  country: "Guinea-Bissau",
  countryCode: "GW",
  city: "Bissau",

  /** Geographic centre of Bissau — used by the map and LocalBusiness schema. */
  geo: { lat: 11.8637, lng: -15.5977 },

  phone: "+245955903406",
  phoneDisplay: "+245 955 903 406",
  whatsapp: "https://wa.me/245955903406",
  email: "contact@bafata-agri.com",

  /** Next buying campaign. Guinea-Bissau's RCN season opens in February. */
  campaign: {
    year: 2027,
    opensMonth: "February",
    opensISO: "2027-02-01",
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
    `Hello Bafata Agri Resources — I'd like to talk about the ${site.campaign.year} campaign opening in ${site.campaign.opensMonth}. Please send me your terms.`,
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
