import type { ReactNode } from 'react'
import { Sprout } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-surface-lowest px-6 py-10 text-center shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-secondary">
        <Sprout size={22} />
      </span>
      <p className="text-body-lg font-medium text-ink">{title}</p>
      {description && <p className="text-body-md text-outline">{description}</p>}
      {action}
    </div>
  )
}
