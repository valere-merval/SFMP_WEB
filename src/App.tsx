import { useEffect, useState } from 'react';
import './App.css';
import { Card, Row } from './components/ui';
import { getJson } from './lib/api';
import { AdminScreen } from './screens/AdminScreen';
import { AuthScreen } from './screens/AuthScreen';
import { FanScreen } from './screens/FanScreen';
import { OperationsScreen } from './screens/OperationsScreen';
import { Topbar } from './screens/Topbar';
import type { CatalogData } from './types';

type View = 'fan' | 'operations' | 'admin';
type LoadState = 'loading' | 'ready' | 'error';

function App() {
  const [view, setView] = useState<View>('fan');
  const [signedIn, setSignedIn] = useState(() => Boolean(localStorage.getItem('sfmp_token')));
  const [data, setData] = useState<CatalogData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    if (!signedIn) {
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoadState('loading');
      setError(null);

      try {
        const catalog = await getJson<CatalogData>('/api/v1/catalog');
        if (!catalog.events?.length) {
          throw new Error('Catalog response missing events');
        }
        if (cancelled) return;
        setData(catalog);
        setLoadState('ready');
      } catch (err) {
        if (cancelled) return;
        setData(null);
        setLoadState('error');
        setError(err instanceof Error ? err.message : 'Unable to load live backend data.');
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [reloadTick, signedIn]);

  if (!signedIn) {
    return <AuthScreen onContinue={() => setSignedIn(true)} />;
  }

  const hero = data?.events[0] ?? null;
  const content = (() => {
    if (loadState === 'loading') {
      return (
        <section className="section-grid">
          <Card title="Syncing live catalog" subtitle="Backend data" wide>
            <div className="list-stack">
              <Row
                leftTitle="Fetching /api/v1/catalog"
                leftSubtitle="Waiting on the backend to return events, mobility, operations, admin and analytics data."
                rightTitle="Loading"
                rightSubtitle="Live"
              />
              <Row
                leftTitle="No local fixtures"
                leftSubtitle="The UI is intentionally empty until the backend responds."
                rightTitle="Ready to render"
                rightSubtitle="Polished"
              />
            </div>
          </Card>
        </section>
      );
    }

    if (loadState === 'error' || !data) {
      return (
        <section className="section-grid">
          <Card title="Backend unavailable" subtitle="Live data only" wide>
            <div className="list-stack">
              <Row
                leftTitle="Catalog request failed"
                leftSubtitle={error ?? 'The live catalog endpoint did not return data.'}
                rightTitle="Retry"
                rightSubtitle="API"
              />
            </div>
            <div className="cta-row">
              <button className="primary" type="button" onClick={() => setReloadTick((value) => value + 1)}>
                Retry catalog fetch
              </button>
            </div>
          </Card>
        </section>
      );
    }

    if (view === 'fan') return <FanScreen catalog={data} />;
    if (view === 'operations') return <OperationsScreen catalog={data} />;
    return <AdminScreen catalog={data} />;
  })();

  return (
    <div className="app-shell">
      <Topbar hero={hero} tab={view} onTab={setView} />
      {content}
    </div>
  );
}

export default App;
