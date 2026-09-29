import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonthYear } from '../utils/date'

interface MonthSelectorProps {
  year: number
  month: number
  onPrevious: () => void
  onNext: () => void
  disableNext?: boolean
}

export function MonthSelector({ year, month, onPrevious, onNext, disableNext = false }: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-lowest p-2 shadow-soft">
      <button
        type="button"
        aria-label="Previous month"
        onClick={onPrevious}
        className="press-scale flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-container"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-body-lg font-semibold text-ink">{formatMonthYear(year, month)}</span>
      <button
        type="button"
        aria-label="Next month"
        onClick={onNext}
        disabled={disableNext}
        className="press-scale flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-container disabled:opacity-30"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
