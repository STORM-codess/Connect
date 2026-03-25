import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { eventService } from '../../services/eventService'

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
  .user-card { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(61,90,241,0.06); border: 1px solid rgba(61,90,241,0.1); border-radius: 14px; }
  .user-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900; color: #fff; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .user-role { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .page-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; }
  .topbar { background: rgba(255,255,255,0.7); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.8); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
  .topbar-page { font-size: 18px; font-weight: 800; letter-spacing: -0.4px; color: var(--text); }
  .topbar-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

  .content { padding: 32px; max-width: 780px; }

  /* FORM CARD */
  .form-card { background: rgba(255,255,255,0.68); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.85); border-radius: 22px; padding: 32px; box-shadow: 0 4px 24px rgba(61,90,241,0.07); margin-bottom: 20px; }
  .form-card-title { font-size: 16px; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 22px; display: flex; align-items: center; gap: 10px; }
  .form-card-icon { width: 32px; height: 32px; border-radius: 9px; background: var(--blue-light); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(61,90,241,0.15); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label { font-size: 12px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.8px; }
  .form-label span { color: #ef4444; margin-left: 2px; }
  .form-input, .form-select, .form-textarea {
    background: rgba(255,255,255,0.8); border: 1.5px solid rgba(61,90,241,0.12);
    border-radius: 12px; padding: 12px 16px; font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 500; color: var(--text); transition: all 0.15s;
    outline: none; width: 100%;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--blue); background: rgba(255,255,255,0.95); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .form-input::placeholder, .form-textarea::placeholder { color: #9ca3af; }
  .form-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
  .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px; cursor: pointer; }

  /* TAGS input */
  .tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
  .tag-toggle { padding: 7px 16px; border-radius: 100px; border: 1.5px solid rgba(61,90,241,0.15); background: rgba(255,255,255,0.7); font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: var(--muted); cursor: pointer; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.5px; }
  .tag-toggle:hover { border-color: var(--blue); color: var(--blue); }
  .tag-toggle.on { background: var(--blue); border-color: var(--blue); color: #fff; }

  /* SUBMIT */
  .form-actions { display: flex; gap: 12px; margin-top: 8px; }
  .btn-submit { flex: 1; background: var(--blue); color: #fff; border: none; padding: 15px; border-radius: 13px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 14px rgba(61,90,241,0.22); letter-spacing: 0.2px; }
  .btn-submit:hover { background: var(--blue-hover); transform: translateY(-1px); }
  .btn-draft { background: rgba(255,255,255,0.7); color: var(--muted); border: 1.5px solid rgba(255,255,255,0.9); padding: 15px 24px; border-radius: 13px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
  .btn-draft:hover { border-color: var(--blue); color: var(--blue); }

  /* SUCCESS */
  .success-banner { background: #dcfce7; border: 1.5px solid rgba(22,101,52,0.2); border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .success-text { font-size: 14px; font-weight: 700; color: #166534; }
  .success-sub { font-size: 12px; color: #16a34a; margin-top: 2px; }

  @media(max-width:768px){ .sidebar{display:none} .page-main{margin-left:0} .content{padding:20px} .form-grid{grid-template-columns:1fr} }
`

const navItems = [
  { label:'Dashboard', path:'/organizer', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label:'Create Event', path:'/organizer/create', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { label:'My Events', path:'/organizer/events', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label:'Registrations', path:'/organizer/registrations', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
]

const defaultForm = { title:'', club:'', type:'', startDate:'', endDate:'', venue:'', teamSize:'', description:'', maxRegistrations:'' }
const tagOptions = ['OFFLINE','ONLINE','OPEN','TEAM EVENT','SOLO','FREE']

export default function CreateEvent() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [form, setForm] = useState(defaultForm)
  const [tags, setTags] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const initials = user?.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'O'

  const toggleTag = (t) => setTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev,t])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = true
    if (!form.club.trim()) e.club = true
    if (!form.type) e.type = true
    if (!form.startDate) e.startDate = true
    if (!form.venue.trim()) e.venue = true
    if (!form.description.trim()) e.description = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await eventService.createEvent(form)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to create event. Try again later.');
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }))
  }

  const inputStyle = (field) => ({
    borderColor: errors[field] ? '#ef4444' : undefined,
    boxShadow: errors[field] ? '0 0 0 3px rgba(239,68,68,0.08)' : undefined,
  })

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
            <div><div className="user-name">{user?.name||'Organizer'}</div><div className="user-role">Club organizer</div></div>
          </div>
        </div>
      </aside>

      <main className="page-main">
        <div className="topbar">
          <div>
            <div className="topbar-page">Create Event</div>
            <div className="topbar-sub">Fill in the details — admin will review before it goes live</div>
          </div>
        </div>

        <div className="content">
          {submitted && (
            <div className="success-banner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <div className="success-text">Event submitted for approval!</div>
                <div className="success-sub">Admin will review and publish it within 24 hours.</div>
              </div>
            </div>
          )}

          {/* BASIC INFO */}
          <div className="form-card">
            <div className="form-card-title">
              <div className="form-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
              </div>
              Basic information
            </div>
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Event title <span>*</span></label>
                <input className="form-input" placeholder="e.g. Hackathon 2025" value={form.title} onChange={e=>handleChange('title',e.target.value)} style={inputStyle('title')} />
              </div>
              <div className="form-group">
                <label className="form-label">Club name <span>*</span></label>
                <input className="form-input" placeholder="e.g. Coding Club" value={form.club} onChange={e=>handleChange('club',e.target.value)} style={inputStyle('club')} />
              </div>
              <div className="form-group">
                <label className="form-label">Event type <span>*</span></label>
                <select className="form-select" value={form.type} onChange={e=>handleChange('type',e.target.value)} style={inputStyle('type')}>
                  <option value="">Select type...</option>
                  {['Hackathon','Workshop','Competition','Exhibition','Performance','Tournament','Seminar','Other'].map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group full">
                <label className="form-label">Description <span>*</span></label>
                <textarea className="form-textarea" placeholder="Describe your event — what it's about, who should join, what to expect..." value={form.description} onChange={e=>handleChange('description',e.target.value)} style={inputStyle('description')} />
              </div>
            </div>
          </div>

          {/* DATE & VENUE */}
          <div className="form-card">
            <div className="form-card-title">
              <div className="form-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              Date, venue & capacity
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Start date <span>*</span></label>
                <input type="date" className="form-input" value={form.startDate} onChange={e=>handleChange('startDate',e.target.value)} style={inputStyle('startDate')} />
              </div>
              <div className="form-group">
                <label className="form-label">End date</label>
                <input type="date" className="form-input" value={form.endDate} onChange={e=>handleChange('endDate',e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Venue <span>*</span></label>
                <input className="form-input" placeholder="e.g. College Auditorium" value={form.venue} onChange={e=>handleChange('venue',e.target.value)} style={inputStyle('venue')} />
              </div>
              <div className="form-group">
                <label className="form-label">Team size</label>
                <input className="form-input" placeholder="e.g. 2–4 members or Solo" value={form.teamSize} onChange={e=>handleChange('teamSize',e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Max registrations</label>
                <input type="number" className="form-input" placeholder="e.g. 100" value={form.maxRegistrations} onChange={e=>handleChange('maxRegistrations',e.target.value)} />
              </div>
            </div>
          </div>

          {/* TAGS */}
          <div className="form-card">
            <div className="form-card-title">
              <div className="form-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d5af1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              Tags
            </div>
            <div className="tags-row">
              {tagOptions.map(t => (
                <button key={t} className={`tag-toggle${tags.includes(t)?' on':''}`} onClick={()=>toggleTag(t)}>{t}</button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button className="btn-draft" onClick={() => navigate('/organizer')}>Save as draft</button>
            <button className="btn-submit" onClick={handleSubmit}>Submit for approval →</button>
          </div>
        </div>
      </main>
    </div>
  )
}
