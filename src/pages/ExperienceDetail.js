import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchExperienceById } from '../services/experiencesService';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        setLoading(true);
        const data = await fetchExperienceById(id);
        setExperience(data);
        setError(null);
      } catch (err) {
        console.error('Error loading experience:', err);
        setError('Failed to load experience. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadExperience();
    }
  }, [id]);

  // Auto-scroll images
  useEffect(() => {
    if (!experience || !experience.images || experience.images.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % experience.images.length;
        return nextIndex;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [experience, isPaused]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      upcoming: 'bg-green-500/80 text-white border-green-400 shadow-lg shadow-green-500/50',
      ongoing: 'bg-neon-blue/80 text-white border-neon-blue shadow-lg shadow-neon-blue/50',
      past: 'bg-gray-600/80 text-white border-gray-400 shadow-lg shadow-gray-500/50',
    };

    return (
      <span
        className={`px-5 py-2.5 rounded-full text-base font-bold border-2 backdrop-blur-sm ${
          statusStyles[status] || statusStyles.past
        }`}
      >
        {status?.toUpperCase() || 'TBA'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue mb-4"></div>
          <p className="text-gray-400">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {error || 'Experience Not Found'}
          </h2>
          <p className="text-gray-400 mb-6">
            {error || 'The experience you are looking for does not exist.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Go Back
            </button>
            <Link to="/experiences" className="btn-primary">
              View All Experiences
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = experience.images || [];
  const currentImage = images[selectedImageIndex];

  return (
    <div className="pt-20">
      {/* Hero Image Section */}
      <section 
        className="relative h-[60vh] min-h-[500px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {currentImage ? (
          <div className="relative w-full h-full">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${experience.title} - ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  selectedImageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-dark-blue-light flex items-center justify-center">
            <div className="text-9xl opacity-20">⚽</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/50 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-dark-blue/80 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-dark-blue transition-colors flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-8 right-8">
          {getStatusBadge(experience.status)}
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsPaused(true);
                  // Resume autoscroll after 3 seconds of manual selection
                  setTimeout(() => setIsPaused(false), 3000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImageIndex === index
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="section-padding bg-dark-blue">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                <span className="gradient-text">{experience.title}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-accent-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{experience.date}</span>
                </div>
                {experience.location && (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-accent-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{experience.location}</span>
                  </div>
                )}
                {experience.attendees && (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-accent-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>{experience.attendees}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {experience.description && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">About This Experience</h2>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {experience.description}
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {images.length > 1 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-neon-blue scale-105'
                          : 'border-accent-blue/20 hover:border-accent-blue/50'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${experience.title}, view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-dark-blue-light p-8 rounded-xl border border-accent-blue/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Interested in This Experience?
                  </h3>
                  <p className="text-gray-400">
                    Contact us to learn more or book your spot.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link to="/contact" className="btn-primary">
                    Book Now
                  </Link>
                  <Link to="/experiences" className="btn-secondary">
                    View All Experiences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceDetail;

