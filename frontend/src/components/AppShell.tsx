import type { ReactNode } from 'react'
import { BottomNavigation } from './BottomNavigation'

interface AppShellProps {
  children: ReactNode
  /** Hide bottom nav on sub-screens like Add/Edit Expense. */
  showNav?: boolean
}

export function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <div className="min-h-full bg-background">
      <div className={`mx-auto max-w-app ${showNav ? 'pb-24' : 'pb-8'}`}>{children}</div>
      {showNav && <BottomNavigation />}
    </div>
  )
}
