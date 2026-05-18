import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const galleryCache = new Map();
const galleryRequests = new Map();
let allGalleryFetchPromise = null;

const getCacheKey = (categoryName) => categoryName.trim().toLowerCase();

export const fetchAndCacheAllGalleryImages = async () => {
  if (allGalleryFetchPromise) {
    return allGalleryFetchPromise;
  }

  allGalleryFetchPromise = (async () => {
    const galleryRef = collection(db, 'gallery');
    const snapshot = await getDocs(galleryRef);
    const imagesByCategory = new Map();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const category = (data.category || '').trim();

      if (!category || !Array.isArray(data.images)) {
        return;
      }

      const cacheKey = getCacheKey(category);
      const existing = imagesByCategory.get(cacheKey) || [];
      imagesByCategory.set(cacheKey, [...existing, ...data.images.filter(Boolean)]);
    });

    imagesByCategory.forEach((images, cacheKey) => {
      galleryCache.set(cacheKey, Array.from(new Set(images)));
    });

    return imagesByCategory;
  })();

  return allGalleryFetchPromise;
};

export const fetchGalleryImagesByCategory = async (categoryName) => {
  if (!categoryName) {
    return [];
  }

  const cacheKey = getCacheKey(categoryName);

  if (galleryCache.has(cacheKey)) {
    return galleryCache.get(cacheKey);
  }

  if (galleryRequests.has(cacheKey)) {
    return galleryRequests.get(cacheKey);
  }

  const request = (async () => {
    try {
      const images = await fetchGalleryImagesFromFirestore(categoryName);
      galleryCache.set(cacheKey, images);
      return images;
    } finally {
      galleryRequests.delete(cacheKey);
    }
  })();

  galleryRequests.set(cacheKey, request);
  return request;
};

const fetchGalleryImagesFromFirestore = async (categoryName) => {
  try {
    const galleryRef = collection(db, 'gallery');
    const exactMatchQuery = query(galleryRef, where('category', '==', categoryName));
    const querySnapshot = await getDocs(exactMatchQuery);

    const exactMatchImages = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (Array.isArray(data.images)) {
        exactMatchImages.push(...data.images.filter(Boolean));
      }
    });

    if (exactMatchImages.length > 0) {
      return Array.from(new Set(exactMatchImages));
    }

    // Fallback: handle accidental casing/spacing differences in category values.
    const allSnapshot = await getDocs(galleryRef);
    const normalizedTitle = categoryName.trim().toLowerCase();
    const fallbackImages = [];

    allSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const normalizedCategory = (data.category || '').trim().toLowerCase();
      if (normalizedCategory === normalizedTitle && Array.isArray(data.images)) {
        fallbackImages.push(...data.images.filter(Boolean));
      }
    });

    return Array.from(new Set(fallbackImages));
  } catch (error) {
    console.error('Error fetching gallery images by category:', error);
    throw error;
  }
};

export const clearGalleryCache = () => {
  galleryCache.clear();
  galleryRequests.clear();
  allGalleryFetchPromise = null;
};

export const getCachedGalleryImages = (categoryName) => {
  if (!categoryName) {
    return null;
  }

  const cacheKey = getCacheKey(categoryName);
  return galleryCache.has(cacheKey) ? galleryCache.get(cacheKey) : null;
};
