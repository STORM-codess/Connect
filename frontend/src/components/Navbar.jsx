import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // later: clear auth token here
    navigate('/')
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 32px',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#ffffff'
    }}>
      <Link to="/dashboard" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: '#000' }}>
        Connect
      </Link>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link to="/clubs" style={{ textDecoration: 'none', color: '#333' }}>Clubs</Link>
        <Link to="/events" style={{ textDecoration: 'none', color: '#333' }}>Events</Link>
        <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link>
        <button onClick={handleLogout} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#e53935' }}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar