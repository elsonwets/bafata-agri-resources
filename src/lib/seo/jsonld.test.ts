import { describe, expect, it } from "vitest";
import {
  buildAllJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOrganisationJsonLd,
  buildWebSiteJsonLd,
} from "./jsonld";
import { FAQ } from "@/data/faq";
import { COMPANY } from "@/config/company";

describe("buildOrganisationJsonLd", () => {
  const org = buildOrganisationJsonLd();

  it("declares the required Organization properties", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe(COMPANY.legalName);
    expect(org.url).toBe(COMPANY.url);
    expect(org.logo).toContain("/logo/");
  });

  it("places the company in Guinea-Bissau", () => {
    expect(org.address.addressCountry).toBe("GW");
  });

  it("claims only the three stated markets", () => {
    expect(org.areaServed).toEqual([
      "India",
      "United Arab Emirates",
      "Vietnam",
    ]);
  });

  it("asserts no rating, price or review", () => {
    const serialised = JSON.stringify(org);
    for (const forbidden of [
      "aggregateRating",
      "review",
      "priceRange",
      "offers",
    ]) {
      expect(serialised).not.toContain(forbidden);
    }
  });
});

describe("buildFaqJsonLd", () => {
  const faq = buildFaqJsonLd();

  it("emits one Question per entry, each with an answer", () => {
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(FAQ.length);
    for (const q of faq.mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(q.name.length).toBeGreaterThan(0);
      expect(q.acceptedAnswer["@type"]).toBe("Answer");
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });

  it("keeps the answer text identical to what the page renders", () => {
    expect(faq.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(
      FAQ.map((e) => e.answer),
    );
  });

  it("carries both campaign dates, since that is the query it targets", () => {
    const campaign = faq.mainEntity[0].acceptedAnswer.text;
    expect(campaign).toContain(COMPANY.campaign.preparation);
    expect(campaign).toContain(COMPANY.campaign.opening);
  });
});

describe("buildWebSiteJsonLd", () => {
  it("declares the site in English", () => {
    const site = buildWebSiteJsonLd();
    expect(site["@type"]).toBe("WebSite");
    expect(site.inLanguage).toBe("en");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("starts numbering at one", () => {
    const crumbs = buildBreadcrumbJsonLd();
    expect(crumbs.itemListElement[0].position).toBe(1);
  });
});

describe("buildAllJsonLd", () => {
  const all = buildAllJsonLd();

  it("embeds the four expected types", () => {
    expect(all.map((n) => n["@type"])).toEqual([
      "Organization",
      "WebSite",
      "FAQPage",
      "BreadcrumbList",
    ]);
  });

  it("gives every node a context, so each stands alone", () => {
    for (const node of all) {
      expect(node["@context"]).toBe("https://schema.org");
    }
  });

  it("serialises without a script-closing sequence that would break out", () => {
    expect(JSON.stringify(all)).not.toContain("</script");
  });
});
