// Mirrors the backend's Category enum exactly (app/models/models.py).
// These are the values sent to / received from the API.
export const CATEGORIES = [
  'GROCERIES',
  'FOOD',
  'HOUSEHOLD',
  'MEDICINE',
  'TRAVEL',
  'BILLS',
  'SHOPPING',
  'OTHER',
] as const

export type Category = (typeof CATEGORIES)[number]

// Human-friendly display labels for each category.
export const CATEGORY_LABELS: Record<Category, string> = {
  GROCERIES: 'Groceries',
  FOOD: 'Food',
  HOUSEHOLD: 'Household',
  MEDICINE: 'Medicine',
  TRAVEL: 'Travel',
  BILLS: 'Bills',
  SHOPPING: 'Shopping',
  OTHER: 'Other',
}

// Matches ExpenseRead in app/models/ExpenseSchemas.py
export interface Expense {
  id: number
  item: string
  category: Category
  amount: number
  note: string | null
  dateField: string // ISO date, e.g. "2026-08-16"
  created_at: string // ISO datetime
}

// Matches ExpenseCreate
export interface ExpenseCreatePayload {
  item: string
  category: Category
  amount: number
  note: string | null
  dateField: string
}

// The backend PUT route applies exclude_unset, but since the frontend always
// sends the full record (per the "no PATCH" requirement) this looks the
// same shape as create, keyed by id in the API call itself.
export type ExpenseUpdatePayload = ExpenseCreatePayload

export interface ExpenseFilters {
  category?: Category
  dateField?: string
  start_date?: string
  end_date?: string
}

// Matches the /expense/summary/daily response
export interface DailySummary {
  date: string
  total: number
}

// Matches the /expense/summary/monthly response
export interface MonthlySummary {
  year: number
  month: number
  total: number
}

// Matches the /expense/summary/category response: { CATEGORY: total, ... }
export type CategorySummary = Partial<Record<Category, number>>
