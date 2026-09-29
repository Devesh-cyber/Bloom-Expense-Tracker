interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  error?: string
}

export function AmountInput({ value, onChange, id = 'amount', error }: AmountInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    // Allow only digits and a single decimal point with up to 2 decimal places.
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
      onChange(raw)
    }
  }

  return (
    <div className="rounded-lg bg-surface-lowest p-5 shadow-soft">
      <label htmlFor={id} className="mb-2 block text-label-lg text-outline">
        Amount
      </label>
      <div className="flex items-baseline gap-2">
        <span className="text-display-lg-mobile text-outline">₹</span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full min-w-0 bg-transparent text-display-lg-mobile text-ink outline-none placeholder:text-outline/50"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-label-lg text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
