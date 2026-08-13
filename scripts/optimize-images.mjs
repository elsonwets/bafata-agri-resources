/**
 * Responsive image pipeline.
 *
 * Reads exclusively from assets/redacted, never from the original Drive
 * folder, so no unredacted frame can reach public/ by accident.
 *
 * The source frames are 3-7 MB each. This emits AVIF and WebP at four
 * widths and fails loudly if anything lands over the budget.
 */
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SRC = join(ROOT, "assets/redacted");
const OUT = join(ROOT, "public/images");
const GENERATED = join(ROOT, "src/data/images.generated.json");

const WIDTHS = [640, 1024, 1600, 2400];
/** Hard ceiling. Anything above this is a pipeline failure, not a warning. */
const MAX_BYTES = 400 * 1024;

/**
 * Quality falls as width grows. A 2400px plate is displayed at lower
 * relative zoom than a 640px one, so it tolerates more compression, and
 * the drone frames are dense enough with foliage that a flat quality
 * setting blows the budget.
 */
function qualityFor(width) {
  if (width >= 2400) return { avif: 46, webp: 62 };
  if (width >= 1600) return { avif: 50, webp: 72 };
  return { avif: 55, webp: 78 };
}

/**
 * WebP is far less efficient than AVIF on these textures: dense jute and
 * aerial foliage push it past the budget at 2400px no matter how hard it
 * is compressed, and crushing quality that far is visible. WebP therefore
 * stops at 1600, which is ample for a fallback path, and AVIF carries the
 * large widths on its own.
 */
const WEBP_MAX_WIDTH = 1600;

/** Source filename to the slug the site addresses it by. */
const SLUGS = {
  "4F4A1515.JPG": "warehouse-sack-relay",
  "4F4A1531.JPG": "warehouse-jute-wall",
  "4F4A1534.JPG": "warehouse-stacking",
  "4F4A1536.JPG": "warehouse-truck-load",
  "4F4A1621.JPG": "quay-trailer-unload",
  "4F4A1628.JPG": "quay-cranes-wide",
  "4F4A1657.JPG": "crane-sling-lift",
  "4F4A1672.JPG": "vessel-hold",
  "4F4A1711.JPG": "director-waterfront",
  "4F4A1727.JPG": "director-bissau-square",
  "4F4A1740.JPG": "director-street",
  "DJI_0622.JPG": "depot-aerial-wide",
  "DJI_0624.JPG": "depot-fleet-aerial",
  "DJI_0634.JPG": "warehouse-door-truck",
  "DJI_0641.JPG": "depot-yard-aerial",
  "DJI_0666.JPG": "depot-overview",
  "DJI_0675.JPG": "quay-truck-vessel",
};

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(dirname(GENERATED), { recursive: true });
  const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f));

  const missing = files.filter((f) => !SLUGS[f]);
  if (missing.length) {
    console.error(`No slug defined for: ${missing.join(", ")}`);
    process.exit(1);
  }

  const generated = {};
  let oversize = 0;

  for (const file of files) {
    const slug = SLUGS[file];
    const input = join(SRC, file);
    const meta = await sharp(input).metadata();
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (!widths.length) widths.push(meta.width);

    for (const w of widths) {
      const base = sharp(input).resize({ width: w, withoutEnlargement: true });
      const q = qualityFor(w);

      const written = [];

      const avif = await base.clone().avif({ quality: q.avif }).toBuffer();
      await writeFile(join(OUT, `${slug}-${w}.avif`), avif);
      written.push(["avif", avif]);

      if (w <= WEBP_MAX_WIDTH) {
        const webp = await base.clone().webp({ quality: q.webp }).toBuffer();
        await writeFile(join(OUT, `${slug}-${w}.webp`), webp);
        written.push(["webp", webp]);
      }

      for (const [ext, buf] of written) {
        if (buf.length > MAX_BYTES) {
          console.error(
            `OVER BUDGET  ${slug}-${w}.${ext}  ${(buf.length / 1024).toFixed(0)} KB`,
          );
          oversize++;
        }
      }
    }

    generated[slug] = {
      width: meta.width,
      height: meta.height,
      aspect: Number((meta.width / meta.height).toFixed(4)),
      avifWidths: widths,
      webpWidths: widths.filter((w) => w <= WEBP_MAX_WIDTH),
      source: file,
    };
    console.log(
      `${slug.padEnd(24)} ${meta.width}x${meta.height}  ${widths.join(", ")}`,
    );
  }

  await writeFile(GENERATED, JSON.stringify(generated, null, 2) + "\n");

  if (oversize) {
    console.error(`\n${oversize} output(s) over the ${MAX_BYTES / 1024} KB budget.`);
    process.exit(1);
  }
  console.log(`\n${files.length} frame(s) processed, all within budget.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
