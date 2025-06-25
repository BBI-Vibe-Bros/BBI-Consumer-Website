import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component provides responsive, lazy-loaded images with WebP support
 * Automatically generates multiple sizes and formats for optimal performance
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  placeholder = 'empty',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Generate responsive image sources with WebP support
  const getImageSources = (baseSrc: string) => {
    const baseName = baseSrc.replace(/\.[^/.]+$/, ''); // Remove extension
    const isTeamImage = baseSrc.includes('/team/');
    
    if (isTeamImage) {
      // For team images, provide multiple sizes
      const sizes = [150, 300, 600];
      
      // URL encode the paths to handle spaces in filenames
      const encodeImagePath = (path: string) => {
        // Split by '/' to avoid encoding the slashes, then encode each part
        return path.split('/').map(part => encodeURIComponent(part)).join('/');
      };
      
      return {
        webp: sizes.map(size => `${encodeImagePath(baseName)}-${size}w.webp ${size}w`).join(', '),
        fallback: sizes.map(size => `${encodeImagePath(baseName)}-${size}w.jpg ${size}w`).join(', '),
        defaultSrc: `${encodeImagePath(baseName)}-300w.jpg`, // Fallback for browsers without srcset support
        originalSrc: baseSrc, // Keep original as final fallback
      };
    }
    
    // For other images, try WebP with original fallback
    return {
      webp: `${baseName}.webp`,
      fallback: baseSrc,
      defaultSrc: baseSrc,
      originalSrc: baseSrc,
    };
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const sources = getImageSources(src);

  // Debug logging for development
  if (import.meta.env.DEV) {
    console.log('OptimizedImage sources for', src, ':', sources);
  }

  // Don't render anything if not intersecting and not priority
  if (!isIntersecting && !priority) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'bg-gray-200 animate-pulse',
          width && height ? `w-[${width}px] h-[${height}px]` : 'w-full aspect-square',
          className
        )}
        style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
      />
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder while loading */}
      {!isLoaded && placeholder === 'blur' && (
        <div
          className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse',
            'backdrop-blur-sm'
          )}
        />
      )}

      <picture>
        {/* WebP source with responsive sizes */}
        <source
          srcSet={sources.webp}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback JPEG/PNG source */}
        <source
          srcSet={sources.fallback}
          sizes={sizes}
          type="image/jpeg"
        />
        
        {/* Final fallback img element */}
        <img
          ref={imgRef}
          src={hasError ? sources.originalSrc || '/placeholder.svg' : sources.defaultSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={(e) => {
            // Try original source if optimized version fails
            const target = e.target as HTMLImageElement;
            if (target.src !== sources.originalSrc && sources.originalSrc) {
              console.log(`Optimized image failed, trying original: ${sources.originalSrc}`);
              target.src = sources.originalSrc;
            } else {
              console.log(`Image failed to load: ${target.src}`);
              handleError();
            }
          }}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'w-full h-full object-cover'
          )}
        />
      </picture>

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

// Helper hook for progressive image loading
export const useProgressiveImage = (src: string) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const imageToLoad = new Image();
    
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    
    imageToLoad.onerror = () => {
      setLoading(false);
    };
    
    imageToLoad.src = src;
  }, [src]);

  return { currentSrc, loading };
};

// Utility function to generate optimized image paths
export const getOptimizedImagePath = (
  originalPath: string,
  width: number,
  format: 'webp' | 'jpg' = 'webp'
): string => {
  const baseName = originalPath.replace(/\.[^/.]+$/, '');
  return `${baseName}-${width}w.${format}`;
}; 