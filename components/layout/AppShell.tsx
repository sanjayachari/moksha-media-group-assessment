'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Loading } from '@/components/common/Loading'

const pageTitles: Record<string, string> = {
  '/dashboard/agents': 'Agents',
  '/dashboard/users': 'Users Management',
  '/dashboard': 'Dashboard',
}

function getTitle(pathname: string) {
  if (pathname.includes('/edit/')) return `Edit Record`
  if (pathname.includes('/view/')) return `View Record`
  const match = Object.keys(pageTitles)
    .filter((k) => pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0]
  return pageTitles[match] || 'Aether AI'
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, status } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user, router])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const authLoading = status === "loading"
  if (status === "unauthenticated") return null

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100 print:h-auto print:w-auto print:overflow-visible print:bg-white">
      <div className="flex h-full overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden h-full">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="relative flex flex-1 flex-col min-w-0 p-2 bg-black overflow-hidden print:bg-white print:overflow-visible print:p-0">
          <div className="print:hidden">
            <Header
              title={getTitle(pathname)}
              onMenuClick={() => setSidebarOpen(true)}
              loading={authLoading}
            />
          </div>
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-neutral-100 rounded-b-2xl print:overflow-visible print:bg-white print:rounded-none">
            {authLoading ? (
              <Loading />
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </div>
  )
}