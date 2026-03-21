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
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Student ── */}
        <Route path="/dashboard" element={
          <ProtectedRoute role="student"><Dashboard /></ProtectedRoute>
        } />
        <Route path="/clubs" element={
          <ProtectedRoute role="student"><Clubs /></ProtectedRoute>
        } />
        <Route path="/clubs/:id" element={
          <ProtectedRoute role="student"><ClubDetail /></ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute role="student"><Events /></ProtectedRoute>
        } />
        <Route path="/events/:id" element={
          <ProtectedRoute role="student"><EventDetail /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute role="student"><Profile /></ProtectedRoute>
        } />

        {/* ── Organizer ── */}
        <Route path="/organizer" element={
          <ProtectedRoute role="organizer"><OrgDashboard /></ProtectedRoute>
        } />
        <Route path="/organizer/create" element={
          <ProtectedRoute role="organizer"><CreateEvent /></ProtectedRoute>
        } />

        {/* ── Admin ── */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        } />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
