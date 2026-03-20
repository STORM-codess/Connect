import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Code2, Camera, Bot, BookOpen, Trophy, Music } from 'lucide-react'

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
  }

  .lp { font-family: 'Inter', sans-serif; background: var(--white); color: var(--text); overflow-x: hidden; }

  /* NAV */
  .lp-nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--white); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
  }
  .lp-logo {
    display: flex; align-items: center; gap: 8px;
    font-size: 20px; font-weight: 800; color: var(--blue);
    text-decoration: none; letter-spacing: -0.5px;
  }
  .lp-logo-icon {
    width: 28px; height: 28px; background: var(--blue);
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
  }
  .lp-nav-center { display: flex; align-items: center; gap: 4px; }
  .lp-nav-tab {
    padding: 6px 18px; border-radius: 100px; border: none;
    background: transparent; font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 700; color: var(--muted);
    cursor: pointer; transition: all 0.15s; letter-spacing: 0.5px; text-transform: uppercase;
  }
  .lp-nav-tab.active { background: var(--blue); color: #fff; }
  .lp-nav-tab:hover:not(.active) { background: var(--bg); color: var(--text); }
  .lp-nav-right { display: flex; align-items: center; gap: 10px; }
  .lp-btn-ghost {
    background: none; border: 1.5px solid var(--border);
    padding: 8px 18px; border-radius: 8px; font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 600; color: var(--text); cursor: pointer; transition: all 0.15s;
  }
  .lp-btn-ghost:hover { border-color: var(--blue); color: var(--blue); }
  .lp-btn-blue {
    background: var(--blue); color: #fff; border: none;
    padding: 8px 20px; border-radius: 8px; font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s;
  }
  .lp-btn-blue:hover { background: var(--blue-hover); }

  /* HERO */
  .lp-hero { background: var(--bg); padding: 80px 40px 56px; text-align: center; }
  .lp-hero-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--blue-light); color: var(--blue);
    border-radius: 100px; padding: 5px 14px; font-size: 13px; font-weight: 600;
    margin-bottom: 28px; animation: fadeUp 0.5s ease both;
  }
  .lp-hero-dot { width: 7px; height: 7px; background: var(--blue); border-radius: 50%; animation: blink 2s infinite; }
  .lp-hero-title {
    font-size: clamp(40px, 6vw, 72px); font-weight: 900;
    letter-spacing: -2.5px; line-height: 1.05; margin-bottom: 20px;
    animation: fadeUp 0.5s 0.08s ease both;
  }
  .lp-hero-title .blue { color: var(--blue); }
  .lp-hero-sub {
    font-size: 18px; color: var(--muted); max-width: 500px; margin: 0 auto 40px;
    line-height: 1.6; font-weight: 400; animation: fadeUp 0.5s 0.14s ease both;
  }
  .lp-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.5s 0.2s ease both; }
  .lp-btn-hero {
    background: var(--blue); color: #fff; border: none;
    padding: 14px 32px; border-radius: 10px; font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  }
  .lp-btn-hero:hover { background: var(--blue-hover); transform: translateY(-2px); }
  .lp-btn-hero-out {
    background: var(--white); color: var(--text); border: 1.5px solid var(--border);
    padding: 14px 32px; border-radius: 10px; font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  }
  .lp-btn-hero-out:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }

  /* SEARCH */
  .lp-search-wrap { max-width: 800px; margin: 48px auto 0; animation: fadeUp 0.5s 0.24s ease both; }
  .lp-search {
    display: flex; align-items: center; gap: 12px;
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: 12px; padding: 14px 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06); cursor: pointer;
  }
  .lp-search:hover { border-color: var(--blue); }
  .lp-search-icon { color: var(--muted); flex-shrink: 0; width: 18px; height: 18px; }
  .lp-search-text { flex: 1; font-size: 15px; color: var(--muted); text-align: left; }
  .lp-kbd-wrap { display: flex; gap: 4px; align-items: center; }
  .lp-kbd { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 3px 8px; font-size: 12px; font-weight: 700; color: var(--muted); }

  /* FEATURED */
  .lp-featured { max-width: 1100px; margin: 0 auto; padding: 48px 40px 0; }
  .lp-featured-card { display: grid; grid-template-columns: 1.8fr 1fr; border-radius: 16px; overflow: hidden; border: 1.5px solid var(--border); }
  .lp-feat-banner {
    background: var(--blue);
    padding: 36px; display: flex; flex-direction: column;
    justify-content: space-between; min-height: 260px; position: relative; overflow: hidden;
  }
  .lp-feat-banner::after {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 24px 24px; pointer-events: none;
  }
  .lp-feat-banner > * { position: relative; z-index: 1; }
  .lp-feat-banner-name { color: rgba(255,255,255,0.9); font-size: 18px; font-weight: 800; }
  .lp-feat-big { font-size: clamp(52px, 9vw, 96px); font-weight: 900; color: rgba(255,255,255,0.12); letter-spacing: -3px; line-height: 1; user-select: none; }
  .lp-feat-info { background: var(--white); padding: 32px; display: flex; flex-direction: column; justify-content: space-between; }
  .lp-feat-title { font-size: 26px; font-weight: 900; letter-spacing: -0.8px; margin-bottom: 10px; }
  .lp-feat-desc { color: var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
  .lp-track { padding: 10px 16px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center; margin-bottom: 8px; }

  /* STATS */
  .lp-stats { background: var(--bg); border-top: 1.5px solid var(--border); border-bottom: 1.5px solid var(--border); padding: 40px; margin-top: 48px; }
  .lp-stats-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px; }
  .lp-stat { text-align: center; }
  .lp-stat-num { font-size: 36px; font-weight: 900; letter-spacing: -1px; color: var(--blue); }
  .lp-stat-label { font-size: 13px; color: var(--muted); font-weight: 500; margin-top: 4px; }

  /* EVENTS SLIDER */
  .lp-events { max-width: 1100px; margin: 0 auto; padding: 64px 40px; }
  .lp-sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
  .lp-sec-title { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
  .lp-see-all {
    display: flex; align-items: center; gap: 6px;
    background: var(--bg); border: 1.5px solid var(--border); border-radius: 8px;
    padding: 9px 18px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--text); cursor: pointer; transition: all 0.15s;
  }
  .lp-see-all:hover { border-color: var(--blue); color: var(--blue); }
  .lp-slider-wrap { position: relative; }
  .lp-slider-track-outer { overflow: hidden; }
  .lp-slider-track { display: flex; gap: 24px; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); will-change: transform; }
  .lp-card {
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: 20px; padding: 36px 32px 28px;
    cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    display: flex; flex-direction: column;
    min-height: 520px; flex: 0 0 calc(50% - 12px);
  }
  .lp-card:hover { border-color: var(--blue); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(61,90,241,0.1); }
  .lp-card-title { font-size: 28px; font-weight: 900; letter-spacing: -1px; line-height: 1.15; margin-bottom: 14px; color: var(--text); }
  .lp-card-desc { color: var(--muted); font-size: 14px; line-height: 1.65; margin-bottom: 24px; flex: 1; }
  .lp-card-org { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
  .lp-card-org-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--blue-light); border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; color: var(--blue); flex-shrink: 0;
  }
  .lp-card-org-name { font-size: 13px; font-weight: 600; color: var(--muted); }
  .lp-card-metas { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
  .lp-card-meta { border-left: 3px solid var(--blue); padding-left: 12px; }
  .lp-card-meta-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); margin-bottom: 2px; }
  .lp-card-meta-val { font-size: 15px; font-weight: 700; color: var(--text); }
  .lp-card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .lp-tag { padding: 5px 14px; border-radius: 100px; border: 1.5px solid var(--border); background: var(--bg); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text); }
  .lp-countdown { background: var(--blue-light); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
  .lp-countdown-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); }
  .lp-countdown-val { font-size: 18px; font-weight: 900; color: var(--blue); letter-spacing: -0.5px; }
  .lp-apply { margin-top: auto; width: 100%; background: var(--blue); color: #fff; border: none; padding: 17px; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
  .lp-apply:hover { background: var(--blue-hover); }
  .lp-apply.out { background: var(--bg); color: var(--text); border: 1.5px solid var(--border); }
  .lp-apply.out:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .lp-slider-controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 28px; }
  .lp-slider-btn {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1.5px solid var(--border); background: var(--white);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s; flex-shrink: 0;
  }
  .lp-slider-btn:hover:not(:disabled) { border-color: var(--blue); background: var(--blue-light); }
  .lp-slider-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .lp-slider-dots { display: flex; gap: 8px; align-items: center; }
  .lp-slider-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: all 0.2s; cursor: pointer; border: none; padding: 0; }
  .lp-slider-dot.active { background: var(--blue); width: 24px; border-radius: 4px; }

  /* CLUBS */
  .lp-clubs { background: var(--bg); padding: 64px 0; }
  .lp-clubs-inner { max-width: 1100px; margin: 0 auto; padding: 0 40px; }
  .lp-club-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 28px; margin-bottom: 32px; }
  .lp-filter-btn {
    padding: 8px 20px; border-radius: 100px;
    border: 1.5px solid var(--border); background: var(--white);
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--muted); cursor: pointer; transition: all 0.15s;
  }
  .lp-filter-btn:hover { border-color: var(--blue); color: var(--blue); }
  .lp-filter-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; }
  .lp-clubs-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
  .lp-club-card {
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 0.2s;
    display: flex; flex-direction: column;
  }
  .lp-club-card:hover { border-color: var(--blue); transform: translateY(-3px); box-shadow: 0 8px 28px rgba(61,90,241,0.1); }

  /* Band with icon — no emoji */
  .lp-club-band {
    height: 120px; display: flex; align-items: center;
    padding: 0 28px; position: relative; overflow: hidden; gap: 20px;
  }
  .lp-club-band-pattern {
    position: absolute; inset: 0; opacity: 0.08;
    background-image: radial-gradient(circle, currentColor 1.5px, transparent 1.5px);
    background-size: 20px 20px;
  }
  /* Icon circle */
  .lp-club-icon-wrap {
    width: 56px; height: 56px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1; flex-shrink: 0;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(4px);
  }
  .lp-club-band-title {
    position: relative; z-index: 1;
    font-size: 20px; font-weight: 900; letter-spacing: -0.5px;
    line-height: 1.15;
  }

  .lp-club-body { padding: 20px 24px 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
  .lp-club-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .lp-club-meta-row { display: flex; align-items: center; gap: 20px; }
  .lp-club-meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); font-weight: 500; }
  .lp-club-meta-item svg { width: 14px; height: 14px; flex-shrink: 0; }
  .lp-club-meta-val { font-weight: 700; color: var(--text); }
  .lp-club-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
  .lp-club-cat { display: inline-flex; align-items: center; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; padding: 4px 12px; border-radius: 100px; }
  .lp-club-follow {
    font-size: 13px; font-weight: 700; color: var(--blue);
    background: var(--blue-light); border: none; border-radius: 8px;
    padding: 8px 18px; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s;
  }
  .lp-club-follow:hover { background: var(--blue); color: #fff; }
  .lp-club-follow.following { background: var(--bg); color: var(--muted); border: 1.5px solid var(--border); }
  .lp-club-follow.following:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }

  /* FOOTER */
  .lp-footer { background: var(--white); border-top: 1.5px solid var(--border); padding: 64px 40px 32px; }
  .lp-footer-inner { max-width: 1100px; margin: 0 auto; }
  .lp-footer-top { display: flex; gap: 80px; flex-wrap: wrap; margin-bottom: 48px; }
  .lp-footer-brand { flex: 1; min-width: 200px; }
  .lp-footer-tagline { font-size: 28px; font-weight: 900; letter-spacing: -1px; line-height: 1.2; margin-top: 16px; }
  .lp-footer-tagline .blue { color: var(--blue); }
  .lp-footer-links { display: flex; gap: 56px; flex-wrap: wrap; }
  .lp-footer-col h4 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-bottom: 14px; }
  .lp-footer-col a { display: block; color: var(--text); text-decoration: none; font-size: 14px; font-weight: 500; margin-bottom: 10px; transition: color 0.15s; }
  .lp-footer-col a:hover { color: var(--blue); }
  .lp-footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .lp-footer-copy { font-size: 13px; color: var(--muted); }
  .lp-footer-logo { font-size: 18px; font-weight: 900; color: var(--blue); }

  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  @media(max-width:900px){
    .lp-nav{padding:0 20px} .lp-nav-center{display:none}
    .lp-hero{padding:48px 20px}
    .lp-featured-card{grid-template-columns:1fr}
    .lp-card{flex:0 0 100%}
    .lp-clubs-grid{grid-template-columns:1fr}
    .lp-featured,.lp-events{padding-left:20px;padding-right:20px}
    .lp-clubs-inner{padding-left:20px;padding-right:20px}
    .lp-footer{padding:40px 20px 24px} .lp-footer-top{gap:32px}
  }
`

const events = [
  {
    id: 1, title: 'Hackathon 2025', club: 'Coding Club', initials: 'CC',
    desc: 'A 24-hour hackathon open to all students. Form a team, build something amazing, and compete for prizes across three tracks.',
    date: 'Mar 28 – Apr 2', venue: 'College Auditorium',
    countdown: '8d:14h:32m', tags: ['OFFLINE', 'OPEN'], apply: true,
  },
  {
    id: 2, title: 'Photography Walk', club: 'Photography Club', initials: 'PC',
    desc: 'Join us for a guided photography walk around campus followed by an editing workshop and photo contest.',
    date: 'Apr 5 – Apr 5', venue: 'Campus Grounds',
    countdown: '16d:08h:00m', tags: ['OFFLINE', 'OPEN'], apply: true,
  },
  {
    id: 3, title: 'Debate Night', club: 'Literary Club', initials: 'LC',
    desc: 'An evening of competitive debate on current affairs. Open to all students — solo or in pairs. Certificates for all participants.',
    date: 'Apr 10 – Apr 10', venue: 'Seminar Hall',
    countdown: null, tags: ['OFFLINE', 'OPEN'], apply: false,
  },
]

const clubs = [
  {
    name: 'Coding Club', cat: 'Technical', members: 120, events: 12,
    Icon: Code2, iconColor: '#1d4ed8',
    band: '#dbeafe', catColor: '#1d4ed8', catBg: '#eff6ff',
    desc: 'Build, hack, and innovate. We run workshops, hackathons, and coding contests throughout the year.',
  },
  {
    name: 'Photography Club', cat: 'Cultural', members: 85, events: 8,
    Icon: Camera, iconColor: '#92400e',
    band: '#fef9c3', catColor: '#92400e', catBg: '#fffbeb',
    desc: 'Explore the art of photography through campus walks, editing sessions, and monthly contests.',
  },
  {
    name: 'Robotics Club', cat: 'Technical', members: 60, events: 6,
    Icon: Bot, iconColor: '#166534',
    band: '#dcfce7', catColor: '#166534', catBg: '#f0fdf4',
    desc: 'Design, build, and program robots. Participate in inter-college competitions and tech expos.',
  },
  {
    name: 'Literary Club', cat: 'Cultural', members: 95, events: 10,
    Icon: BookOpen, iconColor: '#9d174d',
    band: '#fce7f3', catColor: '#9d174d', catBg: '#fdf2f8',
    desc: 'A space for readers, writers, and debaters. We host open mics, debates, and creative writing contests.',
  },
  {
    name: 'Sports Club', cat: 'Sports', members: 200, events: 15,
    Icon: Trophy, iconColor: '#991b1b',
    band: '#fee2e2', catColor: '#991b1b', catBg: '#fef2f2',
    desc: 'Representing the college in inter-college tournaments across cricket, football, basketball, and more.',
  },
  {
    name: 'Music Club', cat: 'Cultural', members: 70, events: 9,
    Icon: Music, iconColor: '#6b21a8',
    band: '#f3e8ff', catColor: '#6b21a8', catBg: '#faf5ff',
    desc: 'From classical to rock — perform, collaborate, and grow as a musician with fellow students.',
  },
]

const filters = ['All', 'Technical', 'Cultural', 'Sports']

export default function Landing() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('DISCOVER')
  const [slideIndex, setSlideIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const [following, setFollowing] = useState({})
  const maxSlide = events.length - 2

  const filteredClubs = activeFilter === 'All'
    ? clubs
    : clubs.filter(c => c.cat === activeFilter)

  const toggleFollow = (e, name) => {
    e.stopPropagation()
    setFollowing(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="lp">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="lp-nav">
        <a href="#" className="lp-logo">
          <div className="lp-logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Connect
        </a>
        <div className="lp-nav-center">
          {['DISCOVER','EVENTS','CLUBS'].map(t => (
            <button key={t} className={`lp-nav-tab${tab===t?' active':''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="lp-nav-right">
          <button className="lp-btn-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="lp-btn-blue" onClick={() => navigate('/register')}>Sign up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-badge">
          <div className="lp-hero-dot" /> Your college. One platform.
        </div>
        <h1 className="lp-hero-title">Every club. Every event.<br /><span className="blue">All connected.</span></h1>
        <p className="lp-hero-sub">The central hub for college life — discover clubs, register for events, form teams, and stay updated on everything happening on campus.</p>
        <div className="lp-hero-btns">
          <button className="lp-btn-hero" onClick={() => navigate('/register')}>Get started</button>
          <button className="lp-btn-hero-out" onClick={() => navigate('/login')}>Login to account</button>
        </div>
        <div className="lp-search-wrap">
          <div className="lp-search" onClick={() => navigate('/events')}>
            <svg className="lp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="lp-search-text">Search clubs, events, hackathons...</span>
            <div className="lp-kbd-wrap">
              <span className="lp-kbd">Ctrl</span>
              <span style={{fontSize:'12px',color:'var(--muted)'}}>+</span>
              <span className="lp-kbd">K</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <div className="lp-featured">
        <div className="lp-featured-card">
          <div className="lp-feat-banner">
            <div className="lp-feat-banner-name">connect</div>
            <div className="lp-feat-big">hackathon</div>
          </div>
          <div className="lp-feat-info">
            <div>
              <div className="lp-feat-title">Hackathon 2025</div>
              <div className="lp-feat-desc">Open to all students. Form a team, build something amazing in 24 hours, and compete for prizes across tracks.</div>
            </div>
            <div>
              <div className="lp-track">Web Dev Track</div>
              <div className="lp-track">AI / ML Track</div>
              <div className="lp-track">Open Innovation</div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="lp-stats">
        <div className="lp-stats-inner">
          {[{num:'20+',label:'Active clubs'},{num:'100+',label:'Events per year'},{num:'1000+',label:'Students'},{num:'3',label:'Roles supported'}].map((s,i)=>(
            <div className="lp-stat" key={i}>
              <div className="lp-stat-num">{s.num}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS SLIDER */}
      <div className="lp-events">
        <div className="lp-sec-header">
          <div className="lp-sec-title">Open events</div>
          <button className="lp-see-all" onClick={() => navigate('/events')}>All open events →</button>
        </div>
        <div className="lp-slider-wrap">
          <div className="lp-slider-track-outer">
            <div className="lp-slider-track" style={{ transform: `translateX(calc(-${slideIndex} * (50% + 12px)))` }}>
              {events.map(ev => (
                <div className="lp-card" key={ev.id} onClick={() => navigate(`/events/${ev.id}`)}>
                  <div className="lp-card-title">{ev.title}</div>
                  <div className="lp-card-desc">{ev.desc}</div>
                  <div className="lp-card-org">
                    <div className="lp-card-org-avatar">{ev.initials}</div>
                    <div className="lp-card-org-name">{ev.club}</div>
                  </div>
                  <div className="lp-card-metas">
                    <div className="lp-card-meta">
                      <div className="lp-card-meta-label">Runs from</div>
                      <div className="lp-card-meta-val">{ev.date}</div>
                    </div>
                    <div className="lp-card-meta">
                      <div className="lp-card-meta-label">Happening</div>
                      <div className="lp-card-meta-val">{ev.venue}</div>
                    </div>
                  </div>
                  <div className="lp-card-tags">
                    {ev.tags.map(t => <span className="lp-tag" key={t}>{t}</span>)}
                  </div>
                  {ev.countdown && (
                    <div className="lp-countdown">
                      <span className="lp-countdown-label">Applications close in</span>
                      <span className="lp-countdown-val">{ev.countdown}</span>
                    </div>
                  )}
                  <button className={`lp-apply${ev.apply ? '' : ' out'}`}>
                    {ev.apply ? 'Apply now' : 'Learn more'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-slider-controls">
            <button className="lp-slider-btn" onClick={() => setSlideIndex(i => Math.max(0, i-1))} disabled={slideIndex === 0}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="lp-slider-dots">
              {events.map((_, i) => (
                <button key={i} className={`lp-slider-dot${slideIndex === i ? ' active' : ''}`} onClick={() => setSlideIndex(Math.min(i, maxSlide))} />
              ))}
            </div>
            <button className="lp-slider-btn" onClick={() => setSlideIndex(i => Math.min(maxSlide, i+1))} disabled={slideIndex >= maxSlide}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* CLUBS */}
      <div className="lp-clubs">
        <div className="lp-clubs-inner">
          <div className="lp-sec-header">
            <div className="lp-sec-title">Explore clubs</div>
            <button className="lp-see-all" onClick={() => navigate('/clubs')}>All clubs →</button>
          </div>
          <div className="lp-club-filters">
            {filters.map(f => (
              <button key={f} className={`lp-filter-btn${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="lp-clubs-grid">
            {filteredClubs.map((c, i) => (
              <div className="lp-club-card" key={i} onClick={() => navigate('/clubs')}>
                {/* Band with Lucide icon + title */}
                <div className="lp-club-band" style={{ background: c.band, color: c.band }}>
                  <div className="lp-club-band-pattern" />
                  <div className="lp-club-icon-wrap">
                    <c.Icon size={28} color={c.iconColor} strokeWidth={2} />
                  </div>
                  <span className="lp-club-band-title" style={{ color: c.iconColor }}>{c.name}</span>
                </div>
                <div className="lp-club-body">
                  <div className="lp-club-desc">{c.desc}</div>
                  <div className="lp-club-meta-row">
                    <div className="lp-club-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <span className="lp-club-meta-val">{c.members}</span> members
                    </div>
                    <div className="lp-club-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span className="lp-club-meta-val">{c.events}</span> events/year
                    </div>
                  </div>
                  <div className="lp-club-footer">
                    <span className="lp-club-cat" style={{ color: c.catColor, background: c.catBg }}>{c.cat}</span>
                    <button
                      className={`lp-club-follow${following[c.name] ? ' following' : ''}`}
                      onClick={(e) => toggleFollow(e, c.name)}
                    >
                      {following[c.name] ? 'Following ✓' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div style={{fontSize:'20px',fontWeight:800,color:'var(--blue)'}}>Connect</div>
              <div className="lp-footer-tagline">
                We love <span className="blue">campus life</span><br />
                and the students<br />who build it.
              </div>
            </div>
            <div className="lp-footer-links">
              <div className="lp-footer-col">
                <h4>Community</h4>
                <a href="#">Explore clubs</a>
                <a href="#">Browse events</a>
                <a href="#">Form a team</a>
              </div>
              <div className="lp-footer-col">
                <h4>Platform</h4>
                <a href="#">For students</a>
                <a href="#">For organizers</a>
                <a href="#">For admins</a>
              </div>
              <div className="lp-footer-col">
                <h4>Support</h4>
                <a href="#">Guide</a>
                <a href="#">Contact us</a>
              </div>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <div className="lp-footer-logo">Connect</div>
            <div className="lp-footer-copy">Minor project · Built for college students</div>
          </div>
        </div>
      </footer>
    </div>
  )
}