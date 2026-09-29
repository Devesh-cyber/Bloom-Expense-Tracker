import { expensesApi } from './expenses'

function escapeCsvValue(value: unknown) {
  const text = value == null ? '' : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

/**
 * Exports the existing Supabase expense data directly from the browser.
 * CSV opens directly in Excel/LibreOffice without requiring a backend.
 */
export async function exportExpensesToExcel(): Promise<void> {
  const expenses = await expensesApi.list()

  const headers = ['ID', 'Item', 'Category', 'Amount', 'Date', 'Note', 'Created At']
  const rows = expenses.map((expense) => [
    expense.id,
    expense.item,
    expense.category,
    expense.amount,
    expense.dateField,
    expense.note,
    expense.created_at,
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\r\n')

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'expenses.csv'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
