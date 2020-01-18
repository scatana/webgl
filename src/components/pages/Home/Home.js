import React from 'react';
import { Link } from 'react-router-dom';
import _chunk from 'lodash/chunk';

const Home = () => {
  const pages = [
    {
      route: '/colored-triangle-2d',
      name: 'Colored triangle (2D)'
    },
    {
      route: '/black-canvas',
      name: 'Black canvas'
    }
  ];
  const chunks = _chunk(pages, 2);

  return (
    <div className="container">
      {chunks.map((chunk, index) => (
        <div className="row" key={index}>
          {chunk.map((page, index) => (
            <div className="column column-50" key={index}>
              <Link to={page.route}>{page.name}</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
