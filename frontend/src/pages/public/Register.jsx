import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { registerUser } from '../../services/authservices'
import authBg from '../../assets/images/auth-bg.jpg'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0; --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; }

  .auth-root { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; }

  .auth-left {
    width: 44%; flex-shrink: 0; position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: space-between; padding: 48px;
  }
  .auth-left-bg { position: absolute; inset: 0; background-image: url(${authBg}); background-size: cover; background-position: center; }
  .auth-left-overlay { position: absolute; inset: 0; background: rgba(61,90,241,0.82); }
  .auth-left-content { position: relative; z-index: 1; }
  .auth-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; margin-bottom: 60px; }
  .auth-logo-icon { width: 34px; height: 34px; background: rgba(255,255,255,0.2); border-radius: 9px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.3); }
  .auth-logo-text { font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
  .auth-left-title { font-size: clamp(28px,3vw,40px); font-weight: 900; color: #fff; letter-spacing: -1.2px; line-height: 1.1; margin-bottom: 16px; }
  .auth-left-sub { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.65; max-width: 340px; }
  .auth-left-bottom { position: relative; z-index: 1; }
  .auth-stats { display: flex; gap: 28px; }
  .auth-stat-num { font-size: 22px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
  .auth-stat-label { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 600; margin-top: 2px; }

  .auth-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px; background: #fafbff; overflow-y: auto; }
  .auth-form-wrap { width: 100%; max-width: 420px; padding: 8px 0; }
  .auth-form-title { font-size: 26px; font-weight: 900; letter-spacing: -0.8px; color: var(--text); margin-bottom: 6px; }
  .auth-form-sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; }

  /* ROLE CARDS */
  .role-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
  .role-card { border: 2px solid var(--border); border-radius: 14px; padding: 16px; cursor: pointer; transition: all 0.15s; background: #fff; text-align: center; }
  .role-card:hover { border-color: var(--blue); background: var(--blue-light); }
  .role-card.selected { border-color: var(--blue); background: var(--blue-light); box-shadow: 0 0 0 3px rgba(61,90,241,0.1); }
  .role-card-icon { font-size: 22px; margin-bottom: 6px; }
  .role-card-title { font-size: 14px; font-weight: 800; color: var(--text); }
  .role-card-sub { font-size: 11px; color: var(--muted); margin-top: 3px; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 7px; }
  .form-label span { color: #ef4444; margin-left: 2px; }
  .form-input, .form-select { width: 100%; background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 16px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: var(--text); outline: none; transition: all 0.15s; }
  .form-input:focus, .form-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .form-input::placeholder { color: #9ca3af; }
  .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px; cursor: pointer; }

  .error-box { background: #fef2f2; border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 12px 16px; font-size: 13px; font-weight: 600; color: #991b1b; margin-bottom: 18px; }

  .submit-btn { width: 100%; background: var(--blue); color: #fff; border: none; padding: 15px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 14px rgba(61,90,241,0.22); letter-spacing: 0.2px; margin-top: 4px; }
  .submit-btn:hover:not(:disabled) { background: var(--blue-hover); transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .auth-switch { text-align: center; margin-top: 20px; font-size: 14px; color: var(--muted); }
  .auth-switch a { color: var(--blue); font-weight: 700; text-decoration: none; }
  .auth-switch a:hover { text-decoration: underline; }

  @media(max-width:768px){ .auth-left{display:none} .auth-right{padding:32px 24px} .form-row{grid-template-columns:1fr} }
`

const roleHome = {
  student: '/dashboard',
  organizer: '/organizer',
  admin: '/admin',
}

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [role, setRole] = useState('student')
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', enrollNo:'', branch:'', year:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    try {
      setLoading(true)
      const data = await registerUser({ ...form, role })
      login(data.user, data.token)
      // ── Role-based redirect ──
      navigate(roleHome[data.user.role] || '/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-root">
      <style>{styles}</style>

      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-overlay" />
        <div className="auth-left-content">
          <Link to="/" className="auth-logo">
            <div className="auth-logo-icon">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="auth-logo-text">Connect</span>
          </Link>
          <div className="auth-left-title">Join your<br />college community.</div>
          <div className="auth-left-sub">Create your account and start exploring clubs, events, and everything happening on campus.</div>
        </div>
        <div className="auth-left-bottom">
          <div className="auth-stats">
            {[{num:'20+',label:'Active clubs'},{num:'100+',label:'Events/year'},{num:'1000+',label:'Students'}].map((s,i)=>(
              <div key={i}><div className="auth-stat-num">{s.num}</div><div className="auth-stat-label">{s.label}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Create account</div>
          <div className="auth-form-sub">Join Connect — it's free.</div>

          {/* ROLE SELECTOR */}
          <div className="role-cards">
            <div className={`role-card${role==='student'?' selected':''}`} onClick={() => setRole('student')}>
              <div className="role-card-icon">🎓</div>
              <div className="role-card-title">Student</div>
              <div className="role-card-sub">Browse & join events</div>
            </div>
            <div className={`role-card${role==='organizer'?' selected':''}`} onClick={() => setRole('organizer')}>
              <div className="role-card-icon">🎯</div>
              <div className="role-card-title">Organizer</div>
              <div className="role-card-sub">Create & manage events</div>
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label className="form-label">Full name <span>*</span></label>
            <input className="form-input" placeholder="Aryan Shrivastava" value={form.name} onChange={e=>handleChange('name',e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Email <span>*</span></label>
            <input className="form-input" type="email" placeholder="you@college.edu" value={form.email} onChange={e=>handleChange('email',e.target.value)} />
          </div>

          {role === 'student' && (
            <>
              <div className="form-group">
                <label className="form-label">Enrollment no.</label>
                <input className="form-input" placeholder="e.g. 0101CS221001" value={form.enrollNo} onChange={e=>handleChange('enrollNo',e.target.value)} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Branch</label>
                  <select className="form-select" value={form.branch} onChange={e=>handleChange('branch',e.target.value)}>
                    <option value="">Select...</option>
                    {['CSE','IT','ECE','ME','CE','EE','Other'].map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select className="form-select" value={form.year} onChange={e=>handleChange('year',e.target.value)}>
                    <option value="">Select...</option>
                    {['1st Year','2nd Year','3rd Year','4th Year'].map(y=><option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password <span>*</span></label>
              <input className="form-input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e=>handleChange('password',e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm password <span>*</span></label>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e=>handleChange('confirmPassword',e.target.value)} />
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account...' : `Create ${role} account →`}
          </button>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
