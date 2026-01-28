import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusBadge = (status) => {
    const statusStyles = {
      upcoming: 'bg-green-500/80 text-white border-green-400 shadow-lg shadow-green-500/50',
      ongoing: 'bg-neon-blue/80 text-white border-neon-blue shadow-lg shadow-neon-blue/50',
      past: 'bg-gray-600/80 text-white border-gray-400 shadow-lg shadow-gray-500/50',
    };

    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${
          statusStyles[status] || statusStyles.past
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  // Get the first image from images array if available
  const imageUrl = event.images && event.images.length > 0 ? event.images[0] : null;
  const showImage = imageUrl && !imageError;

  return (
    <div className="bg-dark-blue-light rounded-xl overflow-hidden card-hover border border-accent-blue/20 group">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        {showImage ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-dark-blue-light">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                ⚽
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          {getStatusBadge(event.status)}
        </div>
        {event.featured && (
          <div className="absolute top-4 left-4 bg-neon-blue text-dark-blue px-3 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-light-blue text-sm font-medium">
            {event.date}
          </span>
          <span className="text-gray-400 text-sm">📍 {event.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>👥 {event.attendees || 'TBA'}</span>
          </div>
          <Link
            to={`/experiences/${event.id}`}
            className="text-accent-blue hover:text-neon-blue font-semibold text-sm transition-colors flex items-center space-x-1"
          >
            <span>Learn More</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

