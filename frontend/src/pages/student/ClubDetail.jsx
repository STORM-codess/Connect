import { useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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
  .user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; text-transform: capitalize; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); padding: 0 32px; height: 64px; display: flex; align-items: center; gap: 16px; position: sticky; top: 0; z-index: 40; }
  .back-btn { display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600; color: var(--muted); transition: color 0.15s; padding: 0; }
  .back-btn:hover { color: var(--blue); }
  .topbar-divider { width: 1px; height: 20px; background: var(--border); }
  .topbar-page { font-size: 16px; font-weight: 800; color: var(--text); }

  .content { padding: 28px 32px; max-width: 820px; }

  /* HERO BANNER */
  .club-hero { border-radius: 22px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 8px 32px rgba(61,90,241,0.1); }
  .club-hero-band { height: 140px; display: flex; align-items: center; padding: 0 36px; gap: 22px; position: relative; overflow: hidden; }
  .club-hero-pattern { position: absolute; inset: 0; opacity: 0.08; background-image: radial-gradient(circle, currentColor 1.5px, transparent 1.5px); background-size: 20px 20px; }
  .club-hero-icon { width: 64px; height: 64px; border-radius: 18px; background: rgba(255,255,255,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .club-hero-name { font-size: 28px; font-weight: 900; letter-spacing: -0.8px; position: relative; z-index: 1; }
  .club-hero-info { background: rgba(255,255,255,0.68); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.85); border-top: none; border-radius: 0 0 22px 22px; padding: 22px 36px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .club-meta-row { display: flex; gap: 28px; flex-wrap: wrap; }
  .club-meta { display: flex; flex-direction: column; }
  .club-meta-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); margin-bottom: 4px; }
  .club-meta-val { font-size: 16px; font-weight: 800; color: var(--text); }
  .club-cat-badge { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 5px 14px; border-radius: 100px; }
  .follow-btn { padding: 11px 28px; border-radius: 12px; border: none; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; background: var(--blue); color: #fff; box-shadow: 0 4px 14px rgba(61,90,241,0.22); }
  .follow-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }
  .follow-btn.following { background: rgba(255,255,255,0.7); color: var(--muted); border: 1.5px solid var(--border); box-shadow: none; }
  .follow-btn.following:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); transform: none; }

  /* CARDS */
  .glass-card { background: rgba(255,255,255,0.68); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.85); border-radius: 18px; padding: 24px; margin-bottom: 16px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); }
  .card-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 14px; }
  .club-desc { font-size: 14px; color: var(--muted); line-height: 1.75; letter-spacing: 0.1px; }

  .event-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(61,90,241,0.07); cursor: pointer; transition: all 0.15s; }
  .event-row:last-child { border-bottom: none; padding-bottom: 0; }
  .event-row:first-child { padding-top: 0; }
  .event-row:hover .event-name { color: var(--blue); }
  .event-datebox { width: 46px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, var(--blue-light) 0%, #e0e7ff 100%); border: 1px solid rgba(61,90,241,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
  .event-day { font-size: 17px; font-weight: 900; color: var(--blue); line-height: 1; }
  .event-mon { font-size: 10px; font-weight: 700; color: var(--blue); text-transform: uppercase; }
  .event-name { font-size: 14px; font-weight: 700; color: var(--text); transition: color 0.15s; }
  .event-type { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .event-badge { margin-left: auto; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 12px; border-radius: 100px; background: var(--blue-light); color: var(--blue); border: 1px solid rgba(61,90,241,0.15); }

  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .content{padding:20px} }
`

const CodeIcon = ({color,size=28}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const CameraIcon = ({color,size=28}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
const BotIcon = ({color,size=28}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
const BookIcon = ({color,size=28}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const clubs = {
  1: { name:'Coding Club', cat:'Technical', members:120, events:12, Icon:CodeIcon, iconColor:'#1d4ed8', band:'#dbeafe', catColor:'#1d4ed8', catBg:'#eff6ff', desc:'Build, hack, and innovate. The Coding Club runs workshops, hackathons, and coding contests throughout the year. Whether you are a complete beginner or an experienced developer, there is always something for you here. We collaborate on open source projects, participate in competitive programming, and help each other grow as engineers.', clubEvents:[{id:1,name:'Hackathon 2025',type:'Hackathon',day:'28',mon:'Mar'},{id:2,name:'DSA Workshop',type:'Workshop',day:'15',mon:'Apr'},{id:3,name:'Web Dev Bootcamp',type:'Bootcamp',day:'01',mon:'May'}] },
  2: { name:'Photography Club', cat:'Cultural', members:85, events:8, Icon:CameraIcon, iconColor:'#92400e', band:'#fef9c3', catColor:'#92400e', catBg:'#fffbeb', desc:'Explore the art of photography through campus walks, editing sessions, and monthly contests. The Photography Club welcomes everyone from hobbyists to serious photographers. We explore different genres including portrait, landscape, street, and macro photography.', clubEvents:[{id:2,name:'Photography Walk',type:'Workshop',day:'05',mon:'Apr'},{id:3,name:'Photo Contest',type:'Contest',day:'20',mon:'Apr'}] },
  3: { name:'Robotics Club', cat:'Technical', members:60, events:6, Icon:BotIcon, iconColor:'#166534', band:'#dcfce7', catColor:'#166534', catBg:'#f0fdf4', desc:'Design, build, and program robots. The Robotics Club participates in inter-college competitions and tech expos. We work with Arduino, Raspberry Pi, and various sensors to build exciting projects from scratch.', clubEvents:[{id:4,name:'Robotics Demo Day',type:'Exhibition',day:'15',mon:'Apr'}] },
  4: { name:'Literary Club', cat:'Cultural', members:95, events:10, Icon:BookIcon, iconColor:'#9d174d', band:'#fce7f3', catColor:'#9d174d', catBg:'#fdf2f8', desc:'A space for readers, writers, and debaters. We host open mics, debates, and creative writing contests. The Literary Club celebrates the power of words and storytelling in all their forms.', clubEvents:[{id:3,name:'Debate Night',type:'Competition',day:'10',mon:'Apr'},{id:5,name:'Open Mic Night',type:'Performance',day:'25',mon:'Apr'}] },
}

export default function ClubDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const club = clubs[id]
  const [followed, setFollowed] = useState(false)
  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'U'

  if (!club) return (
    <div className="page-root">
      <style>{styles}</style>
      <div style={{marginLeft:240,padding:40,color:'var(--muted)'}}>Club not found. <button onClick={()=>navigate('/clubs')} style={{color:'var(--blue)',background:'none',border:'none',cursor:'pointer',fontWeight:700}}>Go back</button></div>
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
          <button className="back-btn" onClick={() => navigate('/clubs')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Clubs
          </button>
          <div className="topbar-divider"/>
          <div className="topbar-page">{club.name}</div>
        </div>

        <div className="content">
          <div className="club-hero">
            <div className="club-hero-band" style={{background:club.band, color:club.band}}>
              <div className="club-hero-pattern"/>
              <div className="club-hero-icon"><club.Icon color={club.iconColor} size={30}/></div>
              <span className="club-hero-name" style={{color:club.iconColor}}>{club.name}</span>
            </div>
            <div className="club-hero-info">
              <div className="club-meta-row">
                <div className="club-meta"><div className="club-meta-label">Members</div><div className="club-meta-val">{club.members}</div></div>
                <div className="club-meta"><div className="club-meta-label">Events / year</div><div className="club-meta-val">{club.events}</div></div>
                <div className="club-meta">
                  <div className="club-meta-label">Category</div>
                  <div className="club-meta-val"><span className="club-cat-badge" style={{color:club.catColor,background:club.catBg}}>{club.cat}</span></div>
                </div>
              </div>
              <button className={`follow-btn${followed?' following':''}`} onClick={() => setFollowed(!followed)}>
                {followed ? 'Following ✓' : 'Follow Club'}
              </button>
            </div>
          </div>

          <div className="glass-card">
            <div className="card-title">About</div>
            <div className="club-desc">{club.desc}</div>
          </div>

          <div className="glass-card">
            <div className="card-title">Upcoming events</div>
            {club.clubEvents.map(ev => (
              <div className="event-row" key={ev.id} onClick={() => navigate(`/events/${ev.id}`)}>
                <div className="event-datebox"><div className="event-day">{ev.day}</div><div className="event-mon">{ev.mon}</div></div>
                <div><div className="event-name">{ev.name}</div><div className="event-type">{ev.type}</div></div>
                <div className="event-badge">{ev.type}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
