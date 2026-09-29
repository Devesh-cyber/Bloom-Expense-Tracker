import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download } from 'lucide-react'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { FilterPill } from '../components/FilterPill'
import { FilterSheet, type FilterState } from '../components/FilterSheet'
import { ExpenseList } from '../components/ExpenseList'
import { EmptyState } from '../components/EmptyState'
import { PrimaryButton } from '../components/PrimaryButton'
import { SkeletonCard, SkeletonTotalCard } from '../components/LoadingSkeleton'
import { useExpenses, useMonthlySummary } from '../hooks/useExpenseQueries'
import { useToast } from '../components/Toast'
import { exportExpensesToExcel } from '../services/export'
import { ApiError } from '../services/apiClient'
import { formatCurrency } from '../utils/currency'
import { CATEGORY_LABELS } from '../types/expense'
import { Plus } from 'lucide-react'

export function ExpensesPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const now = new Date()
  const [filters, setFilters] = useState<FilterState>({})
  const [sheetOpen, setSheetOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  const expenses = useExpenses(filters)
  const monthlySummary = useMonthlySummary(now.getFullYear(), now.getMonth() + 1)

  const hasActiveFilters = !!(filters.category || filters.start_date || filters.end_date)

  async function handleExport() {
    setExporting(true)
    try {
      await exportExpensesToExcel()
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Unable to export expenses.'
      showToast(message, 'error')
    } finally {
      setExporting(false)
    }
  }

  return (
    <AppShell>
      <TopBar
        title="Expenses"
        onBack={() => navigate('/')}
        trailing={
          <button
            type="button"
            aria-label="Export to Excel"
            onClick={handleExport}
            disabled={exporting}
            className="press-scale flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface-container disabled:opacity-50"
          >
            <Download size={20} />
          </button>
        }
      />

      <main className="space-y-5 px-6 pb-6">
        {monthlySummary.isLoading ? (
          <SkeletonTotalCard />
        ) : (
          <div className="rounded-lg bg-surface-lowest p-5 shadow-soft">
            <p className="text-headline-md text-ink">{formatCurrency(monthlySummary.data?.total ?? 0)}</p>
            <p className="text-label-lg text-outline">
              Total in {now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <FilterPill label="Date" active={!!(filters.start_date || filters.end_date)} onClick={() => setSheetOpen(true)} />
          <FilterPill
            label={filters.category ? CATEGORY_LABELS[filters.category] : 'Category'}
            active={!!filters.category}
            onClick={() => setSheetOpen(true)}
          />
        </div>

        {expenses.isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : expenses.isError ? (
          <div className="rounded-lg bg-danger-container p-4 text-body-md text-danger-onContainer">
            Unable to load expenses.
          </div>
        ) : (expenses.data?.length ?? 0) === 0 ? (
          <EmptyState
            title={hasActiveFilters ? 'No expenses match your filters' : 'No expenses yet'}
            action={
              hasActiveFilters ? (
                <PrimaryButton fullWidth={false} variant="secondary" onClick={() => setFilters({})} className="px-6">
                  Clear Filters
                </PrimaryButton>
              ) : (
                <PrimaryButton fullWidth={false} onClick={() => navigate('/expenses/new')} className="px-6">
                  <Plus size={18} /> Add Expense
                </PrimaryButton>
              )
            }
          />
        ) : (
          <ExpenseList expenses={expenses.data!} />
        )}
      </main>

      <FilterSheet open={sheetOpen} filters={filters} onApply={setFilters} onClose={() => setSheetOpen(false)} />
    </AppShell>
  )
}
