import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
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
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">About</span>{' '}
              <span className="text-white">SevenElleven</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              We're passionate about bringing football fans together through
              extraordinary experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-base leading-relaxed">
                <p>
                SevenElleven was born from a simple idea: football deserves better experiences. 
                What started as a shared passion among football lovers and event professionals 
                quickly grew into a platform built to celebrate the culture around the game. 
                We saw the gap between how football is lived by fans and how it’s often 
                presented — and we set out to bridge it.

                </p>
                <p>
                From the beginning, SevenElleven focused on more than just tournaments. 
                We create spaces where atmosphere matters, community comes first, and every detail 
                contributes to a sense of belonging. Each action is designed to bring fans together, tell 
                stories through culture, and create moments that live beyond the final whistle.

                </p>
                <p>
                Today, SevenElleven stands for authentic football culture, premium yet accessible 
                experiences, and a growing community of fans. While rooted locally, our vision extends 
                beyond borders. We are building a culture platform designed to travel — connecting fans 
                across cities, countries, and cultures through shared passion, elevated experiences, 
                and a global love for the game.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-dark-blue-light p-8 rounded-xl border border-accent-blue/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400">
                To build a vibrant, inclusive community where talent & culture come alive — creating meaningful 
                experiences that empower and connect people while turning shared passion into lasting impact.
                </p>
              </div>
              <div className="bg-dark-blue-light p-8 rounded-xl border border-accent-blue/20">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400">
                To shape a future where football is more than a game — it is a cultural language 
                that unites communities, unlocks opportunity, and builds platforms where 
                people grow together, both on and off the pitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Stand Out Section */}
      <section className="section-padding bg-dark-blue-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why <span className="gradient-text">SevenElleven</span> Stands Out
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              What makes us different in the world of football entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '⚽',
                title: 'Authentic Football Culture',
                description:
                  'We live and breathe football. Every event captures the passion, energy, and authenticity that define the game.',
              },
              {
                icon: '🎪',
                title: 'Innovative Experiences',
                description:
                  'More Than Events — We Create Experiences. We don’t just host tournaments. We design immersive football experiences that combine atmosphere, storytelling, and moments fans actually remember.',
              },
              {
                icon: '🤝',
                title: 'Premium Yet Accessible',
                description:
                  'Our events are intentionally curated to feel high-quality without feeling exclusive. We balance style, energy, and comfort to deliver premium football moments for real fans.',
              },
              {
                icon: '👥',
                title: 'Fan-First Approach',
                description:
                  'Every decision we make puts fans first. Your experience and satisfaction are at the heart of everything we do.',
              },
              {
                icon: '🌍',
                title: 'A Brand With Vision',
                description:
                  'SevenElleven isn’t a one-off event—it’s a movement. We’re building a long-term football culture platform with consistent experiences, strong identity, and room to grow with the community.',
              },
              {
                icon: '✨',
                title: 'Attention to Detail',
                description:
                  'From planning to execution, we obsess over every detail to ensure flawless events that exceed expectations.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-dark-blue p-6 rounded-xl border border-accent-blue/20 card-hover"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              The <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
            A driven team of football fanatics, event experts, and experience builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'James Mwira',
                role: 'Founder & CEO',
                description: 'Football enthusiast and entrepreneur.',
              },
              {
                name: 'Paul Maleche',
                role: 'Managing Director',
                description: '4+ years creating unforgettable fan experiences.',
              },
              {
                name: 'Dennis Mango',
                role: 'Head of ICT',
                description: 'Oversees ICT infrastructure and technology operations.',
              },
              {
                name: 'Alvin Sang',
                role: 'Branding Partner',
                description:
                  'Experienced in delivering strong, clean and effective branding.',
              },
    
            ].map((member, index) => (
              <div
                key={index}
                className="bg-dark-blue-light p-8 rounded-xl border border-accent-blue/20 text-center card-hover"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-accent-blue to-neon-blue rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-accent-blue mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-blue/20 via-dark-blue-light to-accent-blue/20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Join Us on This <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a fan looking for the ultimate experience or a partner
            seeking collaboration, we'd love to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get In Touch
            </Link>
            <Link to="/experiences" className="btn-secondary">
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

