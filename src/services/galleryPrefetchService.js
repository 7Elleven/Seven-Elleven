import { fetchAndCacheAllGalleryImages, fetchGalleryImagesByCategory } from './galleryService';
import { fetchExperiences } from './experiencesService';
import { preloadImagesBatched } from '../utils/imageCache';

const SLIDESHOW_IMAGES_PER_EXPERIENCE = 10;
const PREFETCH_BATCH_SIZE = 4;

let prefetchPromise = null;
let metadataPromise = null;
let prefetchComplete = false;

export const ensureGalleryMetadata = () => {
  if (!metadataPromise) {
    metadataPromise = fetchAndCacheAllGalleryImages();
  }

  return metadataPromise;
};

const collectPriorityImageUrls = async () => {
  await ensureGalleryMetadata();

  const urls = [];

  try {
    const experiences = await fetchExperiences();

    for (const experience of experiences) {
      if (!experience.title) {
        continue;
      }

      const images = await fetchGalleryImagesByCategory(experience.title);
      urls.push(...images.slice(0, SLIDESHOW_IMAGES_PER_EXPERIENCE));
    }
  } catch (error) {
    console.warn('Could not prioritize gallery prefetch by experience:', error);
  }

  return [...new Set(urls)];
};

export const startGalleryPrefetch = () => {
  if (prefetchPromise) {
    return prefetchPromise;
  }

  ensureGalleryMetadata().catch((error) => {
    console.warn('Gallery metadata prefetch failed:', error);
  });

  prefetchPromise = (async () => {
    try {
      const urls = await collectPriorityImageUrls();

      if (urls.length > 0) {
        await preloadImagesBatched(urls, PREFETCH_BATCH_SIZE);
      }
    } catch (error) {
      console.warn('Gallery image prefetch failed:', error);
    } finally {
      prefetchComplete = true;
    }
  })();

  return prefetchPromise;
};

export const ensureGalleryPrefetch = () => {
  if (!prefetchPromise) {
    return startGalleryPrefetch();
  }

  return prefetchPromise;
};

export const isGalleryPrefetchComplete = () => prefetchComplete;
