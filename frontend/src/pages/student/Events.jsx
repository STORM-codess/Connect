import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { eventService } from '../../services/eventService'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-mid: #5b78f5; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; --bg: #f0f2ff; --white: #ffffff;
  }

  .page-root { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; background: linear-gradient(135deg, #e8ecff 0%, #f0f2ff 40%, #faf5ff 100%); position: relative; }
  .blob1 { position: fixed; top: -200px; left: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(61,90,241,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .blob2 { position: fixed; bottom: -200px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }

  /* SIDEBAR */
  .sidebar { width: 240px; flex-shrink: 0; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.7); box-shadow: 4px 0 24px rgba(61,90,241,0.06); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
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

  /* MAIN */
  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 2px 12px rgba(61,90,241,0.05); padding: 0 36px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }
  .topbar-sub { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 2px; letter-spacing: 0.1px; }

  .page-content { padding: 32px 36px; flex: 1; }

  /* FILTERS */
  .filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
  .filter-btn { padding: 9px 22px; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.8); background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: var(--muted); cursor: pointer; transition: all 0.15s; letter-spacing: 0.2px; }
  .filter-btn:hover { border-color: var(--blue); color: var(--blue); background: rgba(255,255,255,0.85); }
  .filter-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 4px 14px rgba(61,90,241,0.28); }

  /* EVENTS GRID */
  .events-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }

  /* EVENT CARD */
  .event-card {
    background: rgba(255,255,255,0.68);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.85);
    border-radius: 22px; padding: 0;
    cursor: pointer; transition: all 0.22s;
    display: flex; flex-direction: column;
    box-shadow: 0 2px 20px rgba(61,90,241,0.06);
    overflow: hidden;
  }
  .event-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(61,90,241,0.13); border-color: rgba(61,90,241,0.22); background: rgba(255,255,255,0.85); }

  .event-card-accent { height: 4px; width: 100%; background: var(--blue); }

  .event-card-body { padding: 26px 28px 24px; display: flex; flex-direction: column; flex: 1; }

  .event-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .event-type-badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; padding: 5px 13px; border-radius: 100px; background: var(--blue-light); color: var(--blue); border: 1px solid rgba(61,90,241,0.15); }
  .event-club-pill { font-size: 12px; font-weight: 600; color: var(--muted); background: rgba(255,255,255,0.7); border: 1px solid var(--border); border-radius: 100px; padding: 4px 12px; }

  .event-title { font-size: 22px; font-weight: 900; letter-spacing: -0.7px; line-height: 1.2; color: var(--text); margin-bottom: 22px; }

  .event-metas { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; }
  .event-meta { background: rgba(61,90,241,0.04); border: 1px solid rgba(61,90,241,0.08); border-radius: 12px; padding: 12px 14px; }
  .event-meta-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.4px; color: var(--muted); margin-bottom: 5px; }
  .event-meta-val { font-size: 14px; font-weight: 700; color: var(--text); letter-spacing: -0.2px; }

  .event-btn { margin-top: auto; width: 100%; background: var(--blue); color: #fff; border: none; padding: 15px; border-radius: 13px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; letter-spacing: 0.2px; box-shadow: 0 4px 14px rgba(61,90,241,0.22); }
  .event-btn:hover { background: var(--blue-hover); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(61,90,241,0.3); }

  @media(max-width:1100px){ .events-grid{grid-template-columns:1fr} }
  @media(max-width:1024px){ .sidebar{width:200px} .page-main{margin-left:200px} }
  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .page-content{padding:20px} }
`

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

export default function Events() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const [allEvents, setAllEvents] = useState([])
  
  useEffect(() => {
    eventService.getApprovedEvents()
      .then(res => setAllEvents(res.data || []))
      .catch(console.error)
  }, [])

  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'U'

  return (
    <div className="page-root">
      <style>{styles}</style>
      <div className="blob1"/><div className="blob2"/>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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
            <span className="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            Logout
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="user-card" onClick={() => navigate('/profile')}>
            <div className="user-avatar">{initials}</div>
            <div>
              <div className="user-name">{user?.name || 'Student'}</div>
              <div className="user-role">{user?.role || 'student'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="page-main">
        <div className="topbar">
          <div>
            <div className="topbar-page">Events</div>
            <div className="topbar-sub">Register for upcoming events happening across campus</div>
          </div>
        </div>

        <div className="page-content">

          {/* EVENTS GRID */}
          <div className="events-grid">
            {allEvents.length === 0 && <span style={{color:'var(--muted)'}}>No events available right now.</span>}
            {allEvents.map(ev => (
              <div className="event-card" key={ev._id} onClick={() => navigate(`/events/${ev._id}`)}>
                <div className="event-card-accent" />
                <div className="event-card-body">
                  <div className="event-header">
                    <span className="event-type-badge">Event</span>
                    <span className="event-club-pill">by {ev.club?.name || 'Unknown'}</span>
                  </div>

                  <div className="event-title">{ev.title}</div>

                  <div className="event-metas">
                    <div className="event-meta">
                      <div className="event-meta-label">Date</div>
                      <div className="event-meta-val">{new Date(ev.date).toLocaleDateString()}</div>
                    </div>
                    <div className="event-meta">
                      <div className="event-meta-label">Venue</div>
                      <div className="event-meta-val">{ev.venue}</div>
                    </div>
                  </div>

                  <button className="event-btn">Apply now</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}