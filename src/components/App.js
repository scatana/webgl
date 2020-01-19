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
const ColoredTriangle2D = lazy(() => import(
  /* webpackChunkName: "ColoredTriangle2D" */
  'components/pages/ColoredTriangle2D'
));
const BlackCanvas = lazy(() => import(
  /* webpackChunkName: "BlackCanvas" */
  'components/pages/BlackCanvas'
));
const Home = lazy(() => import(
  /* webpackChunkName: "Home" */
  'components/pages/Home'
));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/colored-triangle-2d">
          <Suspense fallback={<LoadingIndicator />}>
            <ColoredTriangle2D />
          </Suspense>
        </Route>
        <Route path="/black-canvas">
          <Suspense fallback={<LoadingIndicator />}>
            <BlackCanvas />
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
