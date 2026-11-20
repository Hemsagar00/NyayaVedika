import Link from 'next/link'
import { Scale, BookOpen, Gavel, Bot, FileText, Search, Globe, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@nyayavedik/ui/components/button'
import { Card } from '@nyayavedik/ui/components/card'

const features = [
  {
    icon: BookOpen,
    title: '10,000+ Bare Acts',
    description: 'Central, State & Subordinate legislation with multi-language support (12+ Indian languages)',
    href: '/bare-acts'
  },
  {
    icon: Gavel,
    title: 'Supreme & High Court Judgments',
    description: 'Search judgments with PDF viewer, citations, and AI-powered summaries',
    href: '/judgments'
  },
  {
    icon: Bot,
    title: 'Verifiable AI Legal Search',
    description: 'Natural language queries with paragraph-level citations — no hallucinations',
    href: '/ai-search'
  },
  {
    icon: FileText,
    title: 'Legal Drafts Library',
    description: '10,000+ templates across Civil, Criminal, Notices, Petitions, Agreements & more',
    href: '/drafts'
  },
  {
    icon: Search,
    title: 'Law Converters (IPC↔BNS, CrPC↔BNSS, IEA↔BSA)',
    description: 'Side-by-side section mapping with official legislative updates',
    href: '/tools/converters'
  },
  {
    icon: Globe,
    title: 'Constitution of India (Updated 2026)',
    description: 'Full Constitution with amendments, article cross-references, and multi-language',
    href: '/constitution'
  }
]

const stats = [
  { value: '10,000+', label: 'Bare Acts' },
  { value: '1M+', label: 'Judgments' },
  { value: '12+', label: 'Languages' },
  { value: '50K+', label: 'Legal Drafts' }
]

const trustBadges = [
  'India Code Official Source',
  'Legislative Department Verified',
  'eCourts Integrated',
  'DPDP Act Compliant',
  'WCAG AA Accessible',
  'Open Source Core'
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Now in Public Beta — Free for Students & Researchers
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Verifiable AI Legal Research{' '}
              <span className="text-accent">for Indian Law</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              Search 10,000+ Bare Acts, Supreme Court & High Court judgments, and legal drafts.
              Get AI-powered answers with paragraph-level citations you can verify.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start Free Research
                </Button>
              </Link>
              <Link href="/bare-acts">
                <Button variant="secondary" size="lg">
                  Browse Bare Acts
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                100+ free searches/month
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-surface/50 border-y border-border">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="text-3xl font-bold text-text-primary sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1 text-sm text-text-secondary">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Everything you need for legal research
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Built for advocates, law students, judiciary aspirants, and legal professionals
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="group">
                <Link href={feature.href} className="block">
                  <Card variant="hover" className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-surface/50 border-y border-border">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Trusted by legal professionals
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
            {trustBadges.map((badge) => (
              <span key={badge} className="whitespace-nowrap">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Ready to research smarter?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Join thousands of legal professionals using Nyaya Vedik for verifiable, citation-backed research.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Create Free Account
                </Button>
              </Link>
              <Link href="/bare-acts">
                <Button variant="secondary" size="lg">
                  Explore Bare Acts First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}