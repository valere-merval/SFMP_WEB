import { Pill } from '../components/ui';
import type { EventView } from '../types';

export function Topbar({
  hero,
  onTab,
  onLogout,
  tab,
}: {
  hero: EventView | null;
  tab: 'fan' | 'operations' | 'admin';
  onTab: (tab: 'fan' | 'operations' | 'admin') => void;
  onLogout: () => void;
}) {
  const heroStatus = hero?.status ?? 'Loading';
  const heroName = hero?.name ?? 'Live catalog loading';
  const heroVenue = hero ? `${hero.venue}, ${hero.city}` : 'Waiting for backend data';
  const heroAttendance = hero?.expectedAttendance?.toLocaleString('en-US') ?? '—';
  const heroDate = hero?.date ?? '—';

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">SMART FAN MOBILITY</p>
          <h1>Smart fan mobility for matchday travel</h1>
          <p className="lead">Premium mobile fan journeys, operations command and administration with a single live backend catalog.</p>
        </div>
        <div className="hero-card">
          <div className="hero-topline">
            <Pill>{heroStatus}</Pill>
            <Pill subtle>LIVE</Pill>
            <button className="logout-pill" type="button" onClick={onLogout} aria-label="Logout">
              Logout
            </button>
          </div>
          <h2>{heroName}</h2>
          <p>{heroVenue}</p>
          <div className="stats-grid">
            <div><strong>{heroAttendance}</strong><span>fans expected</span></div>
            <div><strong>{heroDate}</strong><span>event date</span></div>
            <div><strong>Gate 34</strong><span>east hub</span></div>
          </div>
          <div className="cta-row">
            <button className="primary" type="button">Plan my journey</button>
            <button className="secondary" type="button">View event details</button>
          </div>
        </div>
      </header>
      <nav className="nav-bar" aria-label="Product views">
        <button className={tab === 'fan' ? 'nav-item active' : 'nav-item'} onClick={() => onTab('fan')}>Fan mobile</button>
        <button className={tab === 'operations' ? 'nav-item active' : 'nav-item'} onClick={() => onTab('operations')}>Operations</button>
        <button className={tab === 'admin' ? 'nav-item active' : 'nav-item'} onClick={() => onTab('admin')}>Admin</button>
      </nav>
    </>
  );
}
