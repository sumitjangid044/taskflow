export const dashboardChartData = [
  { name: 'Mon', tasks: 18, completed: 12 },
  { name: 'Tue', tasks: 24, completed: 16 },
  { name: 'Wed', tasks: 20, completed: 18 },
  { name: 'Thu', tasks: 30, completed: 22 },
  { name: 'Fri', tasks: 28, completed: 25 },
  { name: 'Sat', tasks: 16, completed: 12 },
  { name: 'Sun', tasks: 12, completed: 9 },
]

export type TaskBoardStatus = 'todo' | 'in_progress' | 'done'

export interface TaskBoardItem {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  comments: number
  assignee: string
  status: TaskBoardStatus
}

export interface ProjectSeedItem {
  name: string
  progress: number
  members: number
  status: string
}

export const taskBoardSeed: TaskBoardItem[] = [
  {
    id: 'task-1',
    title: 'Ship onboarding flow',
    description: 'Finalize welcome screens and validate the signup workflow.',
    priority: 'high' as const,
    dueDate: 'May 10',
    comments: 4,
    assignee: 'Ava',
    status: 'todo' as const,
  },
  {
    id: 'task-2',
    title: 'Refine analytics chart',
    description: 'Improve tooltip copy and adjust the dashboard composition.',
    priority: 'medium' as const,
    dueDate: 'May 12',
    comments: 2,
    assignee: 'Noah',
    status: 'in_progress' as const,
  },
  {
    id: 'task-3',
    title: 'Audit role middleware',
    description: 'Confirm route protection and permissions for member accounts.',
    priority: 'low' as const,
    dueDate: 'May 14',
    comments: 1,
    assignee: 'Zoe',
    status: 'done' as const,
  },
  {
    id: 'task-4',
    title: 'Design project cards',
    description: 'Add progress visualizations and collaboration details.',
    priority: 'high' as const,
    dueDate: 'May 15',
    comments: 5,
    assignee: 'Leo',
    status: 'todo' as const,
  },
]

export const projectSeed: ProjectSeedItem[] = [
  { name: 'Atlas Platform', progress: 82, members: 6, status: 'Active' },
  { name: 'Nova CRM', progress: 61, members: 4, status: 'Review' },
  { name: 'Pulse Mobile', progress: 34, members: 3, status: 'Planning' },
]
