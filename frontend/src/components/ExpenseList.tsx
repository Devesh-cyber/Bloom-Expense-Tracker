import type { Expense } from '../types/expense'
import { formatDateGroupLabel } from '../utils/date'
import { ExpenseCard } from './ExpenseCard'

interface ExpenseListProps {
  expenses: Expense[]
}

interface Group {
  dateField: string
  items: Expense[]
}

function groupByDate(expenses: Expense[]): Group[] {
  const sorted = [...expenses].sort((a, b) => {
    if (a.dateField !== b.dateField) return b.dateField.localeCompare(a.dateField)
    return b.created_at.localeCompare(a.created_at)
  })

  const groups: Group[] = []
  for (const expense of sorted) {
    const last = groups[groups.length - 1]
    if (last && last.dateField === expense.dateField) {
      last.items.push(expense)
    } else {
      groups.push({ dateField: expense.dateField, items: [expense] })
    }
  }
  return groups
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const groups = groupByDate(expenses)

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.dateField} className="space-y-3">
          <p className="text-label-lg text-outline">{formatDateGroupLabel(group.dateField)}</p>
          <div className="space-y-3">
            {group.items.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} showRelativeDate={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
