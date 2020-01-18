import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Pages
const Home = lazy(() => import(
  /* webpackChunkName: "Home" */
  'components/pages/Home'
));
const BlackCanvas = lazy(() => import(
  /* webpackChunkName: "BlackCanvas" */
  'components/pages/BlackCanvas'
));
const ColoredTriangle2D = lazy(() => import(
  /* webpackChunkName: "ColoredTriangle2D" */
  'components/pages/ColoredTriangle2D'
));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/black-canvas">
          <Suspense fallback={<div>Loading...</div>}>
            <BlackCanvas />
          </Suspense>
        </Route>
        <Route path="/colored-triangle-2d">
          <Suspense fallback={<div>Loading...</div>}>
            <ColoredTriangle2D />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
