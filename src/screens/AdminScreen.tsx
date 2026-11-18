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
