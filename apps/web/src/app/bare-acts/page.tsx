'use client'

import { Suspense, useState, useCallback } from 'react'
import { Search, Filter, ChevronDown, BookOpen, Scale, Gavel, Bookmark, Download, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@nyayavedik/ui/lib/utils'
import { Button } from '@nyayavedik/ui/components/button'
import { Card } from '@nyayavedik/ui/components/card'
import { Badge } from '@nyayavedik/ui/components/badge'
import { SearchBar } from '@nyayavedik/ui/components/search-bar'
import { CategoryTree } from '@nyayavedik/ui/components/category-tree'
import { EmptyState } from '@nyayavedik/ui/components/empty-state'
import { LoadingSkeleton } from '@nyayavedik/ui/components/loading-skeleton'
import { Pagination } from '@nyayavedik/ui/components/pagination'
import { Breadcrumb } from '@nyayavedik/ui/components/breadcrumb'
import { LanguageSelector } from '@nyayavedik/ui/components/language-selector'
import { ActCard } from '@nyayavedik/ui/components/act-card'

const jurisdictions = [
  { value: 'all', label: 'All Jurisdictions', count: 10234 },
  { value: 'central', label: 'Central Acts', count: 4521 },
  { value: 'state', label: 'State Acts', count: 3892 },
  { value: 'subordinate', label: 'Subordinate Legislation', count: 1821 }
]

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const categories = [
  { id: 'criminal', label: 'Criminal Law', count: 2341, children: [
    { id: 'ipc', label: 'Indian Penal Code / BNS', count: 511 },
    { id: 'crpc', label: 'CrPC / BNSS', count: 484 },
    { id: 'evidence', label: 'Evidence Act / BSA', count: 167 },
    { id: 'special', label: 'Special Criminal Laws', count: 1179 }
  ]},
  { id: 'civil', label: 'Civil Law', count: 3421, children: [
    { id: 'cpc', label: 'CPC', count: 158 },
    { id: 'contract', label: 'Contract Act', count: 267 },
    { id: 'property', label: 'Property Laws', count: 892 },
    { id: 'family', label: 'Family Laws', count: 456 },
    { id: 'consumer', label: 'Consumer Protection', count: 234 }
  ]},
  { id: 'constitutional', label: 'Constitutional Law', count: 1876, children: [
    { id: 'constitution', label: 'Constitution of India', count: 395 },
    { id: 'fundamental', label: 'Fundamental Rights', count: 234 },
    { id: 'directive', label: 'Directive Principles', count: 189 },
    { id: 'judicial', label: 'Judicial Review', count: 1058 }
  ]},
  { id: 'corporate', label: 'Corporate & Commercial', count: 1543, children: [
    { id: 'companies', label: 'Companies Act 2013', count: 470 },
    { id: 'insolvency', label: 'Insolvency Code', count: 258 },
    { id: 'competition', label: 'Competition Law', count: 189 },
    { id: 'securities', label: 'Securities Laws', count: 345 },
    { id: 'gst', label: 'GST Act', count: 281 }
  ]},
  { id: 'tax', label: 'Taxation', count: 1049, children: [
    { id: 'income', label: 'Income Tax Act', count: 298 },
    { id: 'gst', label: 'GST', count: 412 },
    { id: 'customs', label: 'Customs Act', count: 189 },
    { id: 'state', label: 'State Taxes', count: 150 }
  ]}
]

const mockActs = Array.from({ length: 20 }, (_, i) => ({
  id: `act-${i + 1}`,
  title: [
    'The Bharatiya Nyaya Sanhita, 2023',
    'The Bharatiya Nagarik Suraksha Sanhita, 2023',
    'The Bharatiya Sakshya Adhiniyam, 2023',
    'The Constitution of India',
    'The Indian Contract Act, 1872',
    'The Transfer of Property Act, 1882',
    'The Specific Relief Act, 1963',
    'The Limitation Act, 1963',
    'The Companies Act, 2013',
    'The Insolvency and Bankruptcy Code, 2016',
    'The Goods and Services Tax Act, 2017',
    'The Income Tax Act, 1961',
    'The Consumer Protection Act, 2019',
    'The Arbitration and Conciliation Act, 1996',
    'The Right to Information Act, 2005',
    'The Prevention of Corruption Act, 1988',
    'The Juvenile Justice Act, 2015',
    'The Protection of Children from Sexual Offences Act, 2012',
    'The Information Technology Act, 2000',
    'The Environment Protection Act, 1986'
  ][i],
  shortTitle: [
    'BNS', 'BNSS', 'BSA', 'Constitution', 'Contract Act', 'TP Act', 'Specific Relief Act',
    'Limitation Act', 'Companies Act', 'IBC', 'GST Act', 'IT Act', 'Consumer Protection Act',
    'Arbitration Act', 'RTI Act', 'PCA', 'JJ Act', 'POCSO Act', 'IT Act', 'EP Act'
  ][i],
  year: [2023, 2023, 2023, 1950, 1872, 1882, 1963, 1963, 2013, 2016, 2017, 1961, 2019, 1996, 2005, 1988, 2015, 2012, 2000, 1986][i],
  number: ['45', '46', '47', '', '9', '4', '47', '36', '18', '31', '12', '43', '35', '26', '22', '49', '2', '32', '21', '29'][i],
  jurisdiction: (i < 3 ? 'central' : i < 10 ? 'central' : i < 15 ? 'state' : 'subordinate') as 'central' | 'state' | 'subordinate',
  state: i >= 10 && i < 15 ? 'Maharashtra' : i >= 15 ? 'Delhi' : undefined,
  language: 'en',
  availableLanguages: ['en', 'hi', 'gu', 'mr', 'ta', 'te'],
  sections: Array.from({ length: Math.floor(Math.random() * 200) + 50 }, (_, j) => ({
    number: `Section ${j + 1}`,
    title: `Section ${j + 1} Title`
  })),
  bookmarked: i % 3 === 0,
  downloaded: i % 5 === 0
}))

function BareActsLibraryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [jurisdiction, setJurisdiction] = useState(searchParams.get('jurisdiction') || 'all')
  const [state, setState] = useState(searchParams.get('state') || '')
  const [language, setLanguage] = useState(searchParams.get('lang') || 'en')
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    const params = new URLSearchParams(searchParams)
    if (query) params.set('q', query)
    else params.delete('q')
    params.set('page', '1')
    router.push(`/bare-acts?${params.toString()}`)
  }, [router, searchParams])

  const handleFilterChange = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    params.set('page', '1')
    router.push(`/bare-acts?${params.toString()}`)
  }, [router, searchParams])

  const filteredActs = mockActs.filter((act) => {
    const matchesSearch = !searchQuery ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.shortTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJurisdiction = jurisdiction === 'all' || act.jurisdiction === jurisdiction
    const matchesState = !state || act.state === state
    const matchesLanguage = act.availableLanguages.includes(language)
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.some((cat) => act.title.toLowerCase().includes(cat.toLowerCase()))
    return matchesSearch && matchesJurisdiction && matchesState && matchesLanguage && matchesCategory
  })

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Bare Acts', href: '/bare-acts', current: true }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbs} />

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Bare Acts Library</h1>
            <p className="mt-1 text-text-secondary">
              {filteredActs.length} acts available — Search, filter, and read in 12+ languages
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSelector
              variant="compact"
              value={language}
              onChange={(lang) => handleFilterChange('lang', lang)}
              availableLanguages={['en', 'hi', 'gu', 'mr', 'pa', 'bn', 'or', 'ta', 'te', 'kn', 'ml', 'ne']}
            />
            <Button variant="secondary" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <SearchBar
                variant="contextual"
                placeholder="Search acts..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                loading={loading}
              />

              {/* Jurisdiction Filter */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Jurisdiction</h3>
                <div className="space-y-2">
                  {jurisdictions.map((j) => (
                    <label key={j.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="jurisdiction"
                        value={j.value}
                        checked={jurisdiction === j.value}
                        onChange={() => handleFilterChange('jurisdiction', j.value)}
                        className="h-4 w-4 accent-accent"
                      />
                      <span className="text-sm text-text-secondary">{j.label}</span>
                      <span className="ml-auto text-xs text-text-muted">{j.count.toLocaleString()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* State Filter */}
              {jurisdiction === 'state' && (
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">State</h3>
                  <select
                    value={state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="w-full rounded-lg border border-border-input bg-background px-3 py-2 text-sm text-text-primary focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
                  >
                    <option value="">All States</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Category Tree */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Categories</h3>
                <CategoryTree
                  nodes={categories}
                  variant="multi-select"
                  selectedIds={selectedCategories}
                  onSelect={setSelectedCategories}
                  searchable
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
              <div className="text-sm text-text-secondary">
                Showing {filteredActs.length} of {mockActs.length} acts
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <LoadingSkeleton key={i} variant="card" />
                ))}
              </div>
            ) : filteredActs.length === 0 ? (
              <EmptyState
                variant="no-results"
                title="No acts found"
                description="Try adjusting your search terms or filters"
                action={{ label: 'Clear all filters', onClick: () => router.push('/bare-acts') }}
              />
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredActs.map((act) => (
                      <ActCard
                        key={act.id}
                        act={act}
                        onBookmark={() => {}}
                        onDownload={() => {}}
                        onClick={() => router.push(`/bare-acts/${act.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredActs.map((act) => (
                      <Link
                        key={act.id}
                        href={`/bare-acts/${act.id}`}
                        className="block"
                      >
                        <Card variant="hover" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <Badge variant={act.jurisdiction === 'central' ? 'primary' : act.jurisdiction === 'state' ? 'success' : 'warning'} size="sm">
                                {act.jurisdiction === 'central' ? 'Central' : act.jurisdiction === 'state' ? 'State' : 'Subordinate'}
                              </Badge>
                              {act.year && <span className="text-xs text-text-muted">{act.year}</span>}
                            </div>
                            <h3 className="font-semibold text-text-primary truncate sm:max-w-md">
                              {act.shortTitle || act.title}
                            </h3>
                            {act.shortTitle && (
                              <p className="text-sm text-text-secondary truncate">{act.title}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 sm:ml-4">
                            <span className="flex items-center gap-1 text-sm text-text-muted">
                              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                              {act.language.toUpperCase()}
                              {act.availableLanguages.length > 1 && <span className="ml-1">+{act.availableLanguages.length - 1}</span>}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-text-muted">
                              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                              {act.sections?.length || 0} sections
                            </span>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}

                <Pagination
                  currentPage={page}
                  totalPages={5}
                  onPageChange={setPage}
                  showTotal
                  totalItems={filteredActs.length}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function BareActsLibraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BareActsLibraryContent />
    </Suspense>
  )
}