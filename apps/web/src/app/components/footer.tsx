import Link from 'next/link'
import { Scale, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Bare Acts', href: '/bare-acts' },
    { name: 'Judgments', href: '/judgments' },
    { name: 'AI Search', href: '/ai-search' },
    { name: 'Legal Drafts', href: '/drafts' },
    { name: 'Tools', href: '/tools' },
    { name: 'Constitution', href: '/constitution' }
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/community' },
    { name: 'Changelog', href: '/changelog' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'DPDP Compliance', href: '/dpdp' }
  ]
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/nyayavedik', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nyayavedik', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Hemsagar00/NyayaVedika', icon: Github },
  { name: 'Email', href: 'mailto:contact@nyayavedika.in', icon: Mail }
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="Nyaya Vedik Home">
              <Scale className="h-8 w-8 text-accent" aria-hidden="true" />
              <span className="font-serif text-xl font-semibold text-text-primary">Nyaya Vedik</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary max-w-xs">
              India's most trusted legal research platform. Verifiable AI answers with paragraph-level citations.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product links">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources links">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} Nyaya Vedik. All rights reserved.
            </p>
            <p className="text-sm text-text-muted">
              Not legal advice. See <Link href="/disclaimer" className="underline hover:text-text-primary">Disclaimer</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}