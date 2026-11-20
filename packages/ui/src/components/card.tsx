import * as React from 'react'
import { cn } from '../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }

    const variantClasses = {
      default: 'bg-surface border border-border rounded-xl shadow-sm',
      hover: 'bg-surface border border-border rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
      elevated: 'bg-surface-elevated border border-border rounded-xl shadow-md'
    }

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export { Card }