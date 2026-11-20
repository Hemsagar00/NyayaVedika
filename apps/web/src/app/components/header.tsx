'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Scale, BookOpen, Gavel, Bot, Settings, User, LogIn, LogOut, Menu as MenuIcon } from 'lucide-react'
import { cn } from '@nyayavedik/ui/lib/utils'
import { Button } from '@nyayavedik/ui/components/button'
import { LanguageSelector } from '@nyayavedik/ui/components/language-selector'
import { ThemeToggle } from '@nyayavedik/ui/components/theme-toggle'
import { UserAvatar } from '@nyayavedik/ui/components/user-avatar'
import { useAuth } from '@/hooks/use-auth'

const navigation = [
  { name: 'Home', href: '/', icon: null },
  { name: 'Bare Acts', href: '/bare-acts', icon: BookOpen },
  { name: 'Judgments', href: '/judgments', icon: Gavel },
  { name: 'AI Search', href: '/ai-search', icon: Bot },
  { name: 'Drafts', href: '/drafts', icon: BookOpen },
  { name: 'Tools', href: '/tools', icon: Settings }
]

export function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Nyaya Vedik Home">
            <Scale className="h-8 w-8 text-accent" aria-hidden="true" />
            <span className="font-serif text-xl font-semibold text-text-primary hidden sm:block">
              Nyaya Vedik
            </span>
          </Link>

          <div className="hidden md:flex md:gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                    isActive
                      ? 'bg-accent-light text-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && <item.icon className="mr-1.5 h-4 w-4" aria-hidden="true" />}
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector
            variant="compact"
            value="en"
            onChange={() => {}}
            availableLanguages={['en', 'hi', 'gu', 'mr', 'pa', 'bn', 'or', 'ta', 'te', 'kn', 'ml', 'ne']}
          />

          <ThemeToggle variant="icon-only" />

          {user ? (
            <UserAvatar
              user={{
                id: user.id,
                name: user.user_metadata?.full_name || user.email?.split('@')[0],
                email: user.email || '',
                avatarUrl: user.user_metadata?.avatar_url,
                subscriptionTier: 'free'
              }}
              size="md"
              variant="subscription-badge"
              showMenu
              menuItems={[
                { label: 'Profile', onClick: () => { /* navigate to profile */ }, icon: <User className="h-4 w-4" /> },
                { label: 'Settings', onClick: () => { /* navigate to settings */ }, icon: <Settings className="h-4 w-4" /> },
                { label: 'Sign out', onClick: () => signOut(), icon: <LogOut className="h-4 w-4" />, destructive: true }
              ]}
            />
          ) : (
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-1.5" aria-hidden="true" />
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background py-4">
          <div className="mx-auto max-w-[1200px] px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-base font-medium rounded-lg',
                    isActive
                      ? 'bg-accent-light text-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" aria-hidden="true" />}
                  {item.name}
                </Link>
              )
            })}
            {!user && (
              <div className="pt-4 border-t border-border flex flex-col gap-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-start">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}