import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { eventService } from '../../services/eventService'
import { registrationService } from '../../services/registrationService'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb;
  }
  .page-root { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; background: linear-gradient(135deg, #e8ecff 0%, #f0f2ff 40%, #faf5ff 100%); }
  .blob1 { position: fixed; top: -200px; left: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(61,90,241,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .blob2 { position: fixed; bottom: -200px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }

  .sidebar { width: 240px; flex-shrink: 0; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.7); box-shadow: 4px 0 24px rgba(61,90,241,0.06); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .sidebar-logo { padding: 28px 22px 22px; border-bottom: 1px solid rgba(61,90,241,0.08); display: flex; align-items: center; gap: 10px; }
  .sidebar-logo-icon { width: 32px; height: 32px; background: var(--blue); border-radius: 9px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(61,90,241,0.35); }
  .sidebar-logo-text { font-size: 19px; font-weight: 900; color: var(--blue); letter-spacing: -0.5px; }
  .sidebar-nav { padding: 18px 12px; flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .nav-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); padding: 10px 10px 5px; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px; cursor: pointer; color: var(--muted); font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
  .nav-item:hover { background: rgba(61,90,241,0.08); color: var(--blue); }
  .nav-item.active { background: var(--blue); color: #fff; box-shadow: 0 4px 14px rgba(61,90,241,0.3); }
  .nav-icon { width: 18px; height: 18px; flex-shrink: 0; }
  .nav-logout { color: #ef4444 !important; }
  .nav-logout:hover { background: #fef2f2 !important; color: #dc2626 !important; }
  .sidebar-bottom { padding: 14px 12px 22px; border-top: 1px solid rgba(61,90,241,0.08); }
  .user-card { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(61,90,241,0.06); border: 1px solid rgba(61,90,241,0.1); border-radius: 14px; cursor: pointer; transition: all 0.15s; }
  .user-card:hover { background: rgba(61,90,241,0.1); }
  .user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; flex-shrink: 0; box-shadow: 0 3px 8px rgba(61,90,241,0.3); }
  .user-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; text-transform: capitalize; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); padding: 0 32px; height: 64px; display: flex; align-items: center; gap: 16px; position: sticky; top: 0; z-index: 40; }
  .back-btn { display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: var(--muted); transition: color 0.15s; padding: 0; }
  .back-btn:hover { color: var(--blue); }
  .topbar-divider { width: 1px; height: 20px; background: var(--border); }
  .topbar-page { font-size: 16px; font-weight: 800; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .content { padding: 28px 32px; max-width: 820px; }

  .event-hero { border-radius: 22px; overflow: hidden; margin-bottom: 20px; position: relative; box-shadow: 0 8px 32px rgba(61,90,241,0.15); }
  .event-hero-accent { height: 5px; width: 100%; background: var(--blue); }
  .event-hero-body { background: linear-gradient(135deg, #3d5af1 0%, #6366f1 55%, #8b5cf6 100%); padding: 36px 36px 32px; position: relative; overflow: hidden; }
  .event-hero-body::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 22px 22px; }
  .event-hero-type { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.4px; color: rgba(255,255,255,0.65); margin-bottom: 10px; position: relative; z-index: 1; }
  .event-hero-title { font-size: clamp(24px,4vw,36px); font-weight: 900; color: #fff; letter-spacing: -1px; line-height: 1.1; margin-bottom: 10px; position: relative; z-index: 1; }
  .event-hero-club { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 6px 16px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); position: relative; z-index: 1; }

  .glass-card { background: rgba(255,255,255,0.68); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.85); border-radius: 18px; padding: 24px; margin-bottom: 16px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); }
  .card-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 18px; }

  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .meta-box { background: rgba(61,90,241,0.04); border: 1px solid rgba(61,90,241,0.08); border-radius: 12px; padding: 14px 16px; }
  .meta-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.4px; color: var(--muted); margin-bottom: 6px; }
  .meta-val { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }

  .event-desc { font-size: 14px; color: var(--muted); line-height: 1.75; letter-spacing: 0.1px; }

  .register-btn { width: 100%; background: var(--blue); color: #fff; border: none; padding: 16px; border-radius: 14px; font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 16px rgba(61,90,241,0.24); letter-spacing: 0.2px; }
  .register-btn:hover { background: var(--blue-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(61,90,241,0.3); }
  .register-btn.registered { background: #dcfce7; color: #166534; border: 1.5px solid rgba(22,101,52,0.2); box-shadow: none; }
  .register-btn.registered:hover { background: #bbf7d0; transform: none; }

  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .content{padding:20px} .meta-grid{grid-template-columns:1fr} }
`

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [registered, setRegistered] = useState(false)
  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'U'

  useEffect(() => {
    eventService.getEventById(id)
      .then(res => {
        setEvent(res.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleRegister = async () => {
    if (registered) return;
    try {
      await registrationService.registerForEvent(id)
      setRegistered(true)
      alert("Registration successful!")
    } catch(err) {
      if (err.response?.status === 400 && err.response.data.message.toLowerCase().includes('already')) {
        setRegistered(true)
        alert("You are already registered for this event!")
      } else {
        alert(err.response?.data?.message || 'Failed to register.')
      }
    }
  }

  if (loading) return <div style={{padding:40}}>Loading event details...</div>

  if (!event) return (
    <div className="page-root">
      <style>{styles}</style>
      <div style={{marginLeft:240,padding:40,color:'var(--muted)'}}>Event not found. <button onClick={()=>navigate('/events')} style={{color:'var(--blue)',background:'none',border:'none',cursor:'pointer',fontWeight:700}}>Go back</button></div>
    </div>
  )

  return (
    <div className="page-root">
      <style>{styles}</style>
      <div className="blob1"/><div className="blob2"/>

      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <span className="sidebar-logo-text">Connect</span>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-label">Main menu</div>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`nav-item${location.pathname===item.path?' active':''}`}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </Link>
          ))}
          <div className="nav-label" style={{marginTop:'12px'}}>Account</div>
          <div className="nav-item nav-logout" onClick={() => { logout(); navigate('/') }}>
            <span className="nav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
            Logout
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="user-card" onClick={() => navigate('/profile')}>
            <div className="user-avatar">{initials}</div>
            <div><div className="user-name">{user?.name||'Student'}</div><div className="user-role">{user?.role||'student'}</div></div>
          </div>
        </div>
      </aside>

      <main className="page-main">
        <div className="topbar">
          <button className="back-btn" onClick={() => navigate('/events')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Events
          </button>
          <div className="topbar-divider"/>
          <div className="topbar-page">{event.title}</div>
        </div>

        <div className="content">
          <div className="event-hero">
            <div className="event-hero-accent" />
            <div className="event-hero-body">
              <div className="event-hero-type">Event</div>
              <div className="event-hero-title">{event.title}</div>
              <div className="event-hero-club">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                {event.club?.name || 'Unknown Club'}
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="card-title">Event details</div>
            <div className="meta-grid">
              <div className="meta-box"><div className="meta-label">Date</div><div className="meta-val">{new Date(event.date).toLocaleDateString()}</div></div>
              <div className="meta-box"><div className="meta-label">Venue</div><div className="meta-val">{event.venue}</div></div>
              <div className="meta-box"><div className="meta-label">Team size</div><div className="meta-val">{event.teamSize}</div></div>
              <div className="meta-box"><div className="meta-label">Registrations</div><div className="meta-val">{event.participants?.length || 0}</div></div>
            </div>
          </div>

          <div className="glass-card">
            <div className="card-title">About this event</div>
            <div className="event-desc">{event.description}</div>
          </div>

          <div className="glass-card">
            <div className="card-title">Registration</div>
            <button
              className={`register-btn${registered ? ' registered' : ''}`}
              onClick={handleRegister}
            >
              {registered ? '✓ Registered' : 'Register now'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
