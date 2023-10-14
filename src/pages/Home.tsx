import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Visitor Registration App</h1>
      <Link to="/VisitorsForm" >Go to Visitor Form</Link>
    </div>
  );
};

export default Home;
