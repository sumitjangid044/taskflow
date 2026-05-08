import { CalendarDays, MessageSquare, GripVertical, UserCircle2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  comments: number
  assignee: string
  draggable?: boolean
  onDragStart?: () => void
}

const priorityStyles = {
  low: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/20',
  medium: 'bg-amber-400/15 text-amber-200 ring-amber-400/20',
  high: 'bg-rose-400/15 text-rose-200 ring-rose-400/20',
} as const

export function TaskCard({ title, description, priority, dueDate, comments, assignee, draggable, onDragStart }: TaskCardProps) {
  return (
    <Card
      className={cn(
        'cursor-grab border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10',
        draggable && 'active:cursor-grabbing',
      )}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge className={priorityStyles[priority]}>{priority} priority</Badge>
          <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
        </div>
        <GripVertical className="h-4 w-4 text-slate-500" />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {dueDate}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          {comments}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
        <UserCircle2 className="h-4 w-4 text-cyan-300" />
        {assignee}
      </div>
    </Card>
  )
}
