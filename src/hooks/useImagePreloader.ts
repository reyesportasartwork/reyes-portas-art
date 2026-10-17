import { useState, useEffect, useRef } from 'react';
import { preloadImages, isImagePreloaded } from '../utils/imagePreloader';

interface PreloaderResult {
  isLoaded: boolean;
  loadedCount: number;
  totalCount: number;
  progress: number;
}

/**
 * Hook to preload an array of image URLs using the browser's native Image() object.
 * Prevents layout shift by holding or coordinating grid rendering until images are in cache.
 */
export const useImagePreloader = (urls: string[]): PreloaderResult => {
  const filteredUrls = urls.filter(Boolean);
  const totalCount = filteredUrls.length;

  // Check if all images are already cached
  const allPreloaded =
    totalCount === 0 || filteredUrls.every((url) => isImagePreloaded(url));

  const [isLoaded, setIsLoaded] = useState<boolean>(allPreloaded);
  const [loadedCount, setLoadedCount] = useState<number>(allPreloaded ? totalCount : 0);

  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (totalCount === 0) {
      setIsLoaded(true);
      setLoadedCount(0);
      return;
    }

    // Fast-path: already loaded
    if (filteredUrls.every((url) => isImagePreloaded(url))) {
      setIsLoaded(true);
      setLoadedCount(totalCount);
      return;
    }

    setIsLoaded(false);
    setLoadedCount(0);

    let isCurrent = true;

    preloadImages(filteredUrls, (loaded, total) => {
      if (isCurrent && isMountedRef.current) {
        setLoadedCount(loaded);
      }
    }).then(() => {
      if (isCurrent && isMountedRef.current) {
        setIsLoaded(true);
      }
    });

    return () => {
      isCurrent = false;
      isMountedRef.current = false;
    };
  }, [urls.join('|')]);

  const progress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 100;

  return {
    isLoaded,
    loadedCount,
    totalCount,
    progress,
  };
};
