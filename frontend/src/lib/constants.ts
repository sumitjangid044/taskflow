import { BadgeCheck, KanbanSquare, LayoutDashboard, FolderKanban, UserCircle2, Users } from 'lucide-react'

export const TOKEN_KEY = 'taskflow_token'

export const publicNav = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export const dashboardNav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Tasks', href: '/tasks', icon: KanbanSquare },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Profile', href: '/profile', icon: UserCircle2 },
]

export const landingFeatures = [
  'Kanban task planning',
  'Role-based collaboration',
  'Beautiful analytics',
  'JWT-secured authentication',
  'Dark and light mode',
  'Mobile-first dashboards',
]

export const stats = [
  { label: 'Active projects', value: '24', change: '+12%' },
  { label: 'Completed tasks', value: '183', change: '+28%' },
  { label: 'Team members', value: '18', change: '+4%' },
  { label: 'Overdue rate', value: '4.2%', change: '-2.1%' },
]

export const testimonials = [
  {
    name: 'Maya Chen',
    role: 'Product Lead, Northstar',
    quote:
      'TaskFlow gives us a premium command center for projects without the usual clutter. The dashboard feels like a real SaaS product.',
  },
  {
    name: 'Jordan Patel',
    role: 'Engineering Manager, Brightline',
    quote:
      'The polished UI, protected routes, and analytics-first layout make it ideal for demos, hiring loops, and production expansion.',
  },
  {
    name: 'Sophia Rivera',
    role: 'Operations Director, Orbit',
    quote:
      'The responsive sidebar and mobile navigation are exceptionally clean. It looks impressive on a laptop and works equally well on a phone.',
  },
]

export const pricingPlans = [
  {
    name: 'Starter',
    price: '$12',
    description: 'For small teams getting organized fast.',
    features: ['Up to 5 projects', 'Kanban board', 'Email support'],
  },
  {
    name: 'Growth',
    price: '$29',
    description: 'The most popular choice for growing teams.',
    featured: true,
    features: ['Unlimited projects', 'Advanced analytics', 'Role management', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams that need advanced control.',
    features: ['SSO ready', 'Dedicated onboarding', 'SLA support'],
  },
]

export const roleOptions = [
  { label: 'Member', value: 'member' },
  { label: 'Admin', value: 'admin' },
]

export const teamActivity = [
  'A task was moved to Done by Ava',
  'New project “Atlas Platform” created',
  'Noah commented on API integration',
  'Three tasks are due tomorrow',
]

export const overviewMembers = [
  { name: 'Ava', role: 'Admin' },
  { name: 'Noah', role: 'Member' },
  { name: 'Zoe', role: 'Member' },
  { name: 'Leo', role: 'Member' },
]

export const overviewPillars = [BadgeCheck, Users]
