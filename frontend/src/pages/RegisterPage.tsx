import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { roleOptions } from '@/lib/constants'
import { useAuth } from '@/context/auth-context'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'member']),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: 'member' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      setServerError('')
      await signup(values)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Unable to create account')
    }
  })

  return (
    <div className="w-full max-w-md">
      <Card className="p-2 sm:p-3">
        <CardHeader className="px-4 pt-5 sm:px-6">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] text-cyan-300 uppercase">Create account</p>
            <CardTitle className="mt-2 text-3xl">Start your TaskFlow workspace</CardTitle>
            <CardDescription className="mt-2">Create your admin or member account in seconds.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-6 sm:px-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="name">Name</label>
              <Input id="name" placeholder="Your name" {...register('name')} />
              {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="you@company.com" {...register('email')} />
              {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="password">Password</label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Choose a strong password" {...register('password')} />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <p className="mt-2 text-sm text-rose-300">{errors.password.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="role">Role</label>
              <select
                id="role"
                className="flex h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                {...register('role')}
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-950">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role ? <p className="mt-2 text-sm text-rose-300">{errors.role.message}</p> : null}
            </div>

            {serverError ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{serverError}</p> : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-300 transition hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
