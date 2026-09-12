import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: number) => void
}

function ToastItem({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const Icon = toast.type === 'success' ? CheckCircle : XCircle
  const iconClass = toast.type === 'success' ? 'text-emerald-500' : 'text-red-500'
  const bgClass = toast.type === 'success' ? 'bg-emerald-50' : 'bg-red-50'

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bgClass} animate-in slide-in-from-top-2`}>
      <Icon size={18} className={iconClass} />
      <span className="text-sm text-gray-800 flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="p-0.5 rounded hover:bg-black/5">
        <X size={14} className="text-gray-400" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
