const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

const inrFormatterWithPaise = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Formats a numeric amount as a clean Indian Rupee display string, e.g.
 * ₹1,25,000. Always positive — expenses are never shown with a negative
 * sign since their context (an expense list) already implies "spent".
 */
export function formatCurrency(amount: number): string {
  const value = Math.abs(amount)
  const hasFraction = Math.round(value * 100) % 100 !== 0
  const formatted = hasFraction ? inrFormatterWithPaise.format(value) : inrFormatter.format(value)
  return `\u20B9${formatted}`
}
