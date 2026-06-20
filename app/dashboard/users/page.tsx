'use client'

import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import AppBadge from '@/components/common/AppBadge'
import { Loader2, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/common/Skeleton'
import { useDebounce } from '@/lib/useDebounce'
import Panel from '@/components/common/Panel'
import EditRoleModal from './EditRoleModal'
import DeleteUserModal from './DeleteUserModal'



export default function UsersPage() {
  const { user, status } = useAuth()
  const router = useRouter()

  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // For edit modal
  const [editingUser, setEditingUser] = useState<any>(null)
  const [editRole, setEditRole] = useState('')
  const [saving, setSaving] = useState(false)

  // For delete modal
  const [deletingUser, setDeletingUser] = useState<any>(null)
  
  useEffect(() => {
    if (status === 'authenticated' && user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [user, status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUsers()
    }
  }, [debouncedSearch, page, status])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/users?search=${encodeURIComponent(debouncedSearch)}&page=${page}&limit=10`)
      if (res.ok) {
        const { data, pagination } = await res.json()
        setUsers(data)
        setTotalPages(pagination?.totalPages || 1)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleUpdateRole = async () => {
    if (!editingUser) return
    setSaving(true)
    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole })
      })
      if (res.ok) {
        await fetchUsers()
        setEditingUser(null)
      } else {
        alert('Failed to update role')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingUser) return
    setSaving(true)
    try {
      const res = await fetch(`/api/users/${deletingUser._id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await fetchUsers()
        setDeletingUser(null)
      } else {
        alert('Failed to delete user. You cannot delete yourself.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || (status === 'authenticated' && user?.role !== 'admin')) {
    return <AppShell><div className="flex items-center justify-center p-20"><Loader2 className="animate-spin w-6 h-6" /></div></AppShell>
  }

  return (
    <AppShell>
      <div className="w-full min-w-0 overflow-hidden p-4 lg:p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Administration</p>
            <h2 className="mt-1 text-xl font-semibold text-neutral-900 tracking-tight">Users Management</h2>
            <p className="mt-1 text-sm text-neutral-500">Manage platform users and their roles.</p>
          </div>
        </div>

        <Panel
          title="All Users"
          loading={loading}
          right={
            <div className="flex relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search name or email..."
                className="w-[260px] rounded-lg bg-neutral-50 border border-neutral-200 pl-9 pr-3 py-1.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40"
              />
            </div>
          }
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4 whitespace-nowrap">Name</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Email</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Role</th>
                  <th className="pb-3 pr-4 whitespace-nowrap">Joined</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loading && users.length === 0 ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[120px]" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[200px]" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-5 w-full max-w-[70px] rounded-full" /></td>
                      <td className="py-3 pr-4"><Skeleton className="h-4 w-full max-w-[120px]" /></td>
                      <td className="py-3" />
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-neutral-400">No users found.</td>
                  </tr>
                ) : (
                  users.map((row) => (
                    <tr key={row._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-neutral-900">{row.name}</td>
                      <td className="py-3 pr-4 text-neutral-600">{row.email}</td>
                      <td className="py-3 pr-4">
                        <AppBadge status={row.role === 'admin' ? 'active' : 'inactive'} label={row.role} />
                      </td>
                      <td className="py-3 pr-4 text-neutral-600">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditingUser(row); setEditRole(row.role) }}
                            className="p-1.5 text-neutral-500 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeletingUser(row)}
                            className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-3">
            <span className="text-sm text-neutral-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Panel>

      </div>

      <EditRoleModal
        editingUser={editingUser}
        editRole={editRole}
        setEditRole={setEditRole}
        saving={saving}
        onSave={handleUpdateRole}
        onClose={() => setEditingUser(null)}
      />

      <DeleteUserModal
        deletingUser={deletingUser}
        saving={saving}
        onDelete={handleDelete}
        onClose={() => setDeletingUser(null)}
      />
    </AppShell>
  )
}
