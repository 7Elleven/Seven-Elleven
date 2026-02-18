import React, { useState, useEffect } from 'react';
import { fetchGalleryItems } from '../services/galleryService';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryItems();
        setGalleryItems(data);
        setError(null);
      } catch (err) {
        console.error('Error loading gallery items:', err);
        setError('Failed to load gallery items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, []);

  // Flatten all images from filtered items and remove duplicates
  // (Computed below as `filteredImages`.)

  // Get unique categories from gallery items (normalize for comparison)
  const categories = ['All', ...new Set(galleryItems.map(item => item.category?.trim()).filter(Boolean))];

  // Filter items by category (case-insensitive and trim whitespace)
  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => {
          const itemCategory = item.category?.trim() || '';
          return itemCategory.toLowerCase() === activeCategory.toLowerCase();
        });

  // Flatten all images from filtered items and remove duplicates
  const seenImageUrls = new Set();
  const filteredImages = filteredItems.flatMap((item, itemIndex) => {
    if (!item.images || item.images.length === 0) {
      // If no images, return the item itself as a placeholder
      return [{ ...item, isPlaceholder: true, uniqueId: `${item.id}-placeholder-${itemIndex}` }];
    }
    // Return all images from this item, each with item metadata
    return item.images
      .map((imageUrl, imageIndex) => {
        // Create a unique key for this image URL
        const imageKey = `${item.id}-${imageUrl}`;
        
        // Skip if we've already seen this exact image URL
        if (seenImageUrls.has(imageKey)) {
          return null;
        }
        seenImageUrls.add(imageKey);
        
        // Create a new object without the images array to avoid confusion
        const { images, ...itemWithoutImages } = item;
        return {
          ...itemWithoutImages,
          imageUrl, // Individual image URL for display
          imageIndex: imageIndex,
          isPlaceholder: false,
          uniqueId: imageKey, // Truly unique identifier
        };
      })
      .filter(Boolean); // Remove null entries (duplicates)
  });

  const lightboxImages = filteredImages
    .filter((item) => !item.isPlaceholder && item.imageUrl)
    .map((item) => {
      const key = item.uniqueId || `${item.id}-${item.imageUrl}`;
      const alt =
        item.title
          ? `${item.title}, view ${(item.imageIndex || 0) + 1}`
          : `Gallery image ${(item.imageIndex || 0) + 1}`;

      return { key, src: item.imageUrl, alt };
    });

  const lightboxIndexByKey = new Map(
    lightboxImages.map((img, idx) => [img.key, idx])
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) => (i === null ? i : Math.max(0, i - 1)));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) =>
          i === null ? i : Math.min(lightboxImages.length - 1, i + 1)
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, lightboxImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (lightboxImages.length === 0) {
      setLightboxIndex(null);
      return;
    }
    if (lightboxIndex > lightboxImages.length - 1) {
      setLightboxIndex(lightboxImages.length - 1);
    }
  }, [lightboxIndex, lightboxImages.length]);

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
              <span className="gradient-text">Gallery</span>{' '}
              <span className="text-white">& Highlights</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Relive the magic of our events through unforgettable moments and
              memories.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-dark-blue-light">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent-blue text-white shadow-lg scale-105'
                    : 'bg-dark-blue text-gray-300 hover:bg-dark-blue-light border border-accent-blue/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue mb-4"></div>
              <p className="text-gray-400">Loading gallery...</p>
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
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-400">No gallery items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 lg:gap-6">
              {filteredImages.map((item) => {
                // Use the uniqueId we created for each image
                const uniqueKey = item.uniqueId || `${item.id}-${item.imageIndex || 0}`;
                const lightboxKey = item.uniqueId || `${item.id}-${item.imageUrl}`;
                const imageAlt =
                  item.title
                    ? `${item.title}, view ${(item.imageIndex || 0) + 1}`
                    : `Gallery image ${(item.imageIndex || 0) + 1}`;
                
                return (
                  <div
                    key={uniqueKey}
                    className="group relative aspect-square bg-gradient-to-br from-accent-blue/20 to-dark-blue-light rounded-xl overflow-hidden border border-accent-blue/20"
                  >
                    {/* Image or Placeholder */}
                    {!item.isPlaceholder && item.imageUrl ? (
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex(
                            lightboxIndexByKey.get(lightboxKey) ?? 0
                          )
                        }
                        className="block w-full h-full focus:outline-none"
                        aria-label={`Open image: ${imageAlt}`}
                      >
                        <img
                          src={item.imageUrl}
                          alt={imageAlt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-zoom-in"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-dark-blue-light to-dark-blue flex items-center justify-center">
                        <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                          ⚽
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-blue via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Info */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {item.category && (
                        <div className="text-xs text-neon-blue font-semibold mb-1">
                          {item.category}
                        </div>
                      )}
                      <h3 className="text-white font-bold text-lg mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && lightboxImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Close fullscreen image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {lightboxIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? i : Math.max(0, i - 1)));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {lightboxIndex < lightboxImages.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? i : Math.min(lightboxImages.length - 1, i + 1)
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <img
            src={lightboxImages[lightboxIndex].src}
            alt={lightboxImages[lightboxIndex].alt || 'Fullscreen gallery image'}
            className="max-w-[95vw] max-h-[90vh] object-contain cursor-zoom-out select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};

export default Gallery;

