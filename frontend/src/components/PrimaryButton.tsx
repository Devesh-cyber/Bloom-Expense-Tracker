import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  primary: 'bg-primary text-primary-on shadow-soft disabled:opacity-60',
  secondary: 'bg-transparent text-secondary border-2 border-secondary',
  danger: 'bg-danger text-danger-on shadow-soft disabled:opacity-60',
  ghost: 'bg-surface-container text-ink',
}

export function PrimaryButton({
  children,
  variant = 'primary',
  loading = false,
  loadingText = 'Saving…',
  fullWidth = true,
  className = '',
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className={`press-scale flex min-h-[56px] items-center justify-center gap-2 rounded-lg text-body-lg font-semibold ${
        fullWidth ? 'w-full' : ''
      } ${VARIANT_CLASSES[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
