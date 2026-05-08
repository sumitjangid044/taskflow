import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-r border-white/10 bg-slate-950/80 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(8,145,178,0.18),transparent_25%)]" />
        <div className="relative z-10">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
              TF
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">TaskFlow</p>
              <p className="text-sm text-slate-400">Protected collaboration workspace</p>
            </div>
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight text-white">
            A polished team command center for modern task execution.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-300">
            TaskFlow combines secure authentication, analytics-first dashboards, and sleek task management in one premium SaaS interface.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            ['99.9%', 'Uptime focused'],
            ['24/7', 'Team visibility'],
            ['JWT', 'Secure sessions'],
          ].map(([value, label]) => (
            <div key={label} className="glass-card rounded-3xl p-4 text-center">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </aside>

      <section className="relative flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.16),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(8,145,178,0.16),transparent_28%)]" />
        <Outlet />
      </section>
    </div>
  )
}
