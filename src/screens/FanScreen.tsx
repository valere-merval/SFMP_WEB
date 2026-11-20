import { Card, MapFrame, MiniCard, Metric } from '../components/ui';
import { googleMapsDirectionsUrl, googleMapsEmbedUrl, googleMapsSearchUrl } from '../lib/maps';
import type { CatalogData } from '../types';

export function FanScreen({ catalog }: { catalog: CatalogData }) {
  const events = catalog.events ?? [];
  const mobilityOptions = catalog.mobilityOptions ?? [];
  const operationsMetrics = catalog.operationsMetrics ?? [];
  const transportProviders = catalog.transportProviders ?? [];
  const firstEvent = events[0] ?? null;
  const venue = firstEvent ? `${firstEvent.venue}, ${firstEvent.city}` : 'Estadio Metropolitano, Madrid';

  return (
    <section className="section-grid">
      <Card title="Match information" subtitle="Hub preview" wide>
        {firstEvent ? (
          <div className="hero-card fan-match-hero">
            <div className="hero-topline">
              <span className="tag lime">KICKOFF LIVE</span>
              <span className="tag">Gate 34</span>
              <span className="tag">Sector 212</span>
            </div>
            <div className="match-title-row">
              <strong className="match-team-line">{firstEvent.name}</strong>
              <span className="match-status-pill">Open</span>
            </div>
            <div className="match-stats-grid">
              <div>
                <strong>KICKOFF</strong>
                <span>{firstEvent.date}</span>
              </div>
              <div>
                <strong>WEATHER</strong>
                <span>22°C Clear</span>
              </div>
              <div>
                <strong>ACCESS</strong>
                <span>Live gate routing</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-card">
            <strong>No event selected yet</strong>
            <p>Create an event and match in the admin area to unlock live wayfinding.</p>
          </div>
        )}
      </Card>

      <Card title="Transit direct lines" subtitle="Matchday routing" wide>
        <div className="grid-2 transit-grid">
          {mobilityOptions.map((item) => (
            <MiniCard key={item.id} title={item.mode} subtitle={item.highlight} meta={`${item.duration} · ${item.price}`} />
          ))}
        </div>
      </Card>

      <Card title="Registered operators" subtitle="Taxi and VTC" wide>
        {transportProviders.length ? (
          <div className="grid-2 provider-grid">
            {transportProviders.map((provider) => (
              <div key={provider.id} className="mini-card provider-card">
                <strong>{provider.displayName}</strong>
                <span>{provider.providerType} · {provider.zone}</span>
                <em>{provider.vehicleLabel}</em>
                <small>{provider.matchTitle || 'Match registration active'}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-card">
            <strong>No operators published yet</strong>
            <p>Taxi and VTC providers will appear here once they register for the selected match.</p>
          </div>
        )}
      </Card>

      <Card title="Perimeter live telemetry" subtitle="Operations feed">
        <div className="metric-grid">
          {operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Stadium perimeter gates" subtitle="Wayfinding" wide>
        {firstEvent ? (
          <MapFrame
            title="Gate 34 · East Hub"
            subtitle="Walk 3 min from the fan zone. Queue time: 8 min."
            src={googleMapsEmbedUrl(venue)}
            ctaHref={googleMapsDirectionsUrl(venue, 'Madrid city center')}
          />
        ) : (
          <div className="empty-card">
            <strong>No event selected yet</strong>
            <p>Create an event and match in the admin area to unlock live wayfinding.</p>
          </div>
        )}
      </Card>

      <Card title="Matchday essentials" subtitle="Quick access">
        {firstEvent ? (
          <div className="grid-3">
            <a className="map-link" href={googleMapsSearchUrl('locker P3 near ' + venue)} target="_blank" rel="noreferrer">Locker P3</a>
            <a className="map-link" href={googleMapsSearchUrl('parking P4 near ' + venue)} target="_blank" rel="noreferrer">Parking P4</a>
            <a className="map-link" href={googleMapsSearchUrl('fan zone near ' + venue)} target="_blank" rel="noreferrer">Fan Zones</a>
          </div>
        ) : (
          <div className="empty-card">
            <strong>No match essentials yet</strong>
            <p>Once the admin creates an event and a match, live venue shortcuts will appear here.</p>
          </div>
        )}
      </Card>
    </section>
  );
}
