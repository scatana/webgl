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
const ClearCanvas = lazy(() => import(/* webpackChunkName: "p_ClearCanvas" */
  'components/pages/ClearCanvas'
));
const HelloPoint1 = lazy(() => import(/* webpackChunkName: "p_HelloPoint1" */
  'components/pages/HelloPoint1'
));
const HelloPoint2 = lazy(() => import(/* webpackChunkName: "p_HelloPoint2" */
  'components/pages/HelloPoint2'
));
const ClickedPoints = lazy(() => import(/* webpackChunkName: "p_ClickedPoints" */
  'components/pages/ClickedPoints'
));
const ColoredPoints = lazy(() => import(/* webpackChunkName: "p_ColoredPoints" */
  'components/pages/ColoredPoints'
));
const MultiPoint = lazy(() => import(/* webpackChunkName: "p_MultiPoint" */
  'components/pages/MultiPoint'
));
const HelloTriangle = lazy(() => import(/* webpackChunkName: "p_HelloTriangle" */
  'components/pages/HelloTriangle'
));

const routes = [
  {
    url: '/hello-triangle',
    title: 'Hello Triangle',
    page: <HelloTriangle />
  },
  {
    url: '/multi-point',
    title: 'MultiPoint',
    page: <MultiPoint />
  },
  {
    url: '/colored-points',
    title: 'Colored Points',
    page: <ColoredPoints />
  },
  {
    url: '/clicked-points',
    title: 'Clicked Points',
    page: <ClickedPoints />
  },
  {
    url: '/hello-point-2',
    title: 'Hello Point (2)',
    page: <HelloPoint2 />
  },
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
