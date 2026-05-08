import { Navigate, Outlet } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { useAuth } from '@/context/auth-context'

export function AuthRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loader fullScreen label="Loading TaskFlow" />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
