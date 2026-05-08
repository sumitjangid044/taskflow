import { Bell, Search, MoonStar, SunMedium } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { useTheme } from '@/context/theme-context'

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="flex h-[73px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300 uppercase">TaskFlow</p>
            <p className="text-xs text-slate-400">Command center</p>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Toggle menu">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden flex-1 max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-400 lg:flex">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search projects, tasks, members...</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Link to="/profile" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 pr-3 transition hover:bg-white/10">
            <Avatar name={user?.name ?? 'TaskFlow User'} size="sm" />
            <div className="hidden text-left sm:block">
              <p className="text-xs text-slate-400">Welcome back</p>
              <p className="text-sm font-medium text-white">{user?.name ?? 'User'}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
