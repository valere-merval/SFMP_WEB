import { useEffect, useState } from 'react';
import './App.css';
import { getJson } from './lib/api';
import {
  auditEntries,
  bookings,
  fanEvents,
  integrations,
  mobilityOptions,
  organizations,
  operationsForecasts,
  operationsMetrics,
  users,
} from './data/demo';
import type { LiveData } from './types';
import { AdminScreen } from './screens/AdminScreen';
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
};

function App() {
  const [view, setView] = useState<View>('fan');
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [events, options, book, ops, adminOrgs, adminSummary, adminUsers, audit, integrationsRemote] = await Promise.all([
        getJson('/api/v1/events', fanEvents),
        getJson('/api/v1/mobility/options', mobilityOptions),
        getJson('/api/v1/bookings', bookings),
        getJson('/api/v1/operations/summary', operationsMetrics),
        getJson('/api/v1/admin/organizations', organizations),
        getJson('/api/v1/admin/summary', operationsMetrics),
        getJson('/api/v1/identity/users', users),
        getJson('/api/v1/audit/entries', auditEntries),
        getJson('/api/v1/integration/status', integrations),
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
      });
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const hero = data.events[0];

  return (
    <div className="app-shell">
      <Topbar hero={hero} tab={view} onTab={setView} />
      {view === 'fan' && <FanScreen data={data} />}
      {view === 'operations' && <OperationsScreen data={data} />}
      {view === 'admin' && <AdminScreen data={data} />}
    </div>
  );
}

export default App;
