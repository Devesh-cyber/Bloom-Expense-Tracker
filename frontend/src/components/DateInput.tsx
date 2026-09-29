interface DateInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function DateInput({
  value,
  onChange,
  label = 'Date',
}: DateInputProps) {
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget

    if ('showPicker' in HTMLInputElement.prototype) {
      try {
        input.showPicker()
      } catch {
        // Native picker unavailable or already open.
      }
    }
  }

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-text">
        {label}
      </label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleClick}
        className="
          h-14
          w-full
          cursor-pointer
          rounded-lg
          border
          border-neutral
          bg-white
          px-4
          text-base
          text-text
          outline-none
          transition
          focus:border-2
          focus:border-sage
        "
      />
    </div>
  )
}