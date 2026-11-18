import { Card, MiniCard, Metric } from '../components/ui';
import type { LiveData } from '../types';

export function FanScreen({ data }: { data: LiveData }) {
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
        <div className="metric-grid">
          {data.operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Stadium perimeter gates" subtitle="Wayfinding" wide>
        <div className="map-panel">
          <div className="map-overlay"><strong>Gate 34 · East Hub</strong><p>Walk 3 min from the fan zone. Queue time: 8 min.</p></div>
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
