import { Card, MapFrame, Metric, Row } from '../components/ui';
import { googleMapsDirectionsUrl, googleMapsEmbedUrl } from '../lib/maps';
import type { LiveData } from '../types';

export function OperationsScreen({ data }: { data: LiveData }) {
  const network = 'Madrid, Spain';
  return (
    <section className="section-grid operations-grid">
      <Card title="Live mobility map" subtitle="Operations center" wide>
        <MapFrame
          title="Madrid live network"
          subtitle="Demand heatmaps, active vehicles and transport corridors."
          src={googleMapsEmbedUrl(network)}
          ctaHref={googleMapsDirectionsUrl(network, 'Madrid city center')}
        />
      </Card>

      <Card title="Key metrics" subtitle="Command view">
        <div className="metric-grid">
          {data.operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Traffic conditions" subtitle="Version 2">
        <div className="list-stack">
          {data.traffic.map((item) => (
            <Row key={item.corridor} leftTitle={item.corridor} leftSubtitle={`${item.status} · ${item.impact}`} rightTitle={item.recommendation} rightSubtitle="Traffic" />
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

      <Card title="GPS consent status" subtitle="Data privacy">
        <div className="list-stack">
          {data.consents.map((item) => (
            <Row key={item.source} leftTitle={item.source} leftSubtitle={item.lastUpdated} rightTitle={item.status} rightSubtitle="Consent" />
          ))}
        </div>
      </Card>

      <Card title="ML insights" subtitle="Intelligent mobility">
        <div className="list-stack">
          {data.insights.map((item) => (
            <Row key={item.model} leftTitle={`${item.model} · ${item.confidence}`} leftSubtitle={item.insight} rightTitle={item.action} rightSubtitle="AI" />
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
