import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import authBg from '../../assets/images/auth-bg.jpg'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --blue: #3d5af1; --blue-light: #eef0fd; --blue-hover: #2d4ae0; --text: #0f0f0f; --muted: #6b7280; --border: #e5e7eb; }

  .auth-root { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; }

  /* LEFT PANEL */
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

  /* RIGHT PANEL */
  .auth-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px; background: #fafbff; }
  .auth-form-wrap { width: 100%; max-width: 400px; }
  .auth-form-title { font-size: 26px; font-weight: 900; letter-spacing: -0.8px; color: var(--text); margin-bottom: 6px; }
  .auth-form-sub { font-size: 14px; color: var(--muted); margin-bottom: 32px; line-height: 1.5; }

  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 12px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 7px; }
  .form-input { width: 100%; background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 13px 16px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; color: var(--text); outline: none; transition: all 0.15s; }
  .form-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .form-input::placeholder { color: #9ca3af; }
  .form-input.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }

  .error-box { background: #fef2f2; border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 12px 16px; font-size: 13px; font-weight: 600; color: #991b1b; margin-bottom: 20px; }

  .submit-btn { width: 100%; background: var(--blue); color: #fff; border: none; padding: 15px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 14px rgba(61,90,241,0.22); letter-spacing: 0.2px; margin-top: 4px; }
  .submit-btn:hover:not(:disabled) { background: var(--blue-hover); transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  .auth-switch { text-align: center; margin-top: 22px; font-size: 14px; color: var(--muted); }
  .auth-switch a { color: var(--blue); font-weight: 700; text-decoration: none; }
  .auth-switch a:hover { text-decoration: underline; }

  @media(max-width:768px){ .auth-left{display:none} .auth-right{padding:32px 24px} }
`

// Redirect each role to their correct home page
const roleHome = {
  student: '/dashboard',
  organizer: '/organizer',
  admin: '/admin',
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth() // using real API AuthContext integration!
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    const res = await login(form.email, form.password)
    setLoading(false)

    if (res.success) {
      // Login successful via real backend API
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(roleHome[user.role] || '/dashboard', { replace: true })
    } else {
      setError(res.message || 'Invalid email or password.')
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit() }

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
          <div className="auth-left-title">Your campus,<br />all in one place.</div>
          <div className="auth-left-sub">Discover clubs, register for events, build your college story — all from one platform.</div>
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
          <div className="auth-form-title">Welcome back</div>
          <div className="auth-form-sub">Sign in to your Connect account to continue.</div>

          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className={`form-input${error ? ' error' : ''}`}
              type="email" placeholder="you@college.edu"
              value={form.email} onChange={e => handleChange('email', e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className={`form-input${error ? ' error' : ''}`}
              type="password" placeholder="••••••••"
              value={form.password} onChange={e => handleChange('password', e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>

          <div className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
