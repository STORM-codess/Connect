import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-mid: #5b78f5; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; --bg: #f0f2ff; --white: #ffffff;
  }

  .dash-root {
    font-family: 'Inter', sans-serif; display: flex; min-height: 100vh;
    background: linear-gradient(135deg, #e8ecff 0%, #f0f2ff 40%, #faf5ff 100%);
    position: relative;
  }
  .dash-blob1 { position: fixed; top: -200px; left: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(61,90,241,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .dash-blob2 { position: fixed; bottom: -200px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); pointer-events: none; z-index: 0; }

  /* SIDEBAR */
  .dash-sidebar { width: 240px; flex-shrink: 0; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.7); box-shadow: 4px 0 24px rgba(61,90,241,0.06); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .dash-sidebar-logo { padding: 28px 22px 22px; border-bottom: 1px solid rgba(61,90,241,0.08); display: flex; align-items: center; gap: 10px; }
  .dash-sidebar-logo-icon { width: 32px; height: 32px; background: var(--blue); border-radius: 9px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(61,90,241,0.35); }
  .dash-sidebar-logo-text { font-size: 19px; font-weight: 900; color: var(--blue); letter-spacing: -0.5px; }
  .dash-sidebar-nav { padding: 18px 12px; flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .dash-nav-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); padding: 10px 10px 5px; }
  .dash-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px; cursor: pointer; color: var(--muted); font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
  .dash-nav-item:hover { background: rgba(61,90,241,0.08); color: var(--blue); }
  .dash-nav-item.active { background: var(--blue); color: #fff; box-shadow: 0 4px 14px rgba(61,90,241,0.3); }
  .dash-nav-icon { width: 18px; height: 18px; flex-shrink: 0; }
  .dash-logout { color: #ef4444 !important; }
  .dash-logout:hover { background: #fef2f2 !important; color: #dc2626 !important; }
  .dash-sidebar-bottom { padding: 14px 12px 22px; border-top: 1px solid rgba(61,90,241,0.08); }
  .dash-user-card { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(61,90,241,0.06); border: 1px solid rgba(61,90,241,0.1); border-radius: 14px; cursor: pointer; transition: all 0.15s; }
  .dash-user-card:hover { background: rgba(61,90,241,0.1); }
  .dash-user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; flex-shrink: 0; box-shadow: 0 3px 8px rgba(61,90,241,0.3); }
  .dash-user-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .dash-user-role { font-size: 11px; color: var(--muted); margin-top: 1px; text-transform: capitalize; }

  /* MAIN */
  .dash-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; }
  .dash-topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 2px 12px rgba(61,90,241,0.05); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .dash-topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }
  .dash-topbar-date { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 1px; }
  .dash-topbar-right { display: flex; align-items: center; gap: 12px; }
  .dash-search { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.8); border: 1.5px solid rgba(61,90,241,0.1); border-radius: 10px; padding: 8px 14px; cursor: pointer; transition: all 0.15s; }
  .dash-search:hover { border-color: var(--blue); }
  .dash-search-text { font-size: 13px; color: var(--muted); }
  .dash-notif-btn { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.8); border: 1.5px solid rgba(61,90,241,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; transition: all 0.15s; }
  .dash-notif-btn:hover { border-color: var(--blue); }
  .dash-notif-dot { position: absolute; top: 8px; right: 8px; width: 7px; height: 7px; background: #ef4444; border-radius: 50%; border: 1.5px solid white; }

  .dash-content { padding: 28px 32px; flex: 1; }

  /* BANNER */
  .dash-banner { border-radius: 24px; padding: 36px 40px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; position: relative; overflow: hidden; background: linear-gradient(135deg, #3d5af1 0%, #6366f1 55%, #8b5cf6 100%); box-shadow: 0 8px 32px rgba(61,90,241,0.25); }
  .dash-banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; pointer-events: none; }
  .dash-banner::after { content: ''; position: absolute; top: -60px; right: -60px; width: 250px; height: 250px; border-radius: 50%; background: rgba(255,255,255,0.06); pointer-events: none; }
  .dash-banner-left { position: relative; z-index: 1; }
  .dash-banner-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.65); margin-bottom: 8px; }
  .dash-banner-title { font-size: clamp(22px, 3vw, 34px); font-weight: 900; color: #fff; letter-spacing: -1px; line-height: 1.1; margin-bottom: 10px; }
  .dash-banner-sub { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.55; max-width: 380px; }
  .dash-banner-btn { margin-top: 22px; background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 10px 24px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; display: inline-block; }
  .dash-banner-btn:hover { background: rgba(255,255,255,0.28); }
  .dash-banner-right { position: relative; z-index: 1; display: flex; gap: 12px; }
  .dash-banner-pill { background: rgba(255,255,255,0.14); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.22); border-radius: 16px; padding: 16px 20px; text-align: center; min-width: 96px; }
  .dash-banner-pill-num { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
  .dash-banner-pill-label { font-size: 11px; color: rgba(255,255,255,0.7); font-weight: 600; margin-top: 4px; }

  /* STATS — SVG icon instead of emoji */
  .dash-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 24px; }
  .dash-stat { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 16px; padding: 20px 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); transition: all 0.2s; }
  .dash-stat:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(61,90,241,0.12); background: rgba(255,255,255,0.85); }
  .dash-stat-icon-wrap { width: 38px; height: 38px; border-radius: 10px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; border: 1px solid rgba(61,90,241,0.15); }
  .dash-stat-num { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: var(--blue); }
  .dash-stat-label { font-size: 12px; color: var(--muted); font-weight: 600; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.4px; }

  /* TWO COL */
  .dash-two-col { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 20px; }
  .dash-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 18px; padding: 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); }
  .dash-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .dash-card-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; }
  .dash-view-all { font-size: 12px; font-weight: 700; color: var(--blue); background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
  .dash-view-all:hover { opacity: 0.7; }

  .dash-event-row { display: flex; align-items: center; gap: 14px; padding: 11px 0; border-bottom: 1px solid rgba(61,90,241,0.07); cursor: pointer; transition: all 0.15s; }
  .dash-event-row:last-child { border-bottom: none; padding-bottom: 0; }
  .dash-event-row:first-child { padding-top: 0; }
  .dash-event-row:hover .dash-event-title-text { color: var(--blue); }
  .dash-event-datebox { width: 46px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, var(--blue-light) 0%, #e0e7ff 100%); border: 1px solid rgba(61,90,241,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
  .dash-event-day { font-size: 17px; font-weight: 900; color: var(--blue); line-height: 1; }
  .dash-event-mon { font-size: 10px; font-weight: 700; color: var(--blue-mid); text-transform: uppercase; }
  .dash-event-title-text { font-size: 14px; font-weight: 700; color: var(--text); transition: color 0.15s; }
  .dash-event-club-text { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .dash-event-badge { margin-left: auto; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; padding: 3px 10px; border-radius: 100px; flex-shrink: 0; background: var(--blue-light); color: var(--blue); border: 1px solid rgba(61,90,241,0.15); }

  /* ACTIVITY — SVG icon in colored square */
  .dash-activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(61,90,241,0.07); }
  .dash-activity-item:last-child { border-bottom: none; }
  .dash-activity-icon { width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .dash-activity-text { font-size: 13px; color: var(--text); line-height: 1.5; flex: 1; }
  .dash-activity-text b { font-weight: 700; }
  .dash-activity-time { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* CLUBS */
  .dash-clubs-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .dash-club-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 16px; padding: 18px 14px; cursor: pointer; transition: all 0.2s; text-align: center; box-shadow: 0 2px 12px rgba(61,90,241,0.04); }
  .dash-club-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(61,90,241,0.12); background: rgba(255,255,255,0.85); border-color: rgba(61,90,241,0.2); }
  .dash-club-av { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--blue-light) 0%, #e0e7ff 100%); border: 1px solid rgba(61,90,241,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
  .dash-club-name { font-size: 13px; font-weight: 800; color: var(--text); }
  .dash-club-count { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .dash-club-cat { display: inline-block; margin-top: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 100px; background: var(--blue-light); color: var(--blue); }

  @media(max-width:1024px){ .dash-sidebar{width:200px} .dash-main{margin-left:200px} }
  @media(max-width:768px){ .dash-sidebar{display:none} .dash-main{margin-left:0} .dash-content{padding:20px} .dash-two-col{grid-template-columns:1fr} .dash-clubs-grid{grid-template-columns:repeat(2,1fr)} .dash-stats{grid-template-columns:repeat(2,1fr)} .dash-banner-right{display:none} }
`

// SVG icon components
const CalendarIcon = ({color='#3d5af1', size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const UsersIcon = ({color='#3d5af1', size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const UploadIcon = ({color='#3d5af1', size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
)
const AwardIcon = ({color='#3d5af1', size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const CheckIcon = ({color='#166534', size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const BellIcon = ({color='#92400e', size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const StarIcon = ({color='#6b21a8', size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const CodeIcon = ({color='#1d4ed8', size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const CameraIcon = ({color='#92400e', size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
)
const BotIcon = ({color='#166534', size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
)
const BookIcon = ({color='#9d174d', size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Clubs', path:'/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:'Events', path:'/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Profile', path:'/profile', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const upcomingEvents = [
  { id:1, title:'Hackathon 2025', club:'Coding Club', type:'Hackathon', day:'28', mon:'Mar' },
  { id:2, title:'Photography Walk', club:'Photography Club', type:'Workshop', day:'05', mon:'Apr' },
  { id:3, title:'Debate Night', club:'Literary Club', type:'Competition', day:'10', mon:'Apr' },
  { id:4, title:'Robotics Demo Day', club:'Robotics Club', type:'Exhibition', day:'15', mon:'Apr' },
]

const activity = [
  { Icon:AwardIcon, iconColor:'#92400e', bg:'#fef9c3', text:<>Registered for <b>Hackathon 2025</b></>, time:'2 hours ago' },
  { Icon:UsersIcon, iconColor:'#1d4ed8', bg:'#dbeafe', text:<>Followed <b>Photography Club</b></>, time:'Yesterday' },
  { Icon:BellIcon, iconColor:'#166534', bg:'#dcfce7', text:<><b>Coding Club</b> posted a new event</>, time:'2 days ago' },
  { Icon:CheckIcon, iconColor:'#6b21a8', bg:'#f3e8ff', text:<>Profile setup <b>completed</b></>, time:'3 days ago' },
]

const clubs = [
  { id:1, name:'Coding Club', count:120, cat:'Technical', Icon:CodeIcon, iconColor:'#1d4ed8', bg:'#dbeafe' },
  { id:2, name:'Photography', count:85, cat:'Cultural', Icon:CameraIcon, iconColor:'#92400e', bg:'#fef9c3' },
  { id:3, name:'Robotics Club', count:60, cat:'Technical', Icon:BotIcon, iconColor:'#166534', bg:'#dcfce7' },
  { id:4, name:'Literary Club', count:95, cat:'Cultural', Icon:BookIcon, iconColor:'#9d174d', bg:'#fce7f3' },
]

const stats = [
  { Icon:CalendarIcon, num:'3', label:'Events registered' },
  { Icon:UsersIcon, num:'4', label:'Clubs followed' },
  { Icon:UploadIcon, num:'1', label:'Projects submitted' },
  { Icon:AwardIcon, num:'2', label:'Achievements' },
]

const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)
    : 'U'

  return (
    <div className="dash-root">
      <style>{styles}</style>
      <div className="dash-blob1" /><div className="dash-blob2" />

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-logo">
          <div className="dash-sidebar-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="dash-sidebar-logo-text">Connect</span>
        </div>
        <nav className="dash-sidebar-nav">
          <div className="dash-nav-label">Main menu</div>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`dash-nav-item${location.pathname===item.path?' active':''}`}>
              <span className="dash-nav-icon">{item.icon}</span>{item.label}
            </Link>
          ))}
          <div className="dash-nav-label" style={{marginTop:'12px'}}>Account</div>
          <div className="dash-nav-item dash-logout" onClick={() => { logout(); navigate('/') }}>
            <span className="dash-nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            Logout
          </div>
        </nav>
        <div className="dash-sidebar-bottom">
          <div className="dash-user-card" onClick={() => navigate('/profile')}>
            <div className="dash-user-avatar">{initials}</div>
            <div>
              <div className="dash-user-name">{user?.name || 'Student'}</div>
              <div className="dash-user-role">{user?.role || 'student'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <div className="dash-topbar">
          <div>
            <div className="dash-topbar-page">Dashboard</div>
            <div className="dash-topbar-date">{today}</div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-search" onClick={() => navigate('/events')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span className="dash-search-text">Search events, clubs...</span>
            </div>
            <div className="dash-notif-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div className="dash-notif-dot" />
            </div>
          </div>
        </div>

        <div className="dash-content">

          {/* BANNER */}
          <div className="dash-banner">
            <div className="dash-banner-left">
              <div className="dash-banner-tag">Welcome back</div>
              <div className="dash-banner-title">{user?.name || 'Student'}!</div>
              <div className="dash-banner-sub">You have 3 upcoming events this week. Stay active and keep exploring clubs on campus.</div>
              <button className="dash-banner-btn" onClick={() => navigate('/events')}>Browse events →</button>
            </div>
            <div className="dash-banner-right">
              {[{num:'3',label:'Events this week'},{num:'4',label:'Clubs followed'},{num:'2',label:'Achievements'}].map((p,i)=>(
                <div className="dash-banner-pill" key={i}>
                  <div className="dash-banner-pill-num">{p.num}</div>
                  <div className="dash-banner-pill-label">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STATS — clean SVG icons in colored boxes */}
          <div className="dash-stats">
            {stats.map((s,i)=>(
              <div className="dash-stat" key={i}>
                <div className="dash-stat-icon-wrap">
                  <s.Icon color="var(--blue)" size={18} />
                </div>
                <div className="dash-stat-num">{s.num}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* TWO COL */}
          <div className="dash-two-col">
            <div className="dash-card">
              <div className="dash-card-header">
                <div className="dash-card-title">Upcoming events</div>
                <button className="dash-view-all" onClick={() => navigate('/events')}>View all →</button>
              </div>
              {upcomingEvents.map(ev=>(
                <div className="dash-event-row" key={ev.id} onClick={() => navigate(`/events/${ev.id}`)}>
                  <div className="dash-event-datebox">
                    <div className="dash-event-day">{ev.day}</div>
                    <div className="dash-event-mon">{ev.mon}</div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="dash-event-title-text">{ev.title}</div>
                    <div className="dash-event-club-text">by {ev.club}</div>
                  </div>
                  <div className="dash-event-badge">{ev.type}</div>
                </div>
              ))}
            </div>

            {/* ACTIVITY — SVG icons in colored square boxes */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div className="dash-card-title">Recent activity</div>
              </div>
              {activity.map((a,i)=>(
                <div className="dash-activity-item" key={i}>
                  <div className="dash-activity-icon" style={{background:a.bg}}>
                    <a.Icon color={a.iconColor} size={16} />
                  </div>
                  <div>
                    <div className="dash-activity-text">{a.text}</div>
                    <div className="dash-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLUBS — SVG icons matching club identity */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
            <div style={{fontSize:'15px',fontWeight:800,letterSpacing:'-0.3px'}}>Clubs you follow</div>
            <button className="dash-view-all" onClick={() => navigate('/clubs')}>View all →</button>
          </div>
          <div className="dash-clubs-grid">
            {clubs.map(c=>(
              <div className="dash-club-card" key={c.id} onClick={() => navigate(`/clubs/${c.id}`)}>
                <div className="dash-club-av" style={{background:c.bg}}>
                  <c.Icon color={c.iconColor} size={22} />
                </div>
                <div className="dash-club-name">{c.name}</div>
                <div className="dash-club-count">{c.count} members</div>
                <div className="dash-club-cat">{c.cat}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
