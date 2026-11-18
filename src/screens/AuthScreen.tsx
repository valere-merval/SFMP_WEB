import { Card, Pill } from '../components/ui';

export function AuthScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">SMART FAN MOBILITY</p>
          <h1>Sign in to matchday mobility</h1>
          <p className="lead">Use your fan account, operator account or admin account to access the right journey.</p>
        </div>
        <div className="hero-card auth-hero">
          <div className="hero-topline"><Pill>Secure access</Pill><Pill subtle>LIVE</Pill></div>
          <h2>Continue into the platform</h2>
          <p>A real auth provider can plug into this screen later.</p>
          <div className="cta-row"><button className="primary" onClick={onContinue}>Continue</button><button className="secondary" onClick={onContinue}>Use guest mode</button></div>
        </div>
      </header>
      <section className="section-grid">
        <Card title="What you get" subtitle="Overview" wide>
          <div className="list-stack">
            {['Journey planning', 'Wayfinding maps', 'Ticket and transit pass', 'Operations visibility'].map((item) => (
              <div key={item} className="bullet-row"><span className="dot" /><p>{item}</p></div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
