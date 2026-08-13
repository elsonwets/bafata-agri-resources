/**
 * Verification pass over the built output.
 *
 * Checks the things that are easy to assume and expensive to get wrong:
 * heading structure, structured data validity, alt coverage, and that
 * the page is still readable and operable with motion turned off.
 * Reports facts, and exits non-zero if any check fails.
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DIST = join(ROOT, "out");
const PORT = 4322;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function serve() {
  return new Promise((ok) => {
    const server = createServer(async (req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      let file = join(DIST, p);
      if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
      if (!existsSync(file)) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, {
        "content-type": TYPES[extname(file)] ?? "application/octet-stream",
      });
      res.end(await readFile(file));
    });
    server.listen(PORT, () => ok(server));
  });
}

const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` - ${detail}` : ""}`);
}

async function main() {
  const server = await serve();
  const browser = await chromium.launch();
  const base = `http://localhost:${PORT}`;

  // --- Structure and content ---
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });

  const h1s = await page.locator("h1").allTextContents();
  check("exactly one h1", h1s.length === 1, `found ${h1s.length}`);

  const levels = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,h4")].map((h) =>
      Number(h.tagName[1]),
    ),
  );
  let skipped = null;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      skipped = `h${levels[i - 1]} to h${levels[i]}`;
      break;
    }
  }
  check("no skipped heading levels", skipped === null, skipped ?? "");

  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => ({
      src: i.getAttribute("src"),
      alt: i.getAttribute("alt"),
    })),
  );
  const missingAlt = imgs.filter((i) => !i.alt || i.alt.trim().length < 10);
  check(
    "every image carries descriptive alt text",
    missingAlt.length === 0,
    missingAlt.length ? missingAlt.map((i) => i.src).join(", ") : `${imgs.length} images`,
  );

  // --- Structured data ---
  const blocks = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')].map(
      (s) => s.textContent,
    ),
  );
  let graph = [];
  let parseError = null;
  try {
    graph = blocks.flatMap((b) => JSON.parse(b));
  } catch (e) {
    parseError = e.message;
  }
  check("structured data parses", parseError === null, parseError ?? "");

  const types = graph.map((n) => n["@type"]);
  for (const wanted of [
    "Organization",
    "WebSite",
    "FAQPage",
    "BreadcrumbList",
  ]) {
    check(`structured data declares ${wanted}`, types.includes(wanted));
  }

  const faq = graph.find((n) => n["@type"] === "FAQPage");
  check(
    "every FAQ question has a non-empty answer",
    Boolean(faq) &&
      faq.mainEntity.every((q) => q.acceptedAnswer?.text?.length > 0),
    faq ? `${faq.mainEntity.length} questions` : "no FAQPage",
  );

  // --- Claims discipline ---
  const bodyText = await page.evaluate(() => document.body.innerText);
  const forbidden = [
    /\b\d[\d,.]*\s*(tonnes?|tons?|MT)\b/i,
    /\bKOR\s*[:=]?\s*\d/i,
    /\bUSD?\s?\d/i,
    /\bcertified by\b/i,
    /\bISO\s?\d{4}/i,
  ];
  const hits = forbidden.filter((r) => r.test(bodyText)).map(String);
  check("no invented tonnage, price, outturn or certification", hits.length === 0, hits.join(" "));

  const marketMentions = ["India", "United Arab Emirates", "Vietnam"];
  check(
    "names only the three stated markets",
    marketMentions.every((m) => bodyText.includes(m)) &&
      !/\bBrazil\b|\bNetherlands\b|\bTurkey\b/.test(bodyText),
  );

  // --- SEO endpoints ---
  for (const path of ["/sitemap.xml", "/robots.txt"]) {
    const r = await page.request.get(`${base}${path}`);
    check(`${path} is served`, r.ok(), `status ${r.status()}`);
  }

  // --- Keyboard reachability ---
  const focusables = await page.evaluate(
    () =>
      document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), details summary',
      ).length,
  );
  check("interactive elements are focusable", focusables > 20, `${focusables} found`);

  await page.close();

  // --- Reduced motion ---
  const rm = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await rm.goto(`${base}/`, { waitUntil: "networkidle" });
  await rm.waitForTimeout(1500);

  const rmText = await rm.evaluate(() => document.body.innerText.length);
  check("page is readable under reduced motion", rmText > 3000, `${rmText} chars`);

  const rmOverflow = await rm.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  check("no horizontal overflow under reduced motion", !rmOverflow);

  const pinned = await rm.evaluate(
    () => document.querySelectorAll(".pin-spacer").length,
  );
  check("scroll pinning is not created under reduced motion", pinned === 0, `${pinned} pin spacers`);

  await rm.close();

  // --- No-JS ---
  const nojsCtx = await browser.newContext({ javaScriptEnabled: false });
  const nojs = await nojsCtx.newPage();
  await nojs.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  const nojsText = await nojs.evaluate(() => document.body.innerText.length);
  check("page is readable with JavaScript disabled", nojsText > 3000, `${nojsText} chars`);
  await nojsCtx.close();

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.pass);
  console.log(
    `\n${results.length - failed.length}/${results.length} checks passed.`,
  );
  if (failed.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
