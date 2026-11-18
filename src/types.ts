import type { AuditView, BookingView, ContextualMessageView, DemandPeakView, EventView, HeatmapView, IntegrationView, MetricView, MobilityOptionView, OrganizationView, RoadmapView, RouteAdaptationView, UserView } from './data/demo';

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
};
