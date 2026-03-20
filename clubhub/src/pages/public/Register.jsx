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
    font-size: 22px; font-weight: 900; color: #fff;
    letter-spacing: -0.5px; text-decoration: none;
    display: flex; align-items: center; gap: 8px;
  }
  .auth-left-logo-icon {
    width: 30px; height: 30px; background: rgba(255,255,255,0.2);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
  }
  .auth-left-body { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .auth-left-big {
    font-size: clamp(52px, 7vw, 88px); font-weight: 900;
    color: rgba(255,255,255,0.12); letter-spacing: -3px;
    line-height: 1; user-select: none; margin-bottom: 32px;
  }
  .auth-left-title {
    font-size: clamp(26px, 3vw, 38px); font-weight: 900;
    color: #fff; letter-spacing: -1px; line-height: 1.2; margin-bottom: 16px;
  }
  .auth-left-sub { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.6; max-width: 360px; }
  .auth-left-footer { color: rgba(255,255,255,0.4); font-size: 13px; }
  .auth-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; }
  .auth-pill {
    background: rgba(255,255,255,0.12); color: #fff; border-radius: 100px;
    padding: 6px 14px; font-size: 12px; font-weight: 600;
    display: flex; align-items: center; gap: 6px;
  }
  .auth-pill-dot { width: 6px; height: 6px; background: rgba(255,255,255,0.6); border-radius: 50%; }

  .auth-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px; background: var(--bg); overflow-y: auto;
  }
  .auth-form-wrap { width: 100%; max-width: 420px; }
  .auth-form-title { font-size: 26px; font-weight: 900; letter-spacing: -1px; color: var(--text); margin-bottom: 6px; }
  .auth-form-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .auth-form-sub a { color: var(--blue); font-weight: 600; text-decoration: none; }
  .auth-form-sub a:hover { text-decoration: underline; }

  .auth-form-card {
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: 16px; padding: 28px;
  }

  .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .auth-field { margin-bottom: 16px; }
  .auth-label { display: block; font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 7px; }
  .auth-input {
    width: 100%; padding: 11px 13px;
    border: 1.5px solid var(--border); border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 14px; color: var(--text);
    background: var(--white); outline: none; transition: border-color 0.15s;
  }
  .auth-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .auth-input.error { border-color: var(--error); }
  .auth-select {
    width: 100%; padding: 11px 13px;
    border: 1.5px solid var(--border); border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 14px; color: var(--text);
    background: var(--white); outline: none; transition: border-color 0.15s;
    appearance: none; cursor: pointer;
  }
  .auth-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(61,90,241,0.08); }
  .auth-error-msg { color: var(--error); font-size: 12px; font-weight: 500; margin-top: 4px; }

  /* ROLE SELECTOR */
  .auth-role-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .auth-role-btn {
    border: 1.5px solid var(--border); border-radius: 10px; padding: 14px 10px;
    background: var(--white); cursor: pointer; transition: all 0.15s;
    text-align: center; font-family: 'Inter', sans-serif;
  }
  .auth-role-btn:hover { border-color: var(--blue); }
  .auth-role-btn.selected { border-color: var(--blue); background: var(--blue-light); }
  .auth-role-icon { font-size: 22px; margin-bottom: 6px; }
  .auth-role-name { font-size: 13px; font-weight: 700; color: var(--text); }
  .auth-role-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .auth-divider-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1px; color: var(--muted); margin-bottom: 16px; display: block;
  }

  .auth-submit {
    width: 100%; background: var(--blue); color: #fff; border: none;
    padding: 14px; border-radius: 10px; font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s; margin-top: 4px;
  }
  .auth-submit:hover { background: var(--blue-hover); transform: translateY(-1px); }
  .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .auth-terms { font-size: 12px; color: var(--muted); text-align: center; margin-top: 14px; line-height: 1.5; }
  .auth-terms a { color: var(--blue); text-decoration: none; font-weight: 600; }

  .auth-login-row { text-align: center; font-size: 14px; color: var(--muted); margin-top: 20px; }
  .auth-login-row a { color: var(--blue); font-weight: 700; text-decoration: none; }
  .auth-login-row a:hover { text-decoration: underline; }

  @media (max-width: 768px) {
    .auth-root { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 32px 20px; align-items: flex-start; }
    .auth-row { grid-template-columns: 1fr; }
  }
`

const roles = [
  { value: 'student', icon: '🎓', name: 'Student', desc: 'Explore & join events' },
  { value: 'organizer', icon: '🎯', name: 'Organizer', desc: 'Create & manage events' },
]

const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'Other']
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', enrollNo: '', branch: '', year: '', password: '', confirm: '', role: 'student' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.enrollNo.trim()) e.enrollNo = 'Enrollment number is required'
    if (!form.branch) e.branch = 'Select your branch'
    if (!form.year) e.year = 'Select your year'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (ev) => {
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
          <div className="auth-left-big">join us</div>
          <div className="auth-left-title">Start your<br />campus journey.</div>
          <div className="auth-left-sub">
            Create your account and get access to every club, event, and opportunity your college has to offer.
          </div>
          <div className="auth-pills">
            <div className="auth-pill"><div className="auth-pill-dot" />Free to join</div>
            <div className="auth-pill"><div className="auth-pill-dot" />All clubs in one place</div>
            <div className="auth-pill"><div className="auth-pill-dot" />Build your profile</div>
          </div>
        </div>
        <div className="auth-left-footer">Minor project · Connect platform</div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Create your account</div>
          <div className="auth-form-sub">
            Already have an account? <Link to="/login">Login here</Link>
          </div>

          <div className="auth-form-card">
            <form onSubmit={handleSubmit}>

              {/* ROLE */}
              <span className="auth-divider-label">I am a</span>
              <div className="auth-role-row" style={{marginBottom:'20px'}}>
                {roles.map(r => (
                  <div key={r.value}
                    className={`auth-role-btn${form.role === r.value ? ' selected' : ''}`}
                    onClick={() => setForm({...form, role: r.value})}>
                    <div className="auth-role-icon">{r.icon}</div>
                    <div className="auth-role-name">{r.name}</div>
                    <div className="auth-role-desc">{r.desc}</div>
                  </div>
                ))}
              </div>

              <span className="auth-divider-label">Personal details</span>

              {/* NAME */}
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input className={`auth-input${errors.name?' error':''}`} name="name" placeholder="Rahul Sharma" value={form.name} onChange={handleChange}/>
                {errors.name && <div className="auth-error-msg">{errors.name}</div>}
              </div>

              {/* EMAIL */}
              <div className="auth-field">
                <label className="auth-label">College email</label>
                <input className={`auth-input${errors.email?' error':''}`} type="email" name="email" placeholder="you@college.edu" value={form.email} onChange={handleChange}/>
                {errors.email && <div className="auth-error-msg">{errors.email}</div>}
              </div>

              {/* ENROLL */}
              <div className="auth-field">
                <label className="auth-label">Enrollment number</label>
                <input className={`auth-input${errors.enrollNo?' error':''}`} name="enrollNo" placeholder="e.g. CS2023001" value={form.enrollNo} onChange={handleChange}/>
                {errors.enrollNo && <div className="auth-error-msg">{errors.enrollNo}</div>}
              </div>

              {/* BRANCH + YEAR */}
              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Branch</label>
                  <select className={`auth-select${errors.branch?' error':''}`} name="branch" value={form.branch} onChange={handleChange}>
                    <option value="">Select branch</option>
                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.branch && <div className="auth-error-msg">{errors.branch}</div>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Year</label>
                  <select className={`auth-select${errors.year?' error':''}`} name="year" value={form.year} onChange={handleChange}>
                    <option value="">Select year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  {errors.year && <div className="auth-error-msg">{errors.year}</div>}
                </div>
              </div>

              <span className="auth-divider-label" style={{marginTop:'4px', display:'block'}}>Set a password</span>

              {/* PASSWORD */}
              <div className="auth-row">
                <div className="auth-field">
                  <label className="auth-label">Password</label>
                  <input className={`auth-input${errors.password?' error':''}`} type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange}/>
                  {errors.password && <div className="auth-error-msg">{errors.password}</div>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Confirm password</label>
                  <input className={`auth-input${errors.confirm?' error':''}`} type="password" name="confirm" placeholder="Repeat password" value={form.confirm} onChange={handleChange}/>
                  {errors.confirm && <div className="auth-error-msg">{errors.confirm}</div>}
                </div>
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create my account'}
              </button>
            </form>

            <div className="auth-terms">
              By signing up you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
          </div>

          <div className="auth-login-row">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}