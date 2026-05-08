import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { ChevronRight, LogOut, PanelLeftClose } from 'lucide-react'

import { dashboardNav } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()

  return (
    <AnimatePresence>
      {(mobileOpen || typeof window !== 'undefined') && (
        <motion.aside
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-80 border-r border-white/10 bg-slate-950/95 p-4 backdrop-blur-2xl',
            'lg:translate-x-0 lg:opacity-100',
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-indigo-950/30">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 font-bold text-white">
                  TF
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">TaskFlow</p>
                  <p className="text-xs text-slate-400">Team workspace</p>
                </div>
              </Link>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="Close sidebar">
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Signed in as</p>
              <p className="mt-2 text-lg font-semibold text-white">{user?.name ?? 'Team member'}</p>
              <p className="text-sm text-slate-400">{user?.email ?? 'team@taskflow.app'}</p>
            </div>

            <nav className="mt-6 space-y-2">
              {dashboardNav.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === '/dashboard'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-400/20 text-white ring-1 ring-white/10'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white',
                    )
                  }
                  onClick={onClose}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6">
              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
                <p className="font-semibold">Pro tip</p>
                <p className="mt-1 text-cyan-50/80">Use the dashboard, tasks, and projects views to present a full SaaS workflow.</p>
              </div>
              <Button variant="secondary" className="w-full justify-start" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
