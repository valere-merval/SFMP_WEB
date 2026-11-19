import { useState, type FormEvent } from 'react';
import { Card, Metric, Row } from '../components/ui';
import { postJson } from '../lib/api';
import type { CatalogData } from '../types';

const emptyCatalogForm = {
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  sport: '',
  country: '',
  badge: '',
  eventCount: 0,
};

const emptyMatchForm = {
  id: '',
  catalogId: '',
  homeTeam: '',
  awayTeam: '',
  homeFlag: '',
  awayFlag: '',
  city: '',
  country: '',
  venue: '',
  stage: '',
  date: '',
  time: '',
  status: '',
  gate: '',
  sector: '',
  countdown: '',
  weather: '',
  temperature: '',
  transitSummary: '',
  ticketPrice: '',
  imageUrl: '',
};

export function AdminScreen({ catalog, onRefresh }: { catalog: CatalogData; onRefresh: () => void }) {
  const operationsForecasts = catalog.operationsForecasts ?? [];
  const roadmap = catalog.roadmap ?? [];
  const heatmaps = catalog.heatmaps ?? [];
  const contextualMessages = catalog.contextualMessages ?? [];
  const traffic = catalog.traffic ?? [];
  const consents = catalog.consents ?? [];
  const insights = catalog.insights ?? [];
  const organizations = catalog.organizations ?? [];
  const users = catalog.users ?? [];
  const auditEntries = catalog.auditEntries ?? [];

  const [catalogForm, setCatalogForm] = useState(emptyCatalogForm);
  const [matchForm, setMatchForm] = useState(emptyMatchForm);
  const [savingCatalog, setSavingCatalog] = useState(false);
  const [savingMatch, setSavingMatch] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitCatalog = async (event: FormEvent) => {
    event.preventDefault();
    setSavingCatalog(true);
    setMessage(null);
    try {
      await postJson('/api/v1/event-catalogs', {
        ...catalogForm,
        eventCount: Number(catalogForm.eventCount) || 0,
      });
      setCatalogForm(emptyCatalogForm);
      setMessage('Event catalog created.');
      onRefresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create event catalog.');
    } finally {
      setSavingCatalog(false);
    }
  };

  const submitMatch = async (event: FormEvent) => {
    event.preventDefault();
    setSavingMatch(true);
    setMessage(null);
    try {
      await postJson('/api/v1/matches', {
        ...matchForm,
        catalogId: matchForm.catalogId || '',
      });
      setMatchForm((current) => ({ ...emptyMatchForm, catalogId: current.catalogId || '' }));
      setMessage('Match created with flag images.');
      onRefresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create match.');
    } finally {
      setSavingMatch(false);
    }
  };

  return (
    <section className="section-grid">
      <Card title="Platform summary" subtitle="Administration">
        <div className="metric-grid">
          {operationsForecasts.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Create event catalog" subtitle="Admin form" wide>
        <form className="list-stack" onSubmit={submitCatalog}>
          <div className="form-grid">
            <label className="auth-label">
              Catalog ID
              <input className="auth-input" value={catalogForm.id} onChange={(e) => setCatalogForm({ ...catalogForm, id: e.target.value })} placeholder="champions-league" required />
            </label>
            <label className="auth-label">
              Title
              <input className="auth-input" value={catalogForm.title} onChange={(e) => setCatalogForm({ ...catalogForm, title: e.target.value })} placeholder="Champions League" required />
            </label>
            <label className="auth-label wide-field">
              Description
              <input className="auth-input" value={catalogForm.description} onChange={(e) => setCatalogForm({ ...catalogForm, description: e.target.value })} placeholder="Premium matchday event catalogue" required />
            </label>
            <label className="auth-label">
              Image URL
              <input className="auth-input" value={catalogForm.imageUrl} onChange={(e) => setCatalogForm({ ...catalogForm, imageUrl: e.target.value })} placeholder="https://..." required />
            </label>
            <label className="auth-label">
              Sport
              <input className="auth-input" value={catalogForm.sport} onChange={(e) => setCatalogForm({ ...catalogForm, sport: e.target.value })} placeholder="Football" required />
            </label>
            <label className="auth-label">
              Country
              <input className="auth-input" value={catalogForm.country} onChange={(e) => setCatalogForm({ ...catalogForm, country: e.target.value })} placeholder="Spain" required />
            </label>
            <label className="auth-label">
              Badge
              <input className="auth-input" value={catalogForm.badge} onChange={(e) => setCatalogForm({ ...catalogForm, badge: e.target.value })} placeholder="EUROPE" required />
            </label>
            <label className="auth-label">
              Event count
              <input className="auth-input" type="number" min="0" value={catalogForm.eventCount} onChange={(e) => setCatalogForm({ ...catalogForm, eventCount: Number(e.target.value) })} required />
            </label>
          </div>
          <div className="cta-row">
            <button className="primary-button" type="submit" disabled={savingCatalog}>{savingCatalog ? 'Saving...' : 'Create catalog'}</button>
          </div>
        </form>
      </Card>

      <Card title="Create match" subtitle="Admin form" wide>
        <form className="list-stack" onSubmit={submitMatch}>
          <div className="form-grid">
            <label className="auth-label">
              Match ID
              <input className="auth-input" value={matchForm.id} onChange={(e) => setMatchForm({ ...matchForm, id: e.target.value })} placeholder="ucl-final-2025" required />
            </label>
            <label className="auth-label">
              Catalog ID
              <input className="auth-input" value={matchForm.catalogId} onChange={(e) => setMatchForm({ ...matchForm, catalogId: e.target.value })} placeholder="champions-league" required />
            </label>
            <label className="auth-label">
              Home team
              <input className="auth-input" value={matchForm.homeTeam} onChange={(e) => setMatchForm({ ...matchForm, homeTeam: e.target.value })} placeholder="Real Madrid" required />
            </label>
            <label className="auth-label">
              Away team
              <input className="auth-input" value={matchForm.awayTeam} onChange={(e) => setMatchForm({ ...matchForm, awayTeam: e.target.value })} placeholder="Manchester City" required />
            </label>
            <label className="auth-label">
              Home flag image
              <input className="auth-input" value={matchForm.homeFlag} onChange={(e) => setMatchForm({ ...matchForm, homeFlag: e.target.value })} placeholder="https://.../flag-home.png" required />
            </label>
            <label className="auth-label">
              Away flag image
              <input className="auth-input" value={matchForm.awayFlag} onChange={(e) => setMatchForm({ ...matchForm, awayFlag: e.target.value })} placeholder="https://.../flag-away.png" required />
            </label>
            <label className="auth-label">
              City
              <input className="auth-input" value={matchForm.city} onChange={(e) => setMatchForm({ ...matchForm, city: e.target.value })} placeholder="Madrid" required />
            </label>
            <label className="auth-label">
              Country
              <input className="auth-input" value={matchForm.country} onChange={(e) => setMatchForm({ ...matchForm, country: e.target.value })} placeholder="Spain" required />
            </label>
            <label className="auth-label wide-field">
              Venue
              <input className="auth-input" value={matchForm.venue} onChange={(e) => setMatchForm({ ...matchForm, venue: e.target.value })} placeholder="Estadio Metropolitano" required />
            </label>
            <label className="auth-label">
              Stage
              <input className="auth-input" value={matchForm.stage} onChange={(e) => setMatchForm({ ...matchForm, stage: e.target.value })} placeholder="Final" required />
            </label>
            <label className="auth-label">
              Date
              <input className="auth-input" value={matchForm.date} onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })} placeholder="2025-06-01" required />
            </label>
            <label className="auth-label">
              Time
              <input className="auth-input" value={matchForm.time} onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })} placeholder="21:00" required />
            </label>
            <label className="auth-label">
              Status
              <input className="auth-input" value={matchForm.status} onChange={(e) => setMatchForm({ ...matchForm, status: e.target.value })} placeholder="Live" required />
            </label>
            <label className="auth-label">
              Gate
              <input className="auth-input" value={matchForm.gate} onChange={(e) => setMatchForm({ ...matchForm, gate: e.target.value })} placeholder="Gate 34" required />
            </label>
            <label className="auth-label">
              Sector
              <input className="auth-input" value={matchForm.sector} onChange={(e) => setMatchForm({ ...matchForm, sector: e.target.value })} placeholder="Sector 212" required />
            </label>
            <label className="auth-label">
              Countdown
              <input className="auth-input" value={matchForm.countdown} onChange={(e) => setMatchForm({ ...matchForm, countdown: e.target.value })} placeholder="02:42:30" required />
            </label>
            <label className="auth-label">
              Weather
              <input className="auth-input" value={matchForm.weather} onChange={(e) => setMatchForm({ ...matchForm, weather: e.target.value })} placeholder="Clear" required />
            </label>
            <label className="auth-label">
              Temperature
              <input className="auth-input" value={matchForm.temperature} onChange={(e) => setMatchForm({ ...matchForm, temperature: e.target.value })} placeholder="22°C" required />
            </label>
            <label className="auth-label wide-field">
              Transit summary
              <input className="auth-input" value={matchForm.transitSummary} onChange={(e) => setMatchForm({ ...matchForm, transitSummary: e.target.value })} placeholder="Metro, shuttle, taxi and walk guidance" required />
            </label>
            <label className="auth-label">
              Ticket price
              <input className="auth-input" value={matchForm.ticketPrice} onChange={(e) => setMatchForm({ ...matchForm, ticketPrice: e.target.value })} placeholder="€95" required />
            </label>
            <label className="auth-label wide-field">
              Match image URL
              <input className="auth-input" value={matchForm.imageUrl} onChange={(e) => setMatchForm({ ...matchForm, imageUrl: e.target.value })} placeholder="https://.../match.png" required />
            </label>
          </div>
          <div className="cta-row">
            <button className="primary-button" type="submit" disabled={savingMatch}>{savingMatch ? 'Saving...' : 'Create match'}</button>
          </div>
        </form>
      </Card>

      <Card title="Delivery roadmap" subtitle="Version plan" wide>
        <div className="list-stack">
          {roadmap.map((item) => (
            <Row key={item.version} leftTitle={`${item.version} · ${item.title}`} leftSubtitle={item.features.join(' • ')} rightTitle={item.features.length.toString()} rightSubtitle="Features" />
          ))}
        </div>
      </Card>

      <Card title="Mobility analytics" subtitle="Command view">
        <div className="list-stack">
          {heatmaps.map((item) => (
            <Row key={item.zone} leftTitle={item.zone} leftSubtitle={`${item.intensity} · ${item.trend}`} rightTitle={item.recommendation} rightSubtitle="Heatmap" />
          ))}
        </div>
      </Card>

      <Card title="Contextual alerts" subtitle="Communication">
        <div className="list-stack">
          {contextualMessages.map((item) => (
            <Row key={item.message} leftTitle={item.audience} leftSubtitle={`${item.channel} · ${item.timing}`} rightTitle={item.message} rightSubtitle="Message" />
          ))}
        </div>
      </Card>

      <Card title="Traffic and consent" subtitle="Live operations">
        <div className="list-stack">
          {traffic.map((item) => (
            <Row key={item.corridor} leftTitle={item.corridor} leftSubtitle={`${item.status} · ${item.impact}`} rightTitle={item.recommendation} rightSubtitle="Traffic" />
          ))}
          {consents.map((item) => (
            <Row key={item.source} leftTitle={item.source} leftSubtitle={item.lastUpdated} rightTitle={item.status} rightSubtitle="Consent" />
          ))}
        </div>
      </Card>

      <Card title="ML insights" subtitle="Intelligent mobility">
        <div className="list-stack">
          {insights.map((item) => (
            <Row key={item.model} leftTitle={`${item.model} · ${item.confidence}`} leftSubtitle={item.insight} rightTitle={item.action} rightSubtitle="AI" />
          ))}
        </div>
      </Card>

      <Card title="Organizations" subtitle="Tenants and operators">
        <div className="list-stack">
          {organizations.map((item) => (
            <Row key={item.id} leftTitle={item.name} leftSubtitle={item.type} rightTitle={item.status} rightSubtitle="Org" />
          ))}
        </div>
      </Card>

      <Card title="Users and permissions" subtitle="Identity">
        <div className="list-stack">
          {users.map((item) => (
            <Row key={item.id} leftTitle={item.fullName} leftSubtitle={`${item.role} · ${item.organization}`} rightTitle={item.status} rightSubtitle="User" />
          ))}
        </div>
      </Card>

      <Card title="Audit log" subtitle="Traceability">
        <div className="list-stack">
          {auditEntries.map((item) => (
            <Row key={item.id} leftTitle={item.action} leftSubtitle={`${item.actor} · ${item.resource}`} rightTitle="Recorded" rightSubtitle="Audit" />
          ))}
        </div>
      </Card>

      {message ? <Card title="Status" subtitle="Recent action"><div className="empty-card"><strong>{message}</strong></div></Card> : null}
    </section>
  );
}
