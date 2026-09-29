import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface FilterPillProps {
  label: string
  active?: boolean
  onClick: () => void
  icon?: ReactNode
}

export function FilterPill({ label, active = false, onClick, icon }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press-scale flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-label-lg ${
        active
          ? 'border-primary bg-primary-container text-primary-onContainer'
          : 'border-outline-variant bg-surface-lowest text-ink'
      }`}
    >
      {icon}
      <span>{label}</span>
      <ChevronDown size={14} />
    </button>
  )
}
