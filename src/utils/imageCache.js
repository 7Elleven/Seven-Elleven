const loadedUrls = new Set();
const failedUrls = new Set();
const loadingPromises = new Map();

export const isImageCached = (url) => Boolean(url && loadedUrls.has(url));

export const markImageCached = (url) => {
  if (url) {
    loadedUrls.add(url);
  }
};

export const hasImageFailed = (url) => Boolean(url && failedUrls.has(url));

export const preloadImage = (url) => {
  if (!url) {
    return Promise.reject(new Error('Missing image URL'));
  }

  if (loadedUrls.has(url)) {
    return Promise.resolve(url);
  }

  if (failedUrls.has(url)) {
    return Promise.reject(new Error(`Image previously failed: ${url}`));
  }

  if (loadingPromises.has(url)) {
    return loadingPromises.get(url);
  }

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';

    image.onload = () => {
      loadedUrls.add(url);
      loadingPromises.delete(url);
      resolve(url);
    };

    image.onerror = () => {
      failedUrls.add(url);
      loadingPromises.delete(url);
      reject(new Error(`Failed to load image: ${url}`));
    };

    image.src = url;
  });

  loadingPromises.set(url, promise);
  return promise;
};

export const preloadImages = (urls, { limit = 3 } = {}) => {
  const uniqueUrls = [...new Set(urls.filter(Boolean))].slice(0, limit);
  return Promise.allSettled(uniqueUrls.map((url) => preloadImage(url)));
};

export const preloadImagesBatched = async (urls, batchSize = 4) => {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];

  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map((url) => preloadImage(url)));
  }
};
