import type { CategorySummary, DailySummary, MonthlySummary } from '../types/expense'
import { supabaseRequest } from './supabase'

function getMonthRange(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const nextYear = month === 12 ? year + 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  const end = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`

  return { start, end }
}

interface AmountRow {
  amount: number
}

interface CategoryAmountRow {
  category: keyof CategorySummary
  amount: number
}

async function getAmountRows(query: string) {
  return supabaseRequest<AmountRow[]>(`expense?${query}`)
}

function sum(rows: AmountRow[]) {
  return rows.reduce((total, row) => total + Number(row.amount || 0), 0)
}

export const summariesApi = {
  daily: async (dateField: string): Promise<DailySummary> => {
    const rows = await getAmountRows(
      `select=amount&dateField=eq.${encodeURIComponent(dateField)}`
    )

    return {
      date: dateField,
      total: sum(rows),
    }
  },

  monthly: async (year: number, month: number): Promise<MonthlySummary> => {
    const { start, end } = getMonthRange(year, month)
    const rows = await getAmountRows(
      `select=amount&dateField=gte.${start}&dateField=lt.${end}`
    )

    return {
      year,
      month,
      total: sum(rows),
    }
  },

  category: async (year?: number, month?: number): Promise<CategorySummary> => {
    const params = new URLSearchParams({ select: 'category,amount' })

    if (year !== undefined && month !== undefined) {
      const { start, end } = getMonthRange(year, month)
      params.append('dateField', `gte.${start}`)
      params.append('dateField', `lt.${end}`)
    }

    const rows = await supabaseRequest<CategoryAmountRow[]>(
      `expense?${params.toString()}`
    )

    return rows.reduce<CategorySummary>((result, row) => {
      const category = row.category
      result[category] = (result[category] ?? 0) + Number(row.amount || 0)
      return result
    }, {})
  },
}
