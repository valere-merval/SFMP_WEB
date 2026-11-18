import type { AuditView, BookingView, EventView, IntegrationView, MetricView, MobilityOptionView, OrganizationView, UserView } from './data/demo';

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
};
