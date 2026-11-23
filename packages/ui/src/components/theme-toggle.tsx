'use client'

import * as React from 'react'
import { Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './button'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

interface ThemeToggleProps {
  variant?: 'icon-only' | 'with-label' | 'dropdown'
  showSystem?: boolean
  className?: string
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ variant = 'icon-only', showSystem = true, className, ...props }, ref) => {
    const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
      if (stored) {
        setTheme(stored)
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      }
    }, [])

    React.useEffect(() => {
      if (!mounted) return
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      if (theme === 'system') {
        root.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      } else {
        root.classList.add(theme)
      }
      localStorage.setItem('theme', theme)
    }, [theme, mounted])

    if (!mounted) {
      return <Button variant="ghost" size="sm" disabled aria-label="Loading theme...">...</Button>
    }

    const themeOptions = [
      { value: 'light', label: 'Light', icon: Sun },
      { value: 'dark', label: 'Dark', icon: Moon },
      ...(showSystem ? [{ value: 'system', label: 'System', icon: Monitor }] : [])
    ]

    if (variant === 'icon-only') {
      return (
        <Button
          ref={ref}
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          {...props}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      )
    }

    if (variant === 'dropdown') {
      return (
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <Button
              ref={ref}
              variant="ghost"
              size="sm"
              className={cn('gap-1', className)}
              {...props}
            >
              {theme === 'light' && <Sun className="h-5 w-5" />}
              {theme === 'dark' && <Moon className="h-5 w-5" />}
              {theme === 'system' && <Monitor className="h-5 w-5" />}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content className="min-w-[160px]">
              {themeOptions.map((option) => (
                <DropdownMenuPrimitive.Item
                  key={option.value}
                  onSelect={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                  className={cn(
                    'flex items-center gap-2',
                    theme === option.value && 'font-medium text-accent'
                  )}
                >
                  <option.icon className="h-4 w-4" aria-hidden="true" />
                  {option.label}
                  {theme === option.value && <Check className="h-4 w-4" />}
                </DropdownMenuPrimitive.Item>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      )
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn('gap-1', className)}
        {...props}
      >
        {theme === 'light' && <Sun className="h-5 w-5" />}
        {theme === 'dark' && <Moon className="h-5 w-5" />}
        {theme === 'system' && <Monitor className="h-5 w-5" />}
        <span className="hidden sm:inline">{theme}</span>
      </Button>
    )
  }
)
ThemeToggle.displayName = 'ThemeToggle'