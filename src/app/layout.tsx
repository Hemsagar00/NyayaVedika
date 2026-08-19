import type { Metadata } from "next";
import { Outfit, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const source = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
  style: ["normal", "italic"],
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyayavedika.in"),
  title: {
    default: "NyayaVedika | Case law and first drafts for the Anantapur Bar",
    template: "%s | NyayaVedika",
  },
  description:
    "A working advocate's desk for Indian case law, ratio decidendi, and first-draft pleadings. Built for chamber use at Naga Law Chambers, Anantapur.",
  keywords: [
    "Indian case law",
    "Anantapur advocate",
    "anticipatory bail",
    "Adangal",
    "Pahani",
    "legal drafting Andhra Pradesh",
    "ratio decidendi",
  ],
  authors: [{ name: "Adv. S. Nagendra Naik", url: "https://nagalawchambers.com" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nyayavedika.in",
    siteName: "NyayaVedika",
    title: "NyayaVedika | Find the ratio. File the first draft.",
    description:
      "Case law with the ratio already pulled, and a first draft in the format the registry accepts.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${source.variable} ${ibm.variable}`}>
      <body className="min-h-[100dvh] antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
