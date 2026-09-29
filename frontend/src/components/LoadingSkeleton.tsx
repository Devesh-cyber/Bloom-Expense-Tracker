interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-surface-high ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface-lowest p-4 shadow-soft">
      <Skeleton className="h-11 w-11 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-4 w-14" />
    </div>
  )
}

export function SkeletonTotalCard() {
  return (
    <div className="space-y-3 rounded-lg bg-surface-lowest p-5 shadow-soft">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-9 w-1/2" />
    </div>
  )
}
