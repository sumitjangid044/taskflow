import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="text-sm font-medium tracking-[0.3em] text-cyan-300 uppercase">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">The route you opened does not exist in the TaskFlow app.</p>
        <Button asChild className="mt-8">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </div>
  )
}
