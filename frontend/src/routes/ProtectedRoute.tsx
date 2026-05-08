import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { useAuth } from '@/context/auth-context'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <Loader fullScreen label="Loading TaskFlow" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
