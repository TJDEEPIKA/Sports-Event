import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return <header className="site-header"><div className="nav-wrap">
    <Link to="/" className="brand"><span className="brand-mark">S<span>✦</span></span><span className="brand-copy"><b>STATE GAMES</b><small>CHAMPIONSHIP 2026</small></span></Link>
    <nav aria-label="Main navigation"><NavLink to="/">Home</NavLink><NavLink to="/events">Events</NavLink><Link to="/#eligibility">Eligibility</Link><span className="participant-chip nav-participant"><span className="participant-avatar">DJ</span><span><b>Deepika J</b><small>IT · NEC</small></span></span><NavLink to="/register?new=1" className="nav-register">Register <span>↗</span></NavLink></nav>
  </div></header>;
}
