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
    <div className="container">
      <h1 className={styles.pageTitle}>WebGL</h1>
      {chunks.map((chunk, index) => (
        <div className="row" key={index}>
          {chunk.map((page, index) => (
            <div className="column" key={index}>
              <Link to={page.route} className={styles.card}>
                {page.title}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
