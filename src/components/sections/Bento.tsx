import { Photo } from "@/components/media/Photo";

/**
 * Gapless bento.
 *
 * Four columns by three rows is twelve cells. The five cards claim
 * 4 + 2 + 2 + 2 + 2 = 12 between them, so the grid fills exactly with no
 * dead cell. `grid-flow-dense` keeps it that way if a card is ever
 * reordered.
 *
 *   row 1   A A B B
 *   row 2   A A C C
 *   row 3   D D E E
 */
export function Bento() {
  return (
    <div className="grid auto-rows-[minmax(11rem,auto)] grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* A */}
      <article className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
        <Photo
          slug="warehouse-jute-wall"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="photo-graded absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/30 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
            The stock is under our own roof
          </h3>
          <p className="mt-3 max-w-md text-[color:var(--color-bone)]/70">
            Not a broker&rsquo;s promise against someone else&rsquo;s
            warehouse. What we sell is what is stacked and accounted for.
          </p>
        </div>
      </article>

      {/* B */}
      <article className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06] sm:p-8">
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
          We can export in our own name
        </h3>
        <p className="mt-3 text-[color:var(--color-bone)]/70">
          If you would rather not incorporate in Guinea-Bissau or take out a
          licence, we can organise the shipment on your behalf, subject to
          contractual and regulatory validation.
        </p>
      </article>

      {/* C */}
      <article className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06] sm:p-8">
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
          Graded and tagged lot by lot
        </h3>
        <p className="mt-3 text-[color:var(--color-bone)]/70">
          Every lot is received, graded and tagged on arrival, so a
          consignment can be traced back to what was bought and where.
        </p>
      </article>

      {/* D */}
      <article className="group relative col-span-2 overflow-hidden rounded-2xl">
        <Photo
          slug="quay-trailer-unload"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="photo-graded absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/65" />
        <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
          <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
            One counterparty to the quay
          </h3>
          <p className="mt-3 text-[color:var(--color-bone)]/70">
            Buying, haulage, storage, stuffing and loading answer to the same
            name.
          </p>
        </div>
      </article>

      {/* E */}
      <article className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.06] sm:p-8">
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
          Visibility without a plane ticket
        </h3>
        <p className="mt-3 text-[color:var(--color-bone)]/70">
          Stock, lots, contracts and shipment milestones in one client
          portal, so you can see where a consignment stands from wherever you
          are.
        </p>
      </article>
    </div>
  );
}
