import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { expensesApi } from '../services/expenses'
import { summariesApi } from '../services/summaries'
import type { ExpenseCreatePayload, ExpenseFilters, ExpenseUpdatePayload } from '../types/expense'

const queryKeys = {
  expenses: (filters?: ExpenseFilters) => ['expenses', filters ?? {}] as const,
  expense: (id: number) => ['expense', id] as const,
  dailySummary: (date: string) => ['summary', 'daily', date] as const,
  monthlySummary: (year: number, month: number) => ['summary', 'monthly', year, month] as const,
  categorySummary: (year?: number, month?: number) => ['summary', 'category', year ?? null, month ?? null] as const,
}

export function useExpenses(filters?: ExpenseFilters) {
  return useQuery({
    queryKey: queryKeys.expenses(filters),
    queryFn: () => expensesApi.list(filters),
  })
}

export function useExpense(id: number) {
  return useQuery({
    queryKey: queryKeys.expense(id),
    queryFn: () => expensesApi.getById(id),
    enabled: Number.isFinite(id),
  })
}

export function useDailySummary(date: string) {
  return useQuery({
    queryKey: queryKeys.dailySummary(date),
    queryFn: () => summariesApi.daily(date),
  })
}

export function useMonthlySummary(year: number, month: number) {
  return useQuery({
    queryKey: queryKeys.monthlySummary(year, month),
    queryFn: () => summariesApi.monthly(year, month),
  })
}

export function useCategorySummary(year?: number, month?: number) {
  return useQuery({
    queryKey: queryKeys.categorySummary(year, month),
    queryFn: () => summariesApi.category(year, month),
  })
}

function useInvalidateAllExpenseData() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['expenses'] })
    queryClient.invalidateQueries({ queryKey: ['expense'] })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
  }
}

export function useCreateExpense() {
  const invalidateAll = useInvalidateAllExpenseData()
  return useMutation({
    mutationFn: (payload: ExpenseCreatePayload) => expensesApi.create(payload),
    onSuccess: invalidateAll,
  })
}

export function useUpdateExpense() {
  const invalidateAll = useInvalidateAllExpenseData()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ExpenseUpdatePayload }) => expensesApi.update(id, payload),
    onSuccess: invalidateAll,
  })
}

export function useDeleteExpense() {
  const invalidateAll = useInvalidateAllExpenseData()
  return useMutation({
    mutationFn: (id: number) => expensesApi.remove(id),
    onSuccess: invalidateAll,
  })
}
