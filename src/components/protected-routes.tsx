import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/auth'

export const ProtectedRoutes = () => {
  const { user } = useAuth()

  return (!user
    ? <Navigate to="/signup" />
    : <Outlet />
  )
}
