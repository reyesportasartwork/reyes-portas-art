/**
 * REYES PORTAS — IMAGE PRELOADING UTILITY
 * 
 * Uses the browser's native Image() object constructor to preload artwork
 * assets into memory before rendering, ensuring instantaneous display
 * and completely eliminating Cumulative Layout Shift (CLS).
 */

const preloadedUrlCache = new Set<string>();

/**
 * Preload a single image URL using new Image()
 */
export const preloadImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }

    // Fast-path: already loaded previously in this session
    if (preloadedUrlCache.has(src)) {
      resolve(true);
      return;
    }

    if (typeof window === 'undefined') {
      resolve(true);
      return;
    }

    const img = new Image();

    const handleSuccess = () => {
      preloadedUrlCache.add(src);
      resolve(true);
    };

    const handleError = () => {
      // Resolve false rather than reject so batch preloading continues
      resolve(false);
    };

    img.onload = handleSuccess;
    img.onerror = handleError;

    // Trigger network fetch and decode
    img.src = src;

    // Check if browser already had it cached synchronously
    if (img.complete) {
      if (img.naturalWidth > 0) {
        handleSuccess();
      }
    }
  });
};

/**
 * Preload an array of image URLs concurrently using native Image()
 */
export const preloadImages = async (
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<boolean[]> => {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  let loadedCount = 0;
  const total = uniqueUrls.length;

  if (total === 0) {
    if (onProgress) onProgress(0, 0);
    return [];
  }

  const promises = uniqueUrls.map(async (url) => {
    const success = await preloadImage(url);
    loadedCount += 1;
    if (onProgress) {
      onProgress(loadedCount, total);
    }
    return success;
  });

  return Promise.all(promises);
};

/**
 * Check if a URL has already been preloaded
 */
export const isImagePreloaded = (src: string): boolean => {
  return preloadedUrlCache.has(src);
};
