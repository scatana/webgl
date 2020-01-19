import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from 'components/util/ErrorBoundary';
import App from 'components/App';

import './assets/fonts/Roboto-Regular.woff2';
import './assets/fonts/Roboto-Slab-Regular.woff2';
import 'milligram/dist/milligram.min.css';
import './main.css';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
