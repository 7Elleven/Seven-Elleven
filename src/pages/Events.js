import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { fetchExperiences } from '../services/experiencesService';

const Experiences = () => {
  const [filter, setFilter] = useState('all');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiences(); // Fetch all experiences
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error('Error loading experiences:', err);
        setError('Failed to load experiences. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  const filteredExperiences =
    filter === 'all'
      ? experiences
      : experiences.filter((experience) => experience.status === filter);

  const filterButtons = [
    { value: 'all', label: 'All Experiences' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-dark-blue via-dark-blue-light to-dark-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-neon-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-blue rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Football</span>{' '}
              <span className="text-white">Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Discover our upcoming tournaments, fan experiences, and live match
              activations.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-dark-blue-light">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === btn.value
                    ? 'bg-accent-blue text-white shadow-lg scale-105'
                    : 'bg-dark-blue text-gray-300 hover:bg-dark-blue-light border border-accent-blue/20'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Experiences Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue mb-4"></div>
              <p className="text-gray-400">Loading experiences...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          ) : filteredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <EventCard key={experience.id} event={experience} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Experiences Found
              </h3>
              <p className="text-gray-400">
                Check back soon for new experiences in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-blue/20 via-dark-blue-light to-accent-blue/20">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Want to <span className="gradient-text">Partner</span> With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for exciting collaborations and partnerships. Let's
            create something amazing together.
          </p>
          <a href="/contact" className="btn-primary">
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Experiences;

