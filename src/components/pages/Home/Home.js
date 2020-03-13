import React from 'react';
import { Link } from 'react-router-dom';
import _chunk from 'lodash/chunk';

import styles from './Home.css';

const Home = () => {
  const pages = [
    {
      route: '/hello-point-1',
      title: 'Hello Point (1)'
    },
    {
      route: '/clear-canvas',
      title: 'Clear canvas'
    }
  ];
  const chunks = _chunk(pages, 2);

  return (
    <div>
      <h1 className={styles.pageTitle}>WebGL</h1>
      {pages.map((page, index) => (
        <Link to={page.route} className={styles.card} key={index}>
          {page.title}
        </Link>
      ))}
    </div>
  );
};

export default Home;
