import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, PanelLeftClose } from 'lucide-react'

import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'

export function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const sidebar = useMemo(
    () => <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />,
    [mobileSidebarOpen],
  )

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {sidebar}
      <div className="flex min-h-screen flex-col lg:pl-80">
        <Navbar onMenuClick={() => setMobileSidebarOpen((current) => !current)} />
        <div className="sticky top-[73px] z-20 flex items-center gap-3 border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <Button variant="secondary" size="sm" onClick={() => setMobileSidebarOpen((current) => !current)}>
            {mobileSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="ml-2">Menu</span>
          </Button>
          <span className="text-sm text-slate-400">TaskFlow workspace</span>
        </div>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
