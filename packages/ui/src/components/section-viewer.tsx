'use client'

import * as React from 'react'
import { Search, Bookmark, ChevronDown, ChevronUp, Minus, Plus, Type, Globe } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Badge } from './badge'

export interface Section {
  number: string
  title: string
  content: string
  subSections?: Section[]
  bookmarked?: boolean
}

interface SectionViewerProps {
  sections: Section[]
  initialExpanded?: string[]
  searchQuery?: string
  onSearch?: (query: string) => void
  onBookmark?: (sectionId: string) => void
  fontSize?: 'sm' | 'base' | 'lg' | 'xl'
  language?: string
  onLanguageChange?: (lang: string) => void
  availableLanguages?: string[]
  className?: string
}

const fontSizeClasses = {
  sm: 'text-sm leading-relaxed',
  base: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
  xl: 'text-xl leading-relaxed'
}

export const SectionViewer = React.forwardRef<HTMLDivElement, SectionViewerProps>(
  ({
    sections,
    initialExpanded = [],
    searchQuery,
    onSearch,
    onBookmark,
    fontSize = 'base',
    language = 'en',
    onLanguageChange,
    availableLanguages = ['en'],
    className,
    ...props
  }, ref) => {
    const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
      new Set(initialExpanded)
    )
    const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery || '')

    const handleSearchChange = (value: string) => {
      setLocalSearchQuery(value)
      onSearch?.(value)
    }

    const toggleSection = (sectionNumber: string) => {
      const newExpanded = new Set(expandedSections)
      if (newExpanded.has(sectionNumber)) {
        newExpanded.delete(sectionNumber)
      } else {
        newExpanded.add(sectionNumber)
      }
      setExpandedSections(newExpanded)
    }

    const renderSection = (section: Section, depth = 0): React.ReactElement | null => {
      const isExpanded = expandedSections.has(section.number)
      const hasSubSections = section.subSections && section.subSections.length > 0
      const matchesSearch = !localSearchQuery ||
        section.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        section.content.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        section.number.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        (section.subSections?.some((s) =>
          s.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
          s.content.toLowerCase().includes(localSearchQuery.toLowerCase())
        ))

      if (!matchesSearch && !hasSubSections) return null

      return (
        <div
          key={section.number}
          className={cn(
            'border-l-2 border-border pl-4',
            depth > 0 && 'ml-4'
          )}
        >
          <div className="flex items-start gap-3 py-2">
            <div className="flex-shrink-0 w-20 text-right text-text-muted font-medium">
              {section.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-text-primary">{section.title}</h4>
                {onBookmark && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark?.(section.number) }}
                    aria-label={section.bookmarked ? 'Remove bookmark' : 'Bookmark this section'}
                    aria-pressed={section.bookmarked}
                  >
                    <Bookmark className={cn('h-4 w-4', section.bookmarked ? 'fill-accent text-accent' : '')} aria-hidden="true" />
                  </Button>
                )}
              </div>
              <div
                className={cn(
                  'mt-2 prose prose-sm max-w-none',
                  fontSizeClasses[fontSize],
                  !isExpanded && hasSubSections && 'line-clamp-3'
                )}
                style={{ fontFamily: language !== 'en' ? `var(--font-${language})` : undefined }}
              >
                {section.content}
              </div>
              {hasSubSections && (
                <div className="mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(section.number)}
                    className="text-text-secondary hover:text-text-primary"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" aria-hidden="true" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" aria-hidden="true" />
                        Expand ({section.subSections!.length} sub-sections)
                      </>
                    )}
                  </Button>
                  {isExpanded && (
                    <div className="mt-2 space-y-2">
                      {section.subSections!.map((sub) => renderSection(sub, depth + 1))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    const filteredSections = sections.filter((s) => {
      if (!localSearchQuery) return true
      return (
        s.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        s.content.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        s.number.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        (s.subSections?.some((sub) =>
          sub.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
          sub.content.toLowerCase().includes(localSearchQuery.toLowerCase())
        ))
      )
    })

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        <div className="flex flex-wrap items-center gap-3 p-3 bg-surface-elevated rounded-lg border border-border">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search within act..."
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-border-input bg-background pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
              aria-label="Search within act"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Type className="h-4 w-4 text-text-muted" aria-hidden="true" />
              <select
                value={fontSize}
                onChange={(e) => { /* font size handled by parent */ }}
                className="rounded-lg border border-border-input bg-background px-2 py-1.5 text-sm text-text-primary focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
                aria-label="Font size"
              >
                <option value="sm">Small</option>
                <option value="base">Normal</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            {availableLanguages.length > 1 && onLanguageChange && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-text-muted" aria-hidden="true" />
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="rounded-lg border border-border-input bg-background px-2 py-1.5 text-sm text-text-primary focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
                  aria-label="Language"
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            )}
            {filteredSections.length !== sections.length && (
              <Badge variant="primary" size="sm">
                {filteredSections.length} of {sections.length} sections
              </Badge>
            )}
          </div>
        </div>

        {filteredSections.length === 0 ? (
          <div className="py-12 text-center">
            <Search className="mx-auto h-12 w-12 text-text-muted mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-text-primary">No sections found</h3>
            <p className="mt-1 text-text-secondary">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSections.map((section) => renderSection(section))}
          </div>
        )}
      </div>
    )
  }
)
SectionViewer.displayName = 'SectionViewer'