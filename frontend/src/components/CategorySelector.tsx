import { CATEGORIES, CATEGORY_LABELS, type Category } from '../types/expense'
import { CategoryIcon } from './CategoryIcon'

interface CategorySelectorProps {
  value: Category | null
  onChange: (category: Category) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div role="radiogroup" aria-label="Category" className="grid grid-cols-4 gap-3">
      {CATEGORIES.map((category) => {
        const selected = value === category
        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(category)}
            className={`press-scale flex min-h-touch flex-col items-center justify-center gap-1.5 rounded-lg border-2 p-2 text-center ${
              selected
                ? 'border-primary bg-primary-container text-primary-onContainer'
                : 'border-surface-high bg-surface-lowest text-ink'
            }`}
          >
            <CategoryIcon category={category} size={22} />
            <span className="text-[11px] font-medium leading-tight">{CATEGORY_LABELS[category]}</span>
          </button>
        )
      })}
    </div>
  )
}
