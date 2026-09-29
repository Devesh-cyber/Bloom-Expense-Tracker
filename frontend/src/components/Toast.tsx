import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ToastState {
  id: number
  message: string
  variant: 'success' | 'error'
}

interface ToastContextValue {
  showToast: (message: string, variant?: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string, variant: 'success' | 'error' = 'success') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const id = Date.now()
    setToast({ id, message, variant })
    timeoutRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
    }, 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="animate-toast-in fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-inverse-surface px-4 py-3 text-body-md text-inverse-onSurface shadow-soft"
        >
          {toast.variant === 'success' ? (
            <CheckCircle2 size={18} className="text-tertiary-container" />
          ) : (
            <AlertCircle size={18} className="text-primary-container" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
