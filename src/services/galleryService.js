import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchGalleryImagesByCategory = async (categoryName) => {
  if (!categoryName) {
    return [];
  }

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
