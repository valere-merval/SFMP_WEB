export type EventView = {
  id: string;
  name: string;
  city: string;
  venue: string;
  date: string;
  status: string;
  expectedAttendance: number;
};

export type MobilityOptionView = {
  id: string;
  mode: string;
  duration: string;
  price: string;
  status: string;
  highlight: string;
};

export type BookingView = {
  id: string;
  fanName: string;
  eventName: string;
  option: string;
  status: string;
  departureTime: string;
};

export type MetricView = {
  id: string;
  label: string;
  value: string;
  trend: string;
};

export type OrganizationView = {
  id: string;
  name: string;
  type: string;
  status: string;
};

export type UserView = {
  id: string;
  fullName: string;
  role: string;
  organization: string;
  status: string;
};

export type AuditView = {
  id: string;
  action: string;
  actor: string;
  resource: string;
  at: string;
};

export type IntegrationView = {
  id: string;
  name: string;
  status: string;
  endpoint: string;
};

export type RoadmapView = {
  version: string;
  title: string;
  features: string[];
};

export type HeatmapView = {
  zone: string;
  intensity: string;
  trend: string;
  recommendation: string;
};

export type DemandPeakView = {
  window: string;
  level: string;
  action: string;
};

export type RouteAdaptationView = {
  corridor: string;
  change: string;
  reason: string;
};

export type ContextualMessageView = {
  audience: string;
  channel: string;
  message: string;
  timing: string;
};

export type TrafficView = {
  corridor: string;
  status: string;
  impact: string;
  recommendation: string;
};

export type ConsentView = {
  source: string;
  status: string;
  lastUpdated: string;
};

export type InsightView = {
  model: string;
  confidence: string;
  insight: string;
  action: string;
};

export type CatalogData = {
  events: EventView[];
  mobilityOptions: MobilityOptionView[];
  bookings: BookingView[];
  operationsMetrics: MetricView[];
  operationsForecasts: MetricView[];
  organizations: OrganizationView[];
  users: UserView[];
  auditEntries: AuditView[];
  integrations: IntegrationView[];
  roadmap: RoadmapView[];
  heatmaps: HeatmapView[];
  demandPeaks: DemandPeakView[];
  routeAdaptations: RouteAdaptationView[];
  contextualMessages: ContextualMessageView[];
  traffic: TrafficView[];
  consents: ConsentView[];
  insights: InsightView[];
};
