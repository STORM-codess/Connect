import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --blue: #3d5af1; --blue-light: #eef0fd; --text: #0f0f0f; --muted: #6b7280; }

  .nf-root {
    font-family: 'Inter', sans-serif; min-height: 100vh;
    background: linear-gradient(135deg, #e8ecff 0%, #f0f2ff 40%, #faf5ff 100%);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .nf-blob1 { position: fixed; top: -200px; left: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(61,90,241,0.12) 0%, transparent 70%); pointer-events: none; }
  .nf-blob2 { position: fixed; bottom: -200px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); pointer-events: none; }

  .nf-card {
    background: rgba(255,255,255,0.68); backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.85); border-radius: 28px;
    padding: 64px 56px; text-align: center; max-width: 480px; width: 90%;
    box-shadow: 0 8px 40px rgba(61,90,241,0.1); position: relative; z-index: 1;
  }

  .nf-code {
    font-size: 96px; font-weight: 900; letter-spacing: -4px;
    background: linear-gradient(135deg, #3d5af1, #8b5cf6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1; margin-bottom: 8px;
  }
  .nf-title { font-size: 22px; font-weight: 900; letter-spacing: -0.6px; color: var(--text); margin-bottom: 12px; }
  .nf-desc { font-size: 15px; color: var(--muted); line-height: 1.65; margin-bottom: 36px; }

  .nf-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .nf-btn-primary {
    background: var(--blue); color: #fff; border: none; padding: 13px 28px;
    border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.15s; box-shadow: 0 4px 14px rgba(61,90,241,0.22);
  }
  .nf-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(61,90,241,0.3); }
  .nf-btn-secondary {
    background: rgba(255,255,255,0.7); color: var(--muted);
    border: 1.5px solid rgba(255,255,255,0.9); padding: 13px 28px;
    border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.15s;
  }
  .nf-btn-secondary:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
`

const roleHome = { student:'/dashboard', organizer:'/organizer', admin:'/admin' }

export default function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const goHome = () => navigate(user ? (roleHome[user.role] || '/dashboard') : '/')

  return (
    <div className="nf-root">
      <style>{styles}</style>
      <div className="nf-blob1"/><div className="nf-blob2"/>
      <div className="nf-card">
        <div className="nf-code">404</div>
        <div className="nf-title">Page not found</div>
        <div className="nf-desc">The page you're looking for doesn't exist or may have been moved. Let's get you back on track.</div>
        <div className="nf-actions">
          <button className="nf-btn-primary" onClick={goHome}>
            {user ? 'Go to Dashboard' : 'Go to Home'} →
          </button>
          <button className="nf-btn-secondary" onClick={() => navigate(-1)}>
            ← Go back
          </button>
        </div>
      </div>
    </div>
  )
}
