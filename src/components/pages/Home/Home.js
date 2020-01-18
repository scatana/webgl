import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/black-canvas">Black canvas</Link>
      </li>
      <li>
        <Link to="/colored-triangle-2d">Colored triangle (2D)</Link>
      </li>
    </ul>
  );
};

export default Home;
