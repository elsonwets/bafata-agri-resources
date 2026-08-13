import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { COMPANY } from "@/config/company";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default:
      "Raw Cashew Nut Exporter in Guinea-Bissau | Bafata Agri Resources",
    template: "%s | Bafata Agri Resources",
  },
  description:
    "Bafata Agri Resources buys raw cashew nuts village by village in " +
    "Guinea-Bissau and ships them by the container to India, the UAE and " +
    "Vietnam. One counterparty from village scales to vessel hold.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    url: COMPANY.url,
    title: "Raw cashew nuts from Guinea-Bissau, without a company there",
    description:
      "We buy village by village, grade and store in Bafata, stuff at our " +
      "own warehouse and load at the port of Bissau.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raw cashew nuts from Guinea-Bissau, without a company there",
    description:
      "RCN sourced village by village in Guinea-Bissau and loaded at the " +
      "port of Bissau for India, the UAE and Vietnam.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
