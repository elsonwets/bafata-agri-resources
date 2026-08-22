/**
 * Reduced brand mark for small sizes.
 *
 * The full seal turns to mud below ~48px, so navigation and the footer use
 * this tree-and-ring reduction instead. Inlined rather than loaded through
 * <img> so `currentColor` actually inherits from the surrounding text.
 */
export function Glyph({
  className,
  size = 38,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <circle cx="32" cy="32" r="28" strokeWidth={2} opacity={0.42} />
      <path d="M32 52c-5 0-9-2-12-5M32 52c5 0 9-2 12-5" />
      <path d="M32 52V30" />
      <path d="M32 34l-9-8M32 34l9-8" />
      <path d="M23 26l-6-5M23 26l-2-8M41 26l6-5M41 26l2-8" />
      <path d="M32 30v-9" />
      <path d="M14 27a19 19 0 0 1 36 0" strokeWidth={2} opacity={0.7} />
      <circle cx="21" cy="33" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="43" cy="33" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
