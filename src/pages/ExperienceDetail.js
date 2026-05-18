import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { fetchExperienceById } from '../services/experiencesService';
import { fetchGalleryImagesByCategory } from '../services/galleryService';
import { markImageCached, preloadImage, preloadImages } from '../utils/imageCache';

const BOOKING_URL = 'https://sevenellevenke.hustlesasa.shop';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideshowImageIndex, setSlideshowImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryFetched, setGalleryFetched] = useState(false);
  const [galleryError, setGalleryError] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [fullscreenImages, setFullscreenImages] = useState([]);
  const [loadedSlideIndices, setLoadedSlideIndices] = useState(() => new Set());

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

  useEffect(() => {
    let cancelled = false;

    const loadGallery = async () => {
      if (!experience || !experience.title) {
        setGalleryImages([]);
        setGalleryError(null);
        setGalleryLoading(false);
        setGalleryFetched(true);
        return;
      }

      setGalleryLoading(true);
      setGalleryFetched(false);
      setGalleryImages([]);

      try {
        const data = await fetchGalleryImagesByCategory(experience.title);
        if (!cancelled) {
          setGalleryImages(data);
          setGalleryError(null);
        }
      } catch (err) {
        console.error('Error loading gallery images:', err);
        if (!cancelled) {
          setGalleryError('Failed to load gallery images.');
        }
      } finally {
        if (!cancelled) {
          setGalleryLoading(false);
          setGalleryFetched(true);
        }
      }
    };

    loadGallery();

    return () => {
      cancelled = true;
    };
  }, [experience]);

  const images = experience?.images || [];
  const slideshowSource =
    galleryImages.length > 0
      ? galleryImages
      : galleryFetched
        ? images
        : [];
  const slideshowImages = slideshowSource.slice(0, 10);
  const slideshowLength = slideshowImages.length;
  const hasSlideshow = slideshowImages.length > 0;
  const isSlideshowFromGallery = galleryImages.length > 0;

  useEffect(() => {
    if (slideshowImages.length === 0) {
      setLoadedSlideIndices(new Set());
      return;
    }

    const initialIndices = new Set([0]);
    if (slideshowImages.length > 1) {
      initialIndices.add(1);
    }

    setLoadedSlideIndices(initialIndices);
    setSlideshowImageIndex(0);
    preloadImages(slideshowImages, { limit: 2 });
  }, [slideshowImages]);

  useEffect(() => {
    if (slideshowImages.length === 0) {
      return;
    }

    const current = slideshowImageIndex;
    const next = (current + 1) % slideshowImages.length;
    const prev = (current - 1 + slideshowImages.length) % slideshowImages.length;

    setLoadedSlideIndices((previous) => {
      const nextSet = new Set(previous);
      nextSet.add(current);
      nextSet.add(next);
      if (slideshowImages.length > 2) {
        nextSet.add(prev);
      }
      return nextSet;
    });

    preloadImage(slideshowImages[current]).catch(() => {});
    preloadImage(slideshowImages[next]).catch(() => {});
  }, [slideshowImageIndex, slideshowImages]);

  useEffect(() => {
    if (galleryImages.length === 0) {
      return;
    }

    preloadImages(galleryImages, { limit: 4 });
  }, [galleryImages]);

  useEffect(() => {
    if (fullscreenImageIndex === null || fullscreenImages.length === 0) {
      return;
    }

    const urlsToPreload = [fullscreenImages[fullscreenImageIndex]];
    if (fullscreenImageIndex > 0) {
      urlsToPreload.push(fullscreenImages[fullscreenImageIndex - 1]);
    }
    if (fullscreenImageIndex < fullscreenImages.length - 1) {
      urlsToPreload.push(fullscreenImages[fullscreenImageIndex + 1]);
    }

    preloadImages(urlsToPreload, { limit: 3 });
  }, [fullscreenImageIndex, fullscreenImages]);

  // Auto-scroll images
  useEffect(() => {
    if (slideshowLength <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setSlideshowImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slideshowLength;
        return nextIndex;
      });
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [slideshowLength, isPaused]);

  useEffect(() => {
    if (fullscreenImageIndex === null) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setFullscreenImageIndex(null);
        setFullscreenImages([]);
      }
      if (event.key === 'ArrowLeft') {
        setFullscreenImageIndex((prevIndex) => {
          if (prevIndex === null) return prevIndex;
          return Math.max(0, prevIndex - 1);
        });
      }
      if (event.key === 'ArrowRight') {
        setFullscreenImageIndex((prevIndex) => {
          if (prevIndex === null) return prevIndex;
          return Math.min(fullscreenImages.length - 1, prevIndex + 1);
        });
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [fullscreenImageIndex, fullscreenImages.length]);

  useEffect(() => {
    if (slideshowImageIndex > slideshowImages.length - 1) {
      setSlideshowImageIndex(0);
    }
  }, [slideshowImageIndex, slideshowImages.length]);

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

  return (
    <div className="pt-24 md:pt-28 lg:pt-32">
      {/* Hero Image Section */}
      <section
        className="relative h-[60vh] min-h-[500px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {hasSlideshow ? (
          <div className="relative w-full h-full bg-dark-blue-light">
            {slideshowImages.map((imageUrl, index) => {
              const isActive = slideshowImageIndex === index;
              const shouldRender = loadedSlideIndices.has(index);

              return (
                <div
                  key={`${imageUrl}-${index}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive && shouldRender ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {shouldRender ? (
                    <img
                      src={imageUrl}
                      alt={`${experience.title} - ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'low'}
                      onLoad={() => markImageCached(imageUrl)}
                    />
                  ) : isActive ? (
                    <div className="absolute inset-0 bg-dark-blue-light animate-pulse" aria-hidden="true" />
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/40 via-transparent to-dark-blue/40" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-14 -left-16 w-72 h-72 rounded-full bg-neon-blue/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-accent-blue/25 blur-3xl" />
        </div>

        <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 lg:left-16 lg:right-16 z-10">
          <div className="max-w-3xl">
            <p className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-neon-blue mb-2">
              SevenElleven Experience
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight drop-shadow-md">
              {experience.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-gray-200 text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-accent-blue"
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
                    className="w-4 h-4 sm:w-5 sm:h-5 text-accent-blue"
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
            </div>
            <p className="mt-3 text-sm sm:text-base text-gray-200">
              {isSlideshowFromGallery
                ? 'Showcasing event highlights from the gallery.'
                : galleryFetched && images.length > 0
                  ? 'Showcasing event posters.'
                  : !galleryFetched
                    ? 'Loading gallery highlights...'
                    : 'Gallery highlights will be available soon.'}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
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
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          {getStatusBadge(experience.status)}
        </div>

      </section>

      {/* Content Section */}
      <section className="section-padding bg-dark-blue">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">

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
                <h2 className="text-2xl font-bold text-white mb-6">Posters</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFullscreenImages(images);
                        setFullscreenImageIndex(index);
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        slideshowImageIndex === index
                          ? 'border-neon-blue scale-105'
                          : 'border-accent-blue/20 hover:border-accent-blue/50'
                      }`}
                    >
                      <LazyImage
                        src={imageUrl}
                        alt={`${experience.title}, view ${index + 1}`}
                        className="w-full h-full object-cover"
                        wrapperClassName="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {experience.status === 'past' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                {galleryLoading ? (
                  <div className="text-gray-400">Loading gallery...</div>
                ) : galleryError ? (
                  <div className="text-red-400">{galleryError}</div>
                ) : galleryImages.length === 0 ? (
                  <div className="text-gray-400">No gallery images found for this experience yet.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                    {galleryImages.map((imageUrl, index) => (
                      <button
                        key={`gallery-${index}`}
                        type="button"
                        onClick={() => {
                          setFullscreenImages(galleryImages);
                          setFullscreenImageIndex(index);
                        }}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-accent-blue/20"
                        aria-label={`Open gallery image ${index + 1}`}
                      >
                        <LazyImage
                          src={imageUrl}
                          alt={`${experience.title}, gallery view ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          wrapperClassName="w-full h-full"
                          rootMargin="300px"
                        />
                      </button>
                    ))}
                  </div>
                )}
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
                  {experience.status !== 'past' && (
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Book Now
                    </a>
                  )}
                  <Link to="/experiences" className="btn-secondary">
                    View All Experiences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fullscreenImageIndex !== null && fullscreenImages[fullscreenImageIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-6"
          onClick={() => {
            setFullscreenImageIndex(null);
            setFullscreenImages([]);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen photo viewer"
        >
          <button
            onClick={() => {
              setFullscreenImageIndex(null);
              setFullscreenImages([]);
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/15 hover:bg-white/25 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-2xl leading-none transition-colors"
            aria-label="Close fullscreen photo"
          >
            &times;
          </button>
          {fullscreenImageIndex > 0 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setFullscreenImageIndex((prevIndex) => {
                  if (prevIndex === null) return prevIndex;
                  return Math.max(0, prevIndex - 1);
                });
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-2xl leading-none transition-colors"
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}
          {fullscreenImageIndex < fullscreenImages.length - 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setFullscreenImageIndex((prevIndex) => {
                  if (prevIndex === null) return prevIndex;
                  return Math.min(fullscreenImages.length - 1, prevIndex + 1);
                });
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-2xl leading-none transition-colors"
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
          <div onClick={(event) => event.stopPropagation()}>
            <LazyImage
              src={fullscreenImages[fullscreenImageIndex]}
              alt={`${experience.title} fullscreen view ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-[90vh] sm:max-h-[92vh] object-contain rounded-lg mx-auto"
              wrapperClassName="flex items-center justify-center max-w-full max-h-[90vh] sm:max-h-[92vh]"
              eager
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetail;

