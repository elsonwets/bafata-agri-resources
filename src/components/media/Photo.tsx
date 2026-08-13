import { ALT, IMAGES, fallbackSrc, srcSet, type ImageSlug } from "@/data/images";

export type PhotoProps = {
  slug: ImageSlug;
  sizes: string;
  className?: string;
  /** Set on the one image above the fold. Everything else stays lazy. */
  priority?: boolean;
  /** Overrides the catalogue alt text when context makes a better one. */
  alt?: string;
};

/**
 * A plain picture element rather than next/image.
 *
 * The build is a static export, so the runtime optimiser never runs, and
 * scripts/optimize-images.mjs has already produced the exact renditions
 * needed. Going direct keeps the markup honest about what it loads and
 * lets AVIF carry widths that WebP is not generated for.
 */
export function Photo({
  slug,
  sizes,
  className,
  priority = false,
  alt,
}: PhotoProps) {
  const meta = IMAGES[slug];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(slug, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(slug, "webp")} sizes={sizes} />
      <img
        src={fallbackSrc(slug)}
        alt={alt ?? ALT[slug]}
        width={meta.width}
        height={meta.height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
