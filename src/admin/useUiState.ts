import { useState, useCallback, useRef } from 'react'
import type { Toast, ToastType } from './Toast'

let toastId = 0

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const addToast = useCallback((type: ToastType, message: string) => {
    idRef.current = ++toastId
    const id = idRef.current
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, dismissToast }
}

export interface ConfirmState {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
}

export function useConfirm() {
  const [confirm, setConfirm] = useState<ConfirmState>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })

  const requestConfirm = useCallback(
    (title: string, message: string, onConfirm: () => void, confirmLabel?: string) => {
      setConfirm({ open: true, title, message, onConfirm, confirmLabel })
    },
    []
  )

  const closeConfirm = useCallback(() => {
    setConfirm((prev) => ({ ...prev, open: false }))
  }, [])

  return { confirm, requestConfirm, closeConfirm }
}
