import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4, JetBrains_Mono, Noto_Sans_Devanagari, Noto_Sans_Gujarati, Noto_Sans_Tamil, Noto_Sans_Telugu, Noto_Sans_Kannada, Noto_Sans_Malayalam, Noto_Sans_Bengali, Noto_Sans_Gurmukhi, Noto_Sans_Oriya } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Toaster } from './components/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap'
})

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap'
})

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-tamil',
  display: 'swap'
})

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap'
})

const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  variable: '--font-kannada',
  display: 'swap'
})

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  variable: '--font-malayalam',
  display: 'swap'
})

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap'
})

const notoPunjabi = Noto_Sans_Gurmukhi({
  subsets: ['gurmukhi'],
  variable: '--font-punjabi',
  display: 'swap'
})

const notoOriya = Noto_Sans_Oriya({
  subsets: ['oriya'],
  variable: '--font-odia',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Nyaya Vedik — Verifiable AI Legal Research for Indian Law',
    template: '%s | Nyaya Vedik'
  },
  description: 'India\'s most trusted legal research platform. Search 10,000+ Bare Acts, Supreme Court & High Court judgments, legal drafts, and get AI-powered answers with verifiable citations. Free for students, affordable for practitioners.',
  keywords: ['Indian law', 'bare acts', 'supreme court judgments', 'high court judgments', 'legal research', 'AI legal search', 'legal drafts', 'BNS', 'BNSS', 'BSA', 'Constitution of India'],
  authors: [{ name: 'Naga Law Chambers Tech' }],
  creator: 'Naga Law Chambers Tech',
  publisher: 'Nyaya Vedik',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nyayavedika.in',
    siteName: 'Nyaya Vedik',
    title: 'Nyaya Vedik — Verifiable AI Legal Research for Indian Law',
    description: 'Search 10,000+ Bare Acts, judgments, drafts with AI-powered verifiable citations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nyaya Vedik - Legal Research Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyaya Vedik — Verifiable AI Legal Research',
    description: 'India\'s most trusted legal research platform with AI-powered verifiable citations.',
    images: ['/og-image.png']
  },
  verification: {
    google: 'google-site-verification-code'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${notoDevanagari.variable} ${notoGujarati.variable} ${notoTamil.variable} ${notoTelugu.variable} ${notoKannada.variable} ${notoMalayalam.variable} ${notoBengali.variable} ${notoPunjabi.variable} ${notoOriya.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://nyayavedika.in" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}