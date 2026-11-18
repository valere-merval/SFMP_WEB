import { Card, Metric, Row } from '../components/ui';
import type { LiveData } from '../types';

export function OperationsScreen({ data }: { data: LiveData }) {
  return (
    <section className="section-grid operations-grid">
      <Card title="Live mobility map" subtitle="Operations center" wide>
        <div className="map-panel dark-map">
          <div className="map-overlay dark"><strong>Madrid live network</strong><p>Demand heatmaps, active vehicles and transport corridors.</p></div>
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
