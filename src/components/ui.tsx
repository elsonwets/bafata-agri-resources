import type { ReactNode } from "react";
import { bySlug, src } from "@/data/photos";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Photo                                                                      */
/* -------------------------------------------------------------------------- */

type PhotoProps = {
  slug: string;
  className?: string;
  imgClassName?: string;
  /** The `sizes` attribute — how wide the photo renders, so the browser
   *  can pick the 700px derivative whenever it is enough. */
  sizes?: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  alt?: string;
};

/**
 * Every photograph goes through here so alt text, intrinsic dimensions and
 * the responsive source set are never forgotten. The blurred thumbnail sits
 * behind the image as a placeholder until the real pixels arrive.
 */
export function Photo({
  slug,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  alt,
}: PhotoProps) {
  const photo = bySlug(slug);

  return (
    <div
      className={cn("relative overflow-hidden bg-sunken bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${photo.blur})` }}
    >
      <img
        src={src(slug)}
        srcSet={`${src(slug, true)} 700w, ${src(slug)} 1800w`}
        sizes={sizes}
        alt={alt ?? photo.en}
        width={1800}
        height={Math.round((1800 * photo.h) / photo.w)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function Action({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  icon,
  className,
}: ActionProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,transform] duration-200 active:scale-[0.97]",
        size === "md" ? "min-h-12 px-6 text-[1rem]" : "min-h-10 px-4.5 text-[0.9375rem]",
        variant === "primary"
          ? "bg-navy text-white hover:bg-navy-deep"
          : "bg-navy-tint text-navy hover:bg-[#d6dcf0]",
        className,
      )}
    >
      {icon}
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                            */
/* -------------------------------------------------------------------------- */

export function Heading({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("t-h2 max-w-[18ch]", className)}>
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons — inline, so the page ships no icon library                          */
/* -------------------------------------------------------------------------- */

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-[1.1em]", className)} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm5.82 14.13c-.25.69-1.44 1.32-1.99 1.37-.51.05-.99.24-3.33-.69-2.82-1.11-4.6-3.99-4.74-4.18-.14-.18-1.13-1.5-1.13-2.87 0-1.36.71-2.03.97-2.31.25-.28.55-.35.73-.35l.53.01c.17 0 .4-.06.62.48.23.55.78 1.91.85 2.05.07.14.11.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.18.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.67-.18 1.36Z" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
