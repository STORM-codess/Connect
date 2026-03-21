import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: #ffffff; border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px; font-family: 'Inter', sans-serif;
  }
  .navbar-logo {
    display: flex; align-items: center; gap: 8px;
    font-size: 20px; font-weight: 800; color: #3d5af1;
    text-decoration: none; letter-spacing: -0.5px;
  }
  .navbar-logo-icon {
    width: 28px; height: 28px; background: #3d5af1;
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
  }
  .navbar-links { display: flex; align-items: center; gap: 4px; }
  .navbar-link {
    padding: 7px 14px; border-radius: 8px; font-size: 14px; font-weight: 600;
    color: #6b7280; text-decoration: none; transition: all 0.15s;
  }
  .navbar-link:hover { background: #f5f5f7; color: #0f0f0f; }
  .navbar-link.active { background: #eef0fd; color: #3d5af1; }
  .navbar-right { display: flex; align-items: center; gap: 10px; }
  .navbar-avatar {
    width: 34px; height: 34px; border-radius: 50%; background: #3d5af1;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; color: #fff; cursor: pointer; text-decoration: none;
  }
  .navbar-name { font-size: 14px; font-weight: 600; color: #0f0f0f; }
  @media(max-width:768px){ .navbar{padding:0 20px} .navbar-links{display:none} .navbar-name{display:none} }
`

// This navbar is only used on student sub-pages like Clubs, Events, Profile
// Dashboard has its own sidebar layout
export default function Navbar() {
  const { user } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? ' active' : ''

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <Link to="/dashboard" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Connect
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className={`navbar-link${isActive('/dashboard')}`}>Home</Link>
          <Link to="/clubs" className={`navbar-link${isActive('/clubs')}`}>Clubs</Link>
          <Link to="/events" className={`navbar-link${isActive('/events')}`}>Events</Link>
          <Link to="/profile" className={`navbar-link${isActive('/profile')}`}>Profile</Link>
        </div>

        <div className="navbar-right">
          <span className="navbar-name">{user?.name}</span>
          <Link to="/profile" className="navbar-avatar">{initials}</Link>
        </div>
      </nav>
    </>
  )
}
