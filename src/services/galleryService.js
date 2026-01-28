import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchGalleryItems = async () => {
  try {
    const galleryRef = collection(db, 'gallery');
    // Try to order by createdAt, but if it fails, just get all items
    let q;
    try {
      q = query(galleryRef, orderBy('createdAt', 'desc'));
    } catch (e) {
      // If createdAt doesn't exist or isn't indexed, just get all items
      q = query(galleryRef);
    }
    
    const querySnapshot = await getDocs(q);
    const galleryItems = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      galleryItems.push({
        id: doc.id,
        ...data,
      });
    });
    
    // Sort by createdAt if available (fallback for non-indexed fields)
    galleryItems.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        const aTime = a.createdAt.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt).getTime();
        const bTime = b.createdAt.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt).getTime();
        return bTime - aTime;
      }
      return 0;
    });
    
    return galleryItems;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw error;
  }
};

