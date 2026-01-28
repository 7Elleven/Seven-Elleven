import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchExperiences } from '../services/experiencesService';

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiences(6); // Fetch up to 6 experiences for homepage
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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-dark-blue-light to-dark-blue"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Stadium Lines Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-4">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6">
              <span className="gradient-text">Where Football</span>
              <br />
              <span className="text-white">Meets Entertainment</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Events, Elevated. Premium events, immersive experiences, and a community 
              of fans that make every minute unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/experiences" className="btn-primary">
                View Experiences
              </Link>
              <Link to="/book" className="btn-secondary">
                Book an Experience
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-neon-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="section-padding bg-dark-blue-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Featured</span>{' '}
              <span className="text-white">Experiences</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience football like never before with our curated selection of
              premium experiences and tournaments.
            </p>
          </div>

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
          ) : experiences.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚽</div>
              <p className="text-gray-400">No experiences available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {experiences.map((experience) => (
                  <EventCard key={experience.id} event={experience} />
                ))}
              </div>

              <div className="text-center">
                <Link to="/experiences" className="btn-secondary">
                  View All Experiences
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why <span className="gradient-text">SevenElleven</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're not just event organizers—we're football enthusiasts creating
              unforgettable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                title: 'Premium Experiences',
                description:
                  'Access to exclusive events, VIP hospitality, and once-in-a-lifetime opportunities.',
              },
              {
                icon: '⚡',
                title: 'Unmatched Energy',
                description:
                  'Feel the passion of the game with electrifying atmospheres and fan activations.',
              },
              {
                icon: '🤝',
                title: 'Community First',
                description:
                  'We bring football fans together and turn shared passion into lasting connections.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-dark-blue-light p-8 rounded-xl border border-accent-blue/20 card-hover text-center"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && !error && (
        <section className="section-padding bg-dark-blue">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: `${experiences.length}+`, label: 'Experiences Created' },
                { number: '285K+', label: 'Insights' },
                { number: '6+', label: 'Cities Worldwide' },
                { number: '98%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-blue/20 via-dark-blue-light to-accent-blue/20">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Experience{' '}
            <span className="gradient-text">7Elleven Magic</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of fans who have made unforgettable memories with
            SevenElleven.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-12">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

