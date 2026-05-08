import { useMemo, useState } from 'react'

import { TaskCard } from '@/components/dashboard/TaskCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { taskBoardSeed, type TaskBoardItem, type TaskBoardStatus } from '@/lib/mock'

const statusTitles = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
} as const

export function TasksPage() {
  const [tasks, setTasks] = useState<TaskBoardItem[]>(taskBoardSeed)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  const columns = useMemo(
    () =>
      Object.keys(statusTitles).map((status) => ({
        status: status as TaskBoardStatus,
        items: tasks.filter((task) => task.status === status),
      })),
    [tasks],
  )

  const moveTask = (taskId: string, nextStatus: TaskBoardStatus) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task)))
  }

  const handleDrop = (nextStatus: TaskBoardStatus) => {
    if (!draggedTaskId) {
      return
    }

    moveTask(draggedTaskId, nextStatus)
    setDraggedTaskId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.25em] text-cyan-300 uppercase">Task board</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Drag tasks between workflow stages</h1>
          <p className="mt-2 text-sm text-slate-400">A polished Kanban board with status indicators and priority badges.</p>
        </div>
        <Button>New task</Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {columns.map((column) => (
          <Card
            key={column.status}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(column.status)}
            className="min-h-[28rem] p-4"
          >
            <CardHeader className="mb-4 items-center">
              <CardTitle>{statusTitles[column.status]}</CardTitle>
              <Badge>{column.items.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {column.items.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  comments={task.comments}
                  assignee={task.assignee}
                  draggable
                  onDragStart={() => setDraggedTaskId(task.id)}
                />
              ))}
              {column.items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
                  Drop a task here
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
