import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home = lazy(() =>
  import(/* webpackChunkName: "Home" */'components/pages/Home')
);
const BlackCanvas = lazy(() =>
  import(/* webpackChunkName: "BlackCanvas" */'components/pages/BlackCanvas')
);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/black-canvas">
          <Suspense fallback={<div>Loading...</div>}>
            <BlackCanvas />
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
