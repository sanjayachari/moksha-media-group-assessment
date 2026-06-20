import React from 'react'
import { Button } from '@/components/ui/button'

interface DeleteConfirmationModalProps {
  deletingAgent: any
  saving: boolean
  onDelete: () => void
  onClose: () => void
}

export default function DeleteConfirmationModal({
  deletingAgent,
  saving,
  onDelete,
  onClose
}: DeleteConfirmationModalProps) {
  if (!deletingAgent) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Delete Agent</h3>
        <p className="text-sm text-neutral-600 mb-6">
          Are you sure you want to delete {deletingAgent.name}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button variant="danger" onClick={onDelete} loading={saving} className="!bg-red-600 hover:!bg-red-700">Delete Agent</Button>
        </div>
      </div>
    </div>
  )
}
