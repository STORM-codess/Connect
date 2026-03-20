import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #3d5af1;
    --blue-light: #eef0fd;
    --blue-hover: #2d4ae0;
    --text: #0f0f0f;
    --muted: #6b7280;
    --border: #e5e7eb;
    --bg: #f5f5f7;
    --white: #ffffff;
    --error: #ef4444;
  }

  .auth-root {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--white);
  }

  /* LEFT PANEL */
.auth-left {
  background: var(--blue);
  background-image: url('/src/assets/images/auth-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex; flex-direction: column;
  justify-content: space-between; padding: 48px;
  overflow: hidden;
  position: relative;
}
.auth-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(61, 90, 241, 0.82);
  z-index: 0;
}
.auth-left > * {
  position: relative;
  z-index: 1;
}
  .auth-left-logo {
    font-size: 22px;
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .auth-left-logo-icon {
    width: 30px; height: 30px;
    background: rgba(255,255,255,0.2);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-left-body { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .auth-left-big {
    font-size: clamp(52px, 7vw, 88px);
    font-weight: 900;
    color: rgba(255,255,255,0.12);
    letter-spacing: -3px;
    line-height: 1;
    user-select: none;
    margin-bottom: 32px;
  }
  .auth-left-title {
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 900;
    color: #fff;
    letter-spacing: -1px;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .auth-left-sub {
    color: rgba(255,255,255,0.65);
    font-size: 15px;
    line-height: 1.6;
    max-width: 360px;
  }
  .auth-left-footer { color: rgba(255,255,255,0.4); font-size: 13px; }

  /* PILLS ROW */
  .auth-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; }
  .auth-pill {
    background: rgba(255,255,255,0.12);
    color: #fff; border-radius: 100px;
    padding: 6px 14px; font-size: 12px; font-weight: 600;
    display: flex; align-items: center; gap: 6px;
  }
  .auth-pill-dot { width: 6px; height: 6px; background: rgba(255,255,255,0.6); border-radius: 50%; }

  /* RIGHT PANEL */
  .auth-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    background: var(--white);
  }
  .auth-form-wrap { width: 100%; max-width: 400px; }
  .auth-form-title {
    font-size: 28px; font-weight: 900; letter-spacing: -1px;
    color: var(--text); margin-bottom: 8px;
  }
  .auth-form-sub { color: var(--muted); font-size: 14px; margin-bottom: 36px; }
  .auth-form-sub a { color: var(--blue); font-weight: 600; text-decoration: none; }
  .auth-form-sub a:hover { text-decoration: underline; }

  .auth-field { margin-bottom: 18px; }
  .auth-label {
    display: block; font-size: 13px; font-weight: 700;
    color: var(--text); margin-bottom: 8px; letter-spacing: 0.2px;
  }
  .auth-input {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid var(--border); border-radius: 10px;
    font-family: 'Inter', sans-serif; font-size: 15px; color: var(--text);
    background: var(--white); outline: none; transition: border-color 0.15s;
  }
  .auth-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .auth-input.error { border-color: var(--error); }
  .auth-error-msg { color: var(--error); font-size: 12px; font-weight: 500; margin-top: 5px; }

  .auth-forgot { display: block; text-align: right; font-size: 13px; font-weight: 600; color: var(--blue); text-decoration: none; margin-top: -10px; margin-bottom: 24px; }
  .auth-forgot:hover { text-decoration: underline; }

  .auth-submit {
    width: 100%; background: var(--blue); color: #fff; border: none;
    padding: 14px; border-radius: 10px; font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s;
    margin-top: 8px;
  }
  .auth-submit:hover { background: var(--blue-hover); transform: translateY(-1px); }
  .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .auth-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0; color: var(--muted); font-size: 13px;
  }
  .auth-divider::before, .auth-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  .auth-signup-row {
    text-align: center; font-size: 14px; color: var(--muted); margin-top: 24px;
  }
  .auth-signup-row a { color: var(--blue); font-weight: 700; text-decoration: none; }
  .auth-signup-row a:hover { text-decoration: underline; }

  @media (max-width: 768px) {
    .auth-root { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 40px 24px; align-items: flex-start; padding-top: 80px; }
  }
`

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    // TODO: call backend API here
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value })
    setErrors({ ...errors, [ev.target.name]: '' })
  }

  return (
    <div className="auth-root">
      <style>{styles}</style>

      {/* LEFT */}
      <div className="auth-left">
        <Link to="/" className="auth-left-logo">
          <div className="auth-left-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Connect
        </Link>

        <div className="auth-left-body">
          <div className="auth-left-big">connect</div>
          <div className="auth-left-title">Your campus.<br />All in one place.</div>
          <div className="auth-left-sub">
            Discover clubs, register for events, form teams, and build your college profile — all on Connect.
          </div>
          <div className="auth-pills">
            <div className="auth-pill"><div className="auth-pill-dot" />20+ clubs</div>
            <div className="auth-pill"><div className="auth-pill-dot" />100+ events/year</div>
            <div className="auth-pill"><div className="auth-pill-dot" />1000+ students</div>
          </div>
        </div>

        <div className="auth-left-footer">Minor project · Connect platform</div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Welcome back</div>
          <div className="auth-form-sub">
            Don't have an account? <Link to="/register">Sign up for free</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">College email</label>
              <input
                className={`auth-input${errors.email ? ' error' : ''}`}
                type="email" name="email" placeholder="you@college.edu"
                value={form.email} onChange={handleChange}
              />
              {errors.email && <div className="auth-error-msg">{errors.email}</div>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className={`auth-input${errors.password ? ' error' : ''}`}
                type="password" name="password" placeholder="Enter your password"
                value={form.password} onChange={handleChange}
              />
              {errors.password && <div className="auth-error-msg">{errors.password}</div>}
            </div>

            <a href="#" className="auth-forgot">Forgot password?</a>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Connect'}
            </button>
          </form>

          <div className="auth-signup-row">
            New to Connect? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}