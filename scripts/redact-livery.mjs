/**
 * Third-party livery redaction.
 *
 * BADORRA / General Trading has no relationship with Bafata Agri
 * Resources. Publishing their marks would misrepresent both companies,
 * so every legible instance is destroyed here before any other image
 * processing runs.
 *
 * Regions are stored as fractions of the image, not pixels, so the
 * manifest survives any later resize and can be reviewed by eye.
 */
import sharp from "sharp";
import { readFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const SRC_DIR =
  "C:/Users/zenbook/Downloads/drive-download-20260722T010222Z-1-001";
const OUT_DIR = join(ROOT, "assets/redacted");
const MANIFEST = join(HERE, "livery-redactions.json");

/** Blur radius as a fraction of the region's shorter side. */
const BLUR_RATIO = 0.22;
const MIN_SIGMA = 10;
/** Feather width as a fraction of the region's shorter side. */
const FEATHER_RATIO = 0.35;
const MIN_FEATHER = 12;

/** Hermite smoothstep, so the alpha ramp has no visible banding. */
function smoothstep(t) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

/**
 * Builds a feathered alpha mask for one window: fully opaque across the
 * region, ramping to fully transparent over `feather` pixels outside it.
 * Without this the blurred patch lands as a hard rectangle and reads as
 * a censorship box rather than as depth of field.
 */
function featherMask(ow, oh, pad, w, h, feather) {
  const mask = Buffer.alloc(ow * oh);
  for (let y = 0; y < oh; y++) {
    // Distance outside the region rect, zero anywhere inside it.
    const dy = y < pad ? pad - y : y >= pad + h ? y - (pad + h - 1) : 0;
    for (let x = 0; x < ow; x++) {
      const dx = x < pad ? pad - x : x >= pad + w ? x - (pad + w - 1) : 0;
      const d = Math.hypot(dx, dy);
      mask[y * ow + x] = Math.round(255 * smoothstep(1 - d / feather));
    }
  }
  return mask;
}

/**
 * Blurs each region beyond legibility, blending the result into its
 * surroundings so no hard edge survives.
 *
 * @param {string} inputPath
 * @param {Array<{x:number,y:number,w:number,h:number}>} regions fractional
 * @param {string} outputPath
 */
export async function redactRegions(inputPath, regions, outputPath) {
  const { width, height } = await sharp(inputPath).metadata();

  if (!regions.length) {
    await sharp(inputPath).toFile(outputPath);
    return;
  }

  const patches = await Promise.all(
    regions.map(async (r) => {
      const left = Math.max(0, Math.round(r.x * width));
      const top = Math.max(0, Math.round(r.y * height));
      const w = Math.max(1, Math.min(width - left, Math.round(r.w * width)));
      const h = Math.max(1, Math.min(height - top, Math.round(r.h * height)));

      const shorter = Math.min(w, h);
      const sigma = Math.max(MIN_SIGMA, shorter * BLUR_RATIO);
      const feather = Math.max(MIN_FEATHER, shorter * FEATHER_RATIO);

      // Pad by the feather plus enough room for the blur kernel itself,
      // clamped to what the image actually offers at this position.
      const pad = Math.min(
        Math.round(feather + sigma * 2),
        left,
        top,
        width - (left + w),
        height - (top + h),
      );
      const ol = left - pad;
      const ot = top - pad;
      const ow = w + pad * 2;
      const oh = h + pad * 2;

      const blurred = await sharp(inputPath)
        .extract({ left: ol, top: ot, width: ow, height: oh })
        .blur(sigma)
        .removeAlpha()
        .toBuffer();

      // The ramp can only use the padding actually available.
      const usable = Math.max(1, Math.min(feather, pad));
      const mask = featherMask(ow, oh, pad, w, h, usable);

      // joinChannel on a three-channel image supplies the alpha, which
      // is what carries the feather.
      const patch = await sharp(blurred)
        .joinChannel(mask, { raw: { width: ow, height: oh, channels: 1 } })
        .png()
        .toBuffer();

      return { input: patch, left: ol, top: ot };
    }),
  );

  await sharp(inputPath).composite(patches).toFile(outputPath);
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });

  const selected = manifest.selected;
  const redactions = manifest.redactions;
  // `dropped` is a map of filename to the reason it cannot be published,
  // so the decision travels with the manifest and can be reviewed.
  const dropped = new Set(
    Object.keys(manifest.dropped).filter((k) => !k.startsWith("_")),
  );

  let clean = 0;
  let cleaned = 0;

  for (const name of selected) {
    if (dropped.has(name)) continue;
    const src = join(SRC_DIR, name);
    if (!existsSync(src)) {
      console.error(`MISSING SOURCE: ${name}`);
      process.exitCode = 1;
      continue;
    }
    const regions = redactions[name] ?? [];
    await redactRegions(src, regions, join(OUT_DIR, name));
    if (regions.length) {
      cleaned++;
      console.log(`redacted  ${name}  (${regions.length} region(s))`);
    } else {
      clean++;
      console.log(`clean     ${name}`);
    }
  }

  console.log(
    `\n${clean} frame(s) carried no third-party mark, ` +
      `${cleaned} redacted, ${dropped.size} dropped as unsalvageable.`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
