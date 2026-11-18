import { Pill } from '../components/ui';
import type { EventView } from '../data/demo';

export function Topbar({ hero, onTab, tab }: { hero: EventView; tab: 'fan' | 'operations' | 'admin'; onTab: (tab: 'fan' | 'operations' | 'admin') => void }) {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">SMART FAN MOBILITY</p>
          <h1>Smart fan mobility for matchday travel</h1>
          <p className="lead">Premium mobile fan journeys, operations command and administration with the Stitch visual system.</p>
        </div>
        <div className="hero-card">
          <div className="hero-topline"><Pill>{hero.status}</Pill><Pill subtle>LIVE</Pill></div>
          <h2>{hero.name}</h2>
          <p>{hero.venue}, {hero.city}</p>
          <div className="stats-grid">
            <div><strong>{hero.expectedAttendance.toLocaleString('en-US')}</strong><span>fans expected</span></div>
            <div><strong>{hero.date}</strong><span>event date</span></div>
            <div><strong>Gate 34</strong><span>east hub</span></div>
          </div>
          <div className="cta-row">
            <button className="primary">Plan my journey</button>
            <button className="secondary">View event details</button>
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
