import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  title: z.string().min(2),
  bio: z.string().min(10),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfilePage() {
  const { user } = useAuth()
  const [savedMessage, setSavedMessage] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      title: 'Product Manager',
      bio: 'I lead collaborative task execution across product, engineering, and design teams.',
    },
  })

  const onSubmit = handleSubmit(async () => {
    setSavedMessage('Profile settings saved locally for this frontend demo.')
  })

  return (
    <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar name={user?.name ?? 'TaskFlow User'} size="lg" />
          <h1 className="mt-4 text-2xl font-semibold text-white">{user?.name ?? 'TaskFlow User'}</h1>
          <p className="text-sm text-slate-400">{user?.email ?? 'team@taskflow.app'}</p>
          <Badge className="mt-4">{user?.role ?? 'member'}</Badge>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">Account settings</p>
          <p className="mt-2">Use this screen for editable profile content, role display, and account information.</p>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <div>
            <CardTitle>Profile settings</CardTitle>
            <p className="mt-1 text-sm text-slate-400">Update personal details and account metadata.</p>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Name</label>
                <Input {...register('name')} />
                {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <Input type="email" {...register('email')} />
                {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Title</label>
              <Input {...register('title')} />
              {errors.title ? <p className="mt-2 text-sm text-rose-300">{errors.title.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Bio</label>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                {...register('bio')}
              />
              {errors.bio ? <p className="mt-2 text-sm text-rose-300">{errors.bio.message}</p> : null}
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-emerald-300">{savedMessage}</p>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
