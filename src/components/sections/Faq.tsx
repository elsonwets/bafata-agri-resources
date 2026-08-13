import { FAQ } from "@/data/faq";

/**
 * Native details and summary rather than JS-driven accordion state.
 *
 * Every answer is in the markup and openable with no JavaScript, which
 * matters twice over: buyers on a constrained connection can still read
 * it, and a crawler sees the answers rather than an empty shell.
 */
export function Faq() {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {FAQ.map((entry) => (
        <details key={entry.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-lg font-medium tracking-tight transition-colors hover:text-[color:var(--color-gold)] sm:text-xl [&::-webkit-details-marker]:hidden">
            <h3 className="max-w-3xl">{entry.question}</h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl leading-none text-[color:var(--color-bone)]/40 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-base leading-relaxed text-[color:var(--color-bone)]/70 sm:text-lg">
            {entry.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
