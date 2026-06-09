import React from 'react';
import { LangProvider } from './i18n.jsx';
import { Header, Footer } from './shell.jsx';
import { MobileNav } from './MobileNav.jsx';
import { HomePage } from './pages/Home.jsx';
import { ResultsPage } from './pages/Results.jsx';
import { RouteBuilderPage } from './pages/RouteBuilder.jsx';
import { AccountPage } from './pages/Account.jsx';
import { ExplorePage } from './pages/Explore.jsx';
import { AuthPage } from './pages/Auth.jsx';

/**
 * Router: hash-based — #home, #results, #route, #account, #explore, #auth.
 *
 * Note: there is no booking/payment screen in this app — THY Route does not
 * sell tickets. The results page links out to thy.com for purchase, and the
 * "build my route" CTA continues to the Route Builder.
 */
function App() {
  const [route, setRoute] = React.useState('home');
  const [search, setSearch] = React.useState(null);
  const [routeCtx, setRouteCtx] = React.useState(null);

  React.useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace(/^#/, '') || 'home';
      setRoute(h);
    };
    window.addEventListener('hashchange', apply);
    // Co-pilot deep link: ?route=FIREBASE_ID → open Route Builder (it reads the param itself)
    const params = new URLSearchParams(window.location.search);
    if (params.get('route') && !window.location.hash) {
      window.location.hash = 'route';
    }
    apply();
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const go = (to, data) => {
    if (to === 'results') setSearch(data);
    if (to === 'route')   setRouteCtx(data);
    window.location.hash = to;
    setRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSearch = (s) => go('results', s);
  const transparentHeader = route === 'home';

  return (
    <LangProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header route={route} go={go} transparent={transparentHeader} />
        <main style={{ flex: 1 }}>
          {route === 'home'    && <HomePage  go={go} onSearch={onSearch} />}
          {route === 'results' && <ResultsPage go={go} search={search} />}
          {route === 'route'   && <RouteBuilderPage go={go} summary={routeCtx} />}
          {route === 'account' && <AccountPage go={go} />}
          {route === 'explore' && <ExplorePage go={go} />}
          {route === 'auth'    && <AuthPage    go={go} />}
        </main>
        {route !== 'auth' && <Footer go={go} />}
        {route !== 'auth' && <MobileNav route={route} go={go} />}
      </div>
    </LangProvider>
  );
}

export default App;
