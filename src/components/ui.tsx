import './ui.css';

export function Card({ title, subtitle, children, wide = false }: { title: string; subtitle: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <article className={wide ? 'card wide' : 'card'}>
      <div className="card-head">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h3>{title}</h3>
        </div>
      </div>
      {children}
    </article>
  );
}

export function MiniCard({ title, subtitle, meta }: { title: string; subtitle: string; meta: string }) {
  return (
    <div className="mini-card">
      <strong>{title}</strong>
      <span>{subtitle}</span>
      <em>{meta}</em>
    </div>
  );
}

export function Row({ leftTitle, leftSubtitle, rightTitle, rightSubtitle }: { leftTitle: string; leftSubtitle: string; rightTitle: string; rightSubtitle: string }) {
  return (
    <div className="row">
      <div className="row-left">
        <strong>{leftTitle}</strong>
        <p>{leftSubtitle}</p>
      </div>
      <div className="row-right">
        <strong>{rightTitle}</strong>
        <p>{rightSubtitle}</p>
      </div>
    </div>
  );
}

export function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{trend}</em>
    </div>
  );
}

export function Pill({ children, subtle = false }: { children: React.ReactNode; subtle?: boolean }) {
  return <span className={subtle ? 'pill subtle' : 'pill'}>{children}</span>;
}
