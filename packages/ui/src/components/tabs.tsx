'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

export interface TabItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  value?: string
  onChange?: (tabId: string) => void
  variant?: 'underline' | 'pills' | 'soft'
  className?: string
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultTab, value, onChange, variant = 'underline', className, ...props }, ref) => {
    const [internalTab, setInternalTab] = React.useState(defaultTab || tabs[0]?.id || '')
    const activeTab = value !== undefined ? value : internalTab

    const handleSelect = (tabId: string) => {
      if (value === undefined) {
        setInternalTab(tabId)
      }
      onChange?.(tabId)
    }

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'flex items-center gap-1',
          variant === 'underline' && 'border-b border-border',
          variant === 'soft' && 'rounded-xl bg-surface p-1 border border-border inline-flex',
          className
        )}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-colors rounded-lg',
                'disabled:opacity-50 disabled:pointer-events-none',
                variant === 'soft' && (
                  isActive
                    ? 'bg-accent-light text-accent shadow-xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                ),
                variant === 'pills' && (
                  isActive
                    ? 'bg-accent text-on-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                ),
                variant === 'underline' && (
                  isActive
                    ? 'border-b-2 border-accent text-accent rounded-none'
                    : 'text-text-secondary hover:text-text-primary rounded-none'
                )
              )}
            >
              {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs',
                    isActive ? 'bg-accent/15 text-accent' : 'bg-surface-elevated text-text-muted'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'
