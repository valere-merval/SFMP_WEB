import type { AuditView, BookingView, ConsentView, ContextualMessageView, DemandPeakView, EventView, HeatmapView, InsightView, IntegrationView, MetricView, MobilityOptionView, OrganizationView, RoadmapView, RouteAdaptationView, TrafficView, UserView } from './data/demo';

export type LiveData = {
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
