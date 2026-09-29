import { useNavigate } from 'react-router-dom'
import { CategoryIcon } from './CategoryIcon'
import { formatCurrency } from '../utils/currency'
import { formatRelativeDate } from '../utils/date'
import { CATEGORY_LABELS, type Expense } from '../types/expense'

interface ExpenseCardProps {
  expense: Expense
  showRelativeDate?: boolean
}

export function ExpenseCard({ expense, showRelativeDate = true }: ExpenseCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/expenses/${expense.id}`)}
      className="press-scale flex min-h-touch w-full items-center gap-3 rounded-lg bg-surface-lowest p-4 text-left shadow-soft"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
        <CategoryIcon category={expense.category} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body-md font-medium text-ink">{expense.item}</span>
        <span className="block truncate text-label-lg font-normal text-outline">
          {CATEGORY_LABELS[expense.category]}
          {showRelativeDate ? ` • ${formatRelativeDate(expense.dateField)}` : ''}
        </span>
      </span>
      <span className="shrink-0 text-body-lg font-semibold text-ink">{formatCurrency(expense.amount)}</span>
    </button>
  )
}
