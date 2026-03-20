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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App