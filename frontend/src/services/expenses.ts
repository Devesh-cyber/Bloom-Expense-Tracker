import { supabaseRequest } from './supabase'
import { ApiError } from './apiClient'
import type { Expense, ExpenseCreatePayload, ExpenseFilters, ExpenseUpdatePayload } from '../types/expense'

function buildExpenseQuery(filters?: ExpenseFilters) {
  const params = new URLSearchParams()
  params.set('select', '*')
  params.set('order', 'dateField.desc,created_at.desc')

  if (filters?.category) params.set('category', `eq.${filters.category}`)
  if (filters?.dateField) params.set('dateField', `eq.${filters.dateField}`)
  if (filters?.start_date) params.set('dateField', `gte.${filters.start_date}`)
  if (filters?.end_date) params.append('dateField', `lte.${filters.end_date}`)

  return params.toString()
}

async function getExpenseRows(query: string): Promise<Expense[]> {
  return supabaseRequest<Expense[]>(`expense?${query}`)
}

export const expensesApi = {
  list: (filters?: ExpenseFilters) =>
    getExpenseRows(buildExpenseQuery(filters)),

  getById: async (id: number) => {
    const rows = await supabaseRequest<Expense[]>(
      `expense?select=*&id=eq.${id}&limit=1`
    )

    if (!rows[0]) {
      throw new ApiError(`No expense transaction with id ${id} found`, 404)
    }

    return rows[0]
  },

  create: async (payload: ExpenseCreatePayload) => {
    const rows = await supabaseRequest<Expense[]>('expense', {
      method: 'POST',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        ...payload,
        created_at: new Date().toISOString(),
      }),
    })

    if (!rows[0]) {
      throw new ApiError('The expense could not be created.')
    }

    return rows[0]
  },

  update: async (id: number, payload: ExpenseUpdatePayload) => {
    const rows = await supabaseRequest<Expense[]>(`expense?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    })

    if (!rows[0]) {
      throw new ApiError('Expense not found.', 404)
    }

    return rows[0]
  },

  remove: async (id: number) => {
    const rows = await supabaseRequest<Pick<Expense, 'id'>[]>(
      `expense?id=eq.${id}&select=id`,
      {
        method: 'DELETE',
        headers: {
          Prefer: 'return=representation',
        },
      }
    )

    if (!rows[0]) {
      throw new ApiError(`No expense transaction with id ${id} found`, 404)
    }

    return { message: 'The expense deleted successfully!!' }
  },
}
