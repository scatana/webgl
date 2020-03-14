import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import styles from './App.css';

// Pull common components into the main chunk
import LoadingIndicator from 'components/common/LoadingIndicator';
import GLCanvas from 'components/common/GLCanvas';

// Pages
const ClearCanvas = lazy(() => import(
  /* webpackChunkName: "p_ClearCanvas" */ 'components/pages/ClearCanvas'));
const HelloPoint1 = lazy(() => import(
  /* webpackChunkName: "p_HelloPoint1" */ 'components/pages/HelloPoint1'));

const routes = [
  {
    url: '/hello-point-1',
    title: 'Hello Point (1)',
    page: <HelloPoint1 />
  },
  {
    url: '/clear-canvas',
    title: 'Clear canvas',
    page: <ClearCanvas />
  }
];

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route path={route.url} key={index}>
            <Suspense fallback={<LoadingIndicator />}>
              {route.page}
            </Suspense>
          </Route>
        ))}
        <Route path="/">
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>WebGL</h1>
            {routes.map((route, index) => (
              <Link to={route.url} className={styles.card} key={index}>
                {route.title}
              </Link>
            ))}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
