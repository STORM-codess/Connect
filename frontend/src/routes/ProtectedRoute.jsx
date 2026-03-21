import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Helper — where does each role go after login?
const roleHome = {
  student: '/dashboard',
  organizer: '/organizer',
  admin: '/admin',
}

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Logged in but wrong role → redirect to their correct home
  if (role && user.role !== role) {
    return <Navigate to={roleHome[user.role] || '/dashboard'} replace />
  }

  return children
}
