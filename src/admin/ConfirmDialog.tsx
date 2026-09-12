import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 text-gray-400"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6 pl-[52px]">{message}</p>

        <div className="flex gap-3 justify-end pl-[52px]">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
