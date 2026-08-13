import { describe, expect, it } from "vitest";
import { COMPANY } from "./company";

describe("COMPANY", () => {
  it("names exactly the three stated destination markets", () => {
    expect(COMPANY.markets.map((m) => m.id).sort()).toEqual(["ae", "in", "vn"]);
  });

  it("keeps whatsapp nullable so the CTA can hide until it is supplied", () => {
    expect(
      COMPANY.whatsapp === null || typeof COMPANY.whatsapp === "string",
    ).toBe(true);
  });

  it("distinguishes campaign preparation from official opening", () => {
    expect(COMPANY.campaign.preparation).not.toEqual(COMPANY.campaign.opening);
  });

  it("places every market at plausible coordinates", () => {
    for (const m of COMPANY.markets) {
      expect(m.lon).toBeGreaterThanOrEqual(-180);
      expect(m.lon).toBeLessThanOrEqual(180);
      expect(m.lat).toBeGreaterThanOrEqual(-90);
      expect(m.lat).toBeLessThanOrEqual(90);
    }
  });

  it("puts the origin in Guinea-Bissau", () => {
    // Guinea-Bissau spans roughly -16.8..-13.6 lon, 10.8..12.7 lat.
    expect(COMPANY.origin.lon).toBeGreaterThan(-16.8);
    expect(COMPANY.origin.lon).toBeLessThan(-13.6);
    expect(COMPANY.origin.lat).toBeGreaterThan(10.8);
    expect(COMPANY.origin.lat).toBeLessThan(12.7);
  });
});
