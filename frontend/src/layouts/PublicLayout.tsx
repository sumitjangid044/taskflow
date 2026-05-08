import { Link, Outlet } from 'react-router-dom'

import { publicNav } from '@/lib/constants'

export function PublicLayout() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
              TF
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">TaskFlow</p>
              <p className="text-xs text-slate-400">Team task manager SaaS</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {publicNav.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/5"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
