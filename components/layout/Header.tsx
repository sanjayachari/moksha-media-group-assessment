'use client'

import { useState } from 'react'
import { Bell, Loader2, LogOut, Menu, Search } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  loading?: boolean;
}

export default function Header({ title, onMenuClick, loading = false }: HeaderProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await signOut({ redirect: false })
      router.push('/login')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <header className="rounded-t-2xl sticky top-0 z-20 h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-neutral-900 tracking-tight">{title}</h1>
          {loading ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900/5 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">

        <button
          type="button"
          className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-white transition"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-neutral-50 border border-neutral-200 px-2.5 py-1.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-950 flex items-center justify-center text-white text-xs font-semibold">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm text-neutral-700 max-w-[160px] truncate">
            {user?.email || 'Signed out'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-3 py-2 rounded-lg hover:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loggingOut ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <LogOut size={15} />
          )}
          <span className="hidden sm:inline">
            {loggingOut ? 'Logging out…' : 'Logout'}
          </span>
        </button>
      </div>
    </header>
  )
}
