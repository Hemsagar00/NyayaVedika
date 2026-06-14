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
    default: "NyayaVedika — case law search and structured drafting for the Anantapur Bar",
    template: "%s | NyayaVedika",
  },
  description:
    "A working advocate's tool for case law, ratio decidendi, and first-draft petitions. Built and used by Adv. S. Nagendra Naik, Anantapur Bar.",
  keywords: [
    "Indian case law",
    "ratio decidendi",
    "Anantapur advocate",
    "Anticipatory bail",
    "Revenue AP",
    "Adangal Pahani",
    "Legal drafting AP",
    "Telugu legal",
  ],
  authors: [{ name: "Adv. S. Nagendra Naik", url: "https://nagalawchambers.com" }],
  creator: "Adv. S. Nagendra Naik",
  publisher: "Naga Law Chambers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nyayavedika.in",
    siteName: "NyayaVedika",
    title: "NyayaVedika — case law and drafting, used in chamber",
    description:
      "What Adv. S. Nagendra Naik uses to research, draft, and file from Anantapur.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
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
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
