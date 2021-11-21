import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/auth'

export const ProtectedRoutes = () => {
  const { credentials } = useAuth()

  return (!credentials
    ? <Navigate to="/signup" />
    : <Outlet />
  )
}
