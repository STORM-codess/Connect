import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { eventService } from '../../services/eventService'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb;
  }
  .page-root { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; background: linear-gradient(135deg, #e8ecff 0%, #f0f2ff 40%, #faf5ff 100%); position: relative; }
  .blob1 { position: fixed; top: -200px; left: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(61,90,241,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .blob2 { position: fixed; bottom: -200px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }

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
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 2px 12px rgba(61,90,241,0.05); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }
  .topbar-sub { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 1px; }
  .create-btn { background: var(--blue); color: #fff; border: none; padding: 9px 20px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 12px rgba(61,90,241,0.22); }
  .create-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }

  .content { padding: 28px 32px; }

  /* BANNER */
  .banner { border-radius: 22px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; background: linear-gradient(135deg, #3d5af1 0%, #6366f1 55%, #8b5cf6 100%); box-shadow: 0 8px 32px rgba(61,90,241,0.25); position: relative; overflow: hidden; }
  .banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; pointer-events: none; }
  .banner-left { position: relative; z-index: 1; }
  .banner-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.65); margin-bottom: 8px; }
  .banner-title { font-size: clamp(20px,3vw,30px); font-weight: 900; color: #fff; letter-spacing: -1px; line-height: 1.1; margin-bottom: 8px; }
  .banner-sub { font-size: 14px; color: rgba(255,255,255,0.7); }
  .banner-btn { margin-top: 18px; background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 10px 22px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; display: inline-block; position: relative; z-index: 1; }
  .banner-btn:hover { background: rgba(255,255,255,0.28); }
  .banner-pills { display: flex; gap: 12px; position: relative; z-index: 1; }
  .banner-pill { background: rgba(255,255,255,0.14); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.22); border-radius: 14px; padding: 14px 20px; text-align: center; min-width: 90px; }
  .banner-pill-num { font-size: 24px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
  .banner-pill-label { font-size: 11px; color: rgba(255,255,255,0.7); font-weight: 600; margin-top: 3px; }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 24px; }
  .stat { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 16px; padding: 20px 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); transition: all 0.2s; }
  .stat:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(61,90,241,0.12); }
  .stat-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--blue-light); border: 1px solid rgba(61,90,241,0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .stat-num { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: var(--blue); }
  .stat-label { font-size: 11px; color: var(--muted); font-weight: 700; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.5px; }

  /* EVENTS TABLE */
  .glass-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 18px; padding: 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); margin-bottom: 20px; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .card-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; }
  .add-btn { font-size: 13px; font-weight: 700; color: var(--blue); background: var(--blue-light); border: 1px solid rgba(61,90,241,0.15); border-radius: 9px; padding: 7px 16px; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .add-btn:hover { background: var(--blue); color: #fff; }

  .event-row { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(61,90,241,0.07); }
  .event-row:last-child { border-bottom: none; padding-bottom: 0; }
  .event-row:first-child { padding-top: 0; }
  .event-datebox { width: 46px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, var(--blue-light) 0%, #e0e7ff 100%); border: 1px solid rgba(61,90,241,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
  .event-day { font-size: 17px; font-weight: 900; color: var(--blue); line-height: 1; }
  .event-mon { font-size: 10px; font-weight: 700; color: var(--blue); text-transform: uppercase; }
  .event-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .event-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .status { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; padding: 4px 12px; border-radius: 100px; margin-left: auto; flex-shrink: 0; }
  .status.live { background: #dcfce7; color: #166534; }
  .status.pending { background: #fef9c3; color: #92400e; }
  .status.draft { background: rgba(255,255,255,0.6); color: var(--muted); border: 1px solid var(--border); }

  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .content{padding:20px} .stats{grid-template-columns:repeat(2,1fr)} .banner-pills{display:none} }
`

const navItems = [
  { label:'Dashboard', path:'/organizer', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Create Event', path:'/organizer/create', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { label:'My Events', path:'/organizer/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Registrations', path:'/organizer/registrations', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
]

// myEvents loaded dynamically

const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

export default function OrgDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'O'
  const [myEvents, setMyEvents] = useState([])

  useEffect(() => {
    eventService.getOrganizerEvents()
      .then(res => setMyEvents(res.data || []))
      .catch(console.error)
  }, [])

  const CalIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  const UsersIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  const ClockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>

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
          <div className="nav-label">Organizer</div>
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
            <div><div className="user-name">{user?.name||'Organizer'}</div><div className="user-role">Club organizer</div></div>
          </div>
        </div>
      </aside>

      <main className="page-main">
        <div className="topbar">
          <div>
            <div className="topbar-page">Organizer Dashboard</div>
            <div className="topbar-sub">{today}</div>
          </div>
          <button className="create-btn" onClick={() => navigate('/organizer/create')}>+ Create event</button>
        </div>

        <div className="content">
          <div className="banner">
            <div className="banner-left">
              <div className="banner-tag">Club organizer</div>
              <div className="banner-title">{user?.name || 'Organizer'}!</div>
              <div className="banner-sub">Manage your events, track registrations and post results.</div>
              <button className="banner-btn" onClick={() => navigate('/organizer/create')}>+ Post new event</button>
            </div>
            <div className="banner-pills">
              {[{num:myEvents.filter(e=>e.status==='approved').length,label:'Live events'},{num:'0',label:'Registrations'},{num:myEvents.filter(e=>e.status==='pending').length,label:'Pending approval'}].map((p,i)=>(
                <div className="banner-pill" key={i}>
                  <div className="banner-pill-num">{p.num}</div>
                  <div className="banner-pill-label">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats">
            {[
              { Icon:CalIcon, num:myEvents.length, label:'Total events' },
              { Icon:UsersIcon, num:'0', label:'Registrations' },
              { Icon:ClockIcon, num:myEvents.filter(e=>e.status==='pending').length, label:'Pending approval' },
              { Icon:CheckIcon, num:myEvents.filter(e=>e.status==='approved').length, label:'Live' },
            ].map((s,i) => (
              <div className="stat" key={i}>
                <div className="stat-icon"><s.Icon/></div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <div className="card-header">
              <div className="card-title">My events</div>
              <button className="add-btn" onClick={() => navigate('/organizer/create')}>+ New event</button>
            </div>
            {myEvents.map(ev => {
              const d = new Date(ev.date)
              return (
              <div className="event-row" key={ev._id}>
                <div className="event-datebox">
                  <div className="event-day">{d.getDate() || '??'}</div>
                  <div className="event-mon">{d.toLocaleString('default', { month: 'short' }) || ''}</div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div className="event-title">{ev.title}</div>
                  <div className="event-sub">{ev.participants?.length || 0} registrations</div>
                </div>
                <div className={`status ${ev.status === 'approved' ? 'live' : ev.status}`}>
                  {ev.status === 'approved' ? 'Live' : ev.status === 'pending' ? 'Pending' : 'Rejected'}
                </div>
              </div>
            )})}
          </div>
        </div>
      </main>
    </div>
  )
}
