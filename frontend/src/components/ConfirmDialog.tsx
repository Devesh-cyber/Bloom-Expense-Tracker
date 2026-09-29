import { PrimaryButton } from './PrimaryButton'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 sm:items-center"
      onClick={onCancel}
    >
      <div
        className="safe-bottom w-full max-w-app rounded-t-xl bg-surface-lowest p-6 shadow-soft sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="text-headline-sm text-ink">
          {title}
        </h2>
        {description && <p className="mt-2 text-body-md text-outline">{description}</p>}
        <div className="mt-6 flex gap-3">
          <PrimaryButton variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </PrimaryButton>
          <PrimaryButton variant="danger" onClick={onConfirm} loading={loading} loadingText="Deleting…">
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
