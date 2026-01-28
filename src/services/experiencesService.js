import { collection, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchExperiences = async (maxLimit = null) => {
  try {
    const experiencesRef = collection(db, 'experiences');
    let q = query(experiencesRef, orderBy('date', 'desc'));
    
    if (maxLimit) {
      q = query(experiencesRef, orderBy('date', 'desc'), limit(maxLimit));
    }
    
    const querySnapshot = await getDocs(q);
    const experiences = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        ...data,
        // Format date if it's in YYYY-MM-DD format
        date: data.date ? formatDate(data.date) : 'TBA',
      });
    });
    
    return experiences;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const fetchExperienceById = async (id) => {
  try {
    const experienceRef = doc(db, 'experiences', id);
    const experienceSnap = await getDoc(experienceRef);
    
    if (experienceSnap.exists()) {
      const data = experienceSnap.data();
      return {
        id: experienceSnap.id,
        ...data,
        date: data.date ? formatDate(data.date) : 'TBA',
      };
    } else {
      throw new Error('Experience not found');
    }
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};

// Helper function to format date from YYYY-MM-DD to readable format
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};
