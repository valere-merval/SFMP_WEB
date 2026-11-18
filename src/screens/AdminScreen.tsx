import { Card, Metric, Row } from '../components/ui';
import type { LiveData } from '../types';

export function AdminScreen({ data }: { data: LiveData }) {
  return (
    <section className="section-grid">
      <Card title="Platform summary" subtitle="Administration">
        <div className="metric-grid">
          {data.operationsForecasts.map((item) => (
            <Metric key={item.id} label={item.label} value={item.value} trend={item.trend} />
          ))}
        </div>
      </Card>

      <Card title="Delivery roadmap" subtitle="Version plan" wide>
        <div className="list-stack">
          {data.roadmap.map((item) => (
            <Row key={item.version} leftTitle={`${item.version} · ${item.title}`} leftSubtitle={item.features.join(' • ')} rightTitle={item.features.length.toString()} rightSubtitle="Features" />
          ))}
        </div>
      </Card>

      <Card title="Advanced mobility analytics" subtitle="Version 3">
        <div className="list-stack">
          {data.heatmaps.map((item) => (
            <Row key={item.zone} leftTitle={item.zone} leftSubtitle={`${item.intensity} · ${item.trend}`} rightTitle={item.recommendation} rightSubtitle="Heatmap" />
          ))}
        </div>
      </Card>

      <Card title="Contextual alerts" subtitle="Communication">
        <div className="list-stack">
          {data.contextualMessages.map((item) => (
            <Row key={item.message} leftTitle={item.audience} leftSubtitle={`${item.channel} · ${item.timing}`} rightTitle={item.message} rightSubtitle="Message" />
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
