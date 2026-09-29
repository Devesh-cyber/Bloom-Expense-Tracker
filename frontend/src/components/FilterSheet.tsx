import { X } from 'lucide-react'
import { CATEGORIES, CATEGORY_LABELS, type Category } from '../types/expense'
import { CategoryIcon } from './CategoryIcon'
import { PrimaryButton } from './PrimaryButton'

export interface FilterState {
  category?: Category
  start_date?: string
  end_date?: string
}

interface FilterSheetProps {
  open: boolean
  filters: FilterState
  onApply: (filters: FilterState) => void
  onClose: () => void
}

export function FilterSheet({ open, filters, onApply, onClose }: FilterSheetProps) {
  if (!open) return null

  function setCategory(category: Category | undefined) {
    onApply({ ...filters, category })
  }

  function setStartDate(start_date: string) {
    onApply({ ...filters, start_date: start_date || undefined })
  }

  function setEndDate(end_date: string) {
    onApply({ ...filters, end_date: end_date || undefined })
  }

  function clearAll() {
    onApply({})
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filter expenses"
      className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40"
      onClick={onClose}
    >
      <div
        className="safe-bottom max-h-[80vh] w-full max-w-app overflow-y-auto rounded-t-xl bg-surface-lowest p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-headline-sm text-ink">Filter Expenses</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="press-scale flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-container"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-label-lg text-outline">Category</p>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((category) => {
                const selected = filters.category === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setCategory(selected ? undefined : category)}
                    className={`press-scale flex min-h-touch flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-center ${
                      selected
                        ? 'border-primary bg-primary-container text-primary-onContainer'
                        : 'border-surface-high bg-surface text-ink'
                    }`}
                  >
                    <CategoryIcon category={category} size={18} />
                    <span className="text-[10px] font-medium leading-tight">{CATEGORY_LABELS[category]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-label-lg text-outline">Date range</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="filter-start" className="mb-1 block text-[12px] text-outline">
                  From
                </label>
                <input
                  id="filter-start"
                  type="date"
                  value={filters.start_date ?? ''}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="min-h-touch w-full rounded-lg border border-outline-variant bg-surface px-3 text-body-md text-ink"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="filter-end" className="mb-1 block text-[12px] text-outline">
                  To
                </label>
                <input
                  id="filter-end"
                  type="date"
                  value={filters.end_date ?? ''}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="min-h-touch w-full rounded-lg border border-outline-variant bg-surface px-3 text-body-md text-ink"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <PrimaryButton variant="secondary" onClick={clearAll}>
              Clear
            </PrimaryButton>
            <PrimaryButton onClick={onClose}>Done</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
