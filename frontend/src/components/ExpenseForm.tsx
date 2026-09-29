import { useState } from 'react'
import { AmountInput } from '../components/AmountInput'
import { CategorySelector } from '../components/CategorySelector'
import { DateInput } from '../components/DateInput'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Category, ExpenseCreatePayload } from '../types/expense'
import { todayISO } from '../utils/date'

export interface ExpenseFormValues {
  amount: string
  item: string
  category: Category | null
  dateField: string
  note: string
}

interface ExpenseFormProps {
  initialValues?: Partial<ExpenseFormValues>
  submitLabel: string
  loading?: boolean
  onSubmit: (payload: ExpenseCreatePayload) => void
}

export function ExpenseForm({ initialValues, submitLabel, loading = false, onSubmit }: ExpenseFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>({
    amount: initialValues?.amount ?? '',
    item: initialValues?.item ?? '',
    category: initialValues?.category ?? null,
    dateField: initialValues?.dateField ?? todayISO(),
    note: initialValues?.note ?? '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormValues, string>>>({})

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof ExpenseFormValues, string>> = {}
    const amountValue = Number(values.amount)

    if (!values.amount || Number.isNaN(amountValue) || amountValue <= 0) {
      nextErrors.amount = 'Enter an amount greater than ₹0.'
    }
    if (!values.item.trim()) {
      nextErrors.item = 'Item name is required.'
    }
    if (!values.category) {
      nextErrors.category = 'Choose a category.'
    }
    if (!values.dateField) {
      nextErrors.dateField = 'Choose a date.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate() || !values.category) return

    onSubmit({
      item: values.item.trim(),
      category: values.category,
      amount: Number(values.amount),
      note: values.note.trim() ? values.note.trim() : null,
      dateField: values.dateField,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
      <AmountInput
        value={values.amount}
        onChange={(amount) => setValues((v) => ({ ...v, amount }))}
        error={errors.amount}
      />

      <div>
        <label htmlFor="item" className="mb-2 block text-label-lg text-outline">
          Item Name
        </label>
        <input
          id="item"
          type="text"
          placeholder="Item Name (e.g., Vegetables)"
          value={values.item}
          onChange={(e) => setValues((v) => ({ ...v, item: e.target.value }))}
          aria-invalid={!!errors.item}
          className="min-h-touch w-full rounded-lg border border-outline-variant bg-surface-lowest px-4 text-body-md text-ink placeholder:text-outline focus:border-2 focus:border-secondary focus:outline-none"
        />
        {errors.item && <p className="mt-1.5 text-label-lg text-danger">{errors.item}</p>}
      </div>

      <div>
        <p className="mb-2 text-label-lg text-outline">Category</p>
        <CategorySelector value={values.category} onChange={(category) => setValues((v) => ({ ...v, category }))} />
        {errors.category && <p className="mt-1.5 text-label-lg text-danger">{errors.category}</p>}
      </div>

      <DateInput value={values.dateField} onChange={(dateField) => setValues((v) => ({ ...v, dateField }))} />

      <div>
        <label htmlFor="note" className="mb-2 block text-label-lg text-outline">
          Note (Optional)
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="Add a note…"
          value={values.note}
          onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
          className="w-full resize-none rounded-lg border border-outline-variant bg-surface-lowest p-4 text-body-md text-ink placeholder:text-outline focus:border-2 focus:border-secondary focus:outline-none"
        />
      </div>

      <PrimaryButton type="submit" loading={loading}>
        {submitLabel}
      </PrimaryButton>
    </form>
  )
}
