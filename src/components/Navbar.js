import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BOOKING_URL = 'https://sevenellevenke.hustlesasa.shop';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experiences', label: 'Experiences' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/10'
            : 'bg-white/5 backdrop-blur-lg border-b border-white/5'
        }`}
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="relative z-50 flex items-center justify-between h-24 md:h-28 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6 group py-2 md:py-3">
            <div className="relative flex items-center">
              <img
                src="/logo.png"
                alt="SevenElleven logo"
                className="relative h-14 md:h-16 lg:h-20 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 px-1 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-neon-blue'
                    : 'text-white hover:text-light-blue'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"></span>
                )}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-6"
            >
              Book Experience
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-[9999] shadow-2xl overflow-y-auto"
          style={{ backgroundColor: '#0a1628' }}
          aria-label="Mobile navigation menu"
        >
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <img
              src="/logo.png"
              alt="SevenElleven logo"
              className="h-14 w-auto object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-lg text-xl font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'bg-accent-blue text-white'
                    : 'text-white hover:bg-dark-blue-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center mt-2"
            >
              Book Experience
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

