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
const HelloPoint1 = lazy(() => import(
  /* webpackChunkName: "p_HelloPoint1" */
  'components/pages/HelloPoint1'
));
const ClearCanvas = lazy(() => import(
  /* webpackChunkName: "p_ClearCanvas" */
  'components/pages/ClearCanvas'
));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/clear-canvas">
          <Suspense fallback={<LoadingIndicator />}>
            <ClearCanvas />
          </Suspense>
        </Route>
        <Route path="/hello-point-1">
          <Suspense fallback={<LoadingIndicator />}>
            <HelloPoint1 />
          </Suspense>
        </Route>
        <Route path="/">
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>WebGL</h1>
            <Link to="/hello-point-1" className={styles.card}>
              Hello Point (1)
            </Link>
            <Link to="/clear-canvas" className={styles.card}>
              Clear canvas
            </Link>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
