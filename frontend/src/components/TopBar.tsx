import { ArrowLeft, Sprout } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface TopBarProps {
  /** Brand mode: shows the Bloom Tracker logo + name and an optional greeting. */
  greeting?: string
  /** Back mode: shows a back arrow and a title, used on sub-screens. */
  title?: string
  onBack?: () => void
  trailing?: ReactNode
}

export function TopBar({ greeting, title, onBack, trailing }: TopBarProps) {
  const navigate = useNavigate()

  if (title !== undefined) {
    return (
      <header className="safe-top sticky top-0 z-20 flex min-h-touch items-center gap-3 bg-background px-6 py-4">
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack ?? (() => navigate(-1))}
          className="press-scale flex h-12 w-12 -ml-3 items-center justify-center rounded-full text-ink hover:bg-surface-container"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-headline-sm text-ink">{title}</h1>
        {trailing && <div className="ml-auto">{trailing}</div>}
      </header>
    )
  }

  return (
    <header className="safe-top sticky top-0 z-20 flex min-h-touch items-center justify-between bg-background px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-primary-onContainer">
          <Sprout size={20} />
        </span>
        <div>
          {greeting && <p className="text-label-lg text-outline">{greeting}</p>}
          <p className="text-headline-sm text-primary">Bloom Tracker</p>
        </div>
      </div>
      {trailing}
    </header>
  )
}
