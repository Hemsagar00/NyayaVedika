import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'

interface ModalProps {
  open: boolean
  onClose: () => void
  variant?: 'default' | 'confirmation' | 'form' | 'full-screen' | 'drawer'
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl'
}

const variantClasses = {
  default: '',
  confirmation: '',
  form: '',
  'full-screen': 'max-w-full h-full',
  drawer: 'h-full max-w-sm w-full'
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, variant = 'default', title, description, children, footer, size = 'md', closeOnOverlayClick = true, className, ...props }, ref) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onClose}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              'fixed inset-0 z-50 bg-overlay backdrop-blur-sm',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              'fixed z-50 bg-surface shadow-xl rounded-xl border border-border',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              variantClasses[variant],
              sizeClasses[size],
              variant === 'drawer' && 'right-0 top-0 bottom-0',
              variant === 'full-screen' && 'inset-4',
              className
            )}
            {...props}
          >
            {(title || description) && (
              <div className="flex items-start justify-between border-b border-border p-4">
                <div>
                  {title && <DialogPrimitive.Title className="text-lg font-semibold text-text-primary">{title}</DialogPrimitive.Title>}
                  {description && <DialogPrimitive.Description className="mt-1 text-sm text-text-secondary">{description}</DialogPrimitive.Description>}
                </div>
                <DialogPrimitive.Close className="p-1 text-text-muted hover:text-text-primary transition-colors" aria-label="Close">
                  <X className="h-5 w-5" aria-hidden="true" />
                </DialogPrimitive.Close>
              </div>
            )}
            <div className={cn(
              'p-4',
              variant === 'full-screen' && 'overflow-auto h-[calc(100%-8rem)]',
              variant === 'drawer' && 'overflow-auto h-[calc(100%-4rem)]'
            )}>
              {children}
            </div>
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-border p-4">
                {footer}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }
)
Modal.displayName = 'Modal'

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger', loading }: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'primary' | 'danger'
  loading?: boolean
}) => (
  <Modal open={open} onClose={onClose} variant="confirmation" title={title} description={description} size="sm">
    <div className="flex justify-end gap-2 mt-6">
      <Button variant="ghost" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
      <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
    </div>
  </Modal>
)