import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Pull common components into the main chunk
import LoadingIndicator from 'components/common/LoadingIndicator';
import GLCanvas from 'components/common/GLCanvas';

// Pages
const HelloPoint1 = lazy(() => import(
  /* webpackChunkName: "HelloPoint1" */
  'components/pages/HelloPoint1'
));
const ClearCanvas = lazy(() => import(
  /* webpackChunkName: "ClearCanvas" */
  'components/pages/ClearCanvas'
));
const Home = lazy(() => import(
  /* webpackChunkName: "Home" */
  'components/pages/Home'
));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/hello-point-1">
          <Suspense fallback={<LoadingIndicator />}>
            <HelloPoint1 />
          </Suspense>
        </Route>
        <Route path="/clear-canvas">
          <Suspense fallback={<LoadingIndicator />}>
            <ClearCanvas />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<LoadingIndicator />}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
