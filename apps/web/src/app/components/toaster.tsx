'use client'

import * as React from 'react'
import { Toast, subscribeToToasts, type ToastProps } from '@nyayavedik/ui/components/toast'

type ActiveToast = ToastProps & { id: string }

export function Toaster() {
  const [toasts, setToasts] = React.useState<ActiveToast[]>([])

  React.useEffect(() => {
    return subscribeToToasts((nextToast) => {
      setToasts((prev) => [...prev, nextToast])
    })
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((item) => (
        <Toast.Root
          key={item.id}
          variant={item.variant}
          description={item.description}
          duration={item.duration ?? 4000}
          onOpenChange={(open) => {
            if (!open) removeToast(item.id)
          }}
        >
          {item.title}
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-4 right-4 z-[600] flex max-w-sm flex-col gap-2 outline-none" />
    </Toast.Provider>
  )
}