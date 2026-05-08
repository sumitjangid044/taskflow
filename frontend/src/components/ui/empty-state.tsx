import { Inbox } from 'lucide-react'

import { Button } from './button'
import { Card } from './card'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-cyan-300">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  )
}
