import * as React from 'react'
import { ChevronRight, ChevronDown, Search, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'
import { Input } from './input'

export interface CategoryNode {
  id: string
  label: string
  count?: number
  children?: CategoryNode[]
  selected?: boolean
  expanded?: boolean
}

interface CategoryTreeProps {
  nodes: CategoryNode[]
  variant?: 'expandable' | 'searchable' | 'multi-select' | 'flat'
  selectedIds?: string[]
  onSelect?: (ids: string[]) => void
  onExpand?: (id: string) => void
  searchQuery?: string
  onSearch?: (query: string) => void
  className?: string
}

const renderNode = (
  node: CategoryNode,
  depth: number,
  props: CategoryTreeProps,
  getNodeById: (id: string) => CategoryNode | undefined
) => {
  const { nodes, variant, selectedIds = [], onSelect, onExpand, searchQuery } = props
  const isExpanded = node.expanded || false
  const isSelected = selectedIds.includes(node.id)
  const hasChildren = node.children && node.children.length > 0
  const matchesSearch = !searchQuery ||
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.children?.some((child) => child.label.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!matchesSearch && depth > 0) return null

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onExpand?.(node.id)
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (variant === 'multi-select') {
      const newSelection = isSelected
        ? selectedIds.filter((id) => id !== node.id)
        : [...selectedIds, node.id]
      onSelect?.(newSelection)
    } else {
      onSelect?.([node.id])
    }
  }

  return (
    <div key={node.id} className={cn('select-none', depth > 0 && 'ml-6')}>
      <div
        className={cn(
          'flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors',
          'hover:bg-accent-light',
          isSelected && 'bg-accent-light text-accent font-medium'
        )}
        onClick={handleSelect}
      >
        {hasChildren && variant !== 'flat' && (
          <button
            type="button"
            onClick={toggleExpand}
            className="p-1 text-text-muted hover:text-text-primary transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {!hasChildren && variant !== 'flat' && <span className="w-6" />}
        <span className="flex-1 truncate cursor-pointer">{node.label}</span>
        {node.count !== undefined && (
          <span className="text-xs text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded-full">
            {node.count}
          </span>
        )}
        {variant === 'multi-select' && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              handleSelect(e as unknown as React.MouseEvent)
            }}
            className="h-4 w-4 accent-accent"
            aria-label={`Select ${node.label}`}
          />
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-1 space-y-1">
          {node.children!.map((child) => renderNode(child, depth + 1, props, getNodeById))}
        </div>
      )}
    </div>
  )
}

export const CategoryTree = React.forwardRef<HTMLDivElement, CategoryTreeProps>(
  ({ nodes, variant = 'expandable', selectedIds = [], onSelect, onExpand, searchQuery, onSearch, className, ...props }, ref) => {
    const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery || '')

    const handleSearchChange = (value: string) => {
      setLocalSearchQuery(value)
      onSearch?.(value)
    }

    return (
      <div ref={ref} className={cn('space-y-1', className)} {...props}>
        {variant === 'searchable' && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Filter categories..."
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-border-input bg-background pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none"
              aria-label="Filter categories"
            />
          </div>
        )}
        <div className="space-y-1 max-h-[400px] overflow-auto scrollbar-thin">
          {nodes.map((node) => renderNode(node, 0, { ...props, selectedIds, onSelect, onExpand, searchQuery: localSearchQuery }, (id) =>
            nodes.find((n) => n.id === id)
          ))}
        </div>
      </div>
    )
  }
)
CategoryTree.displayName = 'CategoryTree'