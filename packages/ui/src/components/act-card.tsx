import * as React from 'react'
import { BookOpen, Bookmark, Download, Globe, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'
import { Badge } from './badge'

export interface Act {
  id: string
  title: string
  shortTitle?: string
  year?: number
  number?: string
  jurisdiction: 'central' | 'state' | 'subordinate'
  state?: string
  language: string
  availableLanguages: string[]
  sections?: Array<{ number: string; title: string }>
  bookmarked?: boolean
  downloaded?: boolean
}

interface ActCardProps {
  act: Act
  variant?: 'bare-act' | 'state-act' | 'subordinate' | 'constitution'
  showBookmark?: boolean
  showDownload?: boolean
  onBookmark?: (actId: string) => void
  onDownload?: (actId: string) => void
  onClick?: (actId: string) => void
  className?: string
}

export const ActCard = React.forwardRef<HTMLDivElement, ActCardProps>(
  ({
    act,
    variant = 'bare-act',
    showBookmark = true,
    showDownload = true,
    onBookmark,
    onDownload,
    onClick,
    className,
    ...props
  }, ref) => {
    const jurisdictionLabels = {
      central: 'Central Act',
      state: act.state ? `State Act (${act.state})` : 'State Act',
      subordinate: 'Subordinate Legislation',
      constitution: 'Constitution'
    }

    const jurisdictionColors = {
      central: 'primary',
      state: 'success',
      subordinate: 'warning',
      constitution: 'primary'
    }

    return (
      <article
        ref={ref}
        className={cn(
          'group bg-surface border border-border rounded-xl p-4 transition-all duration-200',
          'hover:shadow-md hover:border-border-input hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant={jurisdictionColors[variant]} size="sm">
                {jurisdictionLabels[variant]}
              </Badge>
              {act.year && (
                <span className="text-xs text-text-muted">{act.year}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-text-primary truncate pr-4">
              {act.shortTitle || act.title}
            </h3>
            {act.shortTitle && (
              <p className="mt-1 text-sm text-text-secondary line-clamp-1">{act.title}</p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                {act.language.toUpperCase()}
                {act.availableLanguages.length > 1 && (
                  <span className="ml-1">+{act.availableLanguages.length - 1}</span>
                )}
              </span>
              {act.sections && (
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  {act.sections.length} sections
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {showBookmark && onBookmark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onBookmark(act.id)
                }}
                aria-label={act.bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                aria-pressed={act.bookmarked}
              >
                <Bookmark className={cn('h-5 w-5', act.bookmarked ? 'fill-accent text-accent' : 'text-text-muted')} aria-hidden="true" />
              </Button>
            )}
            {showDownload && onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDownload(act.id)
                }}
                aria-label="Download for offline"
                disabled={act.downloaded}
              >
                <Download className={cn('h-5 w-5', act.downloaded ? 'text-success' : 'text-text-muted')} aria-hidden="true" />
              </Button>
            )}
            {onClick && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(act.id) }} aria-label="View details">
                <ChevronRight className="h-5 w-5 text-text-muted" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </article>
    )
  }
)
ActCard.displayName = 'ActCard'