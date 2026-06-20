import React from 'react'
import { Button } from '@/components/ui/button'

interface AgentFormModalProps {
  isOpen: boolean
  editingAgent: any
  formData: { name: string; description: string; status: string }
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; description: string; status: string }>>
  formError: string
  saving: boolean
  onSave: (e: React.FormEvent) => void
  onClose: () => void
}

export default function AgentFormModal({
  isOpen,
  editingAgent,
  formData,
  setFormData,
  formError,
  saving,
  onSave,
  onClose
}: AgentFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">{editingAgent ? 'Edit Agent' : 'Create Agent'}</h3>
        <form onSubmit={onSave}>
          {formError && <p className="mb-4 text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">{formError}</p>}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 p-2 text-sm text-neutral-900 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g. Sales Agent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 p-2 text-sm text-neutral-900 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="What does this agent do?"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 p-2 text-sm text-neutral-900 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" loading={saving}>Save Agent</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
