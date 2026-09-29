import { NavLink } from 'react-router-dom'
import { House, Receipt, ChartPie } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/expenses', label: 'Expenses', icon: Receipt, end: false },
  { to: '/summary', label: 'Summary', icon: ChartPie, end: false },
]

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-surface-high bg-surface-lowest"
    >
      <div className="mx-auto flex max-w-app items-stretch justify-around">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-touch flex-1 flex-col items-center justify-center gap-1 py-2 text-label-lg ${
                isActive ? 'text-primary' : 'text-outline'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-9 w-14 items-center justify-center rounded-full ${
                    isActive ? 'bg-primary-container' : ''
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
