import * as React from 'react'
import { cn } from '../lib/utils'

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'table' | 'list' | 'circular' | 'rectangular'
  className?: string
  lines?: number
  width?: string
  height?: string
}

export const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ variant = 'text', className, lines = 3, width, height, ...props }, ref) => {
    const baseStyle = {
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      background: 'linear-gradient(90deg, hsl(var(--neutral-200)) 25%, hsl(var(--neutral-300)) 50%, hsl(var(--neutral-200)) 75%)',
      backgroundSize: '200% 100%',
      borderRadius: '0.5rem'
    }

    const darkStyle = {
      background: 'linear-gradient(90deg, hsl(var(--neutral-700)) 25%, hsl(var(--neutral-600)) 50%, hsl(var(--neutral-700)) 75%)',
      backgroundSize: '200% 100%'
    }

    if (variant === 'circular') {
      return (
        <div
          ref={ref}
          className={cn('rounded-full animate-pulse', className)}
          style={{
            ...baseStyle,
            ...darkStyle,
            width: width || '40px',
            height: height || '40px'
          }}
          {...props}
        />
      )
    }

    if (variant === 'rectangular') {
      return (
        <div
          ref={ref}
          className={cn('rounded-lg animate-pulse', className)}
          style={{
            ...baseStyle,
            ...darkStyle,
            width: width || '100%',
            height: height || '16px'
          }}
          {...props}
        />
      )
    }

    const skeletons = []
    for (let i = 0; i < lines; i++) {
      skeletons.push(
        <div
          key={i}
          className={cn('rounded animate-pulse', i === lines - 1 && 'w-3/4')}
          style={{
            ...baseStyle,
            ...darkStyle,
            height: '16px',
            marginBottom: i < lines - 1 ? '8px' : 0
          }}
        />
      )
    }

    if (variant === 'card') {
      return (
        <div ref={ref} className={cn('bg-surface border border-border rounded-xl p-4', className)} {...props}>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ ...baseStyle, ...darkStyle, width: '48px', height: '48px', borderRadius: '50%' }} />
            <div className="flex-1 space-y-2">
              <div style={{ ...baseStyle, ...darkStyle, height: '20px', width: '60%' }} />
              <div style={{ ...baseStyle, ...darkStyle, height: '14px', width: '40%' }} />
            </div>
          </div>
          <div className="space-y-3">{skeletons}</div>
        </div>
      )
    }

    if (variant === 'table') {
      return (
        <div ref={ref} className={cn('bg-surface border border-border rounded-xl overflow-hidden', className)} {...props}>
          <div className="bg-surface-elevated border-b border-border p-4">
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ ...baseStyle, ...darkStyle, height: '16px', width: `${100 / 5}%` }} />
              ))}
            </div>
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, row) => (
              <div key={row} className="p-4">
                <div className="flex gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{ ...baseStyle, ...darkStyle, height: '16px', width: `${100 / 5}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (variant === 'list') {
      return (
        <div ref={ref} className={cn('space-y-4', className)} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div style={{ ...baseStyle, ...darkStyle, width: '48px', height: '48px', borderRadius: '50%' }} />
              <div className="flex-1 space-y-2">
                <div style={{ ...baseStyle, ...darkStyle, height: '20px', width: '60%' }} />
                <div style={{ ...baseStyle, ...darkStyle, height: '14px', width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {skeletons}
      </div>
    )
  }
)
LoadingSkeleton.displayName = 'LoadingSkeleton'