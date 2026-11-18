import { useState } from 'react';
import { login } from '../lib/api';
import { Card, Pill } from '../components/ui';

export function AuthScreen({ onContinue }: { onContinue: () => void }) {
  const [username, setUsername] = useState('fan@sfmp.local');
  const [password, setPassword] = useState('fan123');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setError(null);
      await login(username, password);
      onContinue();
    } catch {
      setError('Invalid credentials. Try fan@sfmp.local / fan123, ops@sfmp.local / ops123, or admin@sfmp.local / admin123.');
    }
  };

  return (
    <div className="app-shell auth-shell">
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
          <label className="auth-label">
            Username
            <input className="auth-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="fan@sfmp.local" />
          </label>
          <label className="auth-label">
            Password
            <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="fan123" />
          </label>
          {error ? <p className="auth-error">{error}</p> : null}
          <div className="cta-row"><button className="primary" onClick={submit}>Sign in</button><button className="secondary" onClick={onContinue}>Guest mode</button></div>
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
