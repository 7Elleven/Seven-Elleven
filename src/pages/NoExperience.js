import React from 'react';
import { Link } from 'react-router-dom';

const NoExperience = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-9xl mb-8 opacity-20">⚽</div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">No Experience</span>
            <br />
            <span className="text-white">At The Moment</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We're currently not accepting new bookings at this time. 
            Please check back soon for exciting new experiences!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/experiences" className="btn-primary">
              View Available Experiences
            </Link>
            <Link to="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoExperience;

