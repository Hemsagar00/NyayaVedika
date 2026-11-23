'use client'

import * as React from 'react'
import { cn, getInitials } from '../lib/utils'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

interface User {
  id: string
  name?: string
  email: string
  avatarUrl?: string
  subscriptionTier?: 'free' | 'pro' | 'enterprise'
}

interface UserAvatarProps {
  user: User
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'initials' | 'image' | 'subscription-badge'
  showMenu?: boolean
  menuItems?: Array<{ label: string; onClick: () => void; icon?: React.ReactNode; destructive?: boolean }>
  className?: string
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl'
}

const tierColors = {
  free: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  pro: 'bg-accent-light text-accent',
  enterprise: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
}

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  ({
    user,
    size = 'md',
    variant = 'initials',
    showMenu = false,
    menuItems = [],
    className,
    ...props
  }, ref) => {
    const initials = user.name ? getInitials(user.name) : user.email.slice(0, 2).toUpperCase()

    const avatarNode = (
      <div className="relative inline-flex">
        <AvatarPrimitive.Root className={cn('inline-flex overflow-hidden rounded-full', sizeClasses[size])}>
          <AvatarPrimitive.Image src={user.avatarUrl} alt={user.name || user.email} className="h-full w-full object-cover rounded-full" />
          <AvatarPrimitive.Fallback className={cn('rounded-full bg-accent-light text-accent flex items-center justify-center font-medium w-full h-full', sizeClasses[size])}>
            {initials}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {variant === 'subscription-badge' && user.subscriptionTier && (
          <span className={cn(
            'absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-xs font-medium border-2 border-background',
            tierColors[user.subscriptionTier],
            size === 'xs' && 'text-[10px]',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-xs',
            size === 'lg' && 'text-sm',
            size === 'xl' && 'text-base'
          )}>
            {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
          </span>
        )}
      </div>
    )

    if (showMenu && menuItems.length > 0) {
      return (
        <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button type="button" className="rounded-full focus:outline-none focus:ring-2 focus:ring-focus-ring">
                {avatarNode}
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={8}
                className="z-50 min-w-[180px] rounded-lg border border-border bg-surface p-1 shadow-lg"
              >
                <DropdownMenuPrimitive.Label className="px-2 py-1.5 text-sm font-medium text-text-primary">
                  {user.name || user.email}
                </DropdownMenuPrimitive.Label>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-border" />
                {menuItems.map((item, index) => (
                  <DropdownMenuPrimitive.Item
                    key={index}
                    onSelect={item.onClick}
                    className={cn(
                      'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent-light',
                      item.destructive ? 'text-danger' : 'text-text-primary'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuPrimitive.Item>
                ))}
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        {avatarNode}
      </div>
    )
  }
)
UserAvatar.displayName = 'UserAvatar'