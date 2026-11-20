import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../lib/utils'

interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  onClose?: () => void
}

const ToastProvider = ToastPrimitive.Provider
const ToastViewport = ToastPrimitive.Viewport

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & { variant?: ToastProps['variant'] }
>(({ className, variant = 'info', ...props }, ref) => {
  const variantStyles = {
    success: 'border-success bg-success-light',
    error: 'border-danger bg-danger-light',
    warning: 'border-warning bg-warning-light',
    info: 'border-border bg-surface-elevated'
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-danger" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-text-primary" />
  }

  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'group flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
        'data-[swipe=cancel]:translate-x-0',
        'data-[swipe=end]:animate-out',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="font-semibold text-text-primary">
          {props.children}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description className="mt-1 text-sm text-text-secondary">
          {props.description}
        </ToastPrimitive.Description>
      </div>
      <ToastPrimitive.Close className={cn(
        'flex-shrink-0 rounded-md p-1 text-text-muted',
        'hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-focus-ring'
      )}>
        <X className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
})
ToastRoot.displayName = 'ToastRoot'

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'mt-3 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium',
      'bg-background text-text-primary border border-border hover:bg-surface',
      'focus:outline-none focus:ring-2 focus:ring-focus-ring',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = 'ToastAction'

const ToastClose = ToastPrimitive.Close

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Action: ToastAction,
  Close: ToastClose
})

export function toast(props: ToastProps) {
  // This would be used with a toast library like sonner or react-hot-toast
  // For now, it's a placeholder for the API
  console.log('Toast:', props)
}

type ToastType = 'success' | 'error' | 'warning' | 'info'

const createToast = (variant: ToastType) => (title: string, options?: Omit<ToastProps, 'title' | 'variant'>) => ({
  variant,
  title,
  ...options
})

toast.success = createToast('success')
toast.error = createToast('error')
toast.warning = createToast('warning')
toast.info = createToast('info')

export { toast }