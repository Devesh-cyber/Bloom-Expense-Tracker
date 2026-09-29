import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { ExpenseForm } from '../components/ExpenseForm'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { PrimaryButton } from '../components/PrimaryButton'
import { Skeleton } from '../components/LoadingSkeleton'
import { useDeleteExpense, useExpense, useUpdateExpense } from '../hooks/useExpenseQueries'
import { useToast } from '../components/Toast'
import { ApiError } from '../services/apiClient'
import type { ExpenseCreatePayload } from '../types/expense'
import { Trash2 } from 'lucide-react'

export function ExpenseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const expenseId = Number(id)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const { data: expense, isLoading, isError } = useExpense(expenseId)
  const updateExpense = useUpdateExpense()
  const deleteExpense = useDeleteExpense()

  const [confirmOpen, setConfirmOpen] = useState(false)

  function handleSubmit(payload: ExpenseCreatePayload) {
    updateExpense.mutate(
      { id: expenseId, payload },
      {
        onSuccess: () => {
          showToast('Expense updated.')
          navigate('/expenses')
        },
        onError: (error) => {
          const message =
            error instanceof ApiError ? error.message : 'Something went wrong while saving the expense.'
          showToast(message, 'error')
        },
      }
    )
  }

  function handleDelete() {
    deleteExpense.mutate(expenseId, {
      onSuccess: () => {
        showToast('Expense deleted.')
        navigate('/expenses')
      },
      onError: (error) => {
        const message = error instanceof ApiError ? error.message : 'Unable to delete this expense.'
        showToast(message, 'error')
        setConfirmOpen(false)
      },
    })
  }

  return (
    <AppShell showNav={false}>
      <TopBar title="Edit Expense" />

      {isLoading ? (
        <div className="space-y-5 px-6 pb-6">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : isError || !expense ? (
        <div className="px-6 pb-6">
          <div className="rounded-lg bg-danger-container p-4 text-body-md text-danger-onContainer">
            Expense not found.
          </div>
        </div>
      ) : (
        <>
          <ExpenseForm
            initialValues={{
              amount: String(expense.amount),
              item: expense.item,
              category: expense.category,
              dateField: expense.dateField,
              note: expense.note ?? '',
            }}
            submitLabel="Save Changes"
            loading={updateExpense.isPending}
            onSubmit={handleSubmit}
          />

          <div className="px-6 pb-8">
            <PrimaryButton variant="danger" onClick={() => setConfirmOpen(true)}>
              <Trash2 size={18} /> Delete Expense
            </PrimaryButton>
          </div>

          <ConfirmDialog
            open={confirmOpen}
            title="Delete this expense?"
            description="This can't be undone."
            loading={deleteExpense.isPending}
            onConfirm={handleDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </>
      )}
    </AppShell>
  )
}
