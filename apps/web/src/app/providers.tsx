'use client'

import { SessionProvider } from '@supabase/auth-helpers-react'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}