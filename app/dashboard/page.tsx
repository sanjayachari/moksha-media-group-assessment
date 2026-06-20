'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import AppBadge from '@/components/common/AppBadge'
import {
  BarChart3,
  Bell,
  ClipboardList,
  Users,
  LineChart,
  Loader2,
  Map,
} from 'lucide-react'

import Link from 'next/link'

import { Skeleton } from '@/components/common/Skeleton'
import Panel from '@/components/common/Panel'
import KpiCard from '@/components/dashboard/KpiCard'

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalAgents: 0, activeAgents: 0, recentAgents: [] })
  const [syncing, setSyncing] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/dashboard/stats')
        if (res.ok) {
          const { data } = await res.json()
          setStats(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setSyncing(false)
      }
    }
    load()
  }, [])

  const bars = [22, 14, 10, 28, 32, 18, 36, 26, 20, 34, 16, 30, 24, 40, 28, 22, 18, 26, 34, 20]

  return (
    <AppShell>
      <div className="w-full min-w-0 overflow-hidden p-4 lg:p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Dashboard</p>
            <h2 className="mt-1 text-xl font-semibold text-neutral-900 tracking-tight">Platform overview</h2>
            <p className="mt-1 text-sm text-neutral-500">Live snapshot of your system.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <Link href="/dashboard/agents">
              <Button size="sm">Manage Agents</Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            variant="dark"
            label="Total Agents"
            value={String(stats.totalAgents)}
            icon={ClipboardList}
            sub={`${stats.activeAgents} active`}
            syncing={syncing}
          />
          <KpiCard
            label="Active Agents"
            value={String(stats.activeAgents)}
            icon={LineChart}
            sub="Currently running"
            syncing={syncing}
          />
          <KpiCard
            label="Total Users"
            value={String(stats.totalUsers)}
            icon={Users}
            sub="Registered on platform"
            syncing={syncing}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Panel
            className="lg:col-span-8"
            title="Activity trend"
            right={
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Last 20 days</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700">
                  <BarChart3 className="h-3.5 w-3.5" />
                  +12%
                </span>
              </div>
            }
          >
            <div className="h-48 rounded-xl bg-neutral-50 border border-neutral-200/70 p-4">
              <div className="flex h-full items-end gap-1.5">
                {bars.map((h, idx) => (
                  <div key={idx} className="flex-1 min-w-0">
                    <div
                      className={`w-full rounded-sm ${idx === 6 ? 'bg-black' : 'bg-neutral-200'}`}
                      style={{ height: `${h + 20}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel className="lg:col-span-4" title="Coverage">
            <div className="h-48 rounded-xl bg-neutral-950 overflow-hidden relative">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="relative h-full p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-white/60" />
                  <span className="text-xs font-medium text-white/70">Global</span>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                  <p className="text-sm font-semibold text-white">System Monitor</p>
                  <p className="mt-1 text-xs text-white/60">Node distribution</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Recent Agents Table */}
        <Panel
          title="Recent agents"
          right={
            <Link href="/dashboard/agents">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          }
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4 whitespace-nowrap">Name</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Description</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Creator</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Status</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {syncing ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[120px]" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[200px]" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[120px]" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-5 w-full max-w-[70px] rounded-full" /></td>
                      <td className="py-3" />
                    </tr>
                  ))
                ) : stats.recentAgents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-neutral-400 text-sm">
                      No agents created yet.{' '}
                      <Link href="/dashboard/agents" className="text-neutral-900 underline">
                        Create your first one
                      </Link>.
                    </td>
                  </tr>
                ) : (
                  stats.recentAgents.map((row: any) => (
                    <tr key={row._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 pr-4 text-neutral-900 font-medium whitespace-nowrap">{row.name || '—'}</td>
                      <td className="py-3 pr-4 text-neutral-600 max-w-[200px] truncate">{row.description || '—'}</td>
                      <td className="py-3 pr-4 text-neutral-600 max-w-[200px] truncate">
                        {row.createdBy?.name || row.createdBy?.email || '—'}
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <AppBadge status={row.status} label={row.status} />
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/agents`}
                          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>

      </div>
    </AppShell>
  )
}