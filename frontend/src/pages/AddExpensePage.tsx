import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { TopBar } from '../components/TopBar'
import { ExpenseForm } from '../components/ExpenseForm'
import { useCreateExpense } from '../hooks/useExpenseQueries'
import { useToast } from '../components/Toast'
import { ApiError } from '../services/apiClient'
import type { ExpenseCreatePayload } from '../types/expense'

export function AddExpensePage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const createExpense = useCreateExpense()

  function handleSubmit(payload: ExpenseCreatePayload) {
    createExpense.mutate(payload, {
      onSuccess: () => {
        showToast('Expense saved.')
        navigate('/')
      },
      onError: (error) => {
        const message = error instanceof ApiError ? error.message : 'Something went wrong while saving the expense.'
        showToast(message, 'error')
      },
    })
  }

  return (
    <AppShell showNav={false}>
      <TopBar title="Add Expense" />
      <ExpenseForm submitLabel="Save Expense" loading={createExpense.isPending} onSubmit={handleSubmit} />
    </AppShell>
  )
}
