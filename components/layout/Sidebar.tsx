'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  Truck,
  FileText,
  BarChart2,
  Settings,
  Wrench,
  X,
  UserPlus,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { href: '/dashboard/agents', label: 'Agents', icon: ClipboardList, key: 'agents' },
  { href: '/dashboard/users', label: 'Users', icon: Users, key: 'users', adminOnly: true },
]

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const employeePerms: Record<string, boolean> | null = null // Removed old Firebase specific permissions

  const isActive = (href: string) => {
    if (pathname === href) return true

    const nestedRoutes = [
      '/dashboard/agents',
      '/dashboard/users',
    ]

    return nestedRoutes.includes(href) && pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64
          bg-neutral-950 text-white
          flex flex-col
          border-r border-neutral-900
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-400/30">
              <Wrench size={16} className="text-emerald-300" />
            </div>

            <div>
              <p className="text-sm font-semibold">Aether AI</p>
              <p className="text-xs text-white/60">Service dashboard</p>
            </div>
          </div>

          {/* Hide button on desktop */}
          <button
            onClick={onClose}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
            Navigation
          </p>

          {navItems
            .filter((item) => {
              if (item.adminOnly) return user?.role === 'admin'
              if (user?.role === 'admin') return true
              return true
            })
            .map(({ href, label, icon: Icon }) => {
              const active = isActive(href)

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`
                  flex items-center gap-3 px-3 py-2.5
                  rounded-xl text-sm font-medium
                  transition-all
                  ${active
                      ? 'bg-emerald-500/15 text-emerald-100 border border-emerald-400/30'
                      : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                    }
                `}
                >
                  <Icon
                    size={16}
                    className={active ? 'text-emerald-200' : 'text-white/60'}
                  />
                  {label}
                </Link>
              )
            })}
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-white/10 border border-white/10 font-semibold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.email || 'User'}
              </p>
              <p className="text-xs text-white/60">Signed in</p>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-white/40">
            © {new Date().getFullYear()} Aether AI
          </p>
        </div>
      </aside>
    </>
  )
}