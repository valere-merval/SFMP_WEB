import { useEffect, useState } from 'react';
import './App.css';
import { getJson } from './lib/api';
import {
  auditEntries,
  bookings,
  fanEvents,
  integrations,
  mobilityOptions,
  organizations,
  operationsForecasts,
  operationsMetrics,
  type AuditView,
  type BookingView,
  type EventView,
  type IntegrationView,
  type MetricView,
  type MobilityOptionView,
  type OrganizationView,
  type UserView,
  users,
} from './data/demo';

type View = 'fan' | 'operations' | 'admin';

type LiveData = {
  events: EventView[];
  mobilityOptions: MobilityOptionView[];
  bookings: BookingView[];
  operationsMetrics: MetricView[];
  operationsForecasts: MetricView[];
  organizations: OrganizationView[];
  users: UserView[];
  auditEntries: AuditView[];
  integrations: IntegrationView[];
};

const initialData: LiveData = {
  events: fanEvents,
  mobilityOptions,
  bookings,
  operationsMetrics,
  operationsForecasts,
  organizations,
  users,
  auditEntries,
  integrations,
};

function App() {
  const [view, setView] = useState<View>('fan');
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [events, options, book, ops, adminOrgs, adminSummary, adminUsers, audit, integrationsRemote] = await Promise.all([
        getJson('/api/v1/events', fanEvents),
        getJson('/api/v1/mobility/options', mobilityOptions),
        getJson('/api/v1/bookings', bookings),
        getJson('/api/v1/operations/summary', operationsMetrics),
        getJson('/api/v1/admin/organizations', organizations),
        getJson('/api/v1/admin/summary', operationsMetrics),
        getJson('/api/v1/identity/users', users),
        getJson('/api/v1/audit/entries', auditEntries),
        getJson('/api/v1/integration/status', integrations),
      ]);
      if (cancelled) return;
      setData({
        events,
        mobilityOptions: options,
        bookings: book,
        operationsMetrics: ops,
        operationsForecasts: adminSummary,
        organizations: adminOrgs,
        users: adminUsers,
        auditEntries: audit,
        integrations: integrationsRemote,
      });
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeNav = (item: View) => (view === item ? 'nav-item active' : 'nav-item');
  const hero = data.events[0];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">SMART FAN MOBILITY</p>
          <h1>Smart fan mobility for matchday travel</h1>
          <p className="lead">
            Premium mobile fan journeys, operations command and administration with the Stitch visual system.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-topline">
            <span className="pill">{hero.status}</span>
            <span className="pill subtle">LIVE</span>
          </div>
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
        <button className={activeNav('fan')} onClick={() => setView('fan')}>Fan mobile</button>
        <button className={activeNav('operations')} onClick={() => setView('operations')}>Operations</button>
        <button className={activeNav('admin')} onClick={() => setView('admin')}>Admin</button>
      </nav>

      {view === 'fan' && <FanView data={data} />}
      {view === 'operations' && <OperationsView data={data} />}
      {view === 'admin' && <AdminView data={data} />}
    </div>
  );
}

function FanView({ data }: { data: LiveData }) {
  return (
    <section className="section-grid">
      <Card title="Transit direct lines" subtitle="Matchday routing" wide>
        <div className="grid-2">
          {data.mobilityOptions.map((item) => (
            <MiniCard key={item.id} title={item.mode} subtitle={item.highlight} meta={`${item.duration} · ${item.price}`} />
          ))}
        </div>
      </Card>

      <Card title="Perimeter live telemetry" subtitle="Operations feed">
        <div className="list-stack">
          {operationsMetrics.map((item) => (
            <Row key={item.id} leftTitle={item.label} leftSubtitle={item.trend} rightTitle={item.value} rightSubtitle="Live" />
          ))}
        </div>
      </Card>

      <Card title="Stadium perimeter gates" subtitle="Wayfinding" wide>
        <div className="map-panel">
          <div className="map-overlay">
            <strong>Gate 34 · East Hub</strong>
            <p>Walk 3 min from the fan zone. Queue time: 8 min.</p>
          </div>
        </div>
      </Card>

      <Card title="Matchday essentials" subtitle="Quick access">
        <div className="grid-3">
          <MiniCard title="Locker P3" subtitle="Reserved" meta="12 min" />
          <MiniCard title="Parking P4" subtitle="Open" meta="8 min" />
          <MiniCard title="Fan Zones" subtitle="Live" meta="6 min" />
        </div>
      </Card>
    </section>
  );
}

function OperationsView({ data }: { data: LiveData }) {
  return (
    <section className="section-grid operations-grid">
      <Card title="Live mobility map" subtitle="Operations center" wide>
        <div className="map-panel dark-map">
          <div className="map-overlay dark">
            <strong>Madrid live network</strong>
            <p>Demand heatmaps, active vehicles and transport corridors.</p>
          </div>
        </div>
      </Card>

      <Card title="Key metrics" subtitle="Command view">
        <div className="metric-grid">
          {data.operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Demand predictions" subtitle="Forecasting">
        <div className="list-stack">
          {data.operationsForecasts.map((item) => (
            <Row key={item.id} leftTitle={item.label} leftSubtitle={item.trend} rightTitle={item.value} rightSubtitle="Forecast" />
          ))}
        </div>
      </Card>

      <Card title="Active providers" subtitle="Transport partners">
        <div className="list-stack">
          {data.integrations.map((item) => (
            <Row key={item.id} leftTitle={item.name} leftSubtitle={item.endpoint} rightTitle={item.status} rightSubtitle="Integration" />
          ))}
        </div>
      </Card>
    </section>
  );
}

function AdminView({ data }: { data: LiveData }) {
  return (
    <section className="section-grid">
      <Card title="Platform summary" subtitle="Administration">
        <div className="metric-grid">
          {data.operationsForecasts.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Organizations" subtitle="Tenants and operators">
        <div className="list-stack">
          {data.organizations.map((item) => (
            <Row key={item.id} leftTitle={item.name} leftSubtitle={item.type} rightTitle={item.status} rightSubtitle="Org" />
          ))}
        </div>
      </Card>

      <Card title="Users and permissions" subtitle="Identity">
        <div className="list-stack">
          {data.users.map((item) => (
            <Row key={item.id} leftTitle={item.fullName} leftSubtitle={`${item.role} · ${item.organization}`} rightTitle={item.status} rightSubtitle="User" />
          ))}
        </div>
      </Card>

      <Card title="Audit log" subtitle="Traceability">
        <div className="list-stack">
          {data.auditEntries.map((item) => (
            <Row key={item.id} leftTitle={item.action} leftSubtitle={`${item.actor} · ${item.resource}`} rightTitle="Recorded" rightSubtitle="Audit" />
          ))}
        </div>
      </Card>
    </section>
  );
}

function Card({ title, subtitle, children, wide = false }: { title: string; subtitle: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <article className={wide ? 'card wide' : 'card'}>
      <div className="card-head">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h3>{title}</h3>
        </div>
      </div>
      {children}
    </article>
  );
}

function MiniCard({ title, subtitle, meta }: { title: string; subtitle: string; meta: string }) {
  return (
    <div className="mini-card">
      <strong>{title}</strong>
      <span>{subtitle}</span>
      <em>{meta}</em>
    </div>
  );
}

function Row({ leftTitle, leftSubtitle, rightTitle, rightSubtitle }: { leftTitle: string; leftSubtitle: string; rightTitle: string; rightSubtitle: string }) {
  return (
    <div className="row">
      <div className="row-left">
        <strong>{leftTitle}</strong>
        <p>{leftSubtitle}</p>
      </div>
      <div className="row-right">
        <strong>{rightTitle}</strong>
        <p>{rightSubtitle}</p>
      </div>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{trend}</em>
    </div>
  );
}

export default App;
