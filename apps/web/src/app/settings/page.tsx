'use client'

import { useState } from 'react'
import { User, Globe, Moon, Sun, Monitor, Bell, Shield, Key, Palette, Download, Trash2, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@nyayavedik/ui/lib/utils'
import { Button } from '@nyayavedik/ui/components/button'
import { Card } from '@nyayavedik/ui/components/card'
import { Badge } from '@nyayavedik/ui/components/badge'
import { LanguageSelector } from '@nyayavedik/ui/components/language-selector'
import { ThemeToggle } from '@nyayavedik/ui/components/theme-toggle'
import { UserAvatar } from '@nyayavedik/ui/components/user-avatar'
import { EmptyState } from '@nyayavedik/ui/components/empty-state'
import { toast } from '@nyayavedik/ui/components/toast'
import { Modal } from '@nyayavedik/ui/components/modal'
import { useAuth } from '@/hooks/use-auth'

const settingsSections = [
  {
    id: 'general',
    label: 'General',
    icon: User,
    description: 'Language, theme, and display preferences'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Manage email and push notifications'
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    description: 'Password, 2FA, and session management'
  },
  {
    id: 'data',
    label: 'Data & Privacy',
    icon: Key,
    description: 'Download data, delete account, privacy settings'
  }
]

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' }
]

export default function SettingsPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [activeSection, setActiveSection] = useState('general')
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings', current: true }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            variant="no-permission"
            title="Sign in required"
            description="Please sign in to access your settings"
            action={{ label: 'Sign in', onClick: () => router.push('/auth/login') }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Settings</h1>
          <p className="mt-1 text-text-secondary">Manage your preferences and account settings</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <nav aria-label="Settings navigation">
                <ul className="space-y-1" role="list">
                  {settingsSections.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          activeSection === section.id
                            ? 'bg-accent-light text-accent'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                        )}
                        aria-current={activeSection === section.id ? 'page' : undefined}
                      >
                        <section.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span>{section.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>

            {/* User Info Card */}
            <Card className="mt-4">
              <UserAvatar
                user={{
                  id: user.id,
                  name: user.user_metadata?.full_name || user.email?.split('@')[0],
                  email: user.email || '',
                  avatarUrl: user.user_metadata?.avatar_url,
                  subscriptionTier: 'free'
                }}
                size="lg"
                variant="subscription-badge"
                showMenu
                menuItems={[
                  { label: 'View Profile', onClick: () => router.push('/profile'), icon: <User className="h-4 w-4" /> },
                  { label: 'Sign out', onClick: () => setShowSignOutModal(true), icon: <LogOut className="h-4 w-4" />, destructive: true }
                ]}
              />
              <div className="mt-4 text-center">
                <p className="font-medium text-text-primary">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                <p className="text-sm text-text-secondary">{user.email}</p>
                <Badge variant="neutral" className="mt-2">Free Tier</Badge>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {activeSection === 'general' && (
              <section aria-labelledby="general-heading">
                <header className="flex items-center justify-between">
                  <div>
                    <h2 id="general-heading" className="text-2xl font-bold text-text-primary">General</h2>
                    <p className="text-text-secondary">Language, theme, and display preferences</p>
                  </div>
                </header>

                <Card className="mt-6">
                  <div className="space-y-6 p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Language</h3>
                      <LanguageSelector
                        variant="inline"
                        value={language}
                        onChange={setLanguage}
                        availableLanguages={languages.map(l => l.code)}
                      />
                      <p className="mt-2 text-sm text-text-secondary">
                        Content will be displayed in your selected language where available.
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Theme</h3>
                      <div className="flex flex-wrap gap-3">
                        <ThemeToggle variant="with-label" />
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">
                        Choose your preferred color scheme. System follows your OS setting.
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Display</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary">Compact Mode</p>
                            <p className="text-sm text-text-secondary">Reduce spacing for more content on screen</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4 accent-accent" />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary">Show Section Numbers</p>
                            <p className="text-sm text-text-secondary">Display section numbers in act viewer</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-accent" />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary">Auto-expand Sections</p>
                            <p className="text-sm text-text-secondary">Automatically expand sections when navigating</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4 accent-accent" />
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {activeSection === 'notifications' && (
              <section aria-labelledby="notifications-heading">
                <header className="flex items-center justify-between">
                  <div>
                    <h2 id="notifications-heading" className="text-2xl font-bold text-text-primary">Notifications</h2>
                    <p className="text-text-secondary">Manage how you receive updates</p>
                  </div>
                </header>

                <Card className="mt-6">
                  <div className="space-y-6 p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Email Notifications</h3>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary">Enable Email Notifications</p>
                          <p className="text-sm text-text-secondary">Receive important updates via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="h-4 w-4 accent-accent"
                        />
                      </label>
                      <label className="flex items-center justify-between ml-6">
                        <div>
                          <p className="font-medium text-text-primary">Weekly Digest</p>
                          <p className="text-sm text-text-secondary">Summary of new judgments and acts each week</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={weeklyDigest}
                          onChange={(e) => setWeeklyDigest(e.target.checked)}
                          disabled={!emailNotifications}
                          className="h-4 w-4 accent-accent"
                        />
                      </label>
                      <label className="flex items-center justify-between ml-6">
                        <div>
                          <p className="font-medium text-text-primary">New Judgment Alerts</p>
                          <p className="text-sm text-text-secondary">Instant notifications for followed courts</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={false}
                          readOnly
                          disabled={!emailNotifications}
                          className="h-4 w-4 accent-accent"
                        />
                      </label>
                    </div>

                    <div className="border-t border-border pt-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Push Notifications</h3>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary">Enable Push Notifications</p>
                          <p className="text-sm text-text-secondary">Receive real-time alerts in your browser</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={pushNotifications}
                          onChange={(e) => setPushNotifications(e.target.checked)}
                          className="h-4 w-4 accent-accent"
                        />
                      </label>
                      <p className="text-sm text-text-secondary ml-6">
                        Push notifications require browser permission. You'll be prompted to allow notifications when enabling.
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
                      <p className="text-sm text-text-secondary">Customize which courts and topics you want alerts for. <Button variant="ghost" size="sm" className="ml-2 p-0">Manage Alerts</Button></p>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {activeSection === 'security' && (
              <section aria-labelledby="security-heading">
                <header className="flex items-center justify-between">
                  <div>
                    <h2 id="security-heading" className="text-2xl font-bold text-text-primary">Security</h2>
                    <p className="text-text-secondary">Password, two-factor authentication, and sessions</p>
                  </div>
                </header>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Password</h3>
                      <p className="text-sm text-text-secondary">Last changed: Never</p>
                      <Button variant="secondary" onClick={() => {}}>Change Password</Button>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Two-Factor Authentication</h3>
                      <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
                      <Button variant="secondary" onClick={() => {}}>Enable 2FA</Button>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Active Sessions</h3>
                      <p className="text-sm text-text-secondary">Manage your logged-in devices</p>
                      <Button variant="secondary" onClick={() => {}}>View Sessions</Button>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
                      <p className="text-sm text-text-secondary">Manage API access for integrations</p>
                      <Button variant="secondary" onClick={() => {}}>Manage Keys</Button>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            {activeSection === 'data' && (
              <section aria-labelledby="data-heading">
                <header className="flex items-center justify-between">
                  <div>
                    <h2 id="data-heading" className="text-2xl font-bold text-text-primary">Data & Privacy</h2>
                    <p className="text-text-secondary">Download your data, manage privacy, or delete your account</p>
                  </div>
                </header>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Download Your Data</h3>
                      <p className="text-sm text-text-secondary">Get a copy of all your data in JSON format</p>
                      <Button variant="secondary" onClick={() => toast.success('Data export requested')}>
                        <Download className="h-4 w-4 mr-2" /> Request Export
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Offline Data</h3>
                      <p className="text-sm text-text-secondary">Manage downloaded acts and judgments</p>
                      <Button variant="secondary" onClick={() => {}}>Manage Offline Data</Button>
                    </div>
                  </Card>

                  <Card className="border-danger">
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
                      <p className="text-sm text-text-secondary">Permanently delete your account and all data. This action cannot be undone.</p>
                      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                      </Button>
                    </div>
                  </Card>
                </div>

                <Modal
                  open={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  title="Delete Account"
                  description="This will permanently delete your account, bookmarks, downloads, and all associated data. This action cannot be undone."
                  variant="confirmation"
                >
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => { setShowDeleteModal(false); signOut(); toast.success('Account deleted') }}>
                      Delete Permanently
                    </Button>
                  </div>
                </Modal>

                <Modal
                  open={showSignOutModal}
                  onClose={() => setShowSignOutModal(false)}
                  title="Sign Out"
                  description="Are you sure you want to sign out of your account?"
                  variant="confirmation"
                >
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost" onClick={() => setShowSignOutModal(false)}>Cancel</Button>
                    <Button variant="secondary" onClick={() => { setShowSignOutModal(false); signOut(); toast.success('Signed out') }}>
                      Sign Out
                    </Button>
                  </div>
                </Modal>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}