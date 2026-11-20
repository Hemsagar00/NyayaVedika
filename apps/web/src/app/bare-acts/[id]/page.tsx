'use client'

import { useState, useCallback } from 'react'
import { Search, Bookmark, Download, Globe, FontSize, ChevronLeft, ChevronRight, Share2, Print, Copy, Scale } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@nyayavedik/ui/lib/utils'
import { Button } from '@nyayavedik/ui/components/button'
import { Card } from '@nyayavedik/ui/components/card'
import { Badge } from '@nyayavedik/ui/components/badge'
import { Breadcrumb } from '@nyayavedik/ui/components/breadcrumb'
import { SectionViewer } from '@nyayavedik/ui/components/section-viewer'
import { LanguageSelector } from '@nyayavedik/ui/components/language-selector'
import { EmptyState } from '@nyayavedik/ui/components/empty-state'
import { LoadingSkeleton } from '@nyayavedik/ui/components/loading-skeleton'
import { Modal } from '@nyayavedik/ui/components/modal'
import { toast } from '@nyayavedik/ui/components/toast'

const mockAct = {
  id: 'act-1',
  title: 'The Bharatiya Nyaya Sanhita, 2023',
  shortTitle: 'BNS',
  year: 2023,
  number: '45',
  jurisdiction: 'central',
  language: 'en',
  availableLanguages: ['en', 'hi', 'gu', 'mr', 'ta', 'te', 'kn', 'ml', 'bn', 'pa', 'or', 'ne'],
  sections: Array.from({ length: 358 }, (_, i) => ({
    number: `Section ${i + 1}`,
    title: `Section ${i + 1} - ${['Of Offences Against the Human Body', 'Of Offences Against Property', 'Of Offences Against Public Tranquillity', 'Of Offences Relating to Documents', 'Of Offences Relating to Elections', 'General Exceptions'][i % 6]}`,
    content: `This is the content of section ${i + 1}. It contains the legal text of the section with detailed provisions. The content can be quite long and detailed, covering various aspects of the law. For example, this section defines the punishment for various offences and provides illustrations for better understanding.`
  }))
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Bare Acts', href: '/bare-acts' },
  { label: 'BNS', href: '/bare-acts/act-1', current: true }
]

export default function BareActViewerPage() {
  const params = useParams()
  const router = useRouter()
  const actId = params.id as string
  const [act, setAct] = useState<typeof mockAct | null>(null)
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base')
  const [language, setLanguage] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setAct(mockAct)
      setLoading(false)
    }, 500)
  })

  const handleBookmark = useCallback(() => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Bookmark removed' : 'Act bookmarked')
  }, [bookmarked])

  const handleDownload = useCallback(() => {
    toast.success('Download started for offline reading')
  }, [])

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: act?.title,
        text: `Reading ${act?.shortTitle} on Nyaya Vedik`,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
    }
  }, [act])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
          <div className="mt-8 space-y-6">
            <LoadingSkeleton variant="rectangular" className="h-8 w-1/3" />
            <LoadingSkeleton variant="rectangular" className="h-4 w-1/4" />
            <LoadingSkeleton variant="card" />
          </div>
        </div>
      </div>
    )
  )

  if (!act) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
          <EmptyState
            variant="error"
            title="Act not found"
            description="The requested act could not be found. It may have been moved or repealed."
            action={{ label: 'Back to Bare Acts', onClick: () => router.push('/bare-acts') }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbs} />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{act.jurisdiction === 'central' ? 'Central Act' : act.jurisdiction === 'state' ? 'State Act' : 'Subordinate'}</Badge>
              <Badge variant="secondary">{act.year}</Badge>
              {act.number && <Badge variant="neutral">No. {act.number}</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-text-primary">{act.shortTitle || act.title}</h1>
            {act.shortTitle && <p className="mt-1 text-text-secondary">{act.title}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageSelector
              variant="dropdown"
              value={language}
              onChange={setLanguage}
              availableLanguages={act.availableLanguages}
            />
            <div className="flex items-center gap-2">
              <FontSize className="h-4 w-4 text-text-muted" aria-hidden="true" />
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value as 'sm' | 'base' | 'lg' | 'xl')}
                className="rounded-lg border border-border-input bg-background px-2 py-1.5 text-sm text-text-primary focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
                aria-label="Font size"
              >
                <option value="sm">Small</option>
                <option value="base">Normal</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBookmark} aria-pressed={bookmarked}>
              <Bookmark className={cn('h-5 w-5', bookmarked ? 'fill-accent text-accent' : 'text-text-muted')} aria-hidden="true" />
              <span className="hidden sm:inline">{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePrint}>
              <Print className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <SectionViewer
            sections={act.sections}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onBookmark={(sectionId) => toast.success('Section bookmarked')}
            fontSize={fontSize}
            language={language}
            availableLanguages={act.availableLanguages}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>

      <Modal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share this Act"
        description="Copy the link or share via your preferred app"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Shareable Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 rounded-lg border border-border-input bg-background px-3 py-2 text-sm text-text-primary"
              />
              <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied') }}>
                <Copy className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => { navigator.share({ title: act.title, url: window.location.href }); setShowShareModal(false) }}>
              Native Share
            </Button>
            <Button onClick={() => setShowShareModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}