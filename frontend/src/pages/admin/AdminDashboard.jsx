import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { adminService } from '../../services/adminService'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0;
    --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; --white: #ffffff;
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
  .user-card { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(61,90,241,0.06); border: 1px solid rgba(61,90,241,0.1); border-radius: 14px; }
  .user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; text-transform: capitalize; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; }
  .topbar-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

  .content { padding: 28px 32px; }

  /* BANNER */
  .banner { border-radius: 22px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; background: linear-gradient(135deg, #1e3a8a 0%, #3d5af1 55%, #6366f1 100%); box-shadow: 0 8px 32px rgba(61,90,241,0.25); position: relative; overflow: hidden; }
  .banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; }
  .banner-left { position: relative; z-index: 1; }
  .banner-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
  .banner-title { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -1px; margin-bottom: 6px; }
  .banner-sub { font-size: 14px; color: rgba(255,255,255,0.65); }
  .banner-pills { display: flex; gap: 12px; position: relative; z-index: 1; }
  .banner-pill { background: rgba(255,255,255,0.13); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 14px 20px; text-align: center; min-width: 90px; }
  .banner-pill-num { font-size: 24px; font-weight: 900; color: #fff; }
  .banner-pill-label { font-size: 11px; color: rgba(255,255,255,0.65); font-weight: 600; margin-top: 3px; }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 24px; }
  .stat { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 16px; padding: 20px 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); transition: all 0.2s; }
  .stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(61,90,241,0.1); }
  .stat-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; border: 1px solid rgba(61,90,241,0.12); }
  .stat-num { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: var(--blue); }
  .stat-label { font-size: 11px; color: var(--muted); font-weight: 700; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.5px; }

  /* TWO COL */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .glass-card { background: rgba(255,255,255,0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); border-radius: 18px; padding: 22px; box-shadow: 0 2px 16px rgba(61,90,241,0.05); }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .card-title { font-size: 15px; font-weight: 800; letter-spacing: -0.3px; }
  .card-count { font-size: 12px; font-weight: 700; color: var(--muted); background: rgba(61,90,241,0.08); border-radius: 100px; padding: 3px 10px; }

  /* PENDING ROWS */
  .pending-row { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(61,90,241,0.07); }
  .pending-row:last-child { border-bottom: none; padding-bottom: 0; }
  .pending-row:first-child { padding-top: 0; }
  .pending-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #e0e7ff; }
  .pending-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .pending-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .pending-actions { display: flex; gap: 8px; margin-left: auto; flex-shrink: 0; }
  .btn-approve { font-size: 12px; font-weight: 700; color: #166534; background: #dcfce7; border: 1px solid rgba(22,101,52,0.15); border-radius: 8px; padding: 6px 14px; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .btn-approve:hover { background: #16a34a; color: #fff; }
  .btn-reject { font-size: 12px; font-weight: 700; color: #991b1b; background: #fee2e2; border: 1px solid rgba(153,27,27,0.15); border-radius: 8px; padding: 6px 14px; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .btn-reject:hover { background: #ef4444; color: #fff; }

  /* STATUS BADGE */
  .status { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; padding: 3px 10px; border-radius: 100px; margin-left: auto; }
  .status.active { background: #dcfce7; color: #166534; }
  .status.pending { background: #fef9c3; color: #92400e; }
  .status.null { background: #fef9c3; color: #92400e; }

  @media(max-width:900px){ .stats{grid-template-columns:repeat(2,1fr)} .two-col{grid-template-columns:1fr} .banner-pills{display:none} }
`

const navItems = [
  { label:'Dashboard', path:'/admin', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'All Events', path:'/admin/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'All Clubs', path:'/admin/clubs', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const [data, setData] = useState({
    totalUsers: 0,
    totalClubs: 0,
    totalEvents: 0,
    activeEvents: 0,
    pendingEvents: [],
    pendingClubs: [],
    allClubs: []
  })

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = () => {
    adminService.getDashboardAuth()
      .then(res => setData(res.data))
      .catch(console.error)
  }

  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'A'
  const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

  const approveEvent = async (id) => {
    try {
      await adminService.approveEvent(id)
      fetchDashboard()
    } catch(err) { alert('Failed to approve event') }
  }

  const rejectEvent = async (id) => {
    try {
      await adminService.rejectEvent(id)
      fetchDashboard()
    } catch(err) { alert('Failed to reject event') }
  }

  const approveClub = async (id) => {
    try {
      await adminService.verifyClub(id)
      fetchDashboard()
    } catch(err) { alert('Failed to verify club') }
  }

  const rejectClub = async (id) => {
      // Could add reject club endpoint in future
      fetchDashboard()
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
          <div className="nav-label">Admin panel</div>
          {navItems.map(item => (
            <div key={item.path} className={`nav-item${location.pathname===item.path?' active':''}`}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
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
            <div><div className="user-name">{user?.name||'Admin'}</div><div className="user-role">College Admin</div></div>
          </div>
        </div>
      </aside>

      <main className="page-main">
        <div className="topbar">
          <div>
            <div className="topbar-page">Admin Dashboard</div>
            <div className="topbar-sub">{today}</div>
          </div>
        </div>

        <div className="content">
          <div className="banner">
            <div className="banner-left">
              <div className="banner-tag">College Admin</div>
              <div className="banner-title">Control Panel</div>
              <div className="banner-sub">Approve events, verify clubs and monitor campus activity.</div>
            </div>
            <div className="banner-pills">
              {[{num:data.pendingEvents.length,label:'Pending events'},{num:data.pendingClubs.length,label:'Pending clubs'},{num:data.allClubs.filter(x=>x.verified).length,label:'Active clubs'},{num:data.totalUsers,label:'Students'}].map((p,i)=>(
                <div className="banner-pill" key={i}>
                  <div className="banner-pill-num">{p.num}</div>
                  <div className="banner-pill-label">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats">
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, num:data.totalUsers, label:'Total Users' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, num:data.totalEvents, label:'Total events' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, num:data.allClubs.filter(x=>x.verified).length, label:'Active clubs' },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, num:data.pendingEvents.length+data.pendingClubs.length, label:'Pending approvals' },
            ].map((s,i)=>(
              <div className="stat" key={i}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="two-col">
            {/* PENDING EVENTS */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-title">Pending events</div>
                <span className="card-count">{data.pendingEvents.length} waiting</span>
              </div>
              {data.pendingEvents.length === 0 && <div style={{color:'var(--muted)',fontSize:'14px',fontStyle:'italic'}}>All events approved</div>}
              {data.pendingEvents.map(ev=>(
                <div className="pending-row" key={ev._id}>
                  <div className="pending-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <div className="pending-title">{ev.title}</div>
                    <div className="pending-sub">{ev.club?.name || 'Unknown Club'} · {new Date(ev.date).toLocaleDateString()}</div>
                  </div>
                  <div className="pending-actions">
                    <button className="btn-approve" onClick={()=>approveEvent(ev._id)}>Approve</button>
                    <button className="btn-reject" onClick={()=>rejectEvent(ev._id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>

            {/* PENDING CLUBS */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-title">Pending clubs</div>
                <span className="card-count">{data.pendingClubs.length} waiting</span>
              </div>
              {data.pendingClubs.length === 0 && <div style={{color:'var(--muted)',fontSize:'14px',fontStyle:'italic'}}>All clubs verified</div>}
              {data.pendingClubs.map(c=>(
                <div className="pending-row" key={c._id}>
                  <div className="pending-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b21a8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </div>
                  <div>
                    <div className="pending-title">{c.name}</div>
                    <div className="pending-sub">by {c.organizer?.name || 'Unknown'} · {c.category}</div>
                  </div>
                  <div className="pending-actions">
                    <button className="btn-approve" onClick={()=>approveClub(c._id)}>Verify</button>
                    <button className="btn-reject" onClick={()=>rejectClub(c._id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALL CLUBS */}
          <div className="glass-card">
            <div className="card-header">
              <div className="card-title">All clubs</div>
              <span className="card-count">{data.allClubs.length} active</span>
            </div>
            {data.allClubs.map((c,i)=>(
              <div className="pending-row" key={i}>
                <div className="pending-icon" style={{background:'var(--blue-light)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <div>
                  <div className="pending-title">{c.name}</div>
                  <div className="pending-sub">{c.category}</div>
                </div>
                <span className={`status ${c.verified ? 'active' : 'pending'}`}>{c.verified ? 'Verified' : 'Pending'}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
