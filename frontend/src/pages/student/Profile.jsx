import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; --bg: #f0f2ff; --white: #ffffff;
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
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; text-transform: capitalize; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 2px 12px rgba(61,90,241,0.05); padding: 0 32px; height: 64px; display: flex; align-items: center; position: sticky; top: 0; z-index: 40; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }

  .page-content { padding: 28px 32px; flex: 1; max-width: 780px; }

  /* PROFILE CARD */
  .profile-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 22px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(61,90,241,0.07); }
  .profile-banner { height: 110px; background: linear-gradient(135deg, #3d5af1 0%, #6366f1 55%, #8b5cf6 100%); position: relative; overflow: hidden; }
  .profile-banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
  .profile-avatar-wrap { position: absolute; bottom: -40px; left: 28px; }
  .profile-avatar-big { width: 80px; height: 80px; border-radius: 20px; background: var(--blue); border: 3px solid rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: #fff; box-shadow: 0 6px 20px rgba(61,90,241,0.3); }
  .profile-info { padding: 52px 28px 28px; }
  .profile-name { font-size: 22px; font-weight: 900; letter-spacing: -0.6px; margin-bottom: 4px; }
  .profile-role-badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 100px; background: var(--blue-light); color: var(--blue); border: 1px solid rgba(61,90,241,0.15); margin-bottom: 22px; }
  .profile-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .profile-field-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 5px; }
  .profile-field-val { font-size: 15px; font-weight: 600; color: var(--text); }
  .profile-field-val.empty { color: var(--muted); font-style: italic; font-weight: 400; font-size: 14px; }

  /* SECTION CARDS */
  .section-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 18px; padding: 22px 24px; margin-bottom: 16px; box-shadow: 0 2px 14px rgba(61,90,241,0.05); }
  .section-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 16px; }
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
  .tag-blue { background: var(--blue-light); color: var(--blue); border: 1px solid rgba(61,90,241,0.15); padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 700; }
  .tag-green { background: #f0fdf4; color: #166534; border: 1px solid rgba(22,101,52,0.15); padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 700; }
  .empty-state { font-size: 14px; color: var(--muted); font-style: italic; }

  /* LOGOUT */
  .logout-btn { width: 100%; padding: 14px; border-radius: 14px; border: 1px solid rgba(239,68,68,0.2); background: rgba(254,242,242,0.7); backdrop-filter: blur(8px); color: #991b1b; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
  .logout-btn:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

  @media(max-width:1024px){ .sidebar{width:200px} .page-main{margin-left:200px} }
  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .page-content{padding:20px} .profile-fields{grid-template-columns:1fr} }
`

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const clubs = ['Coding Club', 'Photography Club']
const events = ['Hackathon 2025', 'Photography Walk']

export default function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)
    : 'U'

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
          <div className="user-card">
            <div className="user-avatar">{initials}</div>
            <div><div className="user-name">{user?.name||'Student'}</div><div className="user-role">{user?.role||'student'}</div></div>
          </div>
        </div>
      </aside>

      <main className="page-main">
        <div className="topbar">
          <div className="topbar-page">My Profile</div>
        </div>

        <div className="page-content">

          {/* PROFILE CARD */}
          <div className="profile-card">
            <div className="profile-banner">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-big">{initials}</div>
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-name">{user?.name || 'Student'}</div>
              <div className="profile-role-badge">{user?.role || 'student'}</div>
              <div className="profile-fields">
                <div>
                  <div className="profile-field-label">Email</div>
                  <div className="profile-field-val">{user?.email || '—'}</div>
                </div>
                <div>
                  <div className="profile-field-label">Enrollment no.</div>
                  <div className={`profile-field-val${!user?.enrollNo?' empty':''}`}>{user?.enrollNo || 'Not set'}</div>
                </div>
                <div>
                  <div className="profile-field-label">Branch</div>
                  <div className={`profile-field-val${!user?.branch?' empty':''}`}>{user?.branch || 'Not set'}</div>
                </div>
                <div>
                  <div className="profile-field-label">Year</div>
                  <div className={`profile-field-val${!user?.year?' empty':''}`}>{user?.year || 'Not set'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CLUBS */}
          <div className="section-card">
            <div className="section-title">Clubs joined</div>
            {clubs.length > 0
              ? <div className="tags-wrap">{clubs.map((c,i) => <span key={i} className="tag-blue">{c}</span>)}</div>
              : <div className="empty-state">No clubs joined yet</div>
            }
          </div>

          {/* EVENTS */}
          <div className="section-card">
            <div className="section-title">Events attended</div>
            {events.length > 0
              ? <div className="tags-wrap">{events.map((e,i) => <span key={i} className="tag-green">{e}</span>)}</div>
              : <div className="empty-state">No events attended yet</div>
            }
          </div>

          {/* LOGOUT */}
          <button className="logout-btn" onClick={() => { logout(); navigate('/') }}>
            Sign out of Connect
          </button>

        </div>
      </main>
    </div>
  )
}
