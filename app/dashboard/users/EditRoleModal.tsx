import React from 'react'
import { Button } from '@/components/ui/button'

interface EditRoleModalProps {
  editingUser: any
  editRole: string
  setEditRole: (role: string) => void
  saving: boolean
  onSave: () => void
  onClose: () => void
}

export default function EditRoleModal({
  editingUser,
  editRole,
  setEditRole,
  saving,
  onSave,
  onClose
}: EditRoleModalProps) {
  if (!editingUser) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Edit Role for {editingUser.name}</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
          <select
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 p-2 text-sm text-neutral-900 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={onSave} loading={saving}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
