import Image from "next/image";
import { bySlug, src } from "@/data/photos";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Use the 700px derivative — for thumbnails and dense grids. */
  small?: boolean;
  /** Overrides the caption used as alt text. */
  alt?: string;
};

/**
 * Every photograph on the site goes through here so alt text, blur
 * placeholders and intrinsic dimensions are never forgotten. The captions
 * come from the shoot manifest, which means alt text describes the actual
 * operation rather than repeating the brand name.
 */
export function Photo({
  slug,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  small,
  alt,
}: Props) {
  const photo = bySlug(slug);

  return (
    <div className={cn("relative overflow-hidden bg-forest-800", className)}>
      <Image
        src={src(slug, small)}
        alt={alt ?? photo.en}
        width={small ? 700 : 1800}
        height={Math.round(((small ? 700 : 1800) * photo.h) / photo.w)}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={photo.blur}
        priority={priority}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/** Photo in the torn-paper frame lifted from the reference film. */
export function PolaroidPhoto({
  slug,
  className,
  caption,
  sizes = "(max-width: 768px) 60vw, 24vw",
}: {
  slug: string;
  className?: string;
  caption?: boolean;
  sizes?: string;
}) {
  const photo = bySlug(slug);

  return (
    <figure className={cn("polaroid", className)}>
      <Photo slug={slug} small sizes={sizes} className="w-full" />
      {caption ? (
        <figcaption className="polaroid-caption">{photo.en}</figcaption>
      ) : null}
    </figure>
  );
}
