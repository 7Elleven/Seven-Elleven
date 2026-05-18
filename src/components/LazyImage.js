import React, { useState, useEffect, useRef } from 'react';
import { isImageCached, markImageCached } from '../utils/imageCache';

const LazyImage = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  eager = false,
  rootMargin = '200px',
  onLoad,
  onError,
}) => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(() => eager || isImageCached(src));
  const [status, setStatus] = useState(() => {
    if (!src) return 'error';
    if (isImageCached(src)) return 'loaded';
    return 'idle';
  });

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    if (eager) {
      setShouldLoad(true);
      return;
    }

    if (shouldLoad) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [eager, shouldLoad, src, rootMargin]);

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    if (isImageCached(src)) {
      setStatus('loaded');
    }
  }, [src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {status !== 'loaded' && status !== 'error' && (
        <div className="absolute inset-0 bg-dark-blue-light animate-pulse" aria-hidden="true" />
      )}
      {status === 'error' && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-dark-blue-light text-2xl opacity-30"
          aria-hidden="true"
        >
          📷
        </div>
      )}
      {shouldLoad && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => {
            markImageCached(src);
            setStatus('loaded');
            onLoad?.();
          }}
          onError={() => {
            setStatus('error');
            onError?.();
          }}
          className={`${className} transition-opacity duration-300 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

export default LazyImage;
