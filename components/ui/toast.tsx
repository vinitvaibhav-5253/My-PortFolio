'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastState {
  id: number
  type: ToastType
  message: string
}

let toastId = 0

type ToastListener = (toast: ToastState) => void
const listeners: Set<ToastListener> = new Set()

function emitToast(type: ToastType, message: string) {
  const toast: ToastState = { id: ++toastId, type, message }
  listeners.forEach((fn) => fn(toast))
}

/** Show a success toast */
export function toastSuccess(message: string) {
  emitToast('success', message)
}

/** Show an error toast */
export function toastError(message: string) {
  emitToast('error', message)
}

const TOAST_DURATION = 5000

export function Toaster() {
  const [toasts, setToasts] = useState<ToastState[]>([])

  const addToast = useCallback((toast: ToastState) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    listeners.add(addToast)
    return () => {
      listeners.delete(addToast)
    }
  }, [addToast])

  // Auto-dismiss
  useEffect(() => {
    if (toasts.length === 0) return
    const latest = toasts[toasts.length - 1]
    if (!latest) return
    const timer = setTimeout(() => removeToast(latest.id), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toasts, removeToast])

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 left-4 z-[100] flex flex-col items-end gap-3 sm:left-auto"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`pointer-events-auto flex w-full max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-xl sm:w-auto sm:max-w-sm ${
              toast.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-red-500/30 bg-red-500/10 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="mt-0.5 size-5 shrink-0" />
            ) : (
              <XCircle className="mt-0.5 size-5 shrink-0" />
            )}
            <p className="text-foreground flex-1 text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
