import { useState } from 'react'
import { Users, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { projectSeed } from '@/lib/mock'

export function ProjectsPage() {
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.25em] text-cyan-300 uppercase">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Organize work around clear project outcomes</h1>
          <p className="mt-2 text-sm text-slate-400">Track progress, teams, and collaboration in a clean SaaS interface.</p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <Plus className="h-4 w-4" />
          Invite members
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projectSeed.map((project) => (
          <Card key={project.name} className="p-6">
            <CardHeader className="items-start">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <p className="mt-1 text-sm text-slate-400">{project.status}</p>
              </div>
              <Badge variant="accent">{project.progress}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-300" />
                  {project.members} members
                </span>
                <Button variant="secondary" size="sm">
                  Open project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={inviteOpen}
        title="Invite team member"
        description="Send a collaboration invite to a new user or reviewer."
        onClose={() => setInviteOpen(false)}
      >
        <div className="space-y-4">
          <Input placeholder="email@company.com" />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setInviteOpen(false)}>Send invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
