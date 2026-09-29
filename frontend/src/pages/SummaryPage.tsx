import { useState } from 'react'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { MonthSelector } from '../components/MonthSelector'
import { CategoryBreakdown } from '../components/CategoryBreakdown'
import { SkeletonTotalCard, Skeleton } from '../components/LoadingSkeleton'
import { useCategorySummary, useMonthlySummary } from '../hooks/useExpenseQueries'
import { formatCurrency } from '../utils/currency'
import { isCurrentMonth, nextMonth, previousMonth } from '../utils/date'

export function SummaryPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const monthlySummary = useMonthlySummary(year, month)
  const categorySummary = useCategorySummary(year, month)

  function handlePrevious() {
    const prev = previousMonth(year, month)
    setYear(prev.year)
    setMonth(prev.month)
  }

  function handleNext() {
    const next = nextMonth(year, month)
    setYear(next.year)
    setMonth(next.month)
  }

  const hasError = monthlySummary.isError || categorySummary.isError

  return (
    <AppShell>
      <TopBar greeting={undefined} title="Summary" onBack={() => window.history.back()} />

      <main className="space-y-5 px-6 pb-6">
        {hasError && (
          <div className="rounded-lg bg-danger-container p-4 text-body-md text-danger-onContainer">
            Unable to load your summary. Please try again.
          </div>
        )}

        <MonthSelector
          year={year}
          month={month}
          onPrevious={handlePrevious}
          onNext={handleNext}
          disableNext={isCurrentMonth(year, month)}
        />

        {monthlySummary.isLoading ? (
          <SkeletonTotalCard />
        ) : (
          <div className="rounded-lg bg-surface-lowest p-5 text-center shadow-soft">
            <p className="mb-1 text-label-lg text-outline">Total Spending</p>
            <p className="text-display-lg-mobile text-ink">{formatCurrency(monthlySummary.data?.total ?? 0)}</p>
          </div>
        )}

        <div className="rounded-lg bg-surface-lowest p-5 shadow-soft">
          <h2 className="mb-4 text-headline-sm text-ink">Category Breakdown</h2>
          {categorySummary.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          ) : (
            <CategoryBreakdown data={categorySummary.data ?? {}} />
          )}
        </div>
      </main>
    </AppShell>
  )
}
