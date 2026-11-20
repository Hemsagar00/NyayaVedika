import * as React from 'react'
import { cn } from '../lib/utils'
import { Button } from './button'

interface EmptyStateProps {
  variant?: 'default' | 'search' | 'offline' | 'no-results' | 'no-permission' | 'error'
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  illustration?: React.ReactNode
  className?: string
}

const defaultIllustrations = {
  default: (
    <svg className="mx-auto h-16 w-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  search: (
    <svg className="mx-auto h-16 w-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  offline: (
    <svg className="mx-auto h-16 w-16 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'no-results': (
    <svg className="mx-auto h-16 w-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'no-permission': (
    <svg className="mx-auto h-16 w-16 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  error: (
    <svg className="mx-auto h-16 w-16 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

const variantTitles = {
  default: 'Nothing here',
  search: 'No results found',
  offline: 'You are offline',
  'no-results': 'No results found',
  'no-permission': 'Access denied',
  error: 'Something went wrong'
}

const variantDescriptions = {
  default: 'Get started by creating your first item.',
  search: 'Try adjusting your search terms or filters.',
  offline: 'Your changes will sync when you reconnect.',
  'no-results': 'Try adjusting your search terms or filters.',
  'no-permission': 'You don not have permission to view this content.',
  error: 'Please try again or contact support if the problem persists.'
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({
    variant = 'default',
    title,
    description,
    action,
    illustration,
    className,
    ...props
  }, ref) => {
    const defaultIllustration = defaultIllustrations[variant] || defaultIllustrations.default
    const defaultTitle = title || variantTitles[variant]
    const defaultDescription = description || variantDescriptions[variant]

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}
        {...props}
      >
        {illustration || defaultIllustration}
        <h3 className="mt-4 text-lg font-semibold text-text-primary">{defaultTitle}</h3>
        {defaultDescription && (
          <p className="mt-2 text-text-secondary max-w-sm">{defaultDescription}</p>
        )}
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
            className="mt-6"
          >
            {action.label}
          </Button>
        )}
      </div>
    )
  }
)
EmptyState.displayName = 'EmptyState'