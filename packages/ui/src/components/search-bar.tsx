'use client'

import * as React from 'react'
import { Search, X, Filter, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Badge } from './badge'

export interface FilterChip {
  label: string
  value: string
  count?: number
  onRemove?: () => void
}

interface SearchBarProps {
  variant?: 'global' | 'contextual' | 'compact'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSearch?: (query: string) => void
  filters?: FilterChip[]
  onFilterChange?: (filters: string[]) => void
  loading?: boolean
  recentSearches?: string[]
  suggestions?: string[]
  className?: string
}

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({
    variant = 'global',
    placeholder = 'Search acts, judgments, drafts...',
    value,
    onChange,
    onSearch,
    filters = [],
    onFilterChange,
    loading,
    recentSearches = [],
    suggestions = [],
    className,
    ...props
  }, ref) => {
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [focusedIndex, setFocusedIndex] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const items = [...suggestions, ...recentSearches.slice(0, 5)]
      if (items.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex((i) => (i + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex((i) => (i - 1 + items.length) % items.length)
          break
        case 'Enter':
          e.preventDefault()
          if (focusedIndex >= 0 && items[focusedIndex]) {
            onChange(items[focusedIndex])
            onSearch?.(items[focusedIndex])
            setShowSuggestions(false)
            setFocusedIndex(-1)
          }
          break
        case 'Escape':
          setShowSuggestions(false)
          setFocusedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    const handleFocus = () => {
      if (suggestions.length > 0 || recentSearches.length > 0) {
        setShowSuggestions(true)
      }
    }

    const handleBlur = () => {
      setTimeout(() => setShowSuggestions(false), 200)
    }

    const handleSelectSuggestion = (suggestion: string) => {
      onChange(suggestion)
      onSearch?.(suggestion)
      setShowSuggestions(false)
      setFocusedIndex(-1)
    }

    const handleClear = () => {
      onChange('')
      onSearch?.('')
    }

    const activeFilters = filters.filter((f) => f.onRemove).length

    const baseClasses = 'relative w-full'
    const variantClasses = {
      global: 'max-w-xl',
      contextual: 'max-w-md',
      compact: 'max-w-xs'
    }

    return (
      <div ref={ref} className={cn(baseClasses, variantClasses[variant], className)} {...props}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              setShowSuggestions(true)
              setFocusedIndex(-1)
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              'w-full rounded-lg border bg-background pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-muted',
              'transition-colors focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none',
              loading ? 'border-border-input cursor-wait' : 'border-border-input',
              value ? 'pr-28' : ''
            )}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={showSuggestions && (suggestions.length > 0 || recentSearches.length > 0)}
            role="combobox"
            disabled={loading}
          />
          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted animate-spin" aria-hidden="true" />
          )}
        </div>

        {(showSuggestions && (suggestions.length > 0 || recentSearches.length > 0)) && (
          <div
            id="search-suggestions"
            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-surface border border-border shadow-lg scrollbar-thin"
            role="listbox"
          >
            {suggestions.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider border-b border-border">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-accent-light',
                      focusedIndex === index && 'bg-accent-light'
                    )}
                    role="option"
                    aria-selected={focusedIndex === index}
                  >
                    {suggestion}
                  </button>
                ))}
              </>
            )}
            {recentSearches.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider border-b border-border">
                  Recent
                </div>
                {recentSearches.slice(0, 5).map((search, index) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => handleSelectSuggestion(search)}
                    onMouseEnter={() => setFocusedIndex(suggestions.length + index)}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm text-text-secondary hover:bg-accent-light',
                      focusedIndex === suggestions.length + index && 'bg-accent-light'
                    )}
                    role="option"
                    aria-selected={focusedIndex === suggestions.length + index}
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-text-muted" aria-hidden="true" />
                      {search}
                    </span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {filters.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Active filters">
            {filters.map((filter) =>
              filter.onRemove ? (
                <Badge
                  key={filter.value}
                  variant="primary"
                  size="sm"
                  removable
                  onRemove={filter.onRemove}
                  className="gap-1"
                >
                  {filter.label}
                  {filter.count !== undefined && <span className="bg-accent/20 px-1.5 rounded-full">{filter.count}</span>}
                </Badge>
              ) : null
            )}
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={() => onFilterChange?.([])}>
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)
SearchBar.displayName = 'SearchBar'