import { CATEGORY_LABELS, type CategorySummary } from '../types/expense'
import { formatCurrency } from '../utils/currency'

interface CategoryBreakdownProps {
  data: CategorySummary
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const entries = Object.entries(data)
    .filter(([, total]) => (total ?? 0) > 0)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0)) as [keyof typeof CATEGORY_LABELS, number][]

  const maxTotal = entries.length > 0 ? entries[0][1] : 0

  if (entries.length === 0) {
    return <p className="text-body-md text-outline">No expenses for this month.</p>
  }

  return (
    <div className="space-y-4">
      {entries.map(([category, total]) => (
        <div key={category}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-body-md text-ink">{CATEGORY_LABELS[category]}</span>
            <span className="text-body-md font-medium text-ink">{formatCurrency(total)}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary-container">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${maxTotal > 0 ? (total / maxTotal) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
