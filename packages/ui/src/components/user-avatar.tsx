import * as React from 'react'
import { cn, getInitials } from '../lib/utils'
import { Button } from './button'
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

    const avatarContent = variant === 'image' && user.avatarUrl ? (
      <AvatarPrimitive.Image src={user.avatarUrl} alt={user.name || user.email} className="rounded-full" />
    ) : (
      <AvatarPrimitive.Fallback className={cn('rounded-full bg-accent-light text-accent flex items-center justify-center font-medium', sizeClasses[size])}>
        {initials}
      </AvatarPrimitive.Fallback>
    )

    const menuContent = showMenu && menuItems.length > 0 ? (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className="min-w-[180px]">
          <DropdownMenuPrimitive.Label className="font-medium">{user.name || user.email}</DropdownMenuPrimitive.Label>
          <DropdownMenuPrimitive.Separator />
          {menuItems.map((item, index) => (
            <DropdownMenuPrimitive.Item
              key={index}
              onSelect={item.onClick}
              className={cn('flex items-center gap-2', item.destructive && 'text-danger')}
            >
              {item.icon}
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    ) : null

    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        <AvatarPrimitive.Root className={cn(sizeClasses[size])}>
          <AvatarPrimitive.Image src={user.avatarUrl} alt={user.name || user.email} className="rounded-full" />
          <AvatarPrimitive.Fallback className={cn('rounded-full bg-accent-light text-accent flex items-center justify-center font-medium', sizeClasses[size])}>
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
        {menuContent}
      </div>
    )
  }
)
UserAvatar.displayName = 'UserAvatar'