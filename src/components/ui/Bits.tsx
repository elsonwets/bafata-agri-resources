import { cn } from "@/lib/utils";

/** Mono, letter-spaced section label with a leaf tick. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-eyebrow flex items-center gap-2.5 text-leaf-400", className)}>
      <span aria-hidden className="h-px w-7 bg-leaf-400/60" />
      {children}
    </p>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hairline", className)} />;
}

/** The site's numbered index marker, used by every enumerated list. */
export function Index({ n, className }: { n: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[0.6875rem] tracking-[0.18em] text-gold-400/80",
        className,
      )}
    >
      {n}
    </span>
  );
}

export function Stat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="border-t border-white/12 pt-5">
      <div className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none text-cream">
        {value}
      </div>
      <div className="mt-2.5 text-[0.8125rem] font-medium text-leaf-300">{label}</div>
      {note ? (
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{note}</p>
      ) : null}
    </div>
  );
}
