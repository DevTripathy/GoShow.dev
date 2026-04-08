import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to bg-primary/20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-white mb-8">Page Not Found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dull transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
