import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      setServerError('')
      await login(values)
      const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'
      navigate(from, { replace: true })
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Unable to sign in')
    }
  })

  return (
    <div className="w-full max-w-md">
      <Card className="p-2 sm:p-3">
        <CardHeader className="px-4 pt-5 sm:px-6">
          <div>
            <p className="text-sm font-medium tracking-[0.25em] text-cyan-300 uppercase">Welcome back</p>
            <CardTitle className="mt-2 text-3xl">Sign in to TaskFlow</CardTitle>
            <CardDescription className="mt-2">Resume your team workspace and analytics dashboard.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-6 sm:px-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="you@company.com" {...register('email')} />
              {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="password">Password</label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...register('password')} />
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

            {serverError ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{serverError}</p> : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Need an account?{' '}
            <Link to="/register" className="font-medium text-cyan-300 transition hover:text-cyan-200">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
