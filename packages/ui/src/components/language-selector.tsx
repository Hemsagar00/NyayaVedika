import * as React from 'react'
import { ChevronDown, Globe, Check } from 'lucide-react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../lib/utils'
import { Button } from './button'
import { INDIAN_LANGUAGES, type IndianLanguageCode } from '../lib/utils'

interface LanguageSelectorProps {
  value: string
  onChange: (lang: string) => void
  variant?: 'dropdown' | 'bottom-sheet' | 'inline' | 'compact'
  showFlags?: boolean
  showNativeNames?: boolean
  availableLanguages?: IndianLanguageCode[]
  className?: string
}

const languageOptions = INDIAN_LANGUAGES.map((lang) => ({
  value: lang.code,
  label: lang.name,
  nativeLabel: lang.nativeName,
  script: lang.script
}))

export const LanguageSelector = React.forwardRef<HTMLDivElement, LanguageSelectorProps>(
  ({
    value,
    onChange,
    variant = 'dropdown',
    showFlags = false,
    showNativeNames = true,
    availableLanguages,
    className,
    ...props
  }, ref) => {
    const filteredOptions = availableLanguages
      ? languageOptions.filter((opt) => availableLanguages.includes(opt.value as IndianLanguageCode))
      : languageOptions

    const selectedOption = filteredOptions.find((opt) => opt.value === value) || filteredOptions[0]

    if (variant === 'inline') {
      return (
        <div ref={ref} className={cn('flex flex-wrap gap-2', className)} {...props}>
          {filteredOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                value === opt.value
                  ? 'bg-accent text-on-accent'
                  : 'bg-surface text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              )}
              aria-pressed={value === opt.value}
            >
              {showNativeNames && opt.nativeLabel !== opt.label && <span>{opt.nativeLabel}</span>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )
    }

    return (
      <SelectPrimitive.Root value={value} onValueChange={onChange} {...props}>
        <SelectPrimitive.Trigger className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-border-input bg-background px-3 py-2 text-sm text-text-primary',
          'focus:border-focus focus:ring-2 focus:ring-focus-ring/20 focus:outline-none',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}>
          <SelectPrimitive.Value placeholder="Select language" />
          <SelectPrimitive.Icon>
            <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="relative z-50 max-h-96 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-lg scrollbar-thin">
            <SelectPrimitive.Viewport>
              {filteredOptions.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-3 pr-8 text-sm',
                    'outline-none focus:bg-accent-light focus:text-accent',
                    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none'
                  )}
                >
                  <SelectPrimitive.ItemText className="flex items-center gap-2">
                    {showNativeNames && opt.nativeLabel !== opt.label && (
                      <span className="text-text-primary">{opt.nativeLabel}</span>
                    )}
                    <span className="font-medium">{opt.label}</span>
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)
LanguageSelector.displayName = 'LanguageSelector'