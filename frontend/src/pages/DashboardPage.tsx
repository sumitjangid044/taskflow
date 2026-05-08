import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CheckCircle2, FolderKanban, AlertTriangle, Users2, Activity } from 'lucide-react'

import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { dashboardChartData } from '@/lib/mock'
import { overviewMembers, stats, teamActivity } from '@/lib/constants'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard label={stats[0].label} value={stats[0].value} change={stats[0].change} icon={FolderKanban} />
        <AnalyticsCard label={stats[1].label} value={stats[1].value} change={stats[1].change} icon={CheckCircle2} tone="emerald" />
        <AnalyticsCard label={stats[2].label} value={stats[2].value} change={stats[2].change} icon={Users2} tone="cyan" />
        <AnalyticsCard label={stats[3].label} value={stats[3].value} change={stats[3].change} icon={AlertTriangle} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>Task throughput</CardTitle>
              <p className="mt-1 text-sm text-slate-400">Completed versus total tasks this week</p>
            </div>
            <Badge variant="accent">Live overview</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardChartData}>
                  <defs>
                    <linearGradient id="taskBars" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 18,
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="tasks" radius={[10, 10, 0, 0]} fill="url(#taskBars)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Team activity</CardTitle>
              <p className="mt-1 text-sm text-slate-400">Recent collaboration events</p>
            </div>
            <Activity className="h-5 w-5 text-cyan-300" />
          </CardHeader>
          <CardContent className="space-y-4">
            {teamActivity.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <p className="text-sm text-slate-300">
                  <span className="font-medium text-white">{index + 1}.</span> {item}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Team overview</CardTitle>
              <p className="mt-1 text-sm text-slate-400">Members currently active on the workspace</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {overviewMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} />
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-slate-400">{member.role}</p>
                  </div>
                </div>
                <Badge variant={member.role === 'Admin' ? 'success' : 'default'}>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Completion trend</CardTitle>
              <p className="mt-1 text-sm text-slate-400">Tasks moving to done this week</p>
            </div>
            <Badge variant="success">+18% week over week</Badge>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 18,
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="completed" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
