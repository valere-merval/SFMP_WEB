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

export const fanHighlights = [
  'Real-time journey planning',
  'Booking orchestration',
  'Stadium-focused mobility guidance',
]
