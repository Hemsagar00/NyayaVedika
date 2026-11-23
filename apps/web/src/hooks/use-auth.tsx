'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, options?: { data?: Record<string, unknown> }) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updatePassword: (password: string) => Promise<{ error: Error | null }>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anonKey) return null
    try {
      return createBrowserClient(url, anonKey)
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signUp = async (email: string, password: string, options?: { data?: Record<string, unknown> }) => {
    if (!supabase) {
      return { error: new Error('Authentication backend is not configured in this preview environment.') }
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options?.data,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { error: error ? new Error(error.message) : null }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error('Authentication backend is not configured in this preview environment.') }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error ? new Error(error.message) : null }
  }

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    if (!supabase) {
      return { error: new Error('OAuth backend is not configured in this preview environment.') }
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
    return { error: error ? new Error(error.message) : null }
  }

  const signOut = async () => {
    if (!supabase) {
      setUser(null)
      setSession(null)
      return
    }
    await supabase.auth.signOut()
  }

  const updatePassword = async (password: string) => {
    if (!supabase) {
      return { error: new Error('Authentication backend is not configured in this preview environment.') }
    }
    const { error } = await supabase.auth.updateUser({ password })
    return { error: error ? new Error(error.message) : null }
  }

  const refreshSession = async () => {
    if (!supabase) return
    await supabase.auth.refreshSession()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithOAuth, signOut, updatePassword, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}