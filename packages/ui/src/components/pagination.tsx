'use client'

import * as React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  current?: boolean
  disabled?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'truncated'
  maxItems?: number
  separator?: React.ReactNode
  className?: string
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, variant = 'default', maxItems = 5, separator = <ChevronRight className="h-4 w-4 text-text-muted" />, className, ...props }, ref) => {
    const displayItems: BreadcrumbItem[] = variant === 'truncated' && items.length > maxItems
      ? [items[0], { label: '...', disabled: true }, ...items.slice(-maxItems + 1)]
      : items

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5', className)} {...props}>
        <ol className="flex items-center gap-1.5">
          {displayItems.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1.5" aria-current={item.current ? 'page' : undefined}>
              {index > 0 && <span aria-hidden="true">{separator}</span>}
              {item.href && !item.current ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-sm font-medium transition-colors text-text-secondary hover:text-text-primary"
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    item.current ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  )}
                  disabled={item.disabled}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-sm font-medium text-text-primary">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = 'Breadcrumb'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  variant?: 'numbers' | 'load-more' | 'simple'
  showTotal?: boolean
  totalItems?: number
  className?: string
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, variant = 'numbers', showTotal, totalItems, className, ...props }, ref) => {
    if (totalPages <= 1) return null

    const pages = React.useMemo(() => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }
      const pages = [1]
      if (currentPage > 3) pages.push(-1) // ellipsis
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push(-1) // ellipsis
      pages.push(totalPages)
      return pages
    }, [currentPage, totalPages])

    if (variant === 'load-more') {
      return (
        <nav ref={ref} className={cn('flex justify-center', className)} {...props}>
          <Button
            variant="secondary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Load more
          </Button>
        </nav>
      )
    }

    if (variant === 'simple') {
      return (
        <nav ref={ref} className={cn('flex items-center justify-center gap-2', className)} {...props}>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm text-text-secondary">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </nav>
      )
    }

    return (
      <nav ref={ref} aria-label="Pagination" className={cn('flex items-center justify-center gap-1', className)} {...props}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === -1 ? (
              <span className="px-2 text-text-muted" aria-hidden="true">...</span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(page)}
                aria-label={page === currentPage ? `Page ${page}, current` : `Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7m-8 14l7 7-7 7" />
          </svg>
        </Button>
        {showTotal && totalItems && (
          <span className="ml-4 text-sm text-text-secondary">
            {totalItems} results
          </span>
        )}
      </nav>
    )
  }
)
Pagination.displayName = 'Pagination'