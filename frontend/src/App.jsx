import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Dashboard from './pages/student/Dashboard'
import Clubs from './pages/student/Clubs'
import ClubDetail from './pages/student/ClubDetail'
import Events from './pages/student/Events'
import EventDetail from './pages/student/EventDetail'
import Profile from './pages/student/Profile'
import OrgDashboard from './pages/organizer/OrgDashboard'
import CreateEvent from './pages/organizer/CreateEvent'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/public/NotFound'

// Real API Integration Middlewares
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Student ── */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/clubs/:id" element={<ClubDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* ── Organizer ── */}
          <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
            <Route path="/organizer" element={<OrgDashboard />} />
            <Route path="/organizer/create" element={<CreateEvent />} />
          </Route>

          {/* ── Admin ── */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
