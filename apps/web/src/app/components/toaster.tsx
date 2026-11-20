'use client'

import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-surface group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:text-text-primary group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-text-secondary',
          actionButton: 'group-[.toast]:bg-accent group-[.toast]:text-on-accent',
          cancelButton: 'group-[.toast]:bg-surface group-[.toast]:text-text-primary group-[.toast]:border group-[.toast]:border-border'
        }
      }}
    />
  )
}