import { useState } from 'react';
import { Card, MapFrame, Metric, Row } from '../components/ui';
import { postJson } from '../lib/api';
import { googleMapsDirectionsUrl, googleMapsEmbedUrl } from '../lib/maps';
import type { CatalogData } from '../types';

export function OperationsScreen({ catalog }: { catalog: CatalogData }) {
  const network = 'Madrid, Spain';
  const [briefing, setBriefing] = useState<{ model: string; summary: string; confidence: string; recommendations: string[] } | null>(null);
  const [briefingError, setBriefingError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateBriefing = async () => {
    setLoading(true);
    setBriefingError(null);

    try {
      const result = await postJson<{ model: string; summary: string; confidence: string; recommendations: string[] }>('/api/v1/intelligence/analyze', {
        focus: 'matchday demand and routing',
        context: 'Madrid stadium operations, traffic, gates, and post-match departures',
      });
      setBriefing(result);
    } catch (error) {
      setBriefing(null);
      setBriefingError(error instanceof Error ? error.message : 'AI briefing is unavailable from the backend.');
    } finally {
      setLoading(false);
    }
  };

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
          {catalog.operationsMetrics.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Traffic conditions" subtitle="Live feed">
        <div className="list-stack">
          {catalog.traffic.map((item) => (
            <Row key={item.corridor} leftTitle={item.corridor} leftSubtitle={`${item.status} · ${item.impact}`} rightTitle={item.recommendation} rightSubtitle="Traffic" />
          ))}
        </div>
      </Card>

      <Card title="AI briefing" subtitle="Backend analysis">
        <div className="list-stack">
          {briefing ? (
            <>
              <Row leftTitle={`${briefing.model} · ${briefing.confidence}`} leftSubtitle={briefing.summary} rightTitle="Live" rightSubtitle="AI" />
              {briefing.recommendations.map((item) => (
                <Row key={item} leftTitle={item} leftSubtitle="Recommendation" rightTitle="Action" rightSubtitle="AI" />
              ))}
            </>
          ) : briefingError ? (
            <Row leftTitle="Briefing unavailable" leftSubtitle={briefingError} rightTitle="Check backend" rightSubtitle="AI" />
          ) : (
            <Row leftTitle="Generate an AI briefing" leftSubtitle="This request goes directly to the backend analysis endpoint." rightTitle={loading ? 'Running...' : 'Ready'} rightSubtitle="AI" />
          )}
        </div>
        <div className="cta-row">
          <button className="primary-button" type="button" onClick={generateBriefing} disabled={loading}>{loading ? 'Analyzing...' : 'Generate AI briefing'}</button>
        </div>
      </Card>

      <Card title="Demand predictions" subtitle="Forecasting">
        <div className="list-stack">
          {catalog.operationsForecasts.map((item) => (
            <Row key={item.id} leftTitle={item.label} leftSubtitle={item.trend} rightTitle={item.value} rightSubtitle="Forecast" />
          ))}
        </div>
      </Card>

      <Card title="GPS consent status" subtitle="Data privacy">
        <div className="list-stack">
          {catalog.consents.map((item) => (
            <Row key={item.source} leftTitle={item.source} leftSubtitle={item.lastUpdated} rightTitle={item.status} rightSubtitle="Consent" />
          ))}
        </div>
      </Card>

      <Card title="ML insights" subtitle="Intelligent mobility">
        <div className="list-stack">
          {catalog.insights.map((item) => (
            <Row key={item.model} leftTitle={`${item.model} · ${item.confidence}`} leftSubtitle={item.insight} rightTitle={item.action} rightSubtitle="AI" />
          ))}
        </div>
      </Card>

      <Card title="Active providers" subtitle="Transport partners">
        <div className="list-stack">
          {catalog.integrations.map((item) => (
            <Row key={item.id} leftTitle={item.name} leftSubtitle={item.endpoint} rightTitle={item.status} rightSubtitle="Integration" />
          ))}
        </div>
      </Card>
    </section>
  );
}
