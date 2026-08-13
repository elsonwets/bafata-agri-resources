"use client";

import { useState } from "react";
import { COMPANY } from "@/config/company";

type Status = "idle" | "sending" | "sent" | "error";

const INCOTERMS = ["FOB Bissau", "CFR", "CIF", "Not decided"];

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[color:var(--color-bone)] placeholder:text-[color:var(--color-bone)]/35 focus:border-[color:var(--color-gold)] focus:outline-none";
const label =
  "block text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--color-bone)]/50";

/**
 * Contact form.
 *
 * Posts to Formspree when an endpoint is configured, and otherwise falls
 * back to a prefilled mailto. The fallback matters: a static export with
 * an unset environment variable would otherwise present a form that
 * silently swallows enquiries.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!COMPANY.formspree) {
      // No endpoint configured: hand the enquiry to the mail client
      // rather than pretending it was delivered.
      event.preventDefault();
      const body = [...data.entries()]
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href =
        `mailto:${COMPANY.email}` +
        `?subject=${encodeURIComponent("Raw cashew nuts - campaign enquiry")}` +
        `&body=${encodeURIComponent(body)}`;
      return;
    }

    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(COMPANY.formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending the message.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[color:var(--color-gold)]/40 bg-[color:var(--color-gold)]/10 p-8"
      >
        <p className="text-xl font-medium">Thank you, we have it.</p>
        <p className="mt-2 text-[color:var(--color-bone)]/70">
          We will come back to you with what we can commit to for the coming
          campaign.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 sm:grid-cols-2"
      noValidate={false}
    >
      <div className="sm:col-span-1">
        <label className={label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className={`${field} mt-2`}
          placeholder="Your name"
        />
      </div>

      <div className="sm:col-span-1">
        <label className={label} htmlFor="company">
          Company
        </label>
        <input
          id="company"
          name="company"
          required
          autoComplete="organization"
          className={`${field} mt-2`}
          placeholder="Company name"
        />
      </div>

      <div className="sm:col-span-1">
        <label className={label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`${field} mt-2`}
          placeholder="you@company.com"
        />
      </div>

      <div className="sm:col-span-1">
        <label className={label} htmlFor="destination">
          Destination country
        </label>
        <input
          id="destination"
          name="destination"
          required
          autoComplete="country-name"
          className={`${field} mt-2`}
          placeholder="Where the container is going"
        />
      </div>

      <div className="sm:col-span-1">
        <label className={label} htmlFor="volume">
          Volume sought
        </label>
        <input
          id="volume"
          name="volume"
          className={`${field} mt-2`}
          placeholder="Containers or tonnes"
        />
      </div>

      <div className="sm:col-span-1">
        <label className={label} htmlFor="incoterm">
          Incoterm
        </label>
        <select id="incoterm" name="incoterm" className={`${field} mt-2`}>
          {INCOTERMS.map((t) => (
            <option key={t} value={t} className="bg-[color:var(--color-ink)]">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor="message">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} mt-2 resize-y`}
          placeholder="Timing, grading requirements, questions"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="sm:col-span-2 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error} You can also write to{" "}
          <a className="underline" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>
          .
        </p>
      )}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-[color:var(--color-gold)] px-7 py-3.5 font-semibold text-[color:var(--color-ink)] transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Send enquiry"}
        </button>

        {/* Rendered only once a real number exists. */}
        {COMPANY.whatsapp && (
          <a
            href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
            className="rounded-full border border-[color:var(--color-bone)]/35 px-7 py-3.5 font-medium transition-colors hover:border-[color:var(--color-bone)] hover:bg-white/5"
          >
            Message on WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
