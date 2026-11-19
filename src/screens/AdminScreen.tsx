import { Card, Metric, Row } from '../components/ui';
import type { CatalogData } from '../types';

export function AdminScreen({ catalog }: { catalog: CatalogData }) {
  return (
    <section className="section-grid">
      <Card title="Platform summary" subtitle="Administration">
        <div className="metric-grid">
          {catalog.operationsForecasts.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Delivery roadmap" subtitle="Version plan" wide>
        <div className="list-stack">
          {catalog.roadmap.map((item) => (
            <Row key={item.version} leftTitle={`${item.version} · ${item.title}`} leftSubtitle={item.features.join(' • ')} rightTitle={item.features.length.toString()} rightSubtitle="Features" />
          ))}
        </div>
      </Card>

      <Card title="Mobility analytics" subtitle="Command view">
        <div className="list-stack">
          {catalog.heatmaps.map((item) => (
            <Row key={item.zone} leftTitle={item.zone} leftSubtitle={`${item.intensity} · ${item.trend}`} rightTitle={item.recommendation} rightSubtitle="Heatmap" />
          ))}
        </div>
      </Card>

      <Card title="Contextual alerts" subtitle="Communication">
        <div className="list-stack">
          {catalog.contextualMessages.map((item) => (
            <Row key={item.message} leftTitle={item.audience} leftSubtitle={`${item.channel} · ${item.timing}`} rightTitle={item.message} rightSubtitle="Message" />
          ))}
        </div>
      </Card>

      <Card title="Traffic and consent" subtitle="Live operations">
        <div className="list-stack">
          {catalog.traffic.map((item) => (
            <Row key={item.corridor} leftTitle={item.corridor} leftSubtitle={`${item.status} · ${item.impact}`} rightTitle={item.recommendation} rightSubtitle="Traffic" />
          ))}
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

      <Card title="Organizations" subtitle="Tenants and operators">
        <div className="list-stack">
          {catalog.organizations.map((item) => (
            <Row key={item.id} leftTitle={item.name} leftSubtitle={item.type} rightTitle={item.status} rightSubtitle="Org" />
          ))}
        </div>
      </Card>

      <Card title="Users and permissions" subtitle="Identity">
        <div className="list-stack">
          {catalog.users.map((item) => (
            <Row key={item.id} leftTitle={item.fullName} leftSubtitle={`${item.role} · ${item.organization}`} rightTitle={item.status} rightSubtitle="User" />
          ))}
        </div>
      </Card>

      <Card title="Audit log" subtitle="Traceability">
        <div className="list-stack">
          {catalog.auditEntries.map((item) => (
            <Row key={item.id} leftTitle={item.action} leftSubtitle={`${item.actor} · ${item.resource}`} rightTitle="Recorded" rightSubtitle="Audit" />
          ))}
        </div>
      </Card>
    </section>
  );
}
