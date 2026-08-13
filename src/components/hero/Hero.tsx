import { Photo } from "@/components/media/Photo";

/**
 * Editorial split. The H1 gets an ultra-wide container so it flows in
 * two lines and never stacks into a narrow column of text.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20 sm:pt-40"
    >
      {/* Ambient wash rather than a flat fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, #1b2a5e 0%, transparent 55%), radial-gradient(90% 70% at 90% 80%, rgba(201,162,39,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-[100rem] px-6 sm:px-10">
        {/*
          The headline spans the full width rather than sitting in the
          left column. Constrained to half the grid it wrapped to four
          lines at 1440px; given the whole measure each sentence lands on
          one line, which is the only acceptable result for a hero.
        */}
        <h1
          className="w-full font-medium leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.1rem, 4.6vw, 4.9rem)" }}
        >
          Raw cashew nuts from Guinea-Bissau.
          <span className="block text-[color:var(--color-jute)]">
            Without a company in Guinea-Bissau.
          </span>
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-[color:var(--color-bone)]/70 sm:text-xl">
              We buy village by village, grade and store in Bafat&aacute;,
              stuff at our own warehouse and load at the port of Bissau. Where
              you&rsquo;d rather not incorporate here, we can ship in our own
              name.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-[color:var(--color-gold)] px-7 py-3.5 text-base font-semibold text-[color:var(--color-ink)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a conversation
              </a>
              <a
                href="#chain"
                className="rounded-full border border-[color:var(--color-bone)]/35 px-7 py-3.5 text-base font-medium text-[color:var(--color-bone)] transition-colors duration-300 hover:border-[color:var(--color-bone)] hover:bg-white/5"
              >
                Follow the chain
                <span aria-hidden="true" className="ml-2">
                  &darr;
                </span>
              </a>
            </div>
          </div>

          {/*
            The same loaded trailer the Corridor picks up at its second
            beat, so the hero and the sequence read as one continuous
            shot.
          */}
          <div className="overflow-hidden rounded-2xl">
            <Photo
              slug="quay-truck-vessel"
              priority
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="photo-graded aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
