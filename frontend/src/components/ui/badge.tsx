import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = {
  default: 'bg-indigo-500/15 text-indigo-200 border-indigo-500/20',
  success: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-200 border-amber-500/20',
  danger: 'bg-rose-500/15 text-rose-200 border-rose-500/20',
  accent: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/20',
} as const

export type BadgeVariant = keyof typeof badgeVariants

export function Badge({
  className,
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ring-1 ring-inset', badgeVariants[variant], className)}
      {...props}
    />
  )
}
