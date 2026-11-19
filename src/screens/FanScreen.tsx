import { Card, MapFrame, MiniCard, Metric } from '../components/ui';
import { googleMapsDirectionsUrl, googleMapsEmbedUrl, googleMapsSearchUrl } from '../lib/maps';
import type { CatalogData } from '../types';

export function FanScreen({ catalog }: { catalog: CatalogData }) {
  const venue = `${catalog.events[0].venue}, ${catalog.events[0].city}`;

  return (
    <section className="section-grid">
      <Card title="Transit direct lines" subtitle="Matchday routing" wide>
        <div className="grid-2">
          {catalog.mobilityOptions.map((item) => (
            <MiniCard key={item.id} title={item.mode} subtitle={item.highlight} meta={`${item.duration} · ${item.price}`} />
          ))}
        </div>
      </Card>

      <Card title="Perimeter live telemetry" subtitle="Operations feed">
        <div className="metric-grid">
          {catalog.operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Stadium perimeter gates" subtitle="Wayfinding" wide>
        <MapFrame
          title="Gate 34 · East Hub"
          subtitle="Walk 3 min from the fan zone. Queue time: 8 min."
          src={googleMapsEmbedUrl(venue)}
          ctaHref={googleMapsDirectionsUrl(venue, 'Madrid city center')}
        />
      </Card>

      <Card title="Matchday essentials" subtitle="Quick access">
        <div className="grid-3">
          <a className="map-link" href={googleMapsSearchUrl('locker P3 near ' + venue)} target="_blank" rel="noreferrer">Locker P3</a>
          <a className="map-link" href={googleMapsSearchUrl('parking P4 near ' + venue)} target="_blank" rel="noreferrer">Parking P4</a>
          <a className="map-link" href={googleMapsSearchUrl('fan zone near ' + venue)} target="_blank" rel="noreferrer">Fan Zones</a>
        </div>
      </Card>
    </section>
  );
}
