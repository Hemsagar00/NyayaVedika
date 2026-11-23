'use client'

import { useState } from 'react'
import { Bookmark, History, Download, User, Settings, Scale, BookOpen, Gavel, Bot, FileText, LogOut, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@nyayavedik/ui/lib/utils'
import { Button } from '@nyayavedik/ui/components/button'
import { Card } from '@nyayavedik/ui/components/card'
import { Badge } from '@nyayavedik/ui/components/badge'
import { UserAvatar } from '@nyayavedik/ui/components/user-avatar'
import { EmptyState } from '@nyayavedik/ui/components/empty-state'
import { Tabs } from '@nyayavedik/ui/components/tabs'
import { toast } from '@nyayavedik/ui/components/toast'
import { Modal } from '@nyayavedik/ui/components/modal'
import { useAuth } from '@/hooks/use-auth'

const mockBookmarks = [
  { id: '1', type: 'act', title: 'The Bharatiya Nyaya Sanhita, 2023', subtitle: 'Section 103 - Murder', date: '2024-01-15' },
  { id: '2', type: 'judgment', title: 'State of Maharashtra v. Rajesh Kumar', subtitle: 'Supreme Court - Criminal Appeal', date: '2024-01-10' },
  { id: '3', type: 'draft', title: 'Writ Petition (Civil) Template', subtitle: 'Article 226 - High Court', date: '2024-01-08' },
  { id: '4', type: 'act', title: 'The Constitution of India', subtitle: 'Article 21 - Right to Life', date: '2024-01-05' },
  { id: '5', type: 'judgment', title: 'Kesavananda Bharati v. State of Kerala', subtitle: 'Supreme Court - Basic Structure', date: '2024-01-03' }
]

const mockHistory = [
  { id: '1', query: 'Section 302 IPC murder punishment', type: 'search', results: 12, date: '2024-01-15' },
  { id: '2', query: 'BNS Section 103 vs IPC 302', type: 'converter', results: 1, date: '2024-01-14' },
  { id: '3', query: 'Article 21 right to privacy', type: 'search', results: 45, date: '2024-01-13' },
  { id: '4', query: 'Writ petition format Article 226', type: 'draft', results: 8, date: '2024-01-12' },
  { id: '5', query: 'GST Act Section 16 input tax credit', type: 'search', results: 23, date: '2024-01-11' }
]

const mockDownloads = [
  { id: '1', type: 'act', title: 'The Bharatiya Nyaya Sanhita, 2023', size: '2.4 MB', date: '2024-01-10', expires: '2024-02-10' },
  { id: '2', type: 'judgment', title: 'Kesavananda Bharati v. State of Kerala (Full Text)', size: '1.8 MB', date: '2024-01-08', expires: '2024-02-08' },
  { id: '3', type: 'draft', title: 'Writ Petition Template Bundle', size: '512 KB', date: '2024-01-05', expires: '2024-02-05' }
]

const tabs = [
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: mockBookmarks.length },
  { id: 'history', label: 'History', icon: History, count: mockHistory.length },
  { id: 'downloads', label: 'Downloads', icon: Download, count: mockDownloads.length }
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('bookmarks')
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            variant="no-permission"
            title="Sign in required"
            description="Please sign in to view your profile"
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <UserAvatar
                user={{
                  id: user.id,
                  name: user.user_metadata?.full_name || user.email?.split('@')[0],
                  email: user.email || '',
                  avatarUrl: user.user_metadata?.avatar_url,
                  subscriptionTier: 'free'
                }}
                size="xl"
                variant="subscription-badge"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h1 className="text-3xl font-bold text-text-primary">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </h1>
                <p className="text-text-secondary">{user.email}</p>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant="neutral">Free Tier</Badge>
                  <Badge variant="primary">100+ searches/month</Badge>
                  <Badge variant="success">Offline enabled</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <Link href="/settings">
                <Button variant="secondary" size="sm">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setShowSignOutModal(true)}>
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        </div>

        <Tabs tabs={tabs} defaultTab={activeTab} onChange={setActiveTab} variant="soft" />

        <div className="mt-6">
          {activeTab === 'bookmarks' && (
            <section aria-labelledby="bookmarks-heading">
              <h2 id="bookmarks-heading" className="sr-only">Bookmarks</h2>
              {mockBookmarks.length === 0 ? (
                <EmptyState
                  variant="default"
                  title="No bookmarks yet"
                  description="Bookmark acts, judgments, and drafts to access them quickly"
                  action={{ label: 'Browse Bare Acts', onClick: () => router.push('/bare-acts') }}
                />
              ) : (
                <div className="space-y-3">
                  {mockBookmarks.map((item) => (
                    <Link key={item.id} href={`/${item.type}s/${item.id}`} className="block">
                      <Card variant="hover" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                        <div className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                          item.type === 'act' && 'bg-accent-light',
                          item.type === 'judgment' && 'bg-success-light',
                          item.type === 'draft' && 'bg-warning-light'
                        )}>
                          {item.type === 'act' && <Scale className="h-6 w-6 text-accent" />}
                          {item.type === 'judgment' && <Gavel className="h-6 w-6 text-success" />}
                          {item.type === 'draft' && <FileText className="h-6 w-6 text-warning" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text-primary truncate">{item.title}</p>
                          <p className="text-sm text-text-secondary truncate">{item.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <span className="capitalize">{item.type}</span>
                          <span>•</span>
                          <time dateTime={item.date}>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'history' && (
            <section aria-labelledby="history-heading">
              <h2 id="history-heading" className="sr-only">Search History</h2>
              {mockHistory.length === 0 ? (
                <EmptyState
                  variant="default"
                  title="No search history"
                  description="Your recent searches will appear here"
                />
              ) : (
                <div className="space-y-3">
                  {mockHistory.map((item) => (
                    <Link key={item.id} href={`/${item.type === 'search' ? 'ai-search' : item.type}?q=${encodeURIComponent(item.query)}`} className="block">
                      <Card variant="hover" className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary truncate">"{item.query}"</p>
                            <div className="mt-1 flex items-center gap-3 text-sm text-text-muted">
                              <span className="capitalize">{item.type}</span>
                              <span>•</span>
                              <span>{item.results} results</span>
                              <span>•</span>
                              <time dateTime={item.date}>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); toast.success('Search repeated') }}>
                            Repeat
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'downloads' && (
            <section aria-labelledby="downloads-heading">
              <h2 id="downloads-heading" className="sr-only">Downloads</h2>
              {mockDownloads.length === 0 ? (
                <EmptyState
                  variant="default"
                  title="No downloads yet"
                  description="Download acts, judgments, and drafts for offline access"
                  action={{ label: 'Browse Bare Acts', onClick: () => router.push('/bare-acts') }}
                />
              ) : (
                <div className="space-y-3">
                  {mockDownloads.map((item) => (
                    <div key={item.id}>
                      <Card variant="hover" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                        <div className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                          item.type === 'act' && 'bg-accent-light',
                          item.type === 'judgment' && 'bg-success-light',
                          item.type === 'draft' && 'bg-warning-light'
                        )}>
                          {item.type === 'act' && <BookOpen className="h-6 w-6 text-accent" />}
                          {item.type === 'judgment' && <Gavel className="h-6 w-6 text-success" />}
                          {item.type === 'draft' && <FileText className="h-6 w-6 text-warning" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text-primary truncate">{item.title}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                            <span className="capitalize">{item.type}</span>
                            <span>{item.size}</span>
                            <span>Downloaded {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className={new Date(item.expires) < new Date() ? 'text-danger' : 'text-success'}>
                              Expires {new Date(item.expires).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Open</Button>
                          <Button variant="ghost" size="sm" onClick={() => toast.success('Re-download started')}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toast.success('Removed from downloads')}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

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
      </div>
    </div>
  )
}