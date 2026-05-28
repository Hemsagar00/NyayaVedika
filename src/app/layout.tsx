import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyayavedika.in"),
  title: {
    default: "NyayaVedika — AI Indian Legal Search \u0026 High-Fidelity Drafting Suite",
    template: "%s | NyayaVedika",
  },
  description: "NyayaVedika is the premier legal-tech workspace for Indian advocates. AI-powered case law search, structured judgment analysis, and 5-step legal drafting — purpose-built for elite litigation chambers.",
  keywords: ["Indian Legal Tech", "Legal Drafting", "Case Law Search", "Ratio Decidendi", "Supreme Court Judgments", "AI Legal Research"],
  authors: [{ name: "NyayaVedika Cognitive Systems", url: "https://nyayavedika.in" }],
  creator: "NyayaVedika Team",
  publisher: "NyayaVedika Cognitive Systems",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nyayavedika.in",
    siteName: "NyayaVedika",
    title: "NyayaVedika — AI Indian Legal Intelligence",
    description: "AI-powered case law search, structured judgment analysis, and high-fidelity legal drafting for Indian advocates.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NyayaVedika — AI Legal Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NyayaVedika — AI Indian Legal Intelligence",
    description: "AI-powered case law search, structured judgment analysis, and high-fidelity legal drafting.",
    images: ["/og-image.png"],
    creator: "@nyayavedika",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
