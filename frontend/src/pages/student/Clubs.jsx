import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 2px 12px rgba(61,90,241,0.05); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .topbar-left { display: flex; flex-direction: column; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }
  .topbar-sub { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 1px; }

  /* CONTENT */
  .page-content { padding: 28px 32px; flex: 1; }
  .page-header { margin-bottom: 24px; }
  .page-title { font-size: 24px; font-weight: 900; letter-spacing: -0.8px; color: var(--text); margin-bottom: 6px; }
  .page-desc { font-size: 14px; color: var(--muted); }

  /* FILTERS */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
  .filter-btn { padding: 8px 20px; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.8); background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: var(--muted); cursor: pointer; transition: all 0.15s; }
  .filter-btn:hover { border-color: var(--blue); color: var(--blue); background: rgba(255,255,255,0.8); }
  .filter-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 4px 12px rgba(61,90,241,0.25); }

  /* CLUBS GRID */
  .clubs-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
  .club-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 16px rgba(61,90,241,0.05); }
  .club-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(61,90,241,0.12); border-color: rgba(61,90,241,0.2); background: rgba(255,255,255,0.82); }
  .club-band { height: 110px; display: flex; align-items: center; padding: 0 28px; gap: 18px; position: relative; overflow: hidden; }
  .club-band-pattern { position: absolute; inset: 0; opacity: 0.08; background-image: radial-gradient(circle, currentColor 1.5px, transparent 1.5px); background-size: 20px 20px; }
  .club-icon-wrap { width: 56px; height: 56px; border-radius: 16px; background: rgba(255,255,255,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .club-band-name { font-size: 21px; font-weight: 900; letter-spacing: -0.5px; position: relative; z-index: 1; line-height: 1.15; }
  .club-body { padding: 20px 24px 22px; display: flex; flex-direction: column; gap: 10px; }
  .club-desc { font-size: 14px; color: var(--muted); line-height: 1.65; }
  .club-meta-row { display: flex; gap: 20px; }
  .club-meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); }
  .club-meta-val { font-weight: 700; color: var(--text); }
  .club-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
  .club-cat { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 100px; }
  .club-follow-btn { font-size: 13px; font-weight: 700; color: var(--blue); background: var(--blue-light); border: 1px solid rgba(61,90,241,0.15); border-radius: 9px; padding: 8px 18px; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .club-follow-btn:hover { background: var(--blue); color: #fff; }
  .club-follow-btn.following { background: rgba(255,255,255,0.6); color: var(--muted); border: 1px solid var(--border); }
  .club-follow-btn.following:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }

  @media(max-width:1024px){ .sidebar{width:200px} .page-main{margin-left:200px} }
  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .page-content{padding:20px} .clubs-grid{grid-template-columns:1fr} }
`

const CodeIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const CameraIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
const BotIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
const BookIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const TrophyIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
const MusicIcon = ({color,size=26}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
const UsersIcon = ({color='#3d5af1',size=14}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const CalIcon = ({color='#3d5af1',size=14}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const clubs = [
  { id:1, name:'Coding Club', cat:'Technical', members:120, events:12, Icon:CodeIcon, iconColor:'#1d4ed8', band:'#dbeafe', catColor:'#1d4ed8', catBg:'#eff6ff', desc:'Build, hack, and innovate. We run workshops, hackathons, and coding contests throughout the year.' },
  { id:2, name:'Photography Club', cat:'Cultural', members:85, events:8, Icon:CameraIcon, iconColor:'#92400e', band:'#fef9c3', catColor:'#92400e', catBg:'#fffbeb', desc:'Explore the art of photography through campus walks, editing sessions, and monthly contests.' },
  { id:3, name:'Robotics Club', cat:'Technical', members:60, events:6, Icon:BotIcon, iconColor:'#166534', band:'#dcfce7', catColor:'#166534', catBg:'#f0fdf4', desc:'Design, build, and program robots. Participate in inter-college competitions and tech expos.' },
  { id:4, name:'Literary Club', cat:'Cultural', members:95, events:10, Icon:BookIcon, iconColor:'#9d174d', band:'#fce7f3', catColor:'#9d174d', catBg:'#fdf2f8', desc:'A space for readers, writers, and debaters. We host open mics, debates, and creative writing contests.' },
  { id:5, name:'Sports Club', cat:'Sports', members:200, events:15, Icon:TrophyIcon, iconColor:'#991b1b', band:'#fee2e2', catColor:'#991b1b', catBg:'#fef2f2', desc:'Representing the college in inter-college tournaments across cricket, football, basketball, and more.' },
  { id:6, name:'Music Club', cat:'Cultural', members:70, events:9, Icon:MusicIcon, iconColor:'#6b21a8', band:'#f3e8ff', catColor:'#6b21a8', catBg:'#faf5ff', desc:'From classical to rock — perform, collaborate, and grow as a musician with fellow students.' },
]

const filters = ['All','Technical','Cultural','Sports']

export default function Clubs() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [activeFilter, setActiveFilter] = useState('All')
  const [following, setFollowing] = useState({})

  const filtered = activeFilter === 'All' ? clubs : clubs.filter(c => c.cat === activeFilter)
  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'U'

  const toggleFollow = (e, name) => {
    e.stopPropagation()
    setFollowing(prev => ({ ...prev, [name]: !prev[name] }))
  }

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
          <div className="topbar-left">
            <div className="topbar-page">Clubs</div>
            <div className="topbar-sub">Discover and follow clubs that match your interests</div>
          </div>
        </div>

        <div className="page-content">
          <div className="filters">
            {filters.map(f => (
              <button key={f} className={`filter-btn${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="clubs-grid">
            {filtered.map(c => (
              <div className="club-card" key={c.id} onClick={() => navigate(`/clubs/${c.id}`)}>
                <div className="club-band" style={{background:c.band, color:c.band}}>
                  <div className="club-band-pattern"/>
                  <div className="club-icon-wrap"><c.Icon color={c.iconColor} size={28}/></div>
                  <span className="club-band-name" style={{color:c.iconColor}}>{c.name}</span>
                </div>
                <div className="club-body">
                  <div className="club-desc">{c.desc}</div>
                  <div className="club-meta-row">
                    <div className="club-meta-item"><UsersIcon/><span className="club-meta-val" style={{marginLeft:'4px'}}>{c.members}</span> members</div>
                    <div className="club-meta-item"><CalIcon/><span className="club-meta-val" style={{marginLeft:'4px'}}>{c.events}</span> events/year</div>
                  </div>
                  <div className="club-footer">
                    <span className="club-cat" style={{color:c.catColor, background:c.catBg}}>{c.cat}</span>
                    <button className={`club-follow-btn${following[c.name]?' following':''}`} onClick={e => toggleFollow(e, c.name)}>
                      {following[c.name] ? 'Following ✓' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
