import { useEffect, useState } from 'react';
import './App.css';
import { getJson } from './lib/api';
import {
  auditEntries,
  bookings,
  contextualMessages,
  consents,
  demandPeaks,
  fanEvents,
  heatmaps,
  insights,
  integrations,
  mobilityOptions,
  organizations,
  operationsForecasts,
  operationsMetrics,
  roadmap,
  routeAdaptations,
  traffic,
  users,
} from './data/demo';
import type { LiveData } from './types';
import { AdminScreen } from './screens/AdminScreen';
import { AuthScreen } from './screens/AuthScreen';
import { FanScreen } from './screens/FanScreen';
import { OperationsScreen } from './screens/OperationsScreen';
import { Topbar } from './screens/Topbar';

type View = 'fan' | 'operations' | 'admin';

const initialData: LiveData = {
  events: fanEvents,
  mobilityOptions,
  bookings,
  operationsMetrics,
  operationsForecasts,
  organizations,
  users,
  auditEntries,
  integrations,
  roadmap,
  heatmaps,
  demandPeaks,
  routeAdaptations,
  contextualMessages,
  traffic,
  consents,
  insights,
};

function App() {
  const [view, setView] = useState<View>('fan');
  const [signedIn, setSignedIn] = useState(() => Boolean(localStorage.getItem('sfmp_token')));
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [events, options, book, ops, adminOrgs, adminSummary, adminUsers, audit, integrationsRemote, roadmapRemote, heatmapsRemote, peaksRemote, routesRemote, contextualRemote, trafficRemote, consentsRemote, insightsRemote] = await Promise.all([
        getJson('/api/v1/events', fanEvents),
        getJson('/api/v1/mobility/options', mobilityOptions),
        getJson('/api/v1/bookings', bookings),
        getJson('/api/v1/operations/summary', operationsMetrics),
        getJson('/api/v1/admin/organizations', organizations),
        getJson('/api/v1/admin/summary', operationsMetrics),
        getJson('/api/v1/identity/users', users),
        getJson('/api/v1/audit/entries', auditEntries),
        getJson('/api/v1/integration/status', integrations),
        getJson('/api/v1/platform/roadmap', roadmap),
        getJson('/api/v1/crowd/heatmaps', heatmaps),
        getJson('/api/v1/crowd/peaks', demandPeaks),
        getJson('/api/v1/mobility/routes', routeAdaptations),
        getJson('/api/v1/notifications/contextual', contextualMessages),
        getJson('/api/v1/traffic/conditions', traffic),
        getJson('/api/v1/gps/consents', consents),
        getJson('/api/v1/intelligence/insights', insights),
      ]);
      if (cancelled) return;
      setData({
        events,
        mobilityOptions: options,
        bookings: book,
        operationsMetrics: ops,
        operationsForecasts: adminSummary,
        organizations: adminOrgs,
        users: adminUsers,
        auditEntries: audit,
        integrations: integrationsRemote,
        roadmap: roadmapRemote,
        heatmaps: heatmapsRemote,
        demandPeaks: peaksRemote,
        routeAdaptations: routesRemote,
        contextualMessages: contextualRemote,
        traffic: trafficRemote,
        consents: consentsRemote,
        insights: insightsRemote,
      });
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const hero = data.events[0];

  return signedIn ? (
    <div className="app-shell">
      <Topbar hero={hero} tab={view} onTab={setView} />
      {view === 'fan' && <FanScreen data={data} />}
      {view === 'operations' && <OperationsScreen data={data} />}
      {view === 'admin' && <AdminScreen data={data} />}
    </div>
  ) : (
    <AuthScreen onContinue={() => setSignedIn(true)} />
  );
}

export default App;
