import { COMPANY } from "@/config/company";
import { EmblemMark } from "./EmblemMark";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <EmblemMark className="w-14 text-[color:var(--color-bone)]" />
          <p className="mt-5 text-lg font-medium">{COMPANY.legalName}</p>
          <p className="mt-1 text-[color:var(--color-bone)]/50">
            Raw cashew nut exports, Guinea-Bissau
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-[color:var(--color-bone)]/75">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="transition-colors hover:text-[color:var(--color-gold)]"
                >
                  {COMPANY.email}
                </a>
              </li>
              {COMPANY.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
                    className="transition-colors hover:text-[color:var(--color-gold)]"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/40">
              Campaign
            </p>
            <ul className="mt-4 space-y-2 text-[color:var(--color-bone)]/75">
              <li>Preparation opens {COMPANY.campaign.preparation}</li>
              <li>Official opening {COMPANY.campaign.opening}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[100rem] px-6 text-sm text-[color:var(--color-bone)]/35 sm:px-10">
        <p>
          &copy; {new Date().getFullYear()} {COMPANY.legalName}. Bissau,
          Guinea-Bissau.
        </p>
      </div>
    </footer>
  );
}
