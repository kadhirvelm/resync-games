import { useRef } from "react";
class ImageCache {
  private cache: Map<string, HTMLImageElement>;

  constructor() {
    this.cache = new Map();
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const cached = this.cache.get(src);
    if (cached) {
      return cached;
    }

    const img = new Image();
    img.src = src;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = reject;
    });
  }

  async getCachedImage(src: string): Promise<HTMLImageElement> {
    return this.loadImage(src);
  }
}

/**
 * A hook for the image cache.
 */
export function useImageCache(): ImageCache {
  return useRef(new ImageCache()).current;
}
