/**
 * Screenshot harness.
 *
 * Serves the static export and captures the page at a set of scroll
 * positions and viewports, so layout regressions are caught by eye
 * rather than assumed away.
 *
 * Usage: node scripts/shoot.mjs [outDir]
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DIST = join(ROOT, "out");
const OUT = process.argv[2] ?? join(ROOT, "shots");
const PORT = 4321;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
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

/**
 * Positions target elements rather than viewport multiples. Absolute
 * offsets go stale the moment a section changes height, which silently
 * turns a regression check into a screenshot of empty space.
 *
 * `progress` scrolls that fraction into the pinned section's own scroll
 * distance, which is how you land mid-sequence in a pinned timeline.
 */
const SHOTS = [
  { name: "01-hero", width: 1440, height: 900, at: "#top" },
  { name: "02-corridor-start", width: 1440, height: 900, at: "#chain" },
  { name: "03-corridor-mid", width: 1440, height: 900, at: "#chain", progress: 0.45 },
  { name: "04-corridor-end", width: 1440, height: 900, at: "#chain", progress: 0.92 },
  { name: "05-sourcing", width: 1440, height: 900, at: "#sourcing" },
  { name: "06-markets", width: 1440, height: 900, at: "#markets" },
  { name: "07-mobile-hero", width: 390, height: 844, at: "#top" },
  { name: "08-mobile-chain", width: 390, height: 844, at: "#chain" },
  { name: "09-mobile-sourcing", width: 390, height: 844, at: "#sourcing" },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await serve();
  const browser = await chromium.launch();

  for (const shot of SHOTS) {
    const page = await browser.newPage({
      viewport: { width: shot.width, height: shot.height },
      deviceScaleFactor: 1,
    });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
    await page.evaluate(
      ({ at, progress }) => {
        const el = document.querySelector(at);
        if (!el) throw new Error(`no element matches ${at}`);
        const top = el.getBoundingClientRect().top + window.scrollY;
        // Pinned sections occupy more scroll than their own height, so
        // advance through the section's full travel, not its box.
        const travel = progress ? el.offsetHeight * progress * 4 : 0;
        window.scrollTo(0, top + travel);
      },
      { at: shot.at, progress: shot.progress ?? 0 },
    );
    // Let the scroll-driven timelines settle. The export map's routes
    // draw over 1.6s with a 0.35s stagger behind a 0.9s delay, so a
    // shorter wait catches them mid-draw and reads as a broken map.
    await page.waitForTimeout(3200);
    await page.screenshot({ path: join(OUT, `${shot.name}.png`) });
    console.log(`shot ${shot.name}`);

    // Horizontal overflow is a stated failure condition, so assert it.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    if (overflow) console.error(`  HORIZONTAL OVERFLOW at ${shot.name}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nWrote ${SHOTS.length} shots to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
