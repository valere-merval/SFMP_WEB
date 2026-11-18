export type EventView = {
  id: string
  name: string
  city: string
  venue: string
  date: string
  status: string
  expectedAttendance: number
}

export type MobilityOptionView = {
  id: string
  mode: string
  duration: string
  price: string
  status: string
  highlight: string
}

export type BookingView = {
  id: string
  fanName: string
  eventName: string
  option: string
  status: string
  departureTime: string
}

export type MetricView = {
  id: string
  label: string
  value: string
  trend: string
}

export type OrganizationView = {
  id: string
  name: string
  type: string
  status: string
}

export type UserView = {
  id: string
  fullName: string
  role: string
  organization: string
  status: string
}

export type AuditView = {
  id: string
  action: string
  actor: string
  resource: string
  at: string
}

export type IntegrationView = {
  id: string
  name: string
  status: string
  endpoint: string
}

export type RoadmapView = {
  version: string
  title: string
  features: string[]
}

export type HeatmapView = {
  zone: string
  intensity: string
  trend: string
  recommendation: string
}

export type DemandPeakView = {
  window: string
  level: string
  action: string
}

export type RouteAdaptationView = {
  corridor: string
  change: string
  reason: string
}

export type ContextualMessageView = {
  audience: string
  channel: string
  message: string
  timing: string
}

export const fanEvents: EventView[] = [
  {
    id: 'evt_madrid_final',
    name: 'UEFA Champions League Final',
    city: 'Madrid',
    venue: 'Estadio Metropolitano',
    date: '2027-05-29',
    status: 'Sales Open',
    expectedAttendance: 68200,
  },
  {
    id: 'evt_training_day',
    name: 'Fan Mobility Dry Run',
    city: 'Madrid',
    venue: 'Estadio Metropolitano',
    date: '2027-05-27',
    status: 'Planning',
    expectedAttendance: 1200,
  },
  {
    id: 'evt_city_experience',
    name: 'Fan City Experience',
    city: 'Madrid',
    venue: 'Plaza de Oriente',
    date: '2027-05-28',
    status: 'Published',
    expectedAttendance: 5400,
  },
]

export const mobilityOptions: MobilityOptionView[] = [
  {
    id: 'mob_metro',
    mode: 'Metro',
    duration: '18 min',
    price: '€2.10',
    status: 'Recommended',
    highlight: 'Fastest for peak flow',
  },
  {
    id: 'mob_shuttle',
    mode: 'Official Shuttle',
    duration: '25 min',
    price: '€8.00',
    status: 'Live',
    highlight: 'Best for group transfers',
  },
  {
    id: 'mob_taxi',
    mode: 'Taxi / Ride-hailing',
    duration: '22 min',
    price: '€24-35',
    status: 'Available',
    highlight: 'Door-to-door convenience',
  },
  {
    id: 'mob_walk',
    mode: 'Walking',
    duration: '34 min',
    price: 'Free',
    status: 'Available',
    highlight: 'Good for nearby hotels',
  },
]

export const bookings: BookingView[] = [
  {
    id: 'bkg_1001',
    fanName: 'Amina Diallo',
    eventName: 'UEFA Champions League Final',
    option: 'Official Shuttle',
    status: 'Confirmed',
    departureTime: '18:10',
  },
  {
    id: 'bkg_1002',
    fanName: 'Jonas Weber',
    eventName: 'UEFA Champions League Final',
    option: 'Metro + Walk',
    status: 'Pending',
    departureTime: '18:25',
  },
  {
    id: 'bkg_1003',
    fanName: 'Sara Ahmed',
    eventName: 'Fan City Experience',
    option: 'Taxi',
    status: 'Cancelled',
    departureTime: '17:40',
  },
]

export const operationsMetrics: MetricView[] = [
  { id: 'ops_live', label: 'Live vehicles', value: '124', trend: '+6' },
  { id: 'ops_bookings', label: 'Bookings processed', value: '3,842', trend: '+11%' },
  { id: 'ops_incidents', label: 'Open incidents', value: '2', trend: '-1' },
  { id: 'ops_eta', label: 'Average ETA', value: '19 min', trend: '-3 min' },
]

export const operationsForecasts: MetricView[] = [
  { id: 'pred_1', label: 'Metro load at 18:30', value: '91%', trend: 'High' },
  { id: 'pred_2', label: 'Airport shuttle demand', value: '1,820 riders', trend: 'Medium' },
  { id: 'pred_3', label: 'Post-match departure burst', value: '18 min spike', trend: 'High' },
]

export const organizations: OrganizationView[] = [
  { id: 'org_uefa', name: 'UEFA', type: 'Competition owner', status: 'Active' },
  { id: 'org_atleti', name: 'Atlético de Madrid', type: 'Club', status: 'Active' },
  { id: 'org_metro', name: 'Metro de Madrid', type: 'Transport operator', status: 'Pilot' },
]

export const users: UserView[] = [
  { id: 'usr_admin', fullName: 'Valeria Gomez', role: 'Platform Admin', organization: 'SFMP', status: 'Active' },
  { id: 'usr_ops', fullName: 'Hassan Karim', role: 'Operations Lead', organization: 'Metro de Madrid', status: 'Active' },
  { id: 'usr_fan', fullName: 'Alicia Perez', role: 'Fan', organization: 'UEFA', status: 'Invited' },
]

export const auditEntries: AuditView[] = [
  { id: 'aud_1', action: 'UPDATED_BOOKING', actor: 'ops-admin', resource: 'booking:bkg_1001', at: '2027-05-29T16:45:00Z' },
  { id: 'aud_2', action: 'CREATED_EVENT', actor: 'platform-admin', resource: 'event:evt_madrid_final', at: '2027-02-12T10:00:00Z' },
  { id: 'aud_3', action: 'PUBLISHED_NOTIFICATION', actor: 'system', resource: 'notification:ntf_2', at: '2027-05-29T18:05:00Z' },
]

export const integrations: IntegrationView[] = [
  { id: 'int_kafka', name: 'Kafka', status: 'Connected', endpoint: 'kafka://local-cluster' },
  { id: 'int_minio', name: 'MinIO', status: 'Connected', endpoint: 'http://minio:9000' },
  { id: 'int_postgres', name: 'PostgreSQL', status: 'Connected', endpoint: 'jdbc:postgresql://db:5432/sfmp' },
]

export const roadmap: RoadmapView[] = [
  {
    version: 'Version 1',
    title: 'MVP',
    features: ['Gestion des événements', 'Découverte des événements', 'Planification des déplacements', 'Carte interactive', 'Réservation de transport démonstrative', 'Dashboard opérationnel', 'Collecte d\'analytics', 'Première démonstration prédictive'],
  },
  {
    version: 'Version 2',
    title: 'Pilot Platform',
    features: ['Intégration des partenaires de transport', 'Gestion des chauffeurs et véhicules', 'Tracking GPS avec consentement', 'Notifications intelligentes', 'Intégration des données de trafic', 'Prévisions de demande', 'Gestion avancée des zones'],
  },
  {
    version: 'Version 3',
    title: 'Intelligent Mobility',
    features: ['Machine Learning pour les prévisions', 'Heatmaps de mobilité', 'Détection des pics de demande', 'Optimisation des points de ramassage', 'Adaptation des itinéraires', 'Communications contextuelles', 'Analytics avancées'],
  },
]

export const heatmaps: HeatmapView[] = [
  { zone: 'Gate 12', intensity: 'Critical', trend: 'Rising', recommendation: 'Open additional corridor' },
  { zone: 'Gate 14', intensity: 'High', trend: 'Stable', recommendation: 'Keep extra staff deployed' },
  { zone: 'Metro Plaza', intensity: 'Medium', trend: 'Falling', recommendation: 'Maintain current routing' },
]

export const demandPeaks: DemandPeakView[] = [
  { window: '18:00-18:45', level: 'High', action: 'Pre-position shuttles' },
  { window: '20:55-21:40', level: 'Critical', action: 'Activate overflow lanes' },
  { window: '22:15-22:45', level: 'Medium', action: 'Open return-trip wave' },
]

export const routeAdaptations: RouteAdaptationView[] = [
  { corridor: 'Airport Corridor', change: 'Reroute via Ring Road', reason: 'Traffic slowdown detected' },
  { corridor: 'North Zone', change: 'Shorten shuttle loop', reason: 'Demand concentrated at gates' },
  { corridor: 'Fan Village', change: 'Add walking guidance', reason: 'Pedestrian flow is under capacity' },
]

export const contextualMessages: ContextualMessageView[] = [
  { audience: 'Fans near Gate 12', channel: 'Push', message: 'Use Gate 14 for faster entry.', timing: 'Now' },
  { audience: 'Late arrivals', channel: 'SMS', message: 'Your shuttle departs in 12 minutes.', timing: 'T-12m' },
  { audience: 'Drivers', channel: 'In-app', message: 'Switch to adaptive route A due to traffic.', timing: 'Live' },
]

export const fanHighlights = [
  'Real-time journey planning',
  'Booking orchestration',
  'Stadium-focused mobility guidance',
]
