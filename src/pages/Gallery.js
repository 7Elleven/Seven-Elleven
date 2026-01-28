import React, { useState, useEffect } from 'react';
import { fetchGalleryItems } from '../services/galleryService';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((item) => {
                // Use the uniqueId we created for each image
                const uniqueKey = item.uniqueId || `${item.id}-${item.imageIndex || 0}`;
                
                return (
                  <div
                    key={uniqueKey}
                    className="group relative aspect-square bg-gradient-to-br from-accent-blue/20 to-dark-blue-light rounded-xl overflow-hidden border border-accent-blue/20"
                  >
                    {/* Image or Placeholder */}
                    {!item.isPlaceholder && item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`${item.title} - Image ${(item.imageIndex || 0) + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-dark-blue-light to-dark-blue flex items-center justify-center">
                        <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                          ⚽
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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

    </div>
  );
};

export default Gallery;

