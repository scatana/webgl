import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/black-canvas">Black canvas</Link>
      </li>
    </ul>
  );
};

export default Home;
