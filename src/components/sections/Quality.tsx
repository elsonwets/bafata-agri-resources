import { quality } from "@/data/content";
import { CheckIcon, Heading, Photo } from "@/components/ui";

export function Quality() {
  const [param, target, market, ours] = quality.table.head;

  return (
    <section id="quality" aria-labelledby="quality-title" className="defer section bg-raised">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <Heading id="quality-title">{quality.heading.join(" ")}</Heading>
          <p className="t-lead max-w-[34rem]">{quality.lead}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="overflow-x-auto rounded-[24px] bg-canvas p-2 sm:p-3">
            <table className="num w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">
                Raw cashew quality parameters: contract target, typical market range and the range our lots deliver
              </caption>
              <thead>
                <tr className="text-muted">
                  <th scope="col" className="px-4 py-4 font-medium">{param}</th>
                  <th scope="col" className="px-4 py-4 font-medium">{target}</th>
                  <th scope="col" className="px-4 py-4 font-medium">{market}</th>
                  <th scope="col" className="rounded-t-[16px] bg-shell-tint px-4 py-4 font-semibold text-shell">{ours}</th>
                </tr>
              </thead>
              <tbody>
                {quality.table.rows.map((r, i, all) => (
                  <tr key={r.param} className="border-t border-line">
                    <th scope="row" className="px-4 py-4 font-medium">{r.param}</th>
                    <td className="px-4 py-4 text-ink-soft">{r.target}</td>
                    <td className="px-4 py-4 text-ink-soft">{r.market}</td>
                    <td
                      className={
                        "bg-shell-tint px-4 py-4 font-semibold text-shell" +
                        (i === all.length - 1 ? " rounded-b-[16px]" : "")
                      }
                    >
                      {r.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Photo
            slug="weighbridge-weighing"
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="min-h-72 rounded-[24px]"
          />
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {quality.points.map((p) => (
            <li key={p.title}>
              <CheckIcon className="text-navy" />
              <h3 className="mt-4 text-[1.0625rem] font-semibold tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>

        <p className="t-statement mt-20 max-w-[30ch]">{quality.claim}</p>
      </div>
    </section>
  );
}
