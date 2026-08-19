import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyayavedika.in"),
  title: {
    default: "NyayaVedika — Case Law Search & Structured Drafting for Advocates",
    template: "%s | NyayaVedika",
  },
  description:
    "State the issue. Get ranked citations with verbatim ratio decidendi. Generate registry-ready first drafts. Built for Indian advocates — Anantapur Bar and beyond.",
  keywords: [
    "Indian case law",
    "ratio decidendi",
    "Anticipatory bail",
    "Revenue AP",
    "Adangal Pahani",
    "Legal drafting",
    "CrPC 438",
    "Hindu Succession",
    "Anantapur advocate",
  ],
  authors: [{ name: "NyayaVedika", url: "https://nyayavedika.in" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nyayavedika.in",
    siteName: "NyayaVedika",
    title: "NyayaVedika — Case Law & Drafting for the Bar",
    description:
      "Case law search with verbatim ratios + structured first drafts for Indian pleadings.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${plex.variable} ${jet.variable}`}
    >
      <body className="min-h-screen antialiased">
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
