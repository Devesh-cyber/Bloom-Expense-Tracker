import { ArrowRight, CircleUser, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { PrimaryButton } from '../components/PrimaryButton'
import { EmptyState } from '../components/EmptyState'
import { ExpenseCard } from '../components/ExpenseCard'
import { SkeletonCard, SkeletonTotalCard } from '../components/LoadingSkeleton'
import { useDailySummary, useExpenses, useMonthlySummary } from '../hooks/useExpenseQueries'
import { formatCurrency } from '../utils/currency'
import { formatHumanDate, todayISO } from '../utils/date'

export function HomePage() {
  const navigate = useNavigate()
  const today = todayISO()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const dailySummary = useDailySummary(today)
  const monthlySummary = useMonthlySummary(year, month)
  const todaysExpenses = useExpenses({ dateField: today })

  const hasError = dailySummary.isError || monthlySummary.isError || todaysExpenses.isError

  return (
    <AppShell>
      <TopBar greeting="Good day," trailing={<CircleUser size={24} className="text-outline" aria-hidden="true" />} />

      <main className="space-y-5 px-6 pb-6">
        {hasError && (
          <div className="rounded-lg bg-danger-container p-4 text-body-md text-danger-onContainer">
            Unable to load your spending. Pull to refresh or try again shortly.
          </div>
        )}

        {/* Today's spending */}
        {dailySummary.isLoading ? (
          <SkeletonTotalCard />
        ) : (
          <div className="rounded-lg bg-surface-lowest p-5 shadow-soft">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-label-lg text-outline">Today's Spending</p>
              <span className="rounded-full bg-surface-container px-3 py-1 text-[12px] font-medium text-outline">
                {formatHumanDate(today)}
              </span>
            </div>
            <p className="text-display-lg-mobile text-ink">{formatCurrency(dailySummary.data?.total ?? 0)}</p>
          </div>
        )}

        {/* Month total */}
        {monthlySummary.isLoading ? (
          <SkeletonTotalCard />
        ) : (
          <button
            type="button"
            onClick={() => navigate('/summary')}
            className="press-scale w-full rounded-lg bg-surface-lowest p-5 text-left shadow-soft"
          >
            <p className="mb-1 text-label-lg text-outline">
              {new Date(year, month - 1, 1).toLocaleDateString('en-IN', { month: 'long' })} Spending
            </p>
            <div className="flex items-end justify-between">
              <p className="text-headline-md text-ink">{formatCurrency(monthlySummary.data?.total ?? 0)}</p>
              <span className="flex items-center gap-1 text-label-lg text-primary">
                View Month <ArrowRight size={14} />
              </span>
            </div>
          </button>
        )}

        <PrimaryButton onClick={() => navigate('/expenses/new')}>
          <Plus size={20} /> Add Expense
        </PrimaryButton>

        {/* Today's expenses */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-headline-sm text-ink">Today's Expenses</h2>
            {(todaysExpenses.data?.length ?? 0) > 0 && (
              <button
                type="button"
                onClick={() => navigate('/expenses')}
                className="flex items-center gap-1 text-label-lg text-primary"
              >
                View All <ArrowRight size={14} />
              </button>
            )}
          </div>

          {todaysExpenses.isLoading ? (
            <div className="space-y-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (todaysExpenses.data?.length ?? 0) === 0 ? (
            <EmptyState
              title="No expenses today"
              action={
                <PrimaryButton fullWidth={false} onClick={() => navigate('/expenses/new')} className="px-6">
                  <Plus size={18} /> Add Expense
                </PrimaryButton>
              }
            />
          ) : (
            <div className="space-y-3">
              {todaysExpenses.data!.slice(0, 5).map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          )}
        </div>
      </main>
    </AppShell>
  )
}
